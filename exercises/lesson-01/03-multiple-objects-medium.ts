/**
 * Exercise 3: Multiple Objects (Medium)
 *
 * Create a BankAccount class with:
 * - Properties: accountNumber, ownerName, balance
 * - Methods: deposit(), withdraw(), getBalance(), transfer()
 *
 * See README.md for full requirements and example usage.
 */

// Your code here

class BankAccount {
  accountNumber: string;
  ownerName: string;
  balance: number = 0;

  constructor(accountNumber: string, ownerName: string, balance: number = 0) {
    this.accountNumber = accountNumber;
    this.ownerName = ownerName;
    this.balance = balance;
  }

  deposit(amount: number) {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }
    return (this.balance += amount);
  }

  withdraw(amount: number) {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be positive");
    }

    if (this.balance >= amount) {
      this.balance -= amount;
      return true;
    }

    return false;
  }

  getBalance() {
    return this.balance;
  }

  transfer(amount: number, toAccount: BankAccount) {
    if (this.withdraw(amount)) {
      toAccount.deposit(amount);
      return true;
    }
    throw new Error("Insufficient funds for transfer");
  }
}

const account1 = new BankAccount("ACC001", "Alice", 1000);
const account2 = new BankAccount("ACC002", "Bob", 500);
const account3 = new BankAccount("ACC003", "Charlie"); // Uses default balance of 0

// Test getBalance
console.log(account1.getBalance()); // 1000
console.log(account3.getBalance()); // 0

// Test deposit
const newBalance1 = account1.deposit(200);
console.log(newBalance1); // 1200
console.log(account1.getBalance()); // 1200

// Test withdraw success
const withdrawSuccess = account1.withdraw(300);
console.log(withdrawSuccess); // true
console.log(account1.getBalance()); // 900

// Test edge case: withdraw with insufficient funds
const withdrawFail = account1.withdraw(1000);
console.log(withdrawFail); // false
console.log(account1.getBalance()); // 900 (unchanged)

// Test edge case: withdraw exact balance
account3.deposit(100);
const withdrawExact = account3.withdraw(100);
console.log(withdrawExact); // true
console.log(account3.getBalance()); // 0

// Test transfer success
account1.transfer(400, account2);
console.log(account1.getBalance()); // 500
console.log(account2.getBalance()); // 900

// Test edge case: transfer with insufficient funds
account1.transfer(600, account2);
console.log(account1.getBalance()); // 500 (unchanged, transfer failed)
console.log(account2.getBalance()); // 900 (unchanged)

// Test edge case: transfer to account with zero balance
account2.transfer(100, account3);
console.log(account2.getBalance()); // 800
console.log(account3.getBalance()); // 100

// Test edge case: negative deposit (should handle appropriately)
// account1.deposit(-50); // Should either throw error or ignore

// Test edge case: negative withdraw (should handle appropriately)
// account1.withdraw(-50); // Should either throw error or ignore
