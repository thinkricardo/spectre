const generalScopes = ['config', 'deps', 'repo', 'workspace'];
const projectScopes = ['frontend'];

const allowedScopes = [...generalScopes, ...projectScopes];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-empty': [2, 'never'],
    'scope-enum': [2, 'always', [...allowedScopes].sort()],
  },
};
