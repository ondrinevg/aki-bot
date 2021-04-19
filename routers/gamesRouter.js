const { Router } = require('express');
const fetch = require('node-fetch');

const router = Router();

router.route('/')
  .get(async (req, res) => {
    const response = await fetch(`${process.env.serverURL}:${process.env.PORT}/api/v1/games`)
    if (response.status === 200) {
      const phones = await response.json()
      return res.render('index', { phones })
    }

    return res.sendStatus(500)
  })

router.route('/:id')
  .get(async (req, res) => {
    const response = await fetch(`${process.env.serverURL}:${process.env.PORT}/api/v1/games/:id`)
    if (response.status === 200) {
      const phones = await response.json()
      return res.render('index', { phones })
    }

    return res.sendStatus(500)
  })
module.exports = router;
