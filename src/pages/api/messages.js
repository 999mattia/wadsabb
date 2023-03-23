import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handle(req, res) {
    if (req.method === "GET") {
        const messages = await prisma.message.findMany()
        res.status(200).json(messages)
    } else if (req.method === "POST") {
        let message = req.body;

        const savedMessage = await prisma.message.create({
            data: message,
        });

        res.status(201).json(savedMessage);
    } else {
        return res.status(403).json({ message: "This action is not allowed" });
    }
}






