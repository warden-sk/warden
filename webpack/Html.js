/*
 * Copyright 2021 Marek Kobida
 */

const webpack = require('webpack');

class Html {
  apply(compiler) {
    const { RawSource } = webpack.sources;

    compiler.hooks.emit.tap(Html.name, compilation => {
      const assets = compilation.getAssets();

      const css = this.test(assets, /\.css$/, '<link href="$" rel="stylesheet" />');

      const js = this.test(assets, /\.js$/, '<script src="$"></script>');

      let html = `<!DOCTYPE html>
<html lang="sk">
  <head>
    ${css.join('\n')}
    <meta charset="utf-8" />
    <meta content="initial-scale=1, width=device-width" name="viewport" />
    <title>${compilation.name}</title>
  </head>
  <body>
    <div id="${compilation.hash}"></div>
    ${js.join('\n')}
  </body>
</html>
`;

      html = html.replace(/^\s+/gm, '').replace(/\s+$/gm, '').replace(/\n/gm, '');

      html = `<!-- Copyright 2021 Marek Kobida -->\n${html}\n`;

      compilation.emitAsset('index.html', new RawSource(html));
    });
  }

  // ?
  test(assets, _1, _2) {
    return assets.filter(({ name }) => _1.test(name)).map(({ name }) => _2.replace(/\$/, name));
  }
}

module.exports = Html;
