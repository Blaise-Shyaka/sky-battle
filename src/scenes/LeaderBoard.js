import Phaser from 'phaser';

export default class LeaderBoard extends Phaser.Scene {
  constructor() {
    super({ key: 'LeaderBoard' });
    this.gameApiId = 'WU53r6YoPGNHhlvVTFu9';
  }

  create() {
    this.add.text(150, 30, 'LEADERBOARD', { fontSize: 65 });
    this.loading = this.add.text(140, 150, '', { fontSize: 35 });
    this.playAgain = this.add.text(300, 390, 'Play Again');
    this.playAgain.setInteractive({ useHandCursor: true });
    this.pointer = this.input.activePointer;

    this.playAgain.on('pointerdown', () => {
      this.scene.start('GameIntro');
      const playerNameInput = document.querySelector('#playerName');
      playerNameInput.classList.remove('hide');
      playerNameInput.value = '';
    });
    this.getTopScores();
  }

  async getTopScores() {
    this.loading.setText('Loading top scorers ...');
    const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.gameApiId}/scores/`;
    try {
      const result = await fetch(url, { method: 'GET' });
      const responseData = await result.json();
      const topScores = responseData.result.sort(
        (a, b) => (parseInt(a.score, 10) > parseInt(b.score, 10) ? -1 : 1),
      ).slice(0, 5);
      this.loading.destroy();
      this.printTopScores(topScores);
      return topScores;
    } catch (e) {
      return e;
    }
  }

  printTopScores(arr) {
    arr.forEach(elt => {
      const yPosition = arr.indexOf(elt) * 30 + 130;
      this.add.text(300, yPosition, `${elt.user}: ${elt.score}`);
    });
  }
}