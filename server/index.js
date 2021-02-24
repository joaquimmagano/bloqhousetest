const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 6500

// Handle CORS
app.use((req, res, next) => {
    console.log( server.address().address );
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', `*`);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

app.use(express.json());

// Bodyparser for forms (req.body)
// app.use(express.urlencoded({ extended: false }))

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

let propertiesData = require('./db/dbA.json');
let projectsData = require('./db/dbB.json');

// Routes
app.get('/api/properties', (req, res) => {
    res.json(propertiesData)
})

app.post('/api/properties/invest/:id', (req, res) => {
    const propertyId = req.params.id;
    const data = req.body;
    if(data && data.purchaseAmount){
        const purchase_amount = data.purchaseAmount;
        let property = propertiesData.properties.find(p => p.id == propertyId)

        if(property.availableShares >= purchase_amount){
            property.availableShares = property.availableShares - purchase_amount;
            res.status(200).send(property)
        } else {
            res.status(404).send({success: false, error: {message: 'The purchase amount exceeds the available shares.'}})
        }
    } else {
        res.status(404).send({success: false, error: {message: 'The purchase amount was not received.'}})
    }
})

app.get('/api/projects', (req, res) => {
    res.json(projectsData)
})

app.post('/api/checkout/project/:id', (req, res) => {
    const projectId = req.params.id;
    const data = req.body;

    if(data && data.purchase_amount){
        const purchase_amount = data.purchase_amount;
        let project = projectsData.projects.find(p => p.id == projectId)

        if(project.availableSlots >= purchase_amount){
            project.availableSlots = project.availableSlots - purchase_amount;
            res.status(200).send({success: true})
        } else {
            res.status(404).send({success: false, error: {message: 'The purchase amount exceeds the available slots.'}})
        }
    } else {
        res.status(404).send({success: false, error: {message: 'The purchase amount was not received.'}})
    }
})