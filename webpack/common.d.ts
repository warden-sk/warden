import Html from './Html';
export default function ({ assets, name }: {
    assets?: string[];
    name: string;
}): {
    entry: string;
    module: {
        rules: ({
            test: RegExp;
            type: string;
            exclude?: undefined;
            loader?: undefined;
        } | {
            exclude: RegExp;
            loader: string;
            test: RegExp;
            type?: undefined;
        })[];
    };
    name: string;
    output: {
        assetModuleFilename: string;
        filename: string;
        path: string;
        publicPath: string;
    };
    plugins: Html[];
    resolve: {
        extensions: string[];
    };
};
