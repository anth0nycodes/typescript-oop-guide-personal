/**
 * Exercise 1: Simple Class (Easy)
 *
 * Create a Person class with basic properties:
 * - name (string)
 * - age (number)
 * - city (string)
 *
 * See README.md for full requirements and example usage.
 */

// Your code here

class Person {
  name: string;
  age: number;
  city: string;

  constructor(name: string, age: number, city: string) {
    this.name = name;
    this.age = age;
    this.city = city;
  }
}

const person1 = new Person("Alice", 30, "New York");
const person2 = new Person("Bob", 25, "Los Angeles");

// Test accessing all properties of person1
console.log(person1.name); // "Alice"
console.log(person1.age); // 30
console.log(person1.city); // "New York"

// Test accessing all properties of person2
console.log(person2.name); // "Bob"
console.log(person2.age); // 25
console.log(person2.city); // "Los Angeles"

// Test that objects are independent
person1.age = 31;
console.log(person1.age); // 31
console.log(person2.age); // 25 (unchanged)

// Test with different data
const person3 = new Person("Charlie", 40, "Chicago");
console.log(person3.name); // "Charlie"
console.log(person3.age); // 40
console.log(person3.city); // "Chicago"
