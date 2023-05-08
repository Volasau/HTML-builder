const fs = require('fs');
const path = require('path');
const promis = fs.promises;
const copyFile = promis.copyFile;
const mainFolder = path.join(__dirname, 'files');
const newFolder = path.join(__dirname, 'files-copy');

(function copyDir(){
    promis.access(newFolder)
    .then(() => {
        return promis.rm(newFolder, { recursive: true });
    })
    .catch(() => {
        console.log('Создаем папку file-copy с файлами:')
    })
    .then(() => {
        return promis.mkdir(newFolder, { recursive: true });
    })
    .then(() => {
        return promis.readdir(mainFolder);
    })
    .then((files) => {
        files.forEach(file => { 
            const sourceMainFile = path.join(mainFolder, file);
            copyFile(sourceMainFile, path.join(newFolder, file))
            console.log(file)
        });
    })
    .catch((error) => {
        console.error(error);
    });
})();
