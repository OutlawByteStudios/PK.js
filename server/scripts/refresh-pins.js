import mongoose from 'mongoose';
import { Player } from '../src/models';
import generatePin from '../src/utils/generate-pin';

import serverConfig from '../server-config';

async function main(){
  await mongoose.connect(serverConfig.mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true
  });

  let players = await Player.find();
  let totalProgress = players.length;

  players = players.map(async (player, progress) => {
    console.log(`Generating pin for ${player.guid} (${progress + 1} / ${totalProgress})`);
    player.pin = generatePin();
    await player.save();
  });

  await Promise.all(players);

  await mongoose.disconnect();
}
main();

