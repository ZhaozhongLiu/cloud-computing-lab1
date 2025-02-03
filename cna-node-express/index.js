//Creates an Express application server that listens on port 8080.
const express = require('express')
const port = process.env.PORT || 9090
const app = express()
app.use(express.json());
app.listen(port, () => console.log(`Sample app is listening on port ${port}!`))

//Establish connections btw this back-end program and database
const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://MaxLiu:Lzz0903066%23@maxliu-psql-azuredb.postgres.database.azure.com:5432/cnainventory');
sequelize
.authenticate()
.then(() => {
console.log('Connection has been established successfully.');
})
.catch(err => {
console.error('Unable to connect to the database:', err);
});

//mapping between data objects in the Express.js code to data records in the database table
const Inventory = sequelize.define('inventory', {
id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
name: { type: Sequelize.STRING, allowNull: false },
quantity: { type: Sequelize.INTEGER },
date: { type: Sequelize.DATEONLY, defaultValue: Sequelize.NOW }
}, {
freezeTableName: true,
timestamps: false
});

//Create the Express.js REST API Endpoints
//First Route for HTTP GET request
app.get('/inventory/:id', async (req, res) => {
const id = req.params.id
try {
const inventory = await Inventory.findAll({
attributes: ['id', 'name', 'quantity', 'date'],
where: {
id: id
}})
res.json({ inventory })
} catch(error) {
console.error(error)
}})

//Second Route for HTTP POST request
app.post('/inventory', async (req, res) => {
try {
const newItem = new Inventory(req.body)
await newItem.save()
res.json({ inventory: newItem })
} catch(error) {
console.error(error)
}})