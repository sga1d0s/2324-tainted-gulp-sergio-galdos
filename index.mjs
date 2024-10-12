import { getData, getJosephData } from "./service.mjs"; // Importamos la función para obtener los datos de los ingredientes
import Ingredients from "./ingredients.mjs"; // Importamos la clase para cargar los ingredientes
import Cauldron from "./cauldron.mjs"; // Importamos la clase para el caldero
import PotionBag from './PotionBag.mjs'; // Importamos la clase para la creación de pociones
import Character from './Character.mjs'; // Importamos la clase Character para Joseph

// Función principal que se encarga de la ejecución del programa
const execute = async () => {
  try {
    // Obtener datos de ingredientes y Joseph
    const ingredientsData = await getData(); // Obtenemos los ingredientes
    const josephData = await getJosephData(); // Obtenemos los datos de Joseph

    // Verificar que los datos de Joseph y sus bolsas existen
    const joseph = josephData.players[0]; // Accedemos al primer jugador (Joseph)

    if (!joseph || !joseph.pouch_red || joseph.pouch_red.length === 0) { // Verificamos que haya ingredientes en la bolsa
      throw new Error("No se encontraron ingredientes en la bolsa roja de Joseph."); // Lanzamos un error si no hay ingredientes
    }

    // Crear los ingredientes
    const ingredients = Ingredients.load(ingredientsData); // Cargamos los ingredientes

    // Crear caldero de pociones
    const cauldron = new Cauldron(ingredients.ingredients); // Creamos el caldero

    // Obtener ingredientes de la bolsa roja de Joseph
    const josephPouch = joseph.pouch_red; // Usamos la bolsa roja de Joseph

    // Filtramos los ingredientes que coinciden con los nombres de la bolsa
    const josephIngredients = ingredients.ingredients.filter(ingredient =>
      josephPouch.includes(ingredient.name)
    );

    // Crear la bolsa de pociones a partir de los ingredientes y el caldero
    const potionBag = PotionBag.create(josephIngredients, cauldron);

    // Mostrar las pociones creadas
    console.log("\n********** POCIONES **********\n");
    showPotions(potionBag.potions);

    // Crear personaje Joseph usando la clase Character y las pociones creadas
    const josephCharacter = Character.from(joseph, potionBag.potions);

    // Mostrar la información de Joseph
    console.log("\n********** CARACTERÍSTICAS **********\n");
    showCharacter(josephCharacter);

    // Joseph bebe todas las pociones
    console.log("\n********** EL TRAGO DE JOSEPH **********\n");
    josephCharacter.drinkEmAll();

  } catch (error) {
    console.error("Error al crear ingredientes y pociones", error); // Manejamos cualquier error que ocurra
  }
}

// Función para mostrar las pociones creadas
function showPotions(potions) {
  console.log("Lista de Pociones Creadas:");
  potions.forEach((potion, index) => { // Recorremos las pociones y las mostramos
    console.log(`${potion.name}`);
    console.log(`Value:           ${potion.value}`);
    console.log(`Weight:          ${potion.weight}`);
    console.log(`Time:            ${potion.time}`);
    console.log('-------------------------------');
  });
}

// Función para mostrar los atributos y pociones de Joseph
function showCharacter(character) {
  console.log(`${character.fullName}`); // Mostramos el nombre completo de Joseph
  console.log('--------------------------------');
  console.log(`Health:        ${character.health}`); // Mostramos la salud
  console.log(`Magick:        ${character.magick}`); // Mostramos la magia
  console.log(`Stamina:       ${character.stamina}`); // Mostramos la resistencia
  character.potions.forEach((potion, index) => { // Mostramos las pociones
    console.log(`Potion ${index + 1}:   ${potion.name}`);
  });
}

execute(); // Ejecutamos el programa
