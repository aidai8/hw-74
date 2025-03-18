import {promises as fs} from 'fs';
import path from "path";
import {Message} from "./types";

const messagesDir = path.join(__dirname, "messages");

const fileDb = {
    async init() {
        try {
            await fs.mkdir(messagesDir, {recursive: true});
        } catch (e) {
            console.error(e);
        }
    },

    async addNewMessage(message: Message) {
        const fileName = path.join(messagesDir, `${message.datetime.replace(/:/g, "-")}.txt`);
        await fs.writeFile(fileName, JSON.stringify(message));
    },

    async getLastMessages() {
        try {
            const files = await fs.readdir(messagesDir);
            return Promise.all(
                files.sort().slice(-5).map(async (file) => {
                    const content = await fs.readFile(path.join(messagesDir, file), 'utf-8');
                    return JSON.parse(content);
                })
            );
        } catch (e) {
            console.error(e);
            return [];
        }
    }
};

export default fileDb;