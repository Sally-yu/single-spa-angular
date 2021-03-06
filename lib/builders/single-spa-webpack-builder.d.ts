import { Configuration } from 'webpack';
import { Path } from '@angular-devkit/core';
import { BuilderContext } from '@angular-devkit/architect';
export declare function buildWebpackConfig(root: Path, config: string, baseWebpackConfig: Configuration, options: any, context: BuilderContext): Configuration;
