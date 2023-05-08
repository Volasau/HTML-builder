const fs = require('fs');
const path = require('path');
const promis = fs.promises;
const projectFolder = path.join(__dirname, 'project-dist');
const folderStyles = path.join(__dirname, 'styles');
const bundleStyle = path.join(__dirname, 'project-dist', 'style.css');
const mainFolder = path.join(__dirname, 'assets');
const newFolder = path.join(__dirname, 'project-dist', 'assets')
const indexHTMLPath = path.join(__dirname, 'project-dist', "index.html");
const articles = path.join(__dirname, 'components/articles.html');
const footer = path.join(__dirname, 'components/footer.html');
const header = path.join(__dirname, 'components/header.html');
const exemply = path.join(__dirname, 'template.html')

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

  function addComponentsInIndex() {
    try {
      fs.readFile(articles, 'utf8', (err, articlesContent) => {
        if (err) throw err;
        fs.readFile(footer, 'utf8', (err, footerContent) => {
          if (err) throw err;
          fs.readFile(header, 'utf8', (err, headerContent) => {
            if (err) throw err;
            // console.log(articlesContent, footerContent, headerContent);
            const template = fs.readFile(exemply, 'utf8', (err, templateContent) => {
              if (err) throw err;
            //   console.log(templateContent);
              const replacedTemplate = templateContent
                .replace(/{{header}}/g, headerContent)
                .replace(/{{articles}}/g, articlesContent)
                .replace(/{{footer}}/g, footerContent);
              fs.writeFile(indexHTMLPath, replacedTemplate, (err) => {
                if (err) throw err;
                console.log('Готово НО НЕ ПОЛНОСТЬЮ  ох и намучился же я');
              });
            });
          });
        });
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  addComponentsInIndex();


