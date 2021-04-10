import Phaser from 'phaser';
import { myGame } from './MainScene';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' });
    this.gameApiId = 'WU53r6YoPGNHhlvVTFu9';
  }

  preload() {
    this.load.image('gameOver', 'assets/gameover.jpeg');
  }

  create() {
    this.add.image(400, 300, 'gameOver').setScale(2.8);
    this.playAgain = this.add.text(250, 390, 'Play Again');
    this.leaderboard = this.add.text(400, 390, 'View Leaderboard');
    this.playAgain.setInteractive({ useHandCursor: true });
    this.leaderboard.setInteractive({ useHandCursor: true });
    this.pointer = this.input.activePointer;

    this.playAgain.on('pointerdown', () => {
      this.scene.start('GameIntro');
      const playerNameInput = document.querySelector('#playerName');
      playerNameInput.classList.remove('hide');
      playerNameInput.value = '';
    });

    this.leaderboard.on('pointerdown', () => {
      this.scene.start('LeaderBoard');
    });

    this.gameOverScore = this.add.text(230, 80, '', {
      fontFamily: 'Arial', fontSize: 45, color: '#ffffff',
    });

    this.getPlayerScore();
  }

  async getPlayerScore() {
    const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.gameApiId}/scores/`;
    const username = document.querySelector('#playerName').value.trim();
    try {
      const result = await fetch(url, { method: 'GET' });
      const responseData = await result.json();
      const playerScore = responseData
        .result
        .filter(
          entry => entry.user === username && entry.score === parseInt(myGame.score.toFixed(0), 10),
        );
      this.gameOverScore.setText(`Your score is ${playerScore[0].score}`);
      return playerScore[0].score;
    } catch (e) {
      return e;
    }
  }
}