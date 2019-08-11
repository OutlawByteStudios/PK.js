import fs from 'fs';
import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import BodyParser from 'koa-bodyparser';
import Cors from '@koa/cors';
import Helmet from 'koa-helmet';
import Logger from 'koa-logger';
import serve from 'koa-static';
import mount from 'koa-mount';
import views from 'koa-views';

import mongoose from 'mongoose';

import jobContainer from './jobs';

import { passport, SteamAuth } from './auth';

import ApolloServer from './graphql-api';
import ServerApi from './server-api';

import serverConfig from '../server-config';
const inProduction = serverConfig.env === 'production';

mongoose.connect(serverConfig.mongoDB, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const app = new Koa();
const router = new Router();

if (!serverConfig.disableCronJobs) jobContainer.initContainer();
app.jobContainer = jobContainer;

app.use(Helmet());
app.use(Cors());
app.use(
  BodyParser({
    enableTypes: ['json'],
    jsonLimit: '5mb',
    strict: true,
    onerror: function(err, ctx) {
      if (err) console.log(err);
      ctx.throw('body parse error', 422);
    }
  })
);

if (!inProduction) app.use(Logger());

app.use(passport.initialize());

const clientPath = path.join(require.resolve('client'), '../');

if (inProduction)
  app.use(mount('/static', serve(path.join(clientPath, '/build/static'))));
else app.use(serve(path.join(clientPath, '/public')));

if (inProduction) app.use(views(path.join(path.join(clientPath, '/build'))));

ApolloServer.applyMiddleware({ app });

router.use('/auth', SteamAuth.routes(), SteamAuth.allowedMethods());
router.use('/serverapi', ServerApi.routes(), ServerApi.allowedMethods());

if (inProduction) {
  router.get('/manifest.json', async ctx => {
    ctx.body = fs.readFileSync(path.join(clientPath, '/build/manifest.json'));
  });

  router.get('/favicon.png', async ctx => {
    ctx.body = fs.readFileSync(path.join(clientPath, '/build/favicon.png'));
  });

  router.get('*', async ctx => {
    await ctx.render('index.html', {});
  });
}

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
