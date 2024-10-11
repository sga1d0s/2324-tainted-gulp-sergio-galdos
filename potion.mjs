
class Potion {
  // constructor
  constructor(name, value, weight, time) {
    this.name = name;
    this.value = value;
    this.weight = weight;
    this.time = time;
  }

  // factoría que crea poción corriente
  static with(effect, weight, value) {
    const type = effect.type === 'beneficial' ? "Potion" : "Poison";
    const potion_name = `${type} of ${effect.name}`;
    const time = 10;
    return new Potion(potion_name, value, weight, time)
  }

  // factoría que crea poción fallida
  static failed() {
    // devuelve objeto 'FailedPotion'
    return new FailedPotion();
  }

  // factoría que crea pocion de la cordura
  static sanity() {
    // devuelve objeto 'PotionOfSanity'
    return new PotionOfSanity();
  }
}

// clase 'PotionOfSanity' que hereda de 'Potion'
class PotionOfSanity extends Potion{
  constructor(){
    super("Potion of Sanity", 1000, 1, 50);
  }
}

// clase 'FailedPotion' que hereda de 'Potion'
class FailedPotion extends Potion {
  constructor() {
    super("Failed potion", 0, 0, 0)
  }
}

export default Potion