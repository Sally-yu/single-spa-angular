"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const build_angular_1 = require("@angular-devkit/build-angular");
const core_1 = require("@angular-devkit/core");
const single_spa_webpack_builder_1 = require("../single-spa-webpack-builder");
const webpackMerge = require("webpack-merge");
const core_2 = require("@angular-devkit/core");
const path = require("path");
// @ts-ignore
class SingleSpaDevServer extends build_angular_1.DevServerBuilder {
    buildWebpackConfig(root, projectRoot, host, options) {
        // Disable es2015 polyfills
        // tslint:disable-next-line: max-line-length
        // https://github.com/angular/angular-cli/blob/3d8064bb64d72557474a7484f1b85eaf35788916/packages/angular_devkit/build_angular/src/angular-cli-files/models/webpack-configs/common.ts#L56
        options.es5BrowserSupport = false;
        // Generate Angular CLI's default builder webpack cofiguration
        const config = super.buildWebpackConfig(root, projectRoot, host, options);
        // Delegate the building of the webpack config to the new builder.
        // Builder based on custom builders implmented by @meltedspark
        // https://github.com/meltedspark/angular-builders
        const webpackConfig = single_spa_webpack_builder_1.buildWebpackConfig(root, options.singleSpaWebpackConfigPath, config, options, this.context);
        return webpackConfig;
    }
    _buildServerConfig(root, projectRoot, options, browserOptions) {
        // super._buildServerConfig will call into our overriding buildWebpackConfig,        
        // @ts-ignore
        const defaultServerConfig = super._buildServerConfig(root, projectRoot, options, browserOptions);
        // the angular cli implementation ignores any devServer customisation that we might have put in
        // the external webpack configuration so we need to put it back in.
        const singleSpaWebpackConfigPath = options.singleSpaWebpackConfigPath;
        const customWebpackConfig = singleSpaWebpackConfigPath ? require(`${core_2.getSystemPath(root)}/${singleSpaWebpackConfigPath}`) : {};
        const customWebpackDevServerConfig = customWebpackConfig.devServer;
        const finalConfig = webpackMerge.smart(defaultServerConfig, {
            // @ts-ignore
            historyApiFallback: false,
            contentBase: path.resolve(process.cwd(), 'src'),
            headers: {
                'Access-Control-Allow-Headers': '*',
            }
        }, customWebpackDevServerConfig);
        // @ts-ignore
        this.context.logger.info(core_1.tags.oneLine `Your single-spa application can be downloaded at http://localhost:${finalConfig.port}/main.js`);
        return finalConfig;
    }
}
exports.SingleSpaDevServer = SingleSpaDevServer;
exports.default = SingleSpaDevServer;
//# sourceMappingURL=index.js.map