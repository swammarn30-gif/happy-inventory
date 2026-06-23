const { MongoClient } = require('mongodb');

module.exports = async (req, res) => {
    // POST request ဆိုမှ အလုပ်လုပ်မယ်
    if (req.method === 'POST') {
        const { username, password } = req.body;
        
        try {
            const client = await MongoClient.connect(process.env.MONGODB_URI);
            const db = client.db('happy_inventory');
            const user = await db.collection('users').findOne({ username, password });
            
            if (user) {
                res.status(200).json({ success: true, message: "Login successful!" });
            } else {
                res.status(401).json({ success: false, message: "Invalid credentials" });
            }
            await client.close();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    } else {
        // GET request ပို့လာရင် Error မတက်အောင် ဒါလေးပြထားပေးမယ်
        res.status(200).json({ message: "Please use POST to login" });
    }
};
