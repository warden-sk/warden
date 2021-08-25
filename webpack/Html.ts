/*
 * Copyright 2021 Marek Kobida
 */

import webpack from 'webpack';

interface Asset {
  name: string;
}

interface AssetHTMLTemplate {
  (asset: Asset): string;
}

class Html {
  assets: Asset[];

  constructor(assets: string[] = []) {
    // from ['a'] to { name: 'a' }
    this.assets = assets.map(name => ({ name }));
  }

  apply(compiler: webpack.Compiler) {
    const { RawSource } = webpack.sources;

    compiler.hooks.emit.tap(Html.name, compilation => {
      const assets = this.assets.concat(compilation.getAssets());

      const css = this.assetsToHTML(assets, /\.css$/, ({ name }) => `<link href="${name}" rel="stylesheet" />`);
      const js = this.assetsToHTML(assets, /\.js$/, ({ name }) => `<script src="${name}"></script>`);

      const html = `<!DOCTYPE html>
<html lang="sk">
  <head>
    ${css.join('\n    ')}
    <meta charset="utf-8" />
    <meta content="width=device-width" name="viewport" />
    <title>${compilation.name}</title>
  </head>
  <body>
    <div id="index"></div>
    ${js.join('\n    ')}
  </body>
</html>
`;

      compilation.emitAsset('index.html', new RawSource(html));
    });
  }

  assetsToHTML(assets: Asset[], pattern: RegExp, template: AssetHTMLTemplate): string[] {
    return assets.filter(({ name }) => pattern.test(name)).map(template);
  }
}

export default Html;
