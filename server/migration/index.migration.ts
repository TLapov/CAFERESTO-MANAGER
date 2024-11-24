import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { db, initDb } from '../src/config/db.config';
import { DB_DATABASE, NODE_ENV } from '../src/config/environment.config';
import { RowDataPacket } from 'mysql2';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Migration {
  fileExtenstion:string = NODE_ENV === 'production' ? '.js' : '.ts';
  select_file: string;
  action: 'up' | 'down';
  
  public async setupDB() {
    await initDb.execute(`CREATE DATABASE IF NOT EXISTS ${DB_DATABASE}`);
    await db.execute(`CREATE TABLE IF NOT EXISTS migration (
        id VARCHAR(40) PRIMARY KEY UNIQUE,
        description VARCHAR(100) NOT NULL,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`
    );
  }

  public async runMigration() {
    const file = await this.getMigrationFile();
    const action = await this.getAction();
    if(file && action) {
      await this.setupDB();
      const [existFile] = await db.execute<RowDataPacket[]>('SELECT * FROM migration WHERE id = ?;', [this.select_file]);
      const migration_file = await import(pathToFileURL(`${this.getFilePath(this.select_file)}${this.fileExtenstion}`).href);
      const migration_class = migration_file.default;
      if(this.action === 'up') {
        if(existFile.length) throw Error('The migration is done already!');
        await migration_class.up();
        const description = await this.askQuestion('Write some description for this migration');
        await db.execute('INSERT INTO migration (id, description) VALUES (?,?)', [this.select_file, description]);
      }else {
        if(!existFile) throw Error('The migration not exist and we cant do down migration!');
        await migration_class.down();
        await db.execute(`DELETE FROM migration WHERE id = ?`, this.select_file);
      }
      this.writeMsg('Migration done succesfully');
      process.exit(0);
    }
  }

  public async getMigrationFile() {
    const select_file = await this.askQuestion('What is your migration file');
    const file_path = this.getFilePath(select_file);
    if(!fs.existsSync(`${file_path}${this.fileExtenstion}`)) {
      const error = new Error(`File ${select_file} does not exist!`);
      this.writeMsg(error);
      return this.getMigrationFile();
    }else {
      this.select_file = select_file;
      return select_file;
    }
  }

  public async getAction() {
    const action = await this.askQuestion('What is action of migration, up or down');
    if(action !== 'up' && action !== 'down') {
      const error = new Error('Action must be up or down');
      this.writeMsg(error);
      return this.getAction();
    }else {
      this.action = action;
      return action
    }
  }
  
  async askQuestion(question: string) {
    const answer = await rl.question(`${question}?\n`);
    await this.moveCursor(0, 1);
    return answer;
  }

  writeMsg(message: string | Error) {
    const red = '\x1b[31m%s\x1b[0m';
    const green = '\x1b[32m%s\x1b[0m';
    const isError = typeof message !== 'string';
    if(isError) {
      console.error(red, `Migration fail\n${message}\nTRY AGAIN!!!!`)
    }else {
      console.log(green, message);
      process.exit(0);
    }
  }

  private moveCursor(dx: number, dy: number){
    return new Promise<void>((resolve, reject) => {
      process.stdout.moveCursor(dx, dy, () => {
          resolve();
      });
    });
  }
  
  private getFilePath(select_file: string): string {
    const file_path = path.join(__dirname, 'migration-files', select_file);
    return file_path;
  }

}

(async() => {
  const migration = new Migration();
  try {
    await migration.runMigration(); 
  } catch (error) {
      migration.writeMsg(error);
      await migration.runMigration();
  }
})();
