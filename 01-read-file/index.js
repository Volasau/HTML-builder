const fs = require('fs');
const text = fs.createReadStream('./01-read-file/text.txt', 'utf-8');
const { stdout } = process;

text.on('data', text => stdout.write(text))
