// imports
import { fetchIngredients, fetchPlayerData } from "./service.mjs";
import Cauldron from "./cauldron.mjs";
import Potion from "./potion.mjs";

// clase principal
class PotionBag {
  constructor(potions = []) {
    this.potions = potions;
  }

  async create(ingredients, cauldron) {

    const fetchedIngredients = await fetchIngredients();
    ingredients = fetchedIngredients.pouch_red || ingredients;

    const createdPotions = [];

    // crear pociones de combinaciones únicas de ingredientes
    for (let i = 0; i < ingredients.length; i++) {
      for (let j = i + 1; j < ingredients.length; j++) {
        const ingredient1 = ingredients[i];
        const ingredient2 = ingredients[j];
        const { name, value, weight, time } = cauldron.mix(ingredient1, ingredient2);
        const potion = new Potion(name, value, weight, time);
        createdPotions.push(potion);
      }
    }
    console.log(createdPotions);
    // devolver PotionBag con las pociones creadas
    return new PotionBag(createdPotions);
  }
}

export default PotionBag;