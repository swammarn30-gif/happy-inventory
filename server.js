const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');

const app = express();
const PORT = 3000;

// MongoDB Cloud Connection URL
const url = 'mongodb+srv://swammarn30_db_user:VforZEbVIjUHsjrm@cluster0.yjlaanh.mongodb.net/?appName=Cluster0';
const client = new MongoClient(url);
const dbName = 'happy_inventory';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let db, itemsCollection;

// Connect to Cloud Database
async function connectDB() {
    try {
        await client.connect();
        console.log('📦 Connected successfully to MongoDB Cloud!');
        db = client.db(dbName);
        itemsCollection = db.collection('items');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
    }
}
connectDB();

// Get all items (Supports both paths for safety)
const getItemsHandler = async (req, res) => {
    try {
        const items = await itemsCollection.find({}).toArray();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
app.get('/items', getItemsHandler);
app.get('/api/items', getItemsHandler);

// Add new item
const addItemHandler = async (req, res) => {
    try {
        const newItem = req.body;
        const result = await itemsCollection.insertOne(newItem);
        res.json({ ...newItem, _id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
app.post('/items', addItemHandler);
app.post('/api/items', addItemHandler);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
