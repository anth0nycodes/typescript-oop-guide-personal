/**
 * Exercise 4: Method Overriding with Inheritance (Medium)
 *
 * Create an employee hierarchy (Employee, Manager, Developer)
 * demonstrating method overriding and inheritance.
 *
 * See README.md for full requirements and example usage.
 */

export class Employee {
  name: string;
  id: number;
  baseSalary: number;
  bonus: number = 0;

  constructor(name: string, id: number, baseSalary: number) {
    if (name === "") {
      throw new Error("Name cannot be an empty string");
    }

    if (id <= 0) {
      throw new Error("ID must be a positive number");
    }

    if (baseSalary < 0) {
      throw new Error("Base salary cannot be negative");
    }

    this.name = name;
    this.id = id;
    this.baseSalary = baseSalary;
  }

  calculatePay() {
    return this.baseSalary + this.bonus;
  }

  setBonus(amount: number) {
    return (this.bonus = amount);
  }

  getDetails() {
    return `Employee Name: ${this.name}, ID: ${this.id}, Base Salary: $${this.baseSalary}, Bonus: $${this.bonus}`;
  }
}

export class Manager extends Employee {
  teamSize: number;

  constructor(name: string, id: number, baseSalary: number, teamSize: number) {
    super(name, id, baseSalary);

    if (this.teamSize < 0) {
      throw new Error("Team size must be greater than or equal to zero");
    }

    this.teamSize = teamSize;
  }

  calculatePay() {
    const parentPay = super.calculatePay();
    return parentPay + this.teamSize * 100;
  }

  getTeamSize() {
    return this.teamSize;
  }
}

export class Developer extends Employee {
  programmingLanguages: string[];

  constructor(
    name: string,
    id: number,
    baseSalary: number,
    programmingLanguages: string[],
  ) {
    super(name, id, baseSalary);

    this.programmingLanguages = programmingLanguages;
  }

  calculatePay() {
    const parentPay = super.calculatePay();
    return parentPay + this.programmingLanguages.length * 500;
  }

  addLanguage(language: string) {
    if (language === "") {
      throw new Error("Programming language cannot be an empty string");
    }

    return this.programmingLanguages.push(language);
  }
}

const manager = new Manager("Alice", 1, 80000, 5);

// Test initial state
console.log(manager.name); // "Alice"
console.log(manager.id); // 1
console.log(manager.getDetails()); // Employee details

// Test calculatePay without bonus
console.log(manager.calculatePay());
// 80500 (80000 + 0 + 500 team bonus)

// Test setBonus
manager.setBonus(5000);
console.log(manager.calculatePay());
// 85500 (80000 + 5000 + 500)

// Test getTeamSize
console.log(manager.getTeamSize()); // 5

const dev = new Developer("Bob", 2, 90000, ["TypeScript", "Python"]);

// Test initial state
console.log(dev.name); // "Bob"
console.log(dev.id); // 2
console.log(dev.calculatePay());
// 91000 (90000 + 0 + 1000 language bonus for 2 languages)

// Test setBonus
dev.setBonus(3000);
console.log(dev.calculatePay());
// 94000 (90000 + 3000 + 1000)

// Test addLanguage
dev.addLanguage("Rust");
console.log(dev.calculatePay());
// 94500 (90000 + 3000 + 1500 for 3 languages)

dev.addLanguage("Go");
console.log(dev.calculatePay());
// 95000 (90000 + 3000 + 2000 for 4 languages)

// Test getDetails (inherited)
console.log(dev.getDetails()); // Employee details

// Test multiple employees
const dev2 = new Developer("Charlie", 3, 85000, ["JavaScript"]);
dev2.setBonus(2000);
console.log(dev2.calculatePay());
// 87500 (85000 + 2000 + 500 for 1 language)

console.log(dev.calculatePay()); // 95000 (unchanged)
console.log(manager.calculatePay()); // 85500 (independent)
