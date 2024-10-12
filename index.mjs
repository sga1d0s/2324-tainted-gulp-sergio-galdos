import { getData, getJosephData } from "./service.mjs";
import Ingredients from "./ingredients.mjs";
import Cauldron from "./cauldron.mjs";
import PotionBag from './PotionBag.mjs';
import Character from './Character.mjs';

const execute = async () => {
  try {
    // Obtener datos de ingredientes y Joseph
    const ingredientsData = await getData();
    const josephData = await getJosephData();

    // Verificar que los datos de Joseph y sus bolsas existen
    const joseph = josephData.players[0]; // Accedemos al primer jugador (Joseph)

    if (!joseph || !joseph.pouch_yellow || joseph.pouch_yellow.length === 0) {
      throw new Error("No se encontraron ingredientes en la bolsa roja de Joseph.");
    }

    // Crear los ingredientes
    const ingredients = Ingredients.load(ingredientsData);

    // Crear caldero de pociones
    const cauldron = new Cauldron(ingredients.ingredients);

    // Obtener ingredientes de la bolsa roja de Joseph
    const josephPouch = joseph.pouch_yellow;

    // Filtrar los ingredientes disponibles
    const josephIngredients = ingredients.ingredients.filter(ingredient =>
      josephPouch.includes(ingredient.name)
    );

    // Crear la bolsa de pociones
    const potionBag = PotionBag.create(josephIngredients, cauldron);

    // Mostrar las pociones creadas
    showPotions(potionBag.potions);

    // Crear personaje Joseph usando la clase Character
    const josephCharacter = Character.from(joseph, potionBag.potions);

    // Mostrar la información de Joseph
    showCharacter(josephCharacter);

  } catch (error) {
    console.error("Error al crear ingredientes y pociones", error);
  }
}

// Función para mostrar las pociones
function showPotions(potions) {
  console.log("Lista de Pociones Creadas:");
  potions.forEach((potion, index) => {
    console.log(`${potion.name}`);
    console.log(`Value:           ${potion.value}`);
    console.log(`Weight:          ${potion.weight.toFixed(2)}`);
    console.log(`Time:            ${potion.time}`);
    console.log('-------------------------------');
  });
}

// Función para mostrar la información del personaje
function showCharacter(character) {
  console.log(`${character.fullName}`);
  console.log('--------------------------------');
  console.log(`Health:        ${character.health}`);
  console.log(`Magick:        ${character.magick}`);
  console.log(`Stamina:       ${character.stamina}`);
  character.potions.forEach((potion, index) => {
    console.log(`Potion ${index + 1}:   ${potion.name}`);
  });
}

execute();
