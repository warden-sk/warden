/*
 * Copyright 2021 Marek Kobida
 */

import path from 'path';
import webpack from 'webpack';

interface EncodedAsset {
  name: string;
}

interface EncodedAssetHTMLTemplate {
  (encodedAsset: EncodedAsset): string;
}

class HTML {
  assets: string[];
  encodedAssets: EncodedAsset[];
  htmlTemplate: (compilation: webpack.Compilation) => string;
  publicPath?: string;

  constructor({
    assets = [],
    htmlTemplate = () => '',
    publicPath,
  }: {
    assets?: HTML['assets'];
    htmlTemplate?: HTML['htmlTemplate'];
    publicPath?: HTML['publicPath'];
  }) {
    this.assets = assets;
    // from ['a'] to { name: 'a' }
    this.encodedAssets = assets.map(name => ({ name }));
    this.htmlTemplate = htmlTemplate;
    this.publicPath = publicPath;
  }

  apply(compiler: webpack.Compiler) {
    const { RawSource } = webpack.sources;

    compiler.hooks.emit.tap(HTML.name, compilation => {
      const assets = this.encodedAssets.concat(compilation.getAssets());

      const css = this.assetsToHTML(assets, /\.css$/, asset => `<link href="${this.t(asset)}" rel="stylesheet" />`);
      const js = this.assetsToHTML(assets, /\.js$/, asset => `<script src="${this.t(asset)}"></script>`);

      const html = `<!DOCTYPE html>
<html>
  <head>
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

  assetsToHTML(assets: EncodedAsset[], pattern: RegExp, template: EncodedAssetHTMLTemplate): string[] {
    return assets.filter(({ name }) => pattern.test(name)).map(template);
  }

  t(asset: EncodedAsset): string {
    const url: URL = new URL(asset.name, this.publicPath ?? `file://${path.resolve('./public', asset.name)}`);

    url.searchParams.set('date', (+new Date()).toString());

    return url.toString();
  }
}

export default HTML;
