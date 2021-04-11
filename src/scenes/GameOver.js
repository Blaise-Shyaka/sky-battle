import Phaser from 'phaser';
import { myGame } from './MainScene';
import { getPlayerScore } from '../helpers/gameHelpers';

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

    this.gameOverScore.setText('Loading score ...');
    const username = document.querySelector('#playerName').value.trim();
    const result = getPlayerScore(username, myGame.score, this.gameApiId);
    this.setGameOverScoreText(result);
  }

  async setGameOverScoreText(res) {
    const result = await res;
    if (result) this.gameOverScore.setText(`Your score is ${result}`);
  }
}