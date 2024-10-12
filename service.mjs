// import fetch
import fetch from 'node-fetch';

// funcion 'getData' para hacer petición
const getData = async () => {
  try {
    const result = await fetch("https://raw.githubusercontent.com/zsiciarz/skyrim-alchemy-toolbox/master/data/ingredients.json")
    // convertir a .json
    return result.json();
  } catch (error) {
    console.log(error.message);
    throw new Error("Error al obtener los datos")
  }
}

// Función para obtener los datos de Joseph
const getJosephData = async () => {
  try {
    const response = await fetch("https://gist.githubusercontent.com/oscar1771/3f27e083e980d9d8357294c2d7387fc0/raw/0296abf13d206454d18f88d8283c114be8d96d2e/joseph.json");
    return response.json();
  } catch (error) {
    console.log("Error al obtener los datos de Joseph", error);
  }
};

export {getData, getJosephData};