const sql = require('../models/db');

const Customer = function(customer){
    this.email = customer.email;
    this.name = customer.name;
    this.active = false;
}
Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
        if(err){
            console.log("Error: ",err)
            result(err, null)
            return;
        }

        console.log("Created customer:", { id: res.insertId, ...newCustomer});
        result(null, { id: res.insertId, ...newCustomer } );
    });
}

Customer.findById = (customerId, result) => {
    sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
        if(err){
            return result(err, null);
        }else if(res.length){
            return result(null, res[0]);
        }else{
            return result({kind: "not_found"}, null)
        }

    })
}

Customer.getAll = result => {
    sql.query('SELECT * FROM customers', (err, res) => {
        if(err) return result(err, null);
        return result(null, res);
    })
}

Customer.updateById = (customer, result) => {
    sql.query("UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
    [customer.email, customer.name, customer.active, customer.id], (err, res) => {
        if(err) return result(err, null);
        if(res.affectedRows == 0) {
            return result({kind: "not_found"}, null);
        }

        return result(null, customer);
    });
}

Customer.remove = (id, result) => {
    sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
        if(err) return result(err, null);

        if(res.affectedRows == 0) {
            return result({kind: "not_found"}, null);
        }

        console.log("deleted customer with id:",id);
        result(null, id);
    })
}

Customer.removeAll = result => {
    sql.query("DELETE FROM customers", (err, res) => {
        if(err) return result(err, null);
        console.log("deleted ",res.affectedRows," customers");
        return result(null, "deleted ",res.affectedRows," customers")
    })
}

module.exports = Customer;