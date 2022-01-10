/*
 * Copyright 2022 Marek Kobida
 */

import path from 'path';
import webpack from 'webpack';

class HTML {
  assets: string[];
  htmlTemplate: (compilation: webpack.Compilation) => string;
  publicPath: string | 0 | false | null | undefined;

  constructor(assets: HTML['assets'], htmlTemplate: HTML['htmlTemplate'], publicPath: HTML['publicPath']) {
    this.assets = assets;
    this.htmlTemplate = htmlTemplate;
    this.publicPath = publicPath;
  }

  apply(compiler: webpack.Compiler) {
    const { RawSource } = webpack.sources;

    compiler.hooks.emit.tap(HTML.name, compilation => {
      //                                                       | from { name: 'a' } to ['a']
      const assets = this.assets.concat(compilation.getAssets().map(({ name }) => name));

      const css = this.assetsToHTML(assets, /\.css$/, url => `<link href="${url}" rel="stylesheet" />`);
      const js = this.assetsToHTML(assets, /\.js$/, url => `<script src="${url}"></script>`);

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
    });
  }

  assetToUrl = (asset: string): string => {
    const publicPath = this.publicPath ? this.publicPath : `file://${path.resolve('./public')}`;

    const url = /^[^:\/\/]+:\/\//.test(asset) ? new URL(asset) : new URL(`${publicPath}/${asset}`);

    url.searchParams.set('date', (+new Date()).toString());

    return url.toString();
  };

  assetsToHTML(assets: string[], pattern: RegExp, template: (asset: string) => string): string[] {
    return assets
      .filter(asset => pattern.test(asset))
      .map(this.assetToUrl)
      .map(template);
  }
}

export default HTML;
