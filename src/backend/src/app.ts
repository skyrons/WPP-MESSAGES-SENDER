import express from "express";
import cors from "cors";
import whatsappRoutes from "./routes/whatsapp";


const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/whatsapp", whatsappRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
