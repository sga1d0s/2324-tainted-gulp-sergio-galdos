import Potion from "./potion.mjs";

// Función para comprobar si los ingredientes crean la Poción de la Cordura
function isPotionOfSanity(i1, i2) {
  // Retorna verdadero si los ingredientes son "Nightshade" y "Ectoplasm" en cualquier orden
  return (i1.name === "Nightshade" && i2.name === "Ectoplasm") ||
         (i2.name === "Nightshade" && i1.name === "Ectoplasm");
}

class Cauldron {
  // Constructor que recibe una lista de ingredientes disponibles
  constructor(ingredients) {
    this.ingredients = ingredients;
  }

  // Método para crear una poción a partir de dos nombres de ingredientes
  createPotion(ingredient_name1, ingredient_name2) {
    // Buscar los ingredientes por su nombre en la lista de ingredientes
    const ingredient1 = this.ingredients.find(ingredient => ingredient.name === ingredient_name1);
    const ingredient2 = this.ingredients.find(ingredient => ingredient.name === ingredient_name2);

    // Si alguno de los ingredientes no se encuentra, lanzar un error
    if (!ingredient1 || !ingredient2) {
      throw new Error(`No se encontró uno o ambos ingredientes: ${ingredient_name1}, ${ingredient_name2}`);
    }

    // Encontrar los efectos comunes entre los dos ingredientes
    const common_effects = ingredient1.findCommonEffects(ingredient2);

    // Si no hay efectos comunes, la poción falla
    if (common_effects.length === 0) {
      return Potion.failed();
    }

    // Si los ingredientes crean la Poción de la Cordura, retornarla
    if (isPotionOfSanity(ingredient1, ingredient2)) {
      return Potion.sanity();
    } else {
      // Crear una nueva poción con el primer efecto común, sumando pesos y valores
      return Potion.with(
        common_effects[0], // Primer efecto común
        ingredient1.weight + ingredient2.weight, // Peso total
        ingredient1.value + ingredient2.value    // Valor total
      );
    }
  }
}

export default Cauldron;
