var mysql = require('mysql');

class StoreDb {
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
    this.items = [];
    this._getItems();
  }

  _getItems() {
    this.connection.query("select * from " + this.table, (err, data) => {
      if (data.length) {
        this.items = data;
        this.printDatabaseItems();
        this.parent.promptUserForAction();
      } else {
        throw new Error(err);
      }
    });
  }

  getDatabaseItems() {
    return this.items;
  }

  getItemIndexByName(itemName) {
    return this.items.findIndex((item) => item.product_name === itemName);
  }

  printDatabaseItems() {
    console.log("\nItems in the store: ");
    for (var item of this.items) {
      console.log("");
      console.log("ID: " + item.item_id +
                  ", " + item.product_name +
                  ", Price: " + item.price + ", Quantity: " + item.stock_quantity);
    }
    console.log("");
  }

  updateQuantityOfItem(itemToUpdate, amountPurchased, itemIndex) {
    var updatedQuantity  = this.items[itemIndex].stock_quantity - amountPurchased;
    this.connection.query("update " + this.table + " set ? where ?", [
      {
        stock_quantity: updatedQuantity,
      },
      {
        product_name: itemToUpdate,
      }
    ], (err, data) => {
      if (err) console.log(err);
      this.items[itemIndex].stock_quantity = updatedQuantity;
      console.log("There are now only " + updatedQuantity +
                  " of " + itemToUpdate + " left.");
      console.log("This order cost you: " + (amountPurchased * this.items[itemIndex].price));
      this.printDatabaseItems();
      this.parent.promptUserForAction();
    });
  }
}

module.exports = StoreDb;
