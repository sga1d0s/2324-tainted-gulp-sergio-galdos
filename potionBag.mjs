// imports
import { getData } from "./service.mjs";
import Cauldron from "./cauldron.mjs";
import Potion from "./potion.mjs";

// clase principal
class PotionBag {
  constructor(potions) {
    this.potions = potions
  }

  create(ingredients, cauldron) {

    potions = new Potion()
    cauldron = new Cauldron(ingredients)

  }

}
export default PotionBag