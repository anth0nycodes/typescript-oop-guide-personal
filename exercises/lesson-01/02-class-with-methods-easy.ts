/**
 * Exercise 2: Class with Methods (Easy)
 *
 * Create a Counter class with:
 * - count property (starts at 0)
 * - increment(), decrement(), getValue(), reset() methods
 *
 * See README.md for full requirements and example usage.
 */

// Your code here

class Counter {
  count: number;

  constructor() {
    this.count = 0;
  }

  increment(): void {
    this.count++;
  }

  decrement(): void {
    if (this.count === 0) return;
    this.count--;
  }

  getValue(): number {
    return this.count;
  }

  reset(): void {
    this.count = 0;
  }
}

const counter = new Counter();
// Test initial value
console.log(counter.getValue()); // 0

// Test increment
counter.increment();
counter.increment();
counter.increment();
console.log(counter.getValue()); // 3

// Test decrement
counter.decrement();
console.log(counter.getValue()); // 2

// Test edge case: decrement multiple times
counter.decrement();
counter.decrement();
console.log(counter.getValue()); // 0

// Test edge case: decrement below zero (should not go below 0)
counter.decrement();
console.log(counter.getValue()); // 0 (should stay at 0)

// Test reset
counter.increment();
counter.increment();
console.log(counter.getValue()); // 2
counter.reset();
console.log(counter.getValue()); // 0

// Test multiple counters are independent
const counter2 = new Counter();
counter.increment();
counter.increment();
counter.increment();
console.log(counter.getValue()); // 3
console.log(counter2.getValue()); // 0 (independent)
