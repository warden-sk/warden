/*
 * Copyright 2021 Marek Kobida
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import vm from 'vm';
import webpack from 'webpack';

interface Asset {
  name: string;
}

interface AssetHTMLTemplate {
  (asset: Asset): string;
}

function test(code: Buffer | string | undefined): string {
  if (code) {
    const context = { exports: exports, module: { exports } };

    const script = new vm.Script(code.toString());

    script.runInNewContext(context);

    const Component = context.module.exports.default;

    try {
      return ReactDOMServer.renderToString(<Component />);
    } catch (error) {
      return '';
    }
  }

  throw new Error('The code is not valid.');
}

class HTML {
  assets: Asset[];

  constructor(assets: string[] = []) {
    // from ['a'] to { name: 'a' }
    this.assets = assets.map(name => ({ name }));
  }

  apply(compiler: webpack.Compiler) {
    const { RawSource } = webpack.sources;

    compiler.hooks.emit.tap(HTML.name, compilation => {
      const _ = compilation.getAsset('index.js');
      const __ = test(_?.source.source());

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
    <div id="index">
      ${__}
    </div>
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

export default HTML;
