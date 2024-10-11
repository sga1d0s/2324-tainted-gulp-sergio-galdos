// variables
const positive_effect_tokens = [
  "Forty", "Resist", "Cure", "Restore", "Regenerate", "Invisibility",
];

class Effect {
  // constructor
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }

  // factoria que crea un nuevo efecto a través del nombre
  static from(name) {
    return new Effect(
      name,
      positive_effect_tokens.some(token => name.includes(token)) ? 'beneficial' : 'harmful'
    )
  }
}
export default Effect