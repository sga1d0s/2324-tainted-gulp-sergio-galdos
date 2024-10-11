import { getData } from "./service.mjs";
import Ingredients from "./ingredients.mjs";
import Cauldron from "./cauldron.mjs";
import PotionBag from './PotionBag.mjs';

// URL para el JSON de Joseph
const josephUrl = 'https://gist.githubusercontent.com/oscar1771/3f27e083e980d9d8357294c2d7387fc0/raw/0296abf13d206454d18f88d8283c114be8d96d2e/joseph.json';

// Función para obtener los datos de Joseph
const getJosephData = async () => {
  try {
    const response = await fetch(josephUrl);
    return response.json();
  } catch (error) {
    console.log("Error al obtener los datos de Joseph", error);
  }
};

const execute = async () => {
  try {
    // Obtener datos de ingredientes y Joseph
    const ingredientsData = await getData();
    const josephData = await getJosephData();

    // Imprimir los datos de Joseph para verificar
    console.log("Datos de Joseph:", josephData);

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
    const josephPouch = joseph.pouch_yellow; // Usamos la bolsa roja

    // Filtrar los ingredientes disponibles
    const josephIngredients = ingredients.ingredients.filter(ingredient =>
      josephPouch.includes(ingredient.name)
    );

    // Crear la bolsa de pociones
    const potionBag = PotionBag.create(josephIngredients, cauldron);

    // Mostrar las pociones
    showPotions(potionBag.potions);

  } catch (error) {
    console.error("Error al crear ingredientes y pociones", error);
  }
}

function showPotions(potions) {
  console.log("Lista de Pociones Creadas:");

  potions.forEach(potion => {
    console.log(`${potion.name}`);
    console.log(`Value:           ${potion.value}`);
    console.log(`Weight:          ${potion.weight.toFixed(2)}`);
    console.log(`Time:            ${potion.time}`);
    console.log('-------------------------------');
  });
}

execute();
