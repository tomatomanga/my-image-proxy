module.exports = async (req, res) => {
  const { file_id } = req.query;
  const botToken = "8417041767:AAGYDiMEzWjetOj_FfV5_c4x4WSxrWW2iD4"; // မင်း Bot Token

  if (!file_id) return res.status(400).send("Missing file_id");

  try {
    const fileRes = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${file_id}`);
    const fileData = await fileRes.json();

    if (!fileData.ok) return res.status(404).send("File not found on Telegram");

    const filePath = fileData.result.file_path;
    const fileUrl = `https://api.telegram.org/file/bot${botToken}/${filePath}`;

    const imageRes = await fetch(fileUrl);
    const imageBuffer = await imageRes.arrayBuffer();

    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Cache-Control", "public, max-age=31536000");
    res.send(Buffer.from(imageBuffer));
  } catch (e) {
    res.status(500).send("Error fetching image");
  }
};
