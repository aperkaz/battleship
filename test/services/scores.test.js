const assert = require('assert');
const app = require('../../src/app');

describe('\'scores\' service', () => {
  it('registered the service', () => {
    const service = app.service('scores');

    assert.ok(service, 'Registered the service');
  });

  it('registered the service', () => {
    const service = app.service('scores');

    assert.ok(service, 'Registered the service');
  });

  it('adds score to /scores', async () => {
    // create test score
    const score = await app.service('scores').create({
      players: ['testPlayer1', 'testPlayer2'],
      winner: 'testPlayer1',
      date: new Date().toISOString()
    });

    // verify content
    assert.deepEqual(score.players, ['testPlayer1', 'testPlayer2']);
    assert.equal(score.winner, 'testPlayer1');
  });

  it('get scores from /scores', async () => {
    const date = new Date().toISOString();
    const score1 = await app.service('scores').create({
      players: ['testPlayer1', 'testPlayer2'],
      winner: 'testPlayer1',
      date: date,
    });

    const score2 = await app.service('scores').create({
      players: ['testPlayer1', 'testPlayer2'],
      winner: 'testPlayer2',
      date: date,
    });

    const scores = await app.service('scores').find();

    // eslint-disable-next-line no-console
    console.log(scores);

    // verify content
    assert(scores.data.filter(score =>
      score._id === score1._id).length > 0);
    assert(scores.data.filter(score =>
      score._id === score2._id).length > 0);
  });
});
