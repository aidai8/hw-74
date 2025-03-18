import {promises as fs} from 'fs';
import path from "path";
import {Message} from "./types";

const messagesDir = path.join(__dirname, "messages");

const fileDb = {
    async init() {
        await fs.mkdir(messagesDir, { recursive: true });
    },
    async addNewMessage(message: Message) {
        const fileName = path.join(messagesDir, `${message.datetime.replace(/:/g, "-")}.txt`);
        await fs.writeFile(fileName, JSON.stringify(message));
    }
};

export default fileDb;