const mixService = require('./mix-service');
// const logger = require('../../services/logger.service');

async function getMix(req, res) {
  const mix = await mixService.getById(req.params.id);
  res.send(mix);
}

async function getMixes(req, res) {
  const mixes = await mixService.query(req.query.userId);
  // logger.debug(mixes);
  res.send(mixes);
}

async function removeMix(req, res) {
  await mixService.remove(req.params.id);
  res.end();
}

async function updateMix(req, res) {
  const mix = req.body;
  await mixService.update(mix);
  res.send(mix);
}

async function addMix(req, res) {
  const mix = req.body;
  await mixService.add(mix);
  res.send(mix);
}

module.exports = {
  addMix,
  getMix,
  getMixes,
  removeMix,
  updateMix
};
