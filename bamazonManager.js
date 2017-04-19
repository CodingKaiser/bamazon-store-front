var inquirer = require('inquirer');
var StoreDbManager = require('./store-db-manager.js');

class BamazonManager {
  constructor() {
    this.db = new StoreDbManager("bamazon", "products", this);
  }

  promptManagerForAction() {
    inquirer.prompt([
      {
        type: "list",
        name: "selectedItem",
        message: "What would you like to do?",
        choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product"],
      },
    ]).then((res) => {
      if (res.selectedItem === "View Products For Sale") {
        this.viewProductsForSale();
      } else if (res.selectedItem === "View Low Inventory") {
        this.viewLowInventory();
      } else if (res.selectedItem === "Add To Inventory") {
        this.addToInventory();
      } else {
        this.addNewProduct();
      }
    });
  }

  viewProductsForSale() {
    this.db.printDatabaseItems();
  }

  viewLowInventory() {
    this.db.printDatabaseItems(true);
  }

  addToInventory() {
    inquirer.prompt([
      {
        type: "input",
        message: "Please type in the name of the item you would like to restock",
        name: "itemName",
      },
      {
        type: "input",
        message: "How much would you like to add?",
        name: "itemAmountAdded",
        validate: (input) => {
          return parseInt(input) > 0;
        },
      }
    ]).then((res) => {
      this.db.updateQuantityOfItem(res.itemName, parseInt(res.itemAmountAdded));
    });
  }

  addNewProduct() {

  }
}

var bamazonManager = new BamazonManager();
bamazonManager.promptManagerForAction();
