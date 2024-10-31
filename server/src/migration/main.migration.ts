import process from 'node:process';
import fs from 'node:fs';
import path from 'node:path';
import { db } from "../config/db.config";
import { askQustion, GREEN, RED } from '../utils/cli.util';
import { RowDataPacket } from 'mysql2';

const writeMsg = (msg: string | Error) => {
  const isError = typeof msg !== 'string';
  if(isError) {
    console.error(RED, `Migration fail\n${msg}\nTRY AGAIN!!!!`);
    main();
  }else {
    console.log(GREEN, msg);
    process.exit(0);
  }
}

const main = async() => {
  const select_file = await askQustion('What is your migration file');
  try {
    const PATH:string = path.join(__dirname, 'migration-files', select_file);
    if(!fs.existsSync(`${PATH}.ts`)) {
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
  }catch (error: unknown | Error){ writeMsg(error as Error) }
}

main();
