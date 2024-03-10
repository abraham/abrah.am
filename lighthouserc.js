module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:5000/'],
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:pwa': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 1 }],
        'csp-xss': 'off',
        'errors-in-console': 'off',
        'font-display': 'off',
        'identical-links-same-purpose': 'warn',
        'maskable-icon': 'off',
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
