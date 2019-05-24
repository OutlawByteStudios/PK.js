import passport from 'koa-passport';
import SteamStrategy from 'passport-steam';

import { SteamUser } from '../models';

import serverConfig from '../../server-config';

passport.use(
  new SteamStrategy(
    {
      returnURL: serverConfig.host + '/login',
      realm: serverConfig.host,
      apiKey: serverConfig.steamAPIKey
    },
    async (indetifier, profile, done) => {
      const user = {
        steamID: profile.id,
        displayName: profile.displayName,
        avatar: profile.photos[0].value,
        avatarMedium: profile.photos[1].value,
        avatarFull: profile.photos[2].value,
        $setOnInsert: { panelAdmin: (await SteamUser.count({})) === 0 }
      };

      await SteamUser.findOneAndUpdate(
        {
          steamID: user.steamID
        },
        user,
        {
          upsert: true,
          setDefaultsOnInsert: true
        }
      );

      return done(null, user);
    }
  )
);

export default passport;
