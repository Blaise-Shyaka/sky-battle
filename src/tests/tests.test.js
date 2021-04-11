import { recordScore, validUsername } from '../helpers/gameHelpers';

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
