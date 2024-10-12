// Importamos únicamente la clase Potion
import Potion from './potion.mjs'; // Potion contiene los métodos para FailedPotion y PotionOfSanity

class Character {
  constructor(fullName, health, magick, stamina, potions = []) {
    // Inicializamos las propiedades del personaje
    this.fullName = fullName;
    this.health = health;
    this.magick = magick;
    this.stamina = stamina;
    this.potions = potions;
  }

  // Método estático para crear un personaje desde los datos de jugador y las pociones
  static from(playerData, potions) {
    const fullName = `${playerData.name} the ${playerData.class}`;
    const { health, magick, stamina } = playerData;
    return new Character(fullName, health, magick, stamina, potions);
  }

  // Método para beber todas las pociones en el array
  drinkEmAll() {
    for (let potion of this.potions) {
      // Verificamos si la poción es una 'FailedPotion'
      if (potion instanceof Potion && potion.name === "Failed potion") {
        console.log(`Failed Potion. ${this.fullName} cannot drink`);
        this.showStats();
        continue;
      }

      // Verificamos si la poción es 'PotionOfSanity'
      if (potion instanceof Potion && potion.name === "Potion of Sanity") {
        this.health += potion.value;
        this.magick += potion.value;
        this.stamina += potion.value;
        console.log(`${this.fullName} drinks Potion of Sanity and gains ${potion.value} points of health, magick & stamina`);
        this.showStats();
        console.log(`${this.fullName} has found the Potion of Sanity. His mind is healed. Well done!!`);
        return;
      }

      let attributeChanged = false;

      if (potion.name.includes("Health")) {
        this.applyEffect(potion, "health");
        attributeChanged = true;
      }

      if (potion.name.includes("Magicka")) {
        this.applyEffect(potion, "magick");
        attributeChanged = true;
      }

      if (potion.name.includes("Stamina")) {
        this.applyEffect(potion, "stamina");
        attributeChanged = true;
      }

      if (!attributeChanged) {
        // Pociones sin efectos específicos (por ejemplo, invisibilidad)
        this.health += 1;
        this.magick += 1;
        this.stamina += 1;
        console.log(`${this.fullName} drinks ${potion.name} and gains 1 point of health, magick & stamina`);
      }

      this.showStats();

      // Verificamos si Joseph ha muerto o ha perdido magia o resistencia
      if (this.health <= 0) {
        console.log(`${this.fullName} has died`);
        return;
      } else if (this.magick <= 0) {
        console.log(`${this.fullName} has lost all his magick. He is defeated.`);
        return;
      } else if (this.stamina <= 0) {
        console.log(`${this.fullName} has lost all his stamina. He feels completely exhausted.`);
        return;
      }
    }
    console.log("Joseph has finished drinking all the potions.");
  }

  // Método para aplicar el efecto de una poción o veneno
  applyEffect(potion, attribute) {
    const effect = potion.name.includes("Poison") ? "loses" : "gains";
    const valueChange = potion.name.includes("Poison") ? -potion.value : potion.value;

    this[attribute] += valueChange;

    console.log(`${this.fullName} drinks ${potion.name} and ${effect} ${Math.abs(valueChange)} points of ${attribute}`);
  }

  // Mostrar las estadísticas actuales de Joseph
  showStats() {
    console.log(`Health:        ${this.health}`);
    console.log(`Magick:        ${this.magick}`);
    console.log(`Stamina:       ${this.stamina}`);
    console.log('------------------------------');
  }
}

export default Character;
