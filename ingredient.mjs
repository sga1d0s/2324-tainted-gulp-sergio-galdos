// importar clase 'Effect'
import Effect from "./effect.mjs";

// clase principal
class Ingredient {
  constructor(name, effects, value, weight) {
    this.name = name;
    this.effects = effects;
    this.value = value;
    this.weight = weight;
  }

  // factoría que crea un ingrediente a través de un objeto json de la DB
  static from({ name, effects, value, weight }) {
    return new Ingredient(
      name,
      effects.map(effect => Effect.from(effect)),
      value,
      weight
    )
  }

  find(name) {
    const ingredient = this.ingredients.find(element => element.hasName(name));
    if (ingredient == undefined)
      throw new Error(`Unknown ingredient ${name}`);
    return ingredient
  }

  // copmpara el nombre del ingrediente con el parametro
  hasName(name) {
    return this.name === name;
  }

  // devuelve el nombre de todos los efectos en comun
  findCommonEffects(otherIngredient) {
    return this.effects.filter(effect => otherIngredient.hasEffect(effect));
  }

  hasEffect(effect) {
    return this.effects.some(candidate => effect.name === candidate.name);
  }
}

export default Ingredient;