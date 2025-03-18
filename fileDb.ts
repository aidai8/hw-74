import {promises as fs} from 'fs';
import path from "path";

const messagesDir = path.join(__dirname, "messages");

const fileDb = {
    async init() {
        await fs.mkdir(messagesDir, { recursive: true });
    }
};

export default fileDb;