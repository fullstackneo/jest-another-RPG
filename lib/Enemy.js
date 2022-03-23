const Potion = require('./Potion');
module.exports = function (name, weapon) {
  this.name = name;
  this.weapon = weapon;
  this.health = Math.floor(Math.random() * 10 + 85);
  this.strength = Math.floor(Math.random() * 5 + 5);
  this.agility = Math.floor(Math.random() * 5 + 5);
  this.potion = new Potion();
};

Enemy.prototype.getHealth = function () {
  return `${this.name}'s health is now ${this.health}!`;
};

Enemy.prototype.isAlive = function () {
  return this.health > 0;
};

Enemy.prototype.reduceHealth = function (attack) {
  this.health -= attack;
  if (this.health < 0) {
    this.health = 0;
  }
};

Enemy.prototype.getAttackValue = function () {
  return this.strength + Math.floor(Math.random() * 11 - 5);
};

Enemy.prototype.getDescription = function () {
  return `A${this.name} holding a ${this.weapon}`;
};
