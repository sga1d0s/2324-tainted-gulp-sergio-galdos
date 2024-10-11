// imports
import Potion from "./potion.mjs";

class Cauldron {
  // constructor
  constructor(ingredients) {
    // accede directamente al array de ingredientes
    this.ingredients = ingredients.ingredients; 
  }

  // factoria que crea las pociones
  createPotion(ingredient_name1, ingredient_name2) {
    
    // buscar los ingredientes usando una función de predicado
    const ingredient1 = this.ingredients.find(ingredient => ingredient.name === ingredient_name1);
    const ingredient2 = this.ingredients.find(ingredient => ingredient.name === ingredient_name2);

    // Verifica si ambos ingredientes se encontraron
    if (!ingredient1 || !ingredient2) {
      return Potion.failed(); // Si uno de los ingredientes no se encuentra, falla
    }

    const common_effects = ingredient1.findCommonEffects(ingredient2);

    if (common_effects.length === 0) {
      return Potion.failed(); // Si no hay efectos comunes, falla
    }

    if (isPotionOfSanity(ingredient1, ingredient2)) {
      return Potion.sanity(); // Si es la poción de la cordura, regresa esa
    } else {
      return Potion.with(
        common_effects[0], // Usa el primer efecto común
        ingredient1.weight + ingredient2.weight, // Suma los pesos
        ingredient1.value + ingredient2.value // Suma los valores
      );
    }
  }
}

// función para comprobar si los ingredientes son correctos
function isPotionOfSanity(i1, i2) {
  return (i1.name === "Nightshade" && i2.name === "Ectoplasm") ||
         (i2.name === "Nightshade" && i1.name === "Ectoplasm");
}

export default Cauldron;
