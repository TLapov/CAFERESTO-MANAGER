import fs from 'fs/promises';
import db from '../../config/db.config';

const FILE_PATH: string = process.argv.slice(2)[0];
const MIGRATION_PATH: string = `${__dirname}/migrations-file/${FILE_PATH}`;
const LOG_PATH: string = `${__dirname}/migrations.log`;
const DESCRIPTION: string = process.argv.slice(2)[1] || '';

(async() => {
    try {
      const sql = await fs.readFile(MIGRATION_PATH, 'utf8');
      const fileLog = await fs.open(LOG_PATH, 'a');

      const [result] = await db.execute(sql);

      const date = new Date().toLocaleString();
      const content = `CREATED: ${date} FILE: ${FILE_PATH} DESCRIPTION: ${DESCRIPTION}\n`

      fileLog.write(content);

      console.log("Success: migration done!");

    }catch (error) {
      console.error('Error running migrations:', error);
  }
  
  db.end();
  process.exit(1);

})();
