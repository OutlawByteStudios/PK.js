import Router from 'koa-router';

import auth from './auth';

import {
  bankDeposit,
  bankWithdraw,
  loadGear,
  loadPlayer,
  ping,
  savePlayer,
  stripGear
} from './controllers';

const router = new Router();
router.use(auth);

router.get('/ping', ping); // for server startup

router.get('/loadplayer', loadPlayer); // for when player-selector joins server
router.get('/loadgear', loadGear); // for when player-selector spawns in
router.get('/stripgear', stripGear); // for when player-selector dies
router.get('/saveplayer', savePlayer); // for when a player-selector leaves the server

router.get('/bankdeposit', bankDeposit); // for when a player-selector uses a bank
router.get('/bankwithdraw', bankWithdraw); // for when a player-selector uses a bank

export default router;
