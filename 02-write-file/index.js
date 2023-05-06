const fs = require('fs');
const path = require('path');
const readline = require('readline');
const newFile = path.join(__dirname, 'text.txt');
const {
    stdin: input,
    stdout: output,
} = require('process');

const rl = readline.createInterface({ input, output });

let newFileStream = fs.createWriteStream(newFile);

process.stdout.write('Для проверки этого задания введите текст:\n');

rl.on('line', (text) => {
    if (text === 'exit') {
        process.stdout.write('Всего вам хорошего и успехов в RSSchool!');
        process.exit();
    } else {
        newFileStream.write(`${text}\n`);
    }
  });
  
  rl.on('SIGINT', () => {
    process.stdout.write('Всего вам хорошего и успехов в RSSchool!');
    process.exit();
  });
