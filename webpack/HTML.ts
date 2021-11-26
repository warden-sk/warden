/*
 * Copyright 2021 Marek Kobida
 */

import path from 'path';
import webpack from 'webpack';

class HTML {
  assets: string[];
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
    this.htmlTemplate = htmlTemplate;
    this.publicPath = publicPath;
  }

  apply(compiler: webpack.Compiler) {
    const { RawSource } = webpack.sources;

    compiler.hooks.emit.tap(HTML.name, compilation => {
      //                                                       | from { name: 'a' } to ['a']
      const assets = this.assets.concat(compilation.getAssets().map(({ name }) => name));

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

  assetsToHTML(assets: string[], pattern: RegExp, template: (asset: string) => string): string[] {
    return assets.filter(asset => pattern.test(asset)).map(template);
  }

  t(asset: string): string {
    const $ = this.publicPath ?? `file://${path.resolve('./public')}`;

    const url = /^[^:\/\/]+:\/\//.test(asset) ? new URL(asset) : new URL(`${$}/${asset}`);

    url.searchParams.set('date', (+new Date()).toString());

    return url.toString();
  }
}

export default HTML;
