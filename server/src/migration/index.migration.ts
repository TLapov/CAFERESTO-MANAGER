import fs from 'node:fs';
import path from 'node:path';
import { db, initDb } from "../config/db.config";
import { RowDataPacket } from 'mysql2';
import { DB_DATABASE, NODE_ENV } from '../config/environment.config';
import { askQustion, writeMsg } from './util.migration';

const main = async(): Promise<void> => {
  const fileExtenstion:string = NODE_ENV === 'production' ? '.js' : '.ts';
  const select_file = await askQustion('What is your migration file');
  const PATH:string = path.join(__dirname, 'migration-files', select_file);
  try {
    await initDb.execute(`CREATE DATABASE IF NOT EXISTS ${DB_DATABASE}`);
    await db.execute(`CREATE TABLE IF NOT EXISTS migration (
        id VARCHAR(40) PRIMARY KEY UNIQUE,
        description VARCHAR(100) NOT NULL,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`
    );
    if(!fs.existsSync(`${PATH}${fileExtenstion}`)) {
      throw Error('The file doesn`t exist try again');
    }
    const migration_file = await import(PATH);
    const MigrationClass = migration_file.default;
    const [existFile] = await db.execute<RowDataPacket[]>('SELECT * FROM migration WHERE id = ?;', [select_file]);
    const action = await askQustion('What is action of migration, up or down');
    if(action === 'up') {
      if(!existFile.length) {
        await MigrationClass.up();
        const description = await askQustion('Write some description for this migration');
        await db.execute('INSERT INTO migration (id, description) VALUES (?,?)', [select_file, description]);
      }else {
        throw Error('The migration file already exist');
      }
    }else if(action === 'down') {
      if(existFile.length) {
        await MigrationClass.down();
        await db.execute(`DELETE FROM migration WHERE id = ?`, select_file);
      }else {
        throw Error('The migration file does not exist');
      }
    }else {
      throw Error('Action must be up or down');
    }
    writeMsg('Migration is done succesfully');
  }catch (error: unknown | Error){
    error instanceof Error && writeMsg(error); 
  }finally {
    await initDb.end();
    await db.end();
  }
}

main();