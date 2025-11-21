/**
 * Exercise 5: Factory Pattern with Static Methods (Hard)
 *
 * Create a User class and UserFactory class.
 * Use static factory methods to create different types of users.
 *
 * See README.md for full requirements and example usage.
 */

class User {
  constructor(
    public id: string,
    public username: string,
    private email: string,
    public role: string,
    public createdAt: Date,
    private permissions: string[],
  ) {}

  hasPermission(permission: string) {
    return this.permissions.includes(permission);
  }

  getInfo() {
    return `User #${this.id}: ${this.username} (${this.email}) - Role: ${this.role}`;
  }
}

class UserFactory {
  static userCount: number = 0;

  static createAdmin(username: string, email: string) {
    this.userCount++;

    return new User(
      this.userCount.toString(),
      username,
      email,
      "admin",
      new Date(),
      [
        "create",
        "read",
        "update",
        "delete",
        "manage_users",
        "delete_users",
        "edit_posts",
      ],
    );
  }

  static createModerator(username: string, email: string) {
    this.userCount++;

    return new User(
      this.userCount.toString(),
      username,
      email,
      "moderator",
      new Date(),
      ["read", "update", "edit_posts", "delete_posts"],
    );
  }

  static createRegularUser(username: string, email: string) {
    this.userCount++;

    return new User(
      this.userCount.toString(),
      username,
      email,
      "user",
      new Date(),
      ["read", "create_posts", "comment"],
    );
  }

  static createCustomUser(
    username: string,
    email: string,
    role: string,
    permissions: string[],
  ) {
    this.userCount++;

    return new User(
      this.userCount.toString(),
      username,
      email,
      role,
      new Date(),
      permissions,
    );
  }

  static createFromAPIData(data: any) {
    this.userCount++;

    return new User(
      this.userCount.toString(),
      data.username,
      data.email,
      data.role,
      data.createdAt ? new Date(data.createdAt) : new Date(),
      data.permissions || [],
    );
  }

  static createBatch(count: number, role: string) {
    return Array.from({ length: count }, () => {
      const randomUsername = "user_" + Math.floor(Math.random() * 10000);
      const randomEmail = randomUsername + "@example.com";

      switch (role) {
        case "admin":
          return this.createAdmin(randomUsername, randomEmail);

        case "moderator":
          return this.createModerator(randomUsername, randomEmail);

        case "user":
          return this.createRegularUser(randomUsername, randomEmail);

        case "api":
          return this.createFromAPIData({
            username: randomUsername,
            email: randomEmail,
            role: "from_api",
            createdAt: new Date().toISOString(),
            permissions: ["read"],
          });

        default:
          throw new Error(`Unknown role type: ${role}`);
      }
    });
  }

  static getTotalUsers() {
    return this.userCount;
  }
}

// Test initial state
console.log(UserFactory.getTotalUsers()); // 0

// Test createAdmin
const admin = UserFactory.createAdmin("admin1", "admin@example.com");
console.log(admin.getInfo()); // "User #1: admin1 (admin@example.com) - Role: admin"
console.log(admin.role); // "admin"
console.log(admin.hasPermission("delete_users")); // true
console.log(admin.hasPermission("manage_users")); // true
console.log(admin.hasPermission("read")); // true
console.log(UserFactory.getTotalUsers()); // 1

// Test createModerator
const mod = UserFactory.createModerator("mod1", "mod@example.com");
console.log(mod.getInfo()); // "User #2: mod1 (mod@example.com) - Role: moderator"
console.log(mod.role); // "moderator"
console.log(mod.hasPermission("edit_posts")); // true
console.log(mod.hasPermission("delete_posts")); // true
console.log(mod.hasPermission("delete_users")); // false (not a moderator permission)
console.log(UserFactory.getTotalUsers()); // 2

// Test createRegularUser
const user = UserFactory.createRegularUser("john", "john@example.com");
console.log(user.getInfo()); // "User #3: john (john@example.com) - Role: user"
console.log(user.role); // "user"
console.log(user.hasPermission("create_posts")); // true
console.log(user.hasPermission("comment")); // true
console.log(user.hasPermission("edit_posts")); // false (not a user permission)
console.log(user.hasPermission("delete_users")); // false
console.log(UserFactory.getTotalUsers()); // 3

// Test createCustomUser
const customUser = UserFactory.createCustomUser(
  "custom1",
  "custom@example.com",
  "contributor",
  ["read", "create_posts", "edit_own_posts"],
);
console.log(customUser.role); // "contributor"
console.log(customUser.hasPermission("edit_own_posts")); // true
console.log(customUser.hasPermission("delete_users")); // false
console.log(UserFactory.getTotalUsers()); // 4

// Test createFromAPIData
const apiData = {
  username: "jane",
  email: "jane@example.com",
  role: "user",
  permissions: ["read", "comment"],
};
const apiUser = UserFactory.createFromAPIData(apiData);
console.log(apiUser.username); // "jane"
console.log(apiUser.role); // "user"
console.log(apiUser.hasPermission("read")); // true
console.log(apiUser.hasPermission("comment")); // true
console.log(UserFactory.getTotalUsers()); // 5

// Test createBatch
const moderators = UserFactory.createBatch(3, "moderator");
console.log(moderators.length); // 3
console.log(moderators[0].role); // "moderator"
console.log(moderators[1].role); // "moderator"
console.log(moderators[2].role); // "moderator"
console.log(UserFactory.getTotalUsers()); // 8 (5 + 3 moderators)

// Test that IDs are unique
console.log(admin.id); // "1"
console.log(mod.id); // "2"
console.log(user.id); // "3"
console.log(customUser.id); // "4"
console.log(apiUser.id); // "5"
console.log(moderators[0].id); // "6"
console.log(moderators[1].id); // "7"
console.log(moderators[2].id); // "8"

// Test that all users have createdAt timestamps
console.log(admin.createdAt instanceof Date); // true
console.log(mod.createdAt instanceof Date); // true
