const { createApp } = Vue;

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      attackRounds: 0,
      winner: null,
      battleLogs: [],
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'monster';
        this.playerHealth = 0;
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw';
        this.resetHealths();
      } else if (value <= 0) {
        this.winner = 'player';
        this.monsterHealth = 0;
      }
    },
  },
  methods: {
    attackMonster() {
      this.attackRounds++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.logAction('player', 'attack', attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.logAction('monster', 'attack', attackValue);
      this.playerHealth -= attackValue;
    },
    specialAttack() {
      this.attackRounds++;
      const attackValue = getRandomValue(10, 25);
      this.logAction('player', 'special-attack', attackValue);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    logAction(who, what, points) {
      this.battleLogs.unshift({
        attacker: who,
        attackType: what,
        attackPoints: points,
      });
    },
    healPlayer() {
      const healthValue = getRandomValue(10, 20);
      if (this.playerHealth + healthValue >= 100) {
        this.playerHealth = 100;
      } else {
        this.attackRounds++;
        this.playerHealth += healthValue;
        this.logAction('player', 'heals', healthValue);
        this.attackPlayer();
      }
    },
    surrender() {
      this.winner = 'monster';
    },
    startAgain() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.attackRounds = 0;
      this.winner = null;
    },
  },
});

app.mount('#game');
