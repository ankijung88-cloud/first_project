import express from "express";
import path from "path";

const app = express();
const PORT = 5173;

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Node.js 서버 실행 중: http://localhost:${PORT}`);
});
