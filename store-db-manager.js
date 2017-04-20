var mysql = require('mysql');
require('console.table');

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
        console.log("");
        console.table(data);
        console.log("");
        this.parent.promptManagerForAction();
      });
    } else {
      this.connection.query("select * from " + this.table, (err, data) => {
        console.log("\nItems in the store: ");
        console.log("");
        console.table(data);
        console.log("");
        this.parent.promptManagerForAction();
      });
    }
  }

  updateQuantityOfItem(itemToUpdate, amountDifferential) {
    this.connection.query("select stock_quantity from " + this.table + " where ?;", [{product_name: itemToUpdate}], (err, stockData) => {
      if (stockData[0]) {
        var updatedQuantity = parseInt(stockData[0].stock_quantity) + amountDifferential;
        this.connection.query("update " + this.table + " set ? where ?", [
          {
            stock_quantity: updatedQuantity,
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
          this.parent.promptManagerForAction();
        });
      } else {
        console.log("");
        console.log("Sorry, the item " + itemToUpdate + " does not exist");
        console.log("");
        this.parent.promptManagerForAction();
      }
    })
  }

  addNewItem(name, department, stock, price) {
    this.connection.query("insert into " + this.table + " set ?", {product_name: name, department_name: department, price: price, stock_quantity: stock}, (err, results, fields) => {
      if (!err) {
        console.log("New item successfully added.");
      } else {
        console.log("There was an error adding item: " + name);
      }
      this.parent.promptManagerForAction();
    })
  }
}

module.exports = StoreDbManager;
