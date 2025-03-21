import express from 'express';
import {Message} from "../types";
import fileDb from "../fileDb";

const messageRouter = express.Router();

messageRouter.get('/', async (_, res ) => {
    const messages = await fileDb.getLastMessages();
    res.send(messages);
});

messageRouter.post('/', async (req, res) => {
    const newMessage: Message = {
        text: req.body.message,
        datetime: new Date().toISOString()
    };

    await fileDb.addNewMessage(newMessage);
    res.send(newMessage);
});

export default messageRouter;