// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");

const app = express();

// Parse requests of content-type - application/json
app.use(bodyParser.json());
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to add or multiplication of numbers" });
});

// Validation middleware
const validateNumbers = [
    body('a').isNumeric().withMessage('a must be a number'),
    body('b').isNumeric().withMessage('b must be a number')
];

// bulding api
app.post("/add", validateNumbers, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const number1 = parseFloat(req.body.a);
    const number2 = parseFloat(req.body.b);
    res.json({ result: `sum is ${number1 + number2}` });
});

// Business logic for multiplication
app.post("/product", validateNumbers, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const number1 = parseFloat(req.body.a);
    const number2 = parseFloat(req.body.b);
    res.json({ result: `product is ${number1 * number2}` });
});

// Set the port number for the backend
const PORT = 8080;

// Start the server
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
