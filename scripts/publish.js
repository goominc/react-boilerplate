const fs = require('fs');
const path = require('path');

['desktop', 'mobile'].forEach((device) => {
  let html = fs.readFileSync(path.join(__dirname, `../${device}/index.html`)).toString();
  html = html.replace('</head>', `  <link rel="stylesheet" type="text/css" href="/dist/${device}.css">\n  </head>`);
  fs.writeFileSync(path.join(__dirname, `../dist/${device}.html`), html);
});
