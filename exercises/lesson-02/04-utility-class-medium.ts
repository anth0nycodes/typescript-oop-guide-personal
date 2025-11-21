/**
 * Exercise 4: Utility Class (Medium)
 *
 * Create a MathUtils class with ONLY static methods.
 * This is a utility class - no instances should be created.
 *
 * See README.md for full requirements and example usage.
 */

class MathUtils {
  static max(...numbers: number[]) {
    return Math.max(...numbers);
  }

  static min(...numbers: number[]) {
    return Math.min(...numbers);
  }

  static average(...numbers: number[]) {
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
  }

  static sum(...numbers: number[]) {
    if (!numbers.length) return 0;
    return numbers.reduce((a, b) => a + b, 0);
  }

  static factorial(n: number) {
    if (n < 0) throw new Error("Factorial is not defined for negative numbers");
    return n <= 1 ? 1 : n * this.factorial(n - 1);
  }

  static isPrime(n: number) {
    if (n <= 1) return false;

    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) return false;
    }

    return true;
  }

  static fibonacci(n: number) {
    return n <= 1 ? n : this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }

  static randomInt(min: number, max: number) {
    if (min > max) throw new Error("Min should not be greater than Max");
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

// Test max method
console.log(MathUtils.max(1, 5, 3, 9, 2)); // 9
console.log(MathUtils.max(10)); // 10
console.log(MathUtils.max(-5, -10, -3)); // -3

// Test min method
console.log(MathUtils.min(1, 5, 3, 9, 2)); // 1
console.log(MathUtils.min(10)); // 10
console.log(MathUtils.min(-5, -10, -3)); // -10

// Test average method
console.log(MathUtils.average(10, 20, 30)); // 20
console.log(MathUtils.average(5, 5, 5)); // 5
console.log(MathUtils.average(100)); // 100

// Test sum method
console.log(MathUtils.sum(1, 2, 3, 4, 5)); // 15
console.log(MathUtils.sum(10, 20)); // 30
console.log(MathUtils.sum()); // 0

// Test factorial method
console.log(MathUtils.factorial(0)); // 1
console.log(MathUtils.factorial(1)); // 1
console.log(MathUtils.factorial(5)); // 120
console.log(MathUtils.factorial(7)); // 5040

// Test isPrime method
console.log(MathUtils.isPrime(0)); // false
console.log(MathUtils.isPrime(1)); // false
console.log(MathUtils.isPrime(2)); // true
console.log(MathUtils.isPrime(17)); // true
console.log(MathUtils.isPrime(18)); // false
console.log(MathUtils.isPrime(29)); // true

// Test fibonacci method
console.log(MathUtils.fibonacci(0)); // 0
console.log(MathUtils.fibonacci(1)); // 1
console.log(MathUtils.fibonacci(7)); // 13
console.log(MathUtils.fibonacci(10)); // 55

// Test randomInt method
const random1 = MathUtils.randomInt(1, 10);
console.log(random1 >= 1 && random1 <= 10); // true
const random2 = MathUtils.randomInt(5, 5);
console.log(random2); // 5
