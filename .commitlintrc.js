const generalScopes = ['config', 'deps', 'repo', 'workspace'];

const projectScopes = ['frontend'];
const moduleScopes = ['canvas', 'controls', 'shape', 'state'];

const allowedScopes = [...generalScopes, ...projectScopes, ...moduleScopes];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-empty': [2, 'never'],
    'scope-enum': [2, 'always', [...allowedScopes].sort()],
  },
};
