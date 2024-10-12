class Character {
  constructor(fullName, health, magick, stamina, potions = []) {
    this.fullName = fullName;
    this.health = health;
    this.magick = magick;
    this.stamina = stamina;
    this.potions = potions; // Array de pociones
  }

  // Factoría para crear un personaje a partir de los datos del jugador y sus pociones
  static from(playerData, potions) {
    const fullName = `${playerData.name} the ${playerData.class}`;
    const { health, magick, stamina } = playerData;
    return new Character(fullName, health, magick, stamina, potions);
  }
}

export default Character;
