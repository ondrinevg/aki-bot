const { Aki } = require('aki-api');
const region = 'ru';

const startGame = async (req, res) => {
  const { id, first_name } = req.body;
  console.log('startGame for ', first_name, ' ', id);
  const aki = new Aki(region);
  await aki.start();
  req.app.locals.DB.set(id, aki);
  const { question } = aki;
  res.status(200).json({ question });
}

const stepGame = async (req, res) => {
  const id = +req.params.id;
  const aki = req.app.locals.DB.get(id);
  await aki.step(req.body.answer); 
  req.app.locals.DB.set(id, aki);
  const { question, progress, currentStep } = aki;
  res.status(200).json({ question, progress, currentStep });
}

const getGuess = async (req, res) => {
  const id = +req.params.id;
  const aki = req.app.locals.DB.get(id);
  await aki.win();
  const { answers, guessCount } = aki;
  req.app.locals.DB.delete(id);
  res.status(200).json({ answers, guessCount })
}

module.exports = {
  startGame,
  stepGame,
  getGuess,
}
