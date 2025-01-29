import { Router, Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = Router();
router.post("/send-message", async (req: Request, res: Response): Promise<void> => {
        const {phone, message} = req.body;

        if( !phone || !message ) {
            return res.status(400).json({error: "Número e mensagem OBRIGATÓRIOS."});
        };

        try {
            const response = await axios.post(
                `${process.env.WHATSAPP_API_URL}/${process.env.PHONE_NUMBER_ID}/messages`,
                {
                    messaging_product: "whatsapp",
                    to: phone,
                    type:"text",
                    text: { body: message},
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            res.status(200).json({success: true, data: response.data});
        } catch (error) {
            res.status(500).json({error});
        }
    });

    export default router;