
export default function handler(req, res) {
  if (req.method === 'POST') {
    // ဒီမှာ Database logic ထည့်ပါ
    res.status(200).json({ message: "Login successful!" });
  } else {
    // GET request ပို့ရင်လည်း အဆင်ပြေအောင်
    res.status(200).json({ message: "This is the API endpoint" });
  }
}
