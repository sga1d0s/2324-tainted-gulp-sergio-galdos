import fetch from 'node-fetch';

const getData = async () => {
  try {
    // hacer las dos solicitudes
    const flameResponse = await fetch("https://raw.githubusercontent.com/zsiciarz/skyrim-alchemy-toolbox/master/data/ingredients.json");
    const ringResponse = await fetch("https://gist.githubusercontent.com/oscar1771/3f27e083e980d9d8357294c2d7387fc0/raw/0296abf13d206454d18f88d8283c114be8d96d2e/joseph.json");

    // convertir a JSON
    const flame = await flameResponse.json();
    const ring = await ringResponse.json();

    // comprobar JSON en consola
    console.log("Flame JSON:", flame);
    console.log("Ring JSON:", ring);

    return { flame, ring };

  } catch (error) {
    console.log(error.message);
    throw new Error("Error al obtener los datos");
  }
}

export { getData };