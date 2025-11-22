/**
 * Exercise 3: Multi-Level Inheritance (Medium)
 *
 * Create a three-level inheritance hierarchy:
 * LivingBeing → Animal → Mammal
 *
 * See README.md for full requirements and example usage.
 */

export class LivingBeing {
  constructor(public isAlive: boolean = true) {}

  breathe() {
    return "Breathing...";
  }
}

export class Animal extends LivingBeing {
  name: string;
  species: string;

  constructor(name: string, species: string, isAlive: boolean = true) {
    super(isAlive);

    if (this.name === "" || this.species === "") {
      throw new Error("Name and species cannot be empty strings");
    }

    this.name = name;
    this.species = species;
  }

  move() {
    return "Moving...";
  }

  eat() {
    return "Eating...";
  }
}

export class Mammal extends Animal {
  furColor: string;

  constructor(name: string, species: string, furColor: string) {
    super(name, species);

    if (this.furColor === "") {
      throw new Error("Fur color cannot be an empty string");
    }

    this.furColor = furColor;
  }

  produceMilk() {
    return "Producing milk...";
  }

  breathe() {
    const outerParentBreathe = super.breathe();
    return `${outerParentBreathe} \nMammal breathing with lungs`;
  }
}

const mammal = new Mammal("Lion", "Panthera leo", "Golden");

// Test methods from all levels
console.log(mammal.breathe());
// "Breathing..."
// "Mammal breathing with lungs"

console.log(mammal.move()); // "Moving..." (from Animal)
console.log(mammal.eat()); // "Eating..." (from Animal)
console.log(mammal.produceMilk()); // "Producing milk..." (from Mammal)

// Test properties from all levels
console.log(mammal.isAlive); // true (from LivingBeing)
console.log(mammal.name); // "Lion" (from Animal)
console.log(mammal.species); // "Panthera leo" (from Animal)
console.log(mammal.furColor); // "Golden" (from Mammal)

// Test multiple mammals
const mammal2 = new Mammal("Bear", "Ursus arctos", "Brown");
console.log(mammal2.name); // "Bear"
console.log(mammal2.species); // "Ursus arctos"
console.log(mammal2.furColor); // "Brown"
console.log(mammal2.breathe());
// "Breathing..."
// "Mammal breathing with lungs"

// Test that properties are independent
console.log(mammal.name); // "Lion" (unchanged)
console.log(mammal.furColor); // "Golden" (unchanged)
