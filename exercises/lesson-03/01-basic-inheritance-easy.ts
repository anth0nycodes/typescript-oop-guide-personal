/**
 * Exercise 1: Basic Inheritance (Easy)
 *
 * Create an Animal base class and Dog subclass.
 * Practice using extends and super keywords.
 *
 * See README.md for full requirements and example usage.
 */

export class Animal {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    if (!name || age <= 0) {
      throw new Error("Invalid parameters for Animal");
    }

    this.name = name;
    this.age = age;
  }

  makeSound() {
    return "Some generic animal sound";
  }

  getInfo() {
    return `${this.name} is ${this.age} years old`;
  }
}

export class Dog extends Animal {
  breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age);

    if (this.breed === "") {
      throw new Error("Breed cannot be an empty string");
    }

    this.breed = breed;
  }

  makeSound() {
    return "Woof! Woof!";
  }

  fetch() {
    return "Dog is fetching!";
  }
}

const animal = new Animal("Generic Animal", 5);

// Test Animal methods
console.log(animal.name); // "Generic Animal"
console.log(animal.age); // 5
console.log(animal.makeSound()); // "Some generic animal sound"
console.log(animal.getInfo()); // "Generic Animal is 5 years old"

const dog = new Dog("Buddy", 3, "Golden Retriever");

// Test inherited properties
console.log(dog.name); // "Buddy"
console.log(dog.age); // 3

// Test Dog-specific property
console.log(dog.breed); // "Golden Retriever"

// Test overridden method
console.log(dog.makeSound()); // "Woof! Woof!" (overridden)

// Test inherited method
console.log(dog.getInfo()); // "Buddy is 3 years old" (inherited)

// Test Dog-specific method
console.log(dog.fetch()); // "Dog is fetching!"

// Test multiple dogs
const dog2 = new Dog("Max", 5, "Labrador");
console.log(dog2.makeSound()); // "Woof! Woof!"
console.log(dog2.breed); // "Labrador"
console.log(dog2.getInfo()); // "Max is 5 years old"

// Test that Animal and Dog are independent
const animal2 = new Animal("Cat", 2);
console.log(animal2.makeSound()); // "Some generic animal sound" (not "Woof!")
