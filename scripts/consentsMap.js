const path = require('path')
const fs = require('fs');

try {
  const BASE_PATH = path.join(__dirname, '..', 'public', 'static', 'consent');
  const TARGET_PATH = path.join(__dirname, '..', 'src', 'utils', 'mapOfConsentFiles.ts');

  const folders = fs.readdirSync(BASE_PATH, 'utf-8').filter(f => f !== '.DS_Store');

  if (folders && folders.length > 0) {
    fs.writeFileSync(TARGET_PATH, `export const mapOfConsentFiles = {\n`);
  
    folders.forEach(folder => {
    fs.appendFileSync(TARGET_PATH, `  ${folder}: {\n    consentLang: [`);
      const files = fs.readdirSync(`${BASE_PATH}/${folder}`, 'utf-8').filter(f => f !== '.DS_Store');
      files.forEach(file => {
        fs.appendFileSync(
          TARGET_PATH,
          `\n      '${file}',`
        );
      });
  
      fs.appendFileSync(
        TARGET_PATH,
        `\n    ],\n  },\n`
      );
    });

    fs.appendFileSync(TARGET_PATH, '};\n');
  }

  console.log(`SUCCESS: Consent file map generated`)
} catch(e) {
  console.error(`ERROR:\n${e.message}`)
}

