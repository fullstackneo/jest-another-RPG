const Potion = require('../lib/Potion');

function Player(name) {
  this.name = name;
  this.health = Math.floor(Math.random() * 10 + 95);
  this.strength = Math.floor(Math.random() * 5 + 7);
  this.agility = Math.floor(Math.random() * 5 + 7);
  this.inventory = [new Potion('health'), new Potion()];
  // returns an object with various player properties
  // this.getStats = function () {
  //   return {
  //     potions: this.inventory.length,
  //     health: this.health,
  //     strength: this.strength,
  //     agility: this.agility
  //   };
  // };

  //  returns the inventory array or false if empty
  // this.getInventory = function () {
  //   if (this.inventory.length) {
  //     return this.inventory;
  //   }
  //   return false;
  // };
}

Player.prototype.getStats = function () {
  return {
    potions: this.inventory.length,
    health: this.health,
    strength: this.strength,
    agility: this.agility
  };
};

Player.prototype.getInventory = function () {
  if (this.inventory.length) {
    return this.inventory;
  }
  return false;
};

Player.prototype.getHealth = function () {
  return `${this.name}'s health is now ${this.health}!`;
};

Player.prototype.isAlive = function () {
  return this.health > 0;
};

Player.prototype.reduceHealth = function (attack) {
  this.health -= attack;
  if (this.health < 0) {
    this.health = 0;
  }
};

Player.prototype.getAttackValue = function () {
  return this.strength + Math.floor(Math.random() * 11 - 5);
};

Player.prototype.addPotion = function (potion) {
  this.inventory.push(potion);
};

Player.prototype.usePotion = function (index) {
  const potion = this.getInventory().splice(index, 1)[0];
  this[potion.name] += potion.value;
};
module.exports = Player;
