export const validUsername = username => {
  if (username.length > 2) return true;
  return false;
};

export const recordScore = async (username, score, apiId) => {
  const data = {
    user: username,
    score: parseInt(score.toFixed(0), 10),
  };
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiId}/scores/`;
  try {
    const result = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    const responseData = await result.json();
    return responseData;
  } catch (e) {
    return e;
  }
};

export const incrementScore = (score, increment) => {
  score += increment;
  return score;
};

export const getPlayerScore = async (score, scoreText, apiId) => {
  scoreText.setText('Loading score ...');
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiId}/scores/`;
  const username = document.querySelector('#playerName').value.trim();
  try {
    const result = await fetch(url, { method: 'GET' });
    const responseData = await result.json();
    const playerScore = responseData
      .result
      .filter(
        entry => entry.user === username && entry.score === parseInt(score.toFixed(0), 10),
      );
    scoreText.setText(`Your score is ${playerScore[0].score}`);
    return playerScore[0].score;
  } catch (e) {
    return e;
  }
};

export const getTopScores = async (loadingText, apiId) => {
  loadingText.setText('Loading top scorers ...');
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiId}/scores/`;
  try {
    const result = await fetch(url, { method: 'GET' });
    const responseData = await result.json();
    const topScores = responseData.result.sort(
      (a, b) => (parseInt(a.score, 10) > parseInt(b.score, 10) ? -1 : 1),
    ).slice(0, 5);
    loadingText.destroy();
    return topScores;
  } catch (e) {
    return e;
  }
};
