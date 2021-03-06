"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const build_angular_1 = require("@angular-devkit/build-angular");
const single_spa_webpack_builder_1 = require("../single-spa-webpack-builder");
class SingleSpaBrowserBuilder extends build_angular_1.BrowserBuilder {
    buildWebpackConfig(root, projectRoot, host, options) {
        // Disable es2015 polyfills
        // tslint:disable-next-line: max-line-length
        // https://github.com/angular/angular-cli/blob/3d8064bb64d72557474a7484f1b85eaf35788916/packages/angular_devkit/build_angular/src/angular-cli-files/models/webpack-configs/common.ts#L56
        options.es5BrowserSupport = false;
        // Generate Angular CLI's default Browser Webpack cofiguration
        const config = super.buildWebpackConfig(root, projectRoot, host, options);
        // Delegate the building of the webpack config to the new builder.
        // Builder based on custom builders implmented by @meltedspark
        // https://github.com/meltedspark/angular-builders
        return single_spa_webpack_builder_1.buildWebpackConfig(root, options.singleSpaWebpackConfigPath, config, options, this.context);
    }
}
exports.SingleSpaBrowserBuilder = SingleSpaBrowserBuilder;
exports.default = SingleSpaBrowserBuilder;
//# sourceMappingURL=index.js.map