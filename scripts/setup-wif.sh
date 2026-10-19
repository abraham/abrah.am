#!/usr/bin/env bash
# One-time setup so GitHub Actions can deploy Firebase Hosting through OIDC
# (Workload Identity Federation) instead of a stored token or key.
# Needs gcloud (as a project owner) and gh (as a repo admin). Safe to re-run.
set -euo pipefail

PROJECT_ID=abraham-d3850
REPO=abraham/abrah.am
POOL=github
PROVIDER=github-actions
SA_NAME=github-deploy
SA="$SA_NAME@$PROJECT_ID.iam.gserviceaccount.com"

PROJECT_NUMBER=$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')
# The numeric ID, so a renamed or recreated repository can't match.
REPO_ID=$(gh api "repos/$REPO" --jq .id)
POOL_NAME="projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/$POOL"

gcloud services enable iamcredentials.googleapis.com sts.googleapis.com --project "$PROJECT_ID"

gcloud iam workload-identity-pools describe "$POOL" --project "$PROJECT_ID" --location global >/dev/null 2>&1 ||
  gcloud iam workload-identity-pools create "$POOL" --project "$PROJECT_ID" --location global \
    --display-name "GitHub Actions"

gcloud iam workload-identity-pools providers describe "$PROVIDER" --project "$PROJECT_ID" --location global \
  --workload-identity-pool "$POOL" >/dev/null 2>&1 ||
  gcloud iam workload-identity-pools providers create-oidc "$PROVIDER" --project "$PROJECT_ID" --location global \
    --workload-identity-pool "$POOL" \
    --display-name "GitHub Actions" \
    --issuer-uri "https://token.actions.githubusercontent.com" \
    --attribute-mapping "google.subject=assertion.sub,attribute.repository_id=assertion.repository_id,attribute.ref=assertion.ref,attribute.environment=assertion.environment" \
    --attribute-condition "assertion.repository_id == '$REPO_ID'"

gcloud iam service-accounts describe "$SA" --project "$PROJECT_ID" >/dev/null 2>&1 ||
  gcloud iam service-accounts create "$SA_NAME" --project "$PROJECT_ID" --display-name "GitHub Actions deploy"

# Covers live and preview channel deploys. Add roles only if the CLI shows it needs them.
gcloud projects add-iam-policy-binding "$PROJECT_ID" --member "serviceAccount:$SA" \
  --role roles/firebasehosting.admin --condition None >/dev/null

gcloud iam service-accounts add-iam-policy-binding "$SA" --project "$PROJECT_ID" \
  --role roles/iam.workloadIdentityUser \
  --member "principalSet://iam.googleapis.com/$POOL_NAME/attribute.repository_id/$REPO_ID" >/dev/null

# Not secrets, so repository variables.
gh variable set GCP_WIF_PROVIDER --repo "$REPO" --body "$POOL_NAME/providers/$PROVIDER"
gh variable set GCP_DEPLOY_SA --repo "$REPO" --body "$SA"

# Only main can deploy to the live channel.
gh api --method PUT "repos/$REPO/environments/production" --input - >/dev/null <<'JSON'
{ "deployment_branch_policy": { "protected_branches": false, "custom_branch_policies": true } }
JSON
if ! gh api "repos/$REPO/environments/production/deployment-branch-policies" \
  --jq '.branch_policies[].name' | grep -qx main; then
  gh api --method POST "repos/$REPO/environments/production/deployment-branch-policies" \
    -f name=main -f type=branch >/dev/null
fi

echo "Done. The service account must have no user-managed keys:"
gcloud iam service-accounts keys list --iam-account "$SA" --project "$PROJECT_ID" --managed-by user
