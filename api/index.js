module.exports = async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).send("Missing image url");

    try {
        const imageRes = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
            }
        });

        const imageBuffer = await imageRes.arrayBuffer();

        res.setHeader("Access-Control-Allow-Origin", "*"); 
        res.setHeader("Content-Type", imageRes.headers.get('content-type') || "image/jpeg");
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

        res.send(Buffer.from(imageBuffer));
    } catch (e) {
        res.status(500).send("Proxy Error");
    }
};
