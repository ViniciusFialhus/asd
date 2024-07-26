export class CharacterMeM {
  name: string;
  powerLevel: number;
  powerPoints: number;
  abilities: { [key: string]: number };

  constructor(
    name: string,
    powerLevel: number,
    powerPoints: number,
    abilities: { [key: string]: number },
  ) {
    this.name = name;
    this.powerLevel = powerLevel;
    this.powerPoints = powerPoints
    this.abilities = abilities;
  }
 
}
