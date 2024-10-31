import readline from 'readline/promises';

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

export const RED = '\x1b[31m%s\x1b[0m';
export const GREEN = '\x1b[32m%s\x1b[0m';