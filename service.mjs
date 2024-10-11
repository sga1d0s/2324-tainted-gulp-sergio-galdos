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

export {getData};
// export default getData;