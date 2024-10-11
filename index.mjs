// imports
import PotionBag from "./potionBag.mjs";
import Cauldron from "./cauldron.mjs";
import { fetchIngredients } from "./service.mjs";
import Ingredients from "./ingredients.mjs";
import Potion from "./potion.mjs";

// función principal
const execute = async () => {
  try {
    const data = await fetchIngredients();

    // crear los ingredientes
    const ingredients = Ingredients.load(data);

    // crear caldero de pociones
    const cauldron = new Cauldron(ingredients);
    
    // crear potionBag
    const potionBag = new PotionBag(ingredients);

    // crear las pociones
    const potion = potionBag.create(ingredients, cauldron);
    showPotion(potion);

  } catch (error) {
    console.error("Error al crear ingredientes", error);
    console.log(error.message);
  }
}

function showPotion(potion) {
  console.log(`${potion.name.toUpperCase()}`);
  console.log(`Value:           ${potion.value}`);
  console.log(`Weight:          ${potion.weight}`);
  console.log(`Time:            ${potion.time}`);
  console.log(`-------------------------------`);
}

function showIngredients(ingredients) {
  console.log("Lista de Ingredientes y sus Efectos:");

  // Iteramos sobre el array de ingredientes
  ingredients.forEach(ingredient => {
    console.log(`Ingrediente: ${ingredient.name}`);

    // Iteramos sobre los efectos de cada ingrediente
    ingredient.effects.forEach((effect, index) => {
      console.log(`Efecto ${index + 1}: ${effect}`);
    });
    console.log('-------------------------');
  });
}

execute();
