/**
 * Exercise 2: Using super in Methods (Easy)
 *
 * Create Vehicle and Car classes demonstrating
 * calling parent methods with super.method().
 *
 * See README.md for full requirements and example usage.
 */

export class Vehicle {
  brand: string;
  year: number;
  mileage: number;

  constructor(brand: string, year: number, mileage: number = 0) {
    if (brand === "" || year <= 0 || mileage < 0) {
      throw new Error("Invalid parameters for Vehicle");
    }
    this.brand = brand;
    this.year = year;
    this.mileage = mileage;
  }

  drive(distance: number) {
    if (distance < 0) {
      throw new Error("Distance cannot be negative");
    }
    this.mileage += distance;
    return `Drove ${distance} miles. Total mileage: ${this.mileage}`;
  }

  getDetails() {
    return `${this.year} ${this.brand} (${this.mileage} miles)`;
  }
}

export class Car extends Vehicle {
  model: string;

  constructor(brand: string, year: number, model: string, mileage: number) {
    super(brand, year, mileage);

    this.model = model;
  }

  drive(distance: number) {
    const parentDrive = super.drive(distance);
    return `${parentDrive}. \nCar ${this.model} drove smoothly`;
  }

  getDetails() {
    const parentDetails = super.getDetails();
    return `${parentDetails}. \nModel: ${this.model}`;
  }
}

const vehicle = new Vehicle("Generic", 2020, 1000);

// Test Vehicle methods
console.log(vehicle.brand); // "Generic"
console.log(vehicle.year); // 2020
console.log(vehicle.mileage); // 1000

console.log(vehicle.drive(50));
// "Drove 50 miles. Total mileage: 1050"
console.log(vehicle.mileage); // 1050

console.log(vehicle.drive(100));
// "Drove 100 miles. Total mileage: 1150"

console.log(vehicle.getDetails());
// "2020 Generic (1150 miles)"

const car = new Car("Toyota", 2022, "Camry", 500);

// Test inherited properties
console.log(car.brand); // "Toyota"
console.log(car.year); // 2022
console.log(car.mileage); // 500

// Test Car-specific property
console.log(car.model); // "Camry"

// Test overridden drive (calls super)
console.log(car.drive(100));
// "Drove 100 miles. Total mileage: 600"
// "Car Camry drove smoothly"
console.log(car.mileage); // 600 (updated by super.drive())

car.drive(50);
console.log(car.mileage); // 650

// Test overridden getDetails (calls super)
console.log(car.getDetails());
// "2022 Toyota (650 miles)"
// "Model: Camry"

// Test multiple vehicles
const car2 = new Car("Honda", 2023, "Accord", 0);
car2.drive(200);
console.log(car.mileage); // 650
console.log(car2.mileage); // 200 (independent)
