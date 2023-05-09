const fs = require('fs');
const path = require('path');
const promis = fs.promises;
const projectFolder = path.join(__dirname, 'project-dist');
const folderStyles = path.join(__dirname, 'styles');
const bundleStyle = path.join(__dirname, 'project-dist', 'style.css');
const mainFolder = path.join(__dirname, 'assets');
const newFolder = path.join(__dirname, 'project-dist', 'assets')
const indexHTMLPath = path.join(__dirname, 'project-dist', "index.html");
const exemply = path.join(__dirname, 'template.html')
const components = path.join(__dirname, 'components');

fs.mkdir(projectFolder, (err) => {
  if (err) {
    console.error(`Упс`);
    return;
  }
  console.log('Создали папку');
});

fs.readdir(folderStyles, (err, files) => {
    if (err) {
      console.log('Упс что то пошло не так')
      throw err;
    }

    const arrStyles = [];
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
          fs.writeFile(bundleStyle, arrStyles.join('\n'), (err) => {
            if (err) {
              console.log('Упс что то пошло не так')
              throw err;
            }
          });
      });
    });
    console.log('Создали css')
  });

  copyDir(mainFolder, newFolder);

  function copyDir(main, copy) {
    promis.readdir(main, { withFileTypes: true }).then(folder => {
      promis.mkdir(copy, { recursive: true }).then(() => {
        folder.forEach(element => {
          const mainPath = path.join(main, element.name);
          const copyPath = path.join(copy, element.name);
          element.isDirectory() ?
            copyDir(mainPath, copyPath) :
            promis.copyFile(mainPath, copyPath);
        });
      });
    });
  }

const arrComponents = ['about', 'header', 'articles', 'footer'];

async function addComponentsInIndex() {
    try {
    const files =  await Promise.all(arrComponents.map(component => {
    const componentPath = path.join(components, `${component}.html`);
    return fs.promises.readFile(componentPath, 'utf8').catch(() => '');
    }));

    const template =  await fs.promises.readFile(exemply, 'utf8');

    const replacedTemplate = template
    .replace(/{{about}}/g, files[0])
    .replace(/{{header}}/g, files[1])
    .replace(/{{articles}}/g, files[2])
    .replace(/{{footer}}/g, files[3]);
  
    await fs.promises.writeFile(indexHTMLPath, replacedTemplate);
  
    console.log('Готово! Ураа:)');
    } catch (error) {
    console.error(error);
    }
  }

  addComponentsInIndex();
