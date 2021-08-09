const express = require('express');
const app = express();
const CustomerRoutes = require('./src/routes/customer');

app.use(express.json())
app.use('/customers/api', CustomerRoutes );

app.get('/customers', (req, res, next) => {
    res.json({message: "Wellcome to MYSQL + NodeJs RestAPI tutorial"})
})

app.listen(8800, ()=> {
    console.log('App running on port http://localhost:8800');
})