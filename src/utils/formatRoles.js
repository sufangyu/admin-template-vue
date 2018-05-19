/**
 * 格式化权限
 * @param {*} roles
 */
export default function formatRoles(roles) {
  const rolesRule = {
    0: 'admin',
    1: 'editor',
    2: 'dev',
  };
  const fRoles = roles.map(key => rolesRule[key]);
  return fRoles;
}
