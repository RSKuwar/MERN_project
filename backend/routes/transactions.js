const express = require("express");
const router = express.Router();
const axios = require("axios");
const Transaction = require("../models/Transaction");

// API to initialize database
router.get("/initialize", async (req, res) => {
    try {
        const { data } = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
        await Transaction.deleteMany();

        // Convert dateOfSale to Date object before inserting
        const transformedData = data.map(item => ({
            ...item,
            dateOfSale: new Date(item.dateOfSale)
        }));

        await Transaction.insertMany(transformedData);
        res.json({ message: "Database initialized successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

// API to list transactions
router.get("/list", async (req, res) => {
    try {
        let { month, search = "", page = 1, perPage = 10 } = req.query;
        page = parseInt(page);
        perPage = parseInt(perPage);

        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(perPage) || perPage < 1) perPage = 10;

        const validMonths = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        if (!validMonths.includes(month)) {
            return res.status(400).json({ message: "Invalid month provided" });
        }

        const monthIndex = new Date(Date.parse(`${month} 1, 2022`)).getMonth() + 1;

        const query = {
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex] },
            $or: [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { price: isNaN(search) ? undefined : parseFloat(search) }
            ].filter(Boolean),
        };

        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(perPage);

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching transactions", error });
    }
});

module.exports = router;
