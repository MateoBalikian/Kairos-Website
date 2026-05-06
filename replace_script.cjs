const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      filelist = walkSync(filePath, filelist);
    }
    else {
      if (filePath.endsWith('.jsx')) {
        filelist.push(filePath);
      }
    }
  });
  return filelist;
};

const files = walkSync(path.join(__dirname, 'src'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  content = content.replace(/Limiar Anaeróbico/g, "Limiar de Lactato");
  content = content.replace(/limiar anaeróbico/g, "limiar de lactato");
  content = content.replace(/Limiar Anaerobico/g, "Limiar de Lactato");
  content = content.replace(/limiar anaerobico/g, "limiar de lactato");
  
  content = content.replace(/Metabolômica por RMN/g, "Metabolômica");
  content = content.replace(/metabolômica por RMN/g, "metabolômica");
  content = content.replace(/Metabolomica por RMN/g, "Metabolômica");
  content = content.replace(/metabolomica por RMN/g, "metabolômica");

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
