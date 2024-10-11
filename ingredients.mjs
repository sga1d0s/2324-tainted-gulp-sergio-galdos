// importar clase 'Ingredient'
import Ingredient from "./ingredient.mjs";

// clase principal
class Ingredients {
  constructor(ingredients) {
    this.ingredients = ingredients
  }

  // factoría que crea la colección de ingredientes
  static load(data){
    return new Ingredients(data.ingredients.map(Ingredient.from))
  }
}

export default Ingredients