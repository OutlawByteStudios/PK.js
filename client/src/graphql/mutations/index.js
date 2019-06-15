import ADD_ADMIN_PERMISSION from './admin-management/add-admin-permission';
import REMOVE_ADMIN_PERMISSION from './admin-management/remove-admin-permission';
import UPDATE_ADMIN_PERMISSION from './admin-management/update-admin-permission';

import ADD_BAN from './player-management/add-ban';
import ADD_NOTE from './player-management/add-note';
import ADD_WARNING from './player-management/add-warning';

import DELETE_BAN from './player-management/delete-ban';
import DELETE_NOTE from './player-management/delete-note';
import DELETE_WARNING from './player-management/delete-warning';
import UN_BAN from './player-management/un-ban';

import WIPE_PLAYER_NAME from './player-management/wipe-player-name';

import CREATE_SERVER from './server-management/create-server';
import DELETE_SERVER from './server-management/delete-server';
import SAVE_SERVER_CONFIG from './server-management/save-server-config'


export {
  ADD_ADMIN_PERMISSION,
  REMOVE_ADMIN_PERMISSION,
  UPDATE_ADMIN_PERMISSION,

  ADD_BAN,
  ADD_NOTE,
  ADD_WARNING,
  UN_BAN,

  DELETE_BAN,
  DELETE_NOTE,
  DELETE_WARNING,

  WIPE_PLAYER_NAME,

  CREATE_SERVER,
  DELETE_SERVER,
  SAVE_SERVER_CONFIG
}
