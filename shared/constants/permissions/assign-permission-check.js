function canRemoveAssignPermission(currentAdmin, selectedAdmin, permission){
  // no one can assign manageAssignPermissions. only the server creator has them
  if(permission === 'manageAssignPermissions') return false;

  // ignore the cases above, an admin can assign admin permissions if they have the manageAssignPermissions permission
  return currentAdmin.manageAssignPermissions >= 1;
}

module.exports = function(currentAdmin, selectedAdmin, permission, assign = false){
  // don't allow an admin to change their own permissions
  if(typeof currentAdmin.admin === 'object') {
    if(currentAdmin.admin.steamID === selectedAdmin.admin.steamID) return false;
  } else {
    if(currentAdmin.admin === selectedAdmin.admin) return false;
  }

  // if the selected admin has the assign admin permission, then other permissions cannot be removed
  if(permission !== 'manageAssignPermissions' && selectedAdmin.manageAssignPermissions > 0) return false;

  // handle assign permissions check
  if(assign) return canRemoveAssignPermission(currentAdmin, selectedAdmin, permission);

  // if the admin has assign permissions, then to remove the non assign permissions you must have permission
  // to remove the assign permission
  if(selectedAdmin[permission] > 1) return canRemoveAssignPermission(currentAdmin, selectedAdmin, permission);

  // a permission can be added or removed if the current admin has the assignment permission for that specific
  // permission or the manageAssignPermissions permission
  return currentAdmin[permission] > 1 || currentAdmin.manageAssignPermissions > 0;
};