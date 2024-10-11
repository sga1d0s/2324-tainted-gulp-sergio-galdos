// import fetch
import fetch from 'node-fetch';

// funcion 'getData' para hacer peticiĆ³n
const getData = async () => {
  try {
    const flame = await fetch("https://raw.githubusercontent.com/zsiciarz/skyrim-alchemy-toolbox/master/data/ingredients.json")
    const ring = await fetch("https://gist.githubusercontent.com/oscar1771/3f27e083e980d9d8357294c2d7387fc0/raw/0296abf13d206454d18f88d8283c114be8d96d2e/joseph.json")
    
    console.log(flame);
    
    // convertir a .json
    return flame.json();
  } catch (error) {
    console.log(error.message);
    throw new Error("Error al obtener los datos")
  }
}

export {getData};
// export default getData;