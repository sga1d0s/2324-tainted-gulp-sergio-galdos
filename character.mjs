// Character.mjs
class Character {
  constructor(fullName, health, magick, stamina, potions = []) {
    this.fullName = fullName;
    this.health = health;
    this.magick = magick;
    this.stamina = stamina;
    this.potions = potions;
  }

  static from(playerData, potions) {
    const { name, health, magick, stamina } = playerData;
    return new Character(name, health, magick, stamina, potions);
  }

  showCharacter() {
    console.log(`${this.fullName}`);
    console.log(`Health: ${this.health}`);
    console.log(`Magick: ${this.magick}`);
    console.log(`Stamina: ${this.stamina}`);
    this.potions.forEach((potion, index) => {
      console.log(`Potion ${index + 1}: ${potion.name}`);
    });
  }

  drinkEmAll() {
    this.potions.forEach(potion => {
      console.log(`${this.fullName} drinks ${potion.name}`);
      if (potion.name.includes("Health")) {
        this.health += potion.value;
        console.log(`Health: ${this.health}`);
      } else if (potion.name.includes("Magicka")) {
        this.magick += potion.value;
        console.log(`Magick: ${this.magick}`);
      } else if (potion.name.includes("Stamina")) {
        this.stamina += potion.value;
        console.log(`Stamina: ${this.stamina}`);
      } else {
        this.health += 1;
        this.magick += 1;
        this.stamina += 1;
        console.log(`Gains 1 point to all attributes`);
      }
    });
  }
}

export { Character };
