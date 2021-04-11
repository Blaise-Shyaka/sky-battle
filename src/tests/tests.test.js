import {
  recordScore, validUsername, getTopScores, getPlayerScore,
} from '../helpers/gameHelpers';

describe('Validating a username', () => {
  it('should return true if the name has more than 2 characters', () => {
    const validName = 'Laura';
    expect(validUsername(validName)).toBe(true);
  });

  it('should return false if the name has less than three characters', () => {
    const invalidName = 'La';
    expect(validUsername(invalidName)).toBe(false);
  });
});

describe('Recording score', () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify({ result: 'Leaderboard score created correctly.' }));
  });

  it('should return an object', async () => {
    const response = await recordScore('username', 20);
    expect(response).toBeInstanceOf(Object);
  });

  it('should return an object with result as a property', async () => {
    const response = await recordScore('username', 10);
    expect(response).toMatchObject({ result: 'Leaderboard score created correctly.' });
  });
});

describe('Getting top scorers', () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify({ result: [{ user: 'hayters', score: 20 }, { user: 'Blaise', score: 13 }] }));
  });

  it('should return an object', async () => {
    const response = await getTopScores('loading');
    expect(response).toBeInstanceOf(Object);
  });

  it('should return the result as an array', async () => {
    const response = await getTopScores('loading');
    expect(response).toBeInstanceOf(Array);
  });
});

describe('Getting player score', () => {
  beforeEach(() => {
    fetch.resetMocks();
    const scores = {
      result: [
        {
          user: 'player',
          score: 42,
        },
        {
          user: 'player',
          score: 35,
        },
        {
          user: 'player',
          score: 50,
        },
      ],
    };
    fetch.mockResponseOnce(JSON.stringify(scores));
  });

  it('should return an error if the score was not recorded', async () => {
    const response = await getPlayerScore('player', 5);
    expect(response).toBeInstanceOf(Error);
  });

  it('should return the result as an array', async () => {
    const currentScore = 50;
    const response = await getPlayerScore('player', currentScore);
    expect(response).toEqual(currentScore);
  });
});
