var mysql = require('mysql');

class StoreDbManager {
  constructor(dbName, table, parent) {
    this.connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "password",
      database: dbName
    });
    this.connection.connect((err) => {
      if (err) {
        console.log(err);
        throw new Error(err);
      }
    });
    this.parent = parent;
    this.table = table;
  }

  getItemIndexByName(itemName) {

  }

  printDatabaseItems(displayOnlyLowStockItems=false) {
    if (displayOnlyLowStockItems) {
      this.connection.query("select * from " + this.table + " where stock_quantity < 5", (err, data) => {
        if (err) console.log(err);
        console.log("\nItems in the store: ");
        for (var item of data) {
          if (item.stock_quantity < 5) {
            console.log("");
            console.log("ID: " + item.item_id +
                        ", " + item.product_name +
                        ", Price: " + item.price + ", Quantity: " + item.stock_quantity);
          }
        }
        console.log("");
        this.parent.promptManagerForAction();
      });
    } else {
      this.connection.query("select * from " + this.table, (err, data) => {
        console.log("\nItems in the store: ");
        for (var item of data) {
          console.log("");
          console.log("ID: " + item.item_id +
                      ", " + item.product_name +
                      ", Price: " + item.price + ", Quantity: " + item.stock_quantity);
        }
        console.log("");
        this.parent.promptManagerForAction();
      });
    }
  }

  updateQuantityOfItem(itemToUpdate, amountDifferential) {
    this.connection.query("update " + this.table + " set ? where ?", [
      {
        stock_quantity: stock_quantity + updatedQuantity,
      },
      {
        product_name: itemToUpdate,
      }
    ], (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log("There are now " + updatedQuantity +
                  " of " + itemToUpdate + " in stock.");
      console.log(data);
      this.parent.promptUserForAction();
    });
  }
}

module.exports = StoreDbManager;
