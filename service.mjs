import fetch from 'node-fetch';

// Función para obtener los ingredientes
export async function fetchIngredients() {
    const response = await fetch('https://raw.githubusercontent.com/zsiciarz/skyrim-alchemy-toolbox/master/data/ingredients.json');
    const data = await response.json();
    return data.ingredients;
}

// Función para obtener los datos del jugador
export async function fetchPlayerData() {
    const response = await fetch('https://gist.githubusercontent.com/oscar1771/3f27e083e980d9d8357294c2d7387fc0/raw/0296abf13d206454d18f88d8283c114be8d96d2e/joseph.json');
    const data = await response.json();
    return data.players[0];
}