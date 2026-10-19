module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:5000/'],
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // Raise to 'error' once workstream 5 replaces the node-package cards, whose keyword links fail target-size.
        'categories:accessibility': ['warn', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 1 }],
        'csp-xss': 'off',
        'errors-in-console': 'off',
        'font-display': 'off',
        'identical-links-same-purpose': 'warn',
        'network-dependency-tree-insight': 'warn',
        'image-delivery-insight': 'warn',
        'font-display-insight': 'warn',
        'cls-culprits-insight': 'warn',
        'target-size': 'warn',
        'non-composited-animations': 'off',
        'total-byte-weight': 'warn',
        'unused-javascript': 'warn',
        'uses-responsive-images': 'warn',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
