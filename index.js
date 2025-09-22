import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

async function sendMessage(content, name, img) {
    try {
        const Message = {
            content: "**Output Log**",
            username: name || "Bot",
            avatar_url: img || undefined,
            embeds: [{
                title: "**                         INFORMATION**",
                description: content,
                color: 0x18100,
                footer: { text: name },
                timestamp: new Date().toISOString(),
            }]
        };
        fetch(process.env.WebhookURL, 
			{method: "POST",
			headers: {"Content-Type": "application/json"}, 
			body: JSON.stringify(Message)
		});
        console.log("Message sent!");
        return true;
    } catch (error) {
        console.error("Error sending message:", error.response?.data || error.message);
        return false;
    }
}

app.use(express.json());

app.post("/send", async (req, res) => {
    const { message, name, img } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: "No message provided" });
    }
    
    const success = await sendMessage(message, name, img);
    
    if (success) {
        res.json({ status: "ok", sent: true });
    } else {
        res.status(500).json({ error: "Failed to send message" });
    }
});

app.get("/", (req, res) => {
    res.json({ message: "Discord API is running" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
