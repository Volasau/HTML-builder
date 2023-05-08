const fs = require('fs');
const path = require('path');

const folderStyles = path.join(__dirname, 'styles');
const bundleStyle = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(folderStyles, (err, files) => {
  if (err) {
    console.log('Упс что то пошло не так')
    throw err;
  }

  const arrStyles = [];
  let  count = 0
  files.forEach((file) => {
    if (path.extname(file) !== '.css') {
      return;
    }

    const stylesFromFile = path.join(folderStyles, file);
    fs.readFile(stylesFromFile, 'utf8', (err, styles) => {
      if (err) {
        console.log('Упс что то пошло не так')
        throw err;
      }

      arrStyles.push(styles);
    //   console.log(arrStyles)
      count++
      console.log(`${count} Добавляем стили в массив styles с папки style`);
        fs.writeFile(bundleStyle, arrStyles.join('\n'), (err) => {
          if (err) {
            console.log('Упс что то пошло не так')
            throw err;
          }
        });
    });
  });
});
