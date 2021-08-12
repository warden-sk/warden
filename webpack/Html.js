/*
 * Copyright 2021 Marek Kobida
 */

const webpack = require('webpack');

class Html {
  constructor(variables) {
    this.variables = variables;
  }

  apply(compiler) {
    const { RawSource } = webpack.sources;

    compiler.hooks.emit.tap('Html', compilation => {
      const assets = compilation.getAssets();

      const css = assets
        .filter(asset => /\.css$/.test(asset.name))
        .map(asset => `<link href="${asset.name}" rel="stylesheet" />`);

      const js = assets.filter(asset => /\.js$/.test(asset.name)).map(asset => `<script src="${asset.name}"></script>`);

      const html = `<!DOCTYPE html>
<html lang="sk">
  <head>
    ${css.join('\n')}
    <meta charset="utf-8" />
    <meta content="initial-scale=1, width=device-width" name="viewport" />
    <title>${this.variables.title}</title>
  </head>
  <body>
    <div id="index"></div>
    ${js.join('\n')}
  </body>
</html>
`;

      compilation.emitAsset('neviem.html', new RawSource(html));
    });
  }
}

module.exports = Html;
