var inquirer = require('inquirer');
var StoreDb = require('./store-db.js');

class Bamazon {
  constructor() {
    this.db = new StoreDb("bamazon", "products", this);
  }

  promptUserForAction() {
    inquirer.prompt([
      {
        type: "input",
        name: "selectedItem",
        message: "What item would you like to buy?",
        validate: (input) => {
          if (!(this.db.getDatabaseItems().every((itemObj) => { return itemObj.product_name !== input; }))) {
            return true;
          }
          console.log("\nNo such item exists! Try again.");
          return false;
        },
      },
      {
        type: "input",
        name: "amountPurchased",
        message: "How much would you like to buy?",
        validate: (input) => { return parseInt(input) > 0; },
      }
    ]).then((res) => {
      var itemIndex = this.db.getItemIndexByName(res.selectedItem);
      var itemStockQuantity = this.db.getDatabaseItems()[itemIndex].stock_quantity;
      if (itemStockQuantity >= parseInt(res.amountPurchased)) {
        this.db.updateQuantityOfItem(res.selectedItem, res.amountPurchased, itemIndex);
      } else {
        console.log("\nOnly " + itemStockQuantity + " of item " +
                    res.selectedItem + " left! Try again.\n");
        this.db.printDatabaseItems();
        this.promptUserForAction();
      }
    });
  }
}

var bamazon = new Bamazon();
