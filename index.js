import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 5000;

async function sendMessage(content, name, img) {
    try {
        await axios.post(process.env.WebhookURL, {
            content: content,
            username: name,
            avatar_url: img
        });
        console.log("Message sent!");
    } catch (error) {
        console.error("Error sending message:", error.response?.data || error.message);
    }
}

app.use(express.json());

app.post("/chat", async (req, res) => {
	const { message, name, img } = req.body;
	
	if (!message) {
		return res.status(400).json({ error: "No message provided" });
	}
	
	sendMessage(message, name, img)
	
});

app.get("/", (req, res) => {
	res.json({ message: "Discord Api" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
