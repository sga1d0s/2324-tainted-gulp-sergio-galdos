import { getData, getJosephData } from "./service.mjs";
import Ingredients from "./ingredients.mjs";
import Cauldron from "./cauldron.mjs";
import PotionBag from './PotionBag.mjs';

const execute = async () => {
  try {
    // Obtener datos de ingredientes y del personaje Joseph
    const ingredientsData = await getData();
    const josephData = await getJosephData();

    // Acceder al primer jugador en los datos (Joseph) y verificar que existen las bolsas de ingredientes
    const joseph = josephData.players[0]; // El primer jugador es Joseph

    if (!joseph || !joseph.pouch_yellow || joseph.pouch_yellow.length === 0) {
      throw new Error("No se encontraron ingredientes en la bolsa de Joseph.");
    }

    // Cargar los ingredientes utilizando los datos obtenidos
    const ingredients = Ingredients.load(ingredientsData);

    // Crear una instancia de Cauldron (caldero) con los ingredientes cargados
    const cauldron = new Cauldron(ingredients.ingredients);

    // Obtener los ingredientes de la bolsa de Joseph (pouch_yellow)
    const josephPouch = joseph.pouch_yellow;

    // Filtrar los ingredientes de Joseph que están disponibles en los datos cargados
    const josephIngredients = ingredients.ingredients.filter(ingredient =>
      josephPouch.includes(ingredient.name)
    );

    // Crear una instancia de PotionBag con los ingredientes filtrados y el caldero
    const potionBag = PotionBag.create(josephIngredients, cauldron);

    // Mostrar las pociones creadas utilizando la función showPotions
    showPotions(potionBag.potions);

  } catch (error) {
    // Capturar cualquier error y mostrarlo en la consola
    console.error("Error al crear ingredientes y pociones", error);
  }
}

function showPotions(potions) {
  // Mostrar en consola la lista de pociones creadas
  console.log("Lista de Pociones Creadas:");

  // Recorrer cada poción y mostrar sus detalles: nombre, valor, peso y tiempo
  potions.forEach(potion => {
    console.log(`${potion.name}`);
    console.log(`Value:           ${potion.value}`);
    console.log(`Weight:          ${potion.weight.toFixed(2)}`);
    console.log(`Time:            ${potion.time}`);
    console.log('-------------------------------');
  });
}

// Ejecutar la función principal
execute();
