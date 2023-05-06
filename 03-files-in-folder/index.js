const fs = require('fs/promises');
const path = require('path');

const Folder = path.join(__dirname, 'secret-folder');


fs.readdir(Folder, { withFileTypes: true })
.then((files) => {
    files.forEach((file) => {
      if (file.isFile()) {
        fs.stat(path.join(Folder, file.name))
          .then((stats) => {
            const sizeInKb = stats.size;
            const fileName = path.basename(file.name, path.extname(file.name));
            const fileExt = path.extname(file.name).slice(1);
            console.log(`${fileName}-${fileExt}-${sizeInKb}b`);
          })
      }
    });
  })
