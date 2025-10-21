// --- Factory Method Pattern ---

class User {
  constructor(username) {
    this.username = username;
  }

  getDetails() {
    return `${this.username}`;
  }
}

class Customer extends User {
  getDetails() {
    return `Welcome Customer ${this.username}! You can browse and order food. 🍔`;
  }
}

class DeliveryPartner extends User {
  getDetails() {
    return `Welcome Delivery Partner ${this.username}! Ready for your next delivery? 🚴‍♂️`;
  }
}

class Restaurant extends User {
  getDetails() {
    return `Welcome Restaurant ${this.username}! Manage your orders here. 🍽️`;
  }
}

// Factory to create user objects dynamically
class UserFactory {
  static createUser(type, username) {
    switch (type) {
      case "Customer":
        return new Customer(username);
      case "DeliveryPartner":
        return new DeliveryPartner(username);
      case "Restaurant":
        return new Restaurant(username);
      default:
        throw new Error("Invalid user type");
    }
  }
}

// --- Singleton Pattern ---
class LoginManager {
  constructor() {
    if (LoginManager.instance) {
      return LoginManager.instance;
    }
    this.currentUser = null;
    LoginManager.instance = this;
  }

  login(username, userType) {
    this.currentUser = UserFactory.createUser(userType, username);
    return this.currentUser.getDetails();
  }
}

// --- Event Handling ---
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const userType = document.getElementById("userType").value;

  if (!username || !userType) {
    alert("Please enter all details!");
    return;
  }

  const loginManager = new LoginManager(); // Singleton instance
  const message = loginManager.login(username, userType);

  document.getElementById("output").textContent = message;
});
