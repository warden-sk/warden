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

class HTML {
  assets: Asset[];
  htmlTemplate: (compilation: webpack.Compilation) => string;
  publicPath: string;

  constructor({
    assets = [],
    htmlTemplate = () => '',
    publicPath,
  }: {
    assets?: string[];
    htmlTemplate?: (compilation: webpack.Compilation) => string;
    publicPath: string;
  }) {
    // from ['a'] to { name: 'a' }
    this.assets = assets.map(name => ({ name }));
    this.htmlTemplate = htmlTemplate;
    this.publicPath = publicPath;
  }

  apply(compiler: webpack.Compiler) {
    const { RawSource } = webpack.sources;

    compiler.hooks.emit.tap(HTML.name, compilation => {
      const assets = this.assets.concat(compilation.getAssets());

      const css = this.assetsToHTML(assets, /\.css$/, asset => `<link href="${this.t(asset)}" rel="stylesheet" />`);
      const js = this.assetsToHTML(assets, /\.js$/, asset => `<script src="${this.t(asset)}"></script>`);

      const html = `<!DOCTYPE html>
<html lang="sk">
  <head>
    <link href="${this.t({ name: 'apple-touch-icon.png' })}" rel="apple-touch-icon" />
    <link href="${this.t({ name: 'manifest.json' })}" rel="manifest" />
    ${css.join('\n    ')}
    <meta charset="utf-8" />
    <meta content="width=device-width" name="viewport" />
    <title>${compilation.name}</title>
  </head>
  <body> 
    ${this.htmlTemplate(compilation)}
    ${js.join('\n    ')}
  </body>
</html>
`;

      compilation.emitAsset('index.html', new RawSource(html));

      console.log('\u0007');
    });
  }

  assetsToHTML(assets: Asset[], pattern: RegExp, template: AssetHTMLTemplate): string[] {
    return assets.filter(({ name }) => pattern.test(name)).map(template);
  }

  t(asset: Asset): string {
    const url: URL = /^[^:\/\/]+:\/\//.test(asset.name)
      ? new URL(asset.name)
      : new URL(`${this.publicPath}/${asset.name}`);

    url.searchParams.set('date', (+new Date()).toString());

    return url.toString();
  }
}

export default HTML;
