import Potion from './potion.mjs';
import Cauldron from './cauldron.mjs';

class PotionBag {
  constructor(potions = []) {
    this.potions = potions; // Array de pociones creadas
  }

  // Método para crear las pociones
  static create(ingredients, cauldron) {
    let potionBag = new PotionBag();

    // Crear todas las combinaciones posibles de ingredientes
    for (let i = 0; i < ingredients.length; i++) {
      for (let j = i + 1; j < ingredients.length; j++) {
        const ingredient1 = ingredients[i].name;
        const ingredient2 = ingredients[j].name;
        
        // Crear poción usando el caldero
        const potion = cauldron.createPotion(ingredient1, ingredient2);
        potionBag.potions.push(potion);
      }
    }

    return potionBag;
  }
}

export default PotionBag;
