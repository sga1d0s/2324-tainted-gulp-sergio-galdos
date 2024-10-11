import Potion from "./potion.mjs";

// función para comprobar si los ingredientes crean una poción especial (Poción de la Cordura)
function isPotionOfSanity(i1, i2) {
  return (i1.name === "Nightshade" && i2.name === "Ectoplasm") ||
         (i2.name === "Nightshade" && i1.name === "Ectoplasm");
}

class Cauldron {
  // constructor
  constructor(ingredients) {
    this.ingredients = ingredients;
  }

  // factoría que crea las pociones
  createPotion(ingredient_name1, ingredient_name2) {
    // Buscar los ingredientes por su nombre
    const ingredient1 = this.ingredients.find(ingredient => ingredient.name === ingredient_name1);
    const ingredient2 = this.ingredients.find(ingredient => ingredient.name === ingredient_name2);

    if (!ingredient1 || !ingredient2) {
      throw new Error(`No se encontró uno o ambos ingredientes: ${ingredient_name1}, ${ingredient_name2}`);
    }

    // Buscar efectos comunes
    const common_effects = ingredient1.findCommonEffects(ingredient2);

    if (common_effects.length === 0) {
      return Potion.failed();
    }

    if (isPotionOfSanity(ingredient1, ingredient2)) {
      return Potion.sanity();
    } else {
      return Potion.with(
        common_effects[0],
        ingredient1.weight + ingredient2.weight,
        ingredient1.value + ingredient2.value
      );
    }
  }
}

export default Cauldron;
