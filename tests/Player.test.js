const Potion = require('../lib/Potion');
jest.mock('../lib/Potion');

const Player = require('../lib/Player');
test('create a player object', () => {
  const player = new Player('Dave');
  expect(player.name).toEqual('Dave');
  expect(player.health).toEqual(expect.any(Number));
  expect(player.strength).toEqual(expect.any(Number));
  expect(player.agility).toEqual(expect.any(Number));
  expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)]));
});

test("gets player's stats as an object", () => {
  const player = new Player('Dave');
  expect(player.getStats()).toHaveProperty('potions');
  expect(player.getStats()).toHaveProperty('health');
  expect(player.getStats()).toHaveProperty('strength');
  expect(player.getStats()).toHaveProperty('agility');
});

test('gets inventory from player or return false', () => {
  const player = new Player('Dave');
  expect(player.getInventory()).toEqual(expect.any(Array));
  // simulate an empty array
  player.inventory = [];
  expect(player.getInventory()).toEqual(false);
});

test('gets health value', () => {
  const player = new Player('Dave');
  expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

test(`checks if player is alive or not`, () => {
  const player = new Player('Dave');
  expect(player.isAlive()).toBeTruthy();
  player.health = 0;
  expect(player.isAlive()).toBeFalsy();
});

test(`subtracts from player's health`, () => {
  const player = new Player('Dave');
  const oldHealth = player.health;
  player.reduceHealth(5);
  expect(oldHealth - player.health).toBe(5);

  player.reduceHealth(99999);
  expect(player.health).toBe(0);
});

test("get player's attack value", () => {
  const player = new Player('Dave');
  player.strength = 10;
  expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
  expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

test('adds a portion to the inventory', () => {
  const player = new Player('Dave');
  const oldCount = player.inventory.length;
  player.addPotion(new Potion());
  expect(player.inventory.length).toBe(oldCount + 1);
});

test('use a potion from inventory', () => {
  const player = new Player('Dave');
  const oldCount = player.inventory.length;
  player.usePotion(1);
  expect(player.inventory.length).toBe(oldCount - 1);
  expect(player.inventory.length).toBeGreaterThanOrEqual(0);
});
