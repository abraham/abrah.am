module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:5000/'],
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'unused-javascript': 'warn',
        'csp-xss': 'off',
        'font-display': 'off',
        'maskable-icon': 'off',
        'non-composited-animations': 'off',
        'errors-in-console': 'off',
        'categories:performance': ['error', { minScore: 0.99 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 1 }],
        'categories:pwa': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
