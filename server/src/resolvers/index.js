import queriesScalars from './queries/scalars';
import queriesServer from './queries/server';
import queriesPlayer from './queries/player';
import queriesPlayerName from './queries/player-name';
import queriesBan from './queries/ban';
import queriesWarning from './queries/warning';
import queriesNote from './queries/note';

import queriesItem from './queries/item';

import queriesSteamUser from './queries/steam-user';
import queriesAdminPermission from './queries/admin-permission';

import mutationsAdminPermission from './mutations/admin-permission';

export default [
  queriesScalars,
  queriesServer,
  queriesPlayer,
  queriesPlayerName,
  queriesBan,
  queriesWarning,
  queriesNote,
  queriesItem,
  queriesSteamUser,
  queriesAdminPermission,
  mutationsAdminPermission
];
