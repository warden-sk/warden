import webpack from 'webpack';
declare class Html {
    assets: {
        name: string;
    }[];
    constructor(assets?: string[]);
    apply(compiler: webpack.Compiler): void;
    assetsToHTML(assets: {
        name: string;
    }[], pattern: RegExp, template: (asset: {
        name: string;
    }) => string): string[];
}
export default Html;
