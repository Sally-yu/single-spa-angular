import { BrowserBuilder } from '@angular-devkit/build-angular';
import { Path, virtualFs } from '@angular-devkit/core';
import * as fs from 'fs';
import { Configuration } from 'webpack';
import { SingleSpaBuilderSchema } from './schema';
export declare class SingleSpaBrowserBuilder extends BrowserBuilder {
    buildWebpackConfig(root: Path, projectRoot: Path, host: virtualFs.Host<fs.Stats>, options: SingleSpaBuilderSchema): Configuration;
}
export default SingleSpaBrowserBuilder;
