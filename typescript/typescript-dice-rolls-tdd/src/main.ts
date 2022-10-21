import { GameController } from './controllers/game.controller.js';
import returnMostCommonEntryInArray from './utilities/detect-repetition-array.js';

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import json from 'koa-json';

const app = new Koa();
app.use(bodyParser());

const router = new Router();

router.post('/roll', async (ctx) => {
  const { gameName, numberOfDice } = ctx.request.body;

  if (!gameName || !numberOfDice) {
    ctx.throw(400, 'name and numberOfDice are required');
    return;
  }

  const gameController = new GameController(
    gameName as string,
    numberOfDice as number,
  );
  const gameResult = returnMostCommonEntryInArray(gameController.startGame());

  ctx.response.status = 200;
  ctx.body = {
    result: `Thanks for playing ${gameController.gameName}, there are ${gameResult} of a kind!`,
  };
});

// Middlewares
app.use(json());
app.use(logger());

// Routes
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Koa started');
});
