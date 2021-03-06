import { Rule } from '@angular-devkit/schematics';
import { Schema as NgAddOptions } from './schema';
export default function (options: NgAddOptions): Rule;
export declare function addDependencies(options: NgAddOptions): (host: import("@angular-devkit/schematics/src/tree/interface").Tree, context: import("@angular-devkit/schematics").TypedSchematicContext<{}, {}>) => void;
export declare function createMainEntry(options: NgAddOptions): (host: import("@angular-devkit/schematics/src/tree/interface").Tree, context: import("@angular-devkit/schematics").TypedSchematicContext<{}, {}>) => void | import("@angular-devkit/schematics/src/tree/interface").Tree | import("rxjs").Observable<import("@angular-devkit/schematics/src/tree/interface").Tree> | Rule;
export declare function updateConfiguration(options: NgAddOptions): (host: import("@angular-devkit/schematics/src/tree/interface").Tree, context: import("@angular-devkit/schematics").TypedSchematicContext<{}, {}>) => import("@angular-devkit/schematics/src/tree/interface").Tree;
export declare function addNPMScripts(options: NgAddOptions): (host: import("@angular-devkit/schematics/src/tree/interface").Tree, context: import("@angular-devkit/schematics").TypedSchematicContext<{}, {}>) => void;
