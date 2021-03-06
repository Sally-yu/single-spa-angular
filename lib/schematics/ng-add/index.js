"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const config_1 = require("@schematics/angular/utility/config");
const versions = require("../library-versions");
const path_1 = require("path");
const utils_1 = require("../utils");
const semver = require("semver");
function default_1(options) {
    return schematics_1.chain([
        addDependencies(options),
        createMainEntry(options),
        updateConfiguration(options),
        addNPMScripts(options),
    ]);
}
exports.default = default_1;
function addDependencies(options) {
    return (host, context) => {
        utils_1.addPackageToPackageJson(host, 'single-spa-angular', versions.singleSpaAngular);
        if (atLeastAngular8()) {
            utils_1.addPackageToPackageJson(host, '@angular-builders/custom-webpack', versions.angularBuilderCustomWebpack);
        }
        context.addTask(new tasks_1.NodePackageInstallTask());
        context.logger.info(`Added 'single-spa-angular' as a dependency`);
    };
}
exports.addDependencies = addDependencies;
function createMainEntry(options) {
    return (host, context) => {
        const project = getClientProject(host, options);
        const path = path_1.normalize(project.workspace.root);
        const templateSource = schematics_1.apply(schematics_1.url('./_files'), [
            schematics_1.applyTemplates({
                atLeastAngular8: atLeastAngular8(),
                prefix: project.workspace.prefix,
                routing: options.routing,
                usingBrowserAnimationsModule: options.usingBrowserAnimationsModule,
            }),
            schematics_1.move(path)
        ]);
        const rule = schematics_1.mergeWith(templateSource, schematics_1.MergeStrategy.Overwrite);
        context.logger.info(`Generated 'main.single-spa.ts`);
        context.logger.info(`Generated 'single-spa-props.ts`);
        context.logger.info(`Generated asset-url.ts`);
        context.logger.info(`Generated extra-webpack.config.js`);
        return rule(host, context);
    };
}
exports.createMainEntry = createMainEntry;
function updateConfiguration(options) {
    return (host, context) => {
        const workspace = config_1.getWorkspace(host);
        const project = getClientProject(host, options);
        const clientProject = workspace.projects[project.name];
        if (!clientProject.architect) {
            throw new Error('Client project architect not found.');
        }
        const workspacePath = config_1.getWorkspacePath(host);
        if (atLeastAngular8()) {
            updateProjectNewAngular(context, clientProject);
        }
        else {
            updateProjectOldAngular(context, clientProject, project);
        }
        host.overwrite(workspacePath, JSON.stringify(workspace, null, 2));
        context.logger.info(`Updated angular.json configuration`);
        // @ts-ignore
        context.logger.info(clientProject.architect.build.builder);
        return host;
    };
}
exports.updateConfiguration = updateConfiguration;
function updateProjectOldAngular(context, clientProject, project) {
    context.logger.info('Using single-spa-angular builder for Angular versions before 8');
    // Copy configuration from build architect
    clientProject.architect['single-spa'] = clientProject.architect.build;
    clientProject.architect['single-spa'].builder = 'single-spa-angular:build';
    clientProject.architect['single-spa'].options.main = `${project.workspace.sourceRoot}/main.single-spa.ts`;
    // Copy configuration from the serve architect
    clientProject.architect['single-spa-serve'] = clientProject.architect.serve;
    clientProject.architect['single-spa-serve'].builder = 'single-spa-angular:dev-server';
    clientProject.architect['single-spa-serve'].options.browserTarget = `${project.name}:single-spa`;
}
function updateProjectNewAngular(context, clientProject) {
    context.logger.info('Using @angular-devkit/custom-webpack builder.');
    // @ts-ignore
    clientProject.architect.build.builder = '@angular-builders/custom-webpack:browser';
    // @ts-ignore
    clientProject.architect.build.options.customWebpackConfig = {
        path: "./extra-webpack.config.js"
    };
    // @ts-ignore
    clientProject.architect.build.options.main = 'src/main.single-spa.ts';
    // @ts-ignore
    clientProject.architect.serve.builder = '@angular-builders/custom-webpack:dev-server';
}
function addNPMScripts(options) {
    return (host, context) => {
        const pkgPath = '/package.json';
        const buffer = host.read(pkgPath);
        if (buffer === null) {
            throw new schematics_1.SchematicsException('Could not find package.json');
        }
        const pkg = JSON.parse(buffer.toString());
        pkg.scripts['build:single-spa'] = `ng build --prod --deploy-url http://localhost:4200/`;
        pkg.scripts['serve:single-spa'] = `ng serve --disable-host-check --port 4200 --deploy-url http://localhost:4200/ --live-reload false`;
        host.overwrite(pkgPath, JSON.stringify(pkg, null, 2));
    };
}
exports.addNPMScripts = addNPMScripts;
function getClientProject(host, options) {
    const workspace = config_1.getWorkspace(host);
    let project = options.project;
    if (!options.project) {
        project = Object.keys(workspace.projects)[0];
    }
    const clientProject = workspace.projects[project];
    if (!clientProject) {
        throw new schematics_1.SchematicsException(`Client app ${options.project} not found.`);
    }
    return { name: project, workspace: clientProject };
}
function atLeastAngular8() {
    const angularCoreVersion = require(path_1.join(process.cwd(), 'package.json')).dependencies['@angular/core'] || '7';
    return semver.satisfies(semver.minVersion(angularCoreVersion), '>=8');
}
//# sourceMappingURL=index.js.map