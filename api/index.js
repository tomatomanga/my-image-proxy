export default async function handler(req, res) {
    const { file_id } = req.query;
    const BOT_TOKEN = "8417041767:AAGYDiMEzWjet0j_FfV5_c4x4WSxrWW2iD4"; 

    if (!file_id) return res.status(400).send("Missing file_id");

    try {
        const getFile = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${file_id}`);
        const fileData = await getFile.json();
        
        if (!fileData.ok) return res.status(404).send("File not found");

        const imageUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${fileData.result.file_path}`;
        const response = await fetch(imageUrl);
        const buffer = await response.arrayBuffer();

        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        res.send(Buffer.from(buffer));
    } catch (e) {
        res.status(500).send("Error fetching image");
    }
}
