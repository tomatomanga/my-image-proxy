module.exports = async (req, res) => {
    // query ကနေ 'url' ကို ယူမယ်
    const { url } = req.query;

    if (!url) {
        return res.status(400).send("Missing image URL");
    }

    try {
        // Discord ဒါမှမဟုတ် တခြား URL ကို လှမ်းယူမယ်
        const imageRes = await fetch(decodeURIComponent(url));
        
        if (!imageRes.ok) {
            return res.status(imageRes.status).send("Failed to fetch image from source");
        }

        const imageBuffer = await imageRes.arrayBuffer();

        // Header တွေကို သတ်မှတ်မယ် (CORS အရေးကြီးပါတယ်!)
        res.setHeader("Content-Type", imageRes.headers.get("content-type") || "image/jpeg");
        res.setHeader("Access-Control-Allow-Origin", "*"); // ဒါမှ Website ကနေ ခေါ်သုံးလို့ရမှာ
        res.setHeader("Cache-Control", "public, max-age=31536000");

        res.send(Buffer.from(imageBuffer));
    } catch (e) {
        res.status(500).send("Error fetching image: " + e.message);
    }
};
