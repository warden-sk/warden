/*
 * Copyright 2021 Marek Kobida
 */

const webpack = require('webpack');

class Html {
  apply(compiler) {
    const { RawSource } = webpack.sources;

    compiler.hooks.emit.tap(Html.name, compilation => {
      const assets = compilation.getAssets();

      const css = this.assetsToHTML(assets, /\.css$/, name => `<link href="${name}" rel="stylesheet" />`);

      const js = this.assetsToHTML(assets, /\.js$/, name => `<script src="${name}"></script>`);

      const html = `<!DOCTYPE html>
<html lang="sk">
  <head>
    ${css.join('\n')}
    <meta charset="utf-8" />
    <meta content="initial-scale=1, width=device-width" name="viewport" />
    <title>${compilation.name}</title>
  </head>
  <body>
    <div id="index"></div>
    ${js.join('\n')}
  </body>
</html>
`;

      compilation.emitAsset('index.html', new RawSource(html));
    });
  }

  assetsToHTML(assets, pattern, template) {
    return assets.filter(({ name }) => pattern.test(name)).map(({ name }) => template(name));
  }
}

module.exports = Html;
