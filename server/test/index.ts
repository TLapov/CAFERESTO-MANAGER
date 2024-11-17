import fs from 'node:fs/promises';
import path from 'node:path';

(async () => {
    const folder = __dirname;
    const files = await fs.readdir(folder);
  
    for (const file of files) {
      if (file.endsWith('.test.ts')) {
        await import(path.resolve(folder, file));
      }
    }
})();