const { Client } = require('pg');
require('dotenv').config();

class PGClient {
  static INSTANCE;
  #client;
  #connected;

  constructor() {
    if (PGClient.INSTANCE) {
      return PGClient.INSTANCE;
    }

    this.#client = new Client({
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    });

    this.#connected = false;
    PGClient.INSTANCE = this;
  }

  async #openConnection() {
    if (!this.#connected) {
      await this.#client.connect();
      this.#connected = true;
    }
  }

  async #endConnection() {
    if (this.#connected) {
      await this.#client.end();
      this.#connected = false;
    }
  }

  async query(queryRequest) {
    await this.#openConnection();
    const result = await this.#client.query(queryRequest);
    await this.#endConnection();
    return result;
  }

  getClient(){
    return this;
  }
}

const database = new PGClient();
module.exports = database.getClient();
