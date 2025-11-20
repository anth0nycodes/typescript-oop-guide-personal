/**
 * Exercise 3: Resource Management (Medium)
 *
 * Create a DatabaseConnection class that uses static properties
 * to limit and track active database connections.
 *
 * See README.md for full requirements and example usage.
 */

class DatabaseConnection {
  static maxConnections: number = 5;
  static activeConnections: number = 0;
  static connectionHistory: string[] = [];

  static getStatus() {
    return `${this.activeConnections}/${this.maxConnections} connections active`;
  }

  static canConnect() {
    return this.activeConnections < this.maxConnections;
  }

  static getHistory() {
    return this.connectionHistory;
  }

  connectionId: string;
  isActive: boolean;
  connectedAt: Date;

  constructor(connectionId: string) {
    if (
      DatabaseConnection.activeConnections >= DatabaseConnection.maxConnections
    ) {
      throw new Error("Maximum number of active connections reached.");
    }

    this.connectionId = connectionId;
    this.connectedAt = new Date();

    DatabaseConnection.activeConnections++;
    DatabaseConnection.connectionHistory.push(this.connectionId);
    this.isActive = true;
  }

  disconnect() {
    if (!this.isActive) {
      throw new Error("You can only disconnect an active connection.");
    }

    if (DatabaseConnection.activeConnections <= 0) {
      return;
    }

    DatabaseConnection.activeConnections--;
    this.isActive = false;
  }

  reconnect() {
    if (
      DatabaseConnection.activeConnections >= DatabaseConnection.maxConnections
    ) {
      throw new Error(
        "Cannot reconnect: maximum number of active connections reached.",
      );
    }

    if (!this.isActive) {
      DatabaseConnection.activeConnections++;
      this.isActive = true;
    }

    return;
  }
}

// Test initial state
console.log(DatabaseConnection.canConnect()); // true
console.log(DatabaseConnection.getStatus()); // "0/5 connections active"
console.log(DatabaseConnection.getHistory().length); // 0

// Test creating first connection
const conn1 = new DatabaseConnection("conn-1");
console.log(conn1.isActive); // true
console.log(DatabaseConnection.getStatus()); // "1/5 connections active"
console.log(DatabaseConnection.getHistory()); // ["conn-1"]

// Test creating more connections
const conn2 = new DatabaseConnection("conn-2");
const conn3 = new DatabaseConnection("conn-3");

console.log(DatabaseConnection.getStatus()); // "3/5 connections active"
console.log(DatabaseConnection.canConnect()); // true

// Test disconnect
conn1.disconnect();
console.log(conn1.isActive); // false
console.log(DatabaseConnection.getStatus()); // "2/5 connections active"

// Test reconnect
conn1.reconnect();
console.log(conn1.isActive); // true
console.log(DatabaseConnection.getStatus()); // "3/5 connections active"

// Test edge case: Create connections up to the limit
const conn4 = new DatabaseConnection("conn-4");
const conn5 = new DatabaseConnection("conn-5");

console.log(DatabaseConnection.getStatus()); // "5/5 connections active"
console.log(DatabaseConnection.canConnect()); // false

// Test edge case: Trying to create connection when at limit (should throw error)
try {
  const conn6 = new DatabaseConnection("conn-6");
} catch (error) {
  console.log("Error: Max connections reached"); // This should run
}

console.log(DatabaseConnection.getStatus()); // "5/5 connections active" (unchanged)

// Test that disconnecting allows new connection
conn2.disconnect();
console.log(DatabaseConnection.canConnect()); // true
console.log(DatabaseConnection.getStatus()); // "4/5 connections active"

const conn7 = new DatabaseConnection("conn-7");
console.log(DatabaseConnection.getStatus()); // "5/5 connections active"

// Test connection history tracks all connections created
const connectionHistory = DatabaseConnection.getHistory();
console.log(connectionHistory.length); // 6
console.log(connectionHistory); // ["conn-1", "conn-2", "conn-3", "conn-4", "conn-5", "conn-7"]
