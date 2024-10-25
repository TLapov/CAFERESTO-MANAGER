import process from 'node:process';
import readline from 'node:readline/promises';
import fs from 'node:fs/promises';
import db from "../config/db.config";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const moveCursor = (dx: number, dy: number) => {
  return new Promise<void>((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

const writeMsg = (msg: string | Error) => {
  const RED = '\x1b[31m%s\x1b[0m';
  const GREEN = '\x1b[32m%s\x1b[0m';
  const isError = typeof msg !== 'string';
  isError ? console.error(RED, `Migration fail\n${msg}\nTRY AGAIN!!!!`) : console.log(GREEN, msg);
  process.exit(isError ? 1 : 0);
}

(async() => {
  try {
    const MIGRATE_PATH = `${__dirname}/migration-files/`;
    const migrationFile = await rl.question('What is migration file?\n');
    await moveCursor(0, -1);
    const fileHandle = await fs.open(`${MIGRATE_PATH}/${migrationFile}.sql`, 'r');
    const readStream = fileHandle.createReadStream();

    readStream.on('data', async (data) => {
      try {
        await db.execute(data.toString());
        const fileLog = await fs.open(`${__dirname}/migration.log`, 'a');
        const description = await rl.question('What is description for this migration\n');
        const content = `CREATED: ${new Date().toLocaleString()} FILE: ${migrationFile}.sql DESCRIPTION: ${description};\n`;
        await moveCursor(0, -1);
        fileLog.write(content);
        fileHandle.close();
        fileLog.close();
        writeMsg('Migration is done succesfully');
      } catch (error: unknown) {
        fileHandle.close();
        writeMsg(error instanceof Error ? error : new Error('Unexpected error'));
      }
    });

  }catch(error: unknown) {
    writeMsg(error instanceof Error ? error : new Error('Unexpected error'));
  }

})();
