import {Client} from 'pg';
import dotenv from 'dotenv';
dotenv.config();

class PGClient {
    static INSTANCE;

    constructor(){
        if (PGClient.INSTANCE){
            return PGClient.INSTANCE;
        }

        PGClient.INSTANCE = this;

        this.client = new Client({
            host: process.env.POSTGRES_HOST,
            port: process.env.POSTGRES_PORT,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB
        });

        this.connected = false;

    }
    
    static getClient(){
        if (!PGClient.INSTANCE){
            PGClient.INSTANCE = new Client();
        } 

        return PGClient.INSTANCE;
    }

    static async #openConnection(){
        if(!this.connected){
            await this.client.connect();
            this.connected = true;
        }
    }

    static async #endConnection(){
        if(this.connected){
            await this.client.end();
            this.connected = false;
        }
    }

    static async query(queryRequest){
        await this.#openConnection();
        const result = await this.client.query(queryRequest);
        await this.#endConnection();
        return result;
    }
}

const database = new PGClient();
export default database;