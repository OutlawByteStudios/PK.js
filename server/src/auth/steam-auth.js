import Router from 'koa-router';
import jwt from 'jsonwebtoken';

import serverConfig from '../../server-config';

import passport from './passport';

const router = new Router();

router.get('/steam', passport.authenticate('steam'));

router.get(
  '/steam/return',
  passport.authenticate('steam', {
    session: false,
    failureFlash: 'Failed to login.'
  }),
  ctx => {
    ctx.body = JSON.stringify({
      token: jwt.sign({ user: ctx.req.user }, serverConfig.jwtAuth.secret)
    });
  }
);

export default router;
