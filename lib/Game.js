const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');
function Game() {
  this.roundNumber = 0;
  this.isPlayerTurn = true;
  this.enemies = [];
  this.currentEnemy;
  this.player;
}

Game.prototype.checkEndOfBattle = function () {
  if (this.player.isAlive() && this.currentEnemy.isAlive()) {
    this.isPlayerTurn = !this.isPlayerTurn;
    this.battle();
  } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
    // enemy is defeated
    console.log(`You've defeated the ${this.currentEnemy.name}`);
    // player pick ememy's potion
    this.player.addPotion(this.currentEnemy.potion);
    console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);
    // change to next enemy
    this.roundNumber++;

    if (this.roundNumber < this.enemies.length) {
      this.currentEnemy = this.enemies[this.roundNumber];
      this.startNewBattle();
    } else {
      console.log('You win!');
    }
  } else {
    // player is defeated
    console.log("You've been defeated!");
  }
};

Game.prototype.battle = function () {
  if (this.isPlayerTurn) {
    //player use potion or not, add health
    // console.log('if开始');
    inquirer
      .prompt({
        type: 'list',
        name: 'action',
        message: 'Do you want to fight or use potion?',
        choices: ['fight', 'use potion']
      })
      .then(({ action }) => {
        // console.log('inquirer执行');

        console.log(action);
        switch (action) {
          case 'fight':
            // player attack
            const damage = this.player.getAttackValue();

            console.log(this.currentEnemy.getHealth());
            this.currentEnemy.reduceHealth(damage);
            console.log(`${this.currentEnemy.name} were attacked`);
            console.log(this.currentEnemy.getHealth());
            this.checkEndOfBattle();
            break;
          case 'use potion':
            //player has no potion left
            if (!this.player.getInventory()) {
              console.log("You don't have any potions!");
              return this.checkEndOfBattle();
            }
            inquirer
              .prompt({
                type: 'list',
                name: 'action',
                message: 'which potion do you want to use?',
                choices: this.player.inventory.map((el, index) => `${index + 1}:${el.name}:add ${el.value} health`)
              })
              .then(({ action }) => {
                //plaer use a potion
                const index = action.split(':')[0] - 1;

                console.log(index);

                console.log(this.player.getHealth());

                this.player.usePotion(index);
                console.log(this.player.getHealth());
                this.checkEndOfBattle();
              });

            break;
        }
      });
    // player attck, enemy reduce health
    // console.log('if里最后');
  } else {
    //enemy attacks
    // console.log('else开始');

    const damage = this.currentEnemy.getAttackValue();
    console.log(this.player.getHealth());
    this.player.reduceHealth(damage);

    console.log(`You were attacked by the ${this.currentEnemy.name}`);
    console.log(this.player.getHealth());
    this.checkEndOfBattle();
  }
  // console.log('if外');
  // enemy use potion or not, add health

  //enemy attack, player reduce health
};

Game.prototype.startNewBattle = function () {
  if (this.player.agility > this.currentEnemy) {
    isPlayerTurn = true;
  } else {
    isPlayerTurn = false;
  }
  console.log('Your stats are as follows');

  console.table(this.player.getStats());
  console.table(this.enemies);

  console.log('Current enemy');

  console.table(this.currentEnemy.getDescription());

  this.battle();
};

Game.prototype.initializeGame = function () {
  this.enemies.push(new Enemy('goblin', 'sword'));
  this.enemies.push(new Enemy('orc', 'baseball bat'));
  this.enemies.push(new Enemy('skeleton', 'axe'));
  this.currentEnemy = this.enemies[0];
  inquirer
    .prompt({
      type: 'text',
      name: 'name',
      message: 'What is your name?'
    })
    // destructure name from the prompt object
    .then(({ name }) => {
      this.player = new Player(name);

      // test the object creation
      // console.log(this.currentEnemy, this.player);
      this.startNewBattle();
    });
};
module.exports = Game;
