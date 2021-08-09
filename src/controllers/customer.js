const Customer = require('../models/customer');

module.exports.create = (req, res) => {

    
    if(!req.body){
        return res.status(400).json({
            message: "email and name fields are empty"
        }) 
    }
    if(!req.body.name){
        return res.status(400).json({
            message: "name field is empty"
        })
    }

    if(!req.body.email){
        return res.status(400).json({
            message: "email field is empty"
        })
    }
    //createCustomer
    const newCustomer = new Customer({
        name: req.body.name,
        email: req.body.email
    });
    
    Customer.create(newCustomer, (err, data) => {
        if(err){
            const message = err.message || "Some error occured while creating customer";
            return res.status(500).json({message});
        }else{
            return res.status(200).json({
                message: "Customer created successfully",
                customer: data
            })
        }
    })
}

module.exports.findOne = ( req, res) => {
    const id = req.params.customerId;
    Customer.findById(id, (err, data) => {
        if(err){
            if(err.kind == "not_found"){
                return res.status(404).json({
                    message: "Customer not found"
                })
            }else{
                return res.status(500).json({
                    message: "Error retriving user with id"+id,
                })
            }
        }
        return res.status(200).json({
            message: "User found",
            customer: data
        })
    })
}

module.exports.findAll = (req, res ) => {
    Customer.getAll((err, data) =>{
        if(err){
            return res.status(500).json({
                message: err.message || "Some error occurred while retrieving customers"
            })
        }
        return res.status(200).json({
            customes: data
        })
    })
}

module.exports.updateById = (req, res) => {
    if(!req.body){
        return res.status(400).json({
            message: "no fields updated were detected"
        })
    }
    const { name, email, active } = req.body;
    const { customerId } = req.params;
    const customer = {
        name: name,
        email: email,
        active: active,
        id: customerId
    }
    Customer.updateById(customer, (err, data) => {
        if(err){
            if(err.kind == "not_found"){
                return res.status(404).json({
                    message: "Customer not found"
                })
            }else{
                return res.status(500).json({
                    message: "Error updating user with id"+customerId,
                })
            }
        }
        return res.status(200).json({
            message: "Customer updated",
            customer: data
        })
    })
}

module.exports.remove = (req, res) => {
    const { customerId } = req.params;
    Customer.remove(customerId, (err, data) => {
        if(err){
            if(err.kind == "not_found"){
                return res.status(404).json({
                    message: "Customer not found"
                })
            }else{
                return res.status(500).json({
                    message: "Error removing user with id"+customerId,
                })
            }
        }
        return res.status(200).json({
            message: "Customer removed",
            customer: data
        })
    })
}

module.exports.removeAll = (req, res) => {
    const { customerId } = req.params;
    Customer.removeAll((err, data) => {
        if(err){
            return res.status(500).json({
                message: "Error removing user with id"+customerId,
            })
        }
        return res.status(200).json({
            message: "Customers removed",
            customer: data
        })
    })
}