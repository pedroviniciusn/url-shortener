import type {
  JestEnvironmentConfig,
  EnvironmentContext,
} from "@jest/environment";
import { exec } from "node:child_process";
import dotenv from "dotenv";
import { TestEnvironment } from "jest-environment-node";
import { Client } from "pg";
import util from "node:util";

dotenv.config({ path: ".env.testing" });

const execSync = util.promisify(exec);

const prismaBinary = "./node_modules/.bin/prisma";

export default class PrismaTestEnvironment extends TestEnvironment {
  private schema: string;
  private connectionString: string;

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context);

    const dbUser = process.env.DATABASE_USER;
    const dbPass = process.env.DATABASE_PASS;
    const dbHost = process.env.DATABASE_HOST;
    const dbPort = process.env.DATABASE_PORT;
    const dbName = process.env.DATABASE_NAME;
    const schema = process.env.DATABASE_SCHEMA;

    this.schema = `test_${schema}`;
    this.connectionString = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=${this.schema}`;
  }

  async createConnection() {
    return new Client({
      connectionString: this.connectionString,
    });
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    await execSync(`${prismaBinary} migrate deploy`);

    return super.setup();
  }

  async teardown() {
    const client = await this.createConnection();

    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}
