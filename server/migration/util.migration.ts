import readline from 'node:readline/promises';
import process from 'node:process';

const RED = '\x1b[31m%s\x1b[0m';
const GREEN = '\x1b[32m%s\x1b[0m';

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
  
export const askQustion = async(question: string): Promise<string> => {
    const answer = await rl.question(`${question}?\n`);
    await moveCursor(0, -1);
    return answer;
}

export const writeMsg = (msg: string | Error, fn?: () => void) => {
    const isError = typeof msg !== 'string';
    if(isError) {
      console.error(RED, `Migration fail\n${msg}\nTRY AGAIN!!!!`);
      fn!();
    }else {
      console.log(GREEN, msg);
      process.exit(0);
    }
}