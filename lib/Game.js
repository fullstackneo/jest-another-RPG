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

Game.prototype.battle = function () {
  if (this.isPlayerTurn) {
    //player use potion or not, add health
    inquirer
      .prompt({
        type: 'list',
        name: 'action',
        message: 'Do you want to use potion?',
        choices: ['fight', 'use potion']
      })
      .then(({ action }) => {
        console.log(action);
        switch (action) {
          case 'fight':
            const damage = this.player.getAttackValue();

            console.log(this.currentEnemy.getHealth());
            this.currentEnemy.reduceHealth(damage);
            console.log(`${this.currentEnemy.name} were attacked`);
            console.log(this.currentEnemy.getHealth());
            break;
          case 'use potion':
            if (!this.player.getInventory()) {
              console.log("You don't have any potions!");
              return;
            }
            inquirer
              .prompt({
                type: 'list',
                name: 'action',
                message: 'which potion do you want to use?',
                choices: this.player.inventory.map((el, index) => `${index + 1}:${el.name}:add ${el.value} health`)
              })
              .then(({ action }) => {
                const index = action.split(':')[0] - 1;

                console.log(index);

                console.log(this.player.getHealth());

                this.player.usePotion(index);
                console.log(this.player.getHealth());
              });

            break;
        }
      });
    // player attck, enemy reduce health
  } else {
    const damage = this.currentEnemy.getAttackValue();
    console.log(this.player.getHealth());
    this.player.reduceHealth(damage);

    console.log(`You were attacked by the ${this.currentEnemy.name}`);
    console.log(this.player.getHealth());
  }
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
