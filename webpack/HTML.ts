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

  constructor({
    assets = [],
    htmlTemplate = () => '',
  }: {
    assets?: string[];
    htmlTemplate?: (compilation: webpack.Compilation) => string;
  }) {
    // from ['a'] to { name: 'a' }
    this.assets = assets.map(name => ({ name }));
    this.htmlTemplate = htmlTemplate;
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
    <base href="/" />
    ${css.join('\n    ')}
    <meta charset="utf-8" />
    <meta content="width=device-width" name="viewport" />    
    <meta content="yes" name="apple-mobile-web-app-capable" />
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

  assetsToHTML(assets: Asset[], pattern: RegExp, template: AssetHTMLTemplate): string[] {
    return assets.filter(({ name }) => pattern.test(name)).map(template);
  }

  t(asset: Asset) {
    return `${asset.name}?${+new Date()}`;
  }
}

export default HTML;
