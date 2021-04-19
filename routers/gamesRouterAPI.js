const { Router } = require('express');
const {
  startGame, stepGame, getGuess,
} = require('../controllers/gamesControllerAPI');

const router = Router()

router.route('/')
  .post(startGame);

router.route('/:id/win')
  .get(getGuess)

router.route('/:id')
  .post(stepGame)

const gamesRouter = router;
module.exports = gamesRouter;
