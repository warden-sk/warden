/*
 * Copyright 2021 Marek Kobida
 */

import webpack from 'webpack';

class Html {
  assets: { name: string }[];

  constructor(assets: string[] = []) {
    // from ['a'] to { name: 'a' }
    this.assets = assets.map(name => ({ name }));
  }

  apply(compiler: webpack.Compiler) {
    const { RawSource } = webpack.sources;

    compiler.hooks.emit.tap(Html.name, compilation => {
      const assets = [...compilation.getAssets(), ...this.assets];

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

  assetsToHTML(assets: { name: string }[], pattern: RegExp, template: (asset: { name: string }) => string): string[] {
    return assets.filter(({ name }) => pattern.test(name)).map(template);
  }
}

export default Html;
