import { DevServerBuilder } from '@angular-devkit/build-angular';
import { virtualFs, Path } from '@angular-devkit/core';
import { SingleSpaBuilderSchema } from '../browser/schema';
import { Configuration } from 'webpack';
import * as fs from 'fs';
export declare class SingleSpaDevServer extends DevServerBuilder {
    buildWebpackConfig(root: Path, projectRoot: Path, host: virtualFs.Host<fs.Stats>, options: SingleSpaBuilderSchema): Configuration;
    _buildServerConfig(root: any, projectRoot: any, options: any, browserOptions: any): Configuration;
}
export default SingleSpaDevServer;
