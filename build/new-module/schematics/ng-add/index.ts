import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  noop,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  addPackageToPackageJson,
  platformVersion,
} from '@ngrx/{{MODULE_NAME_KEBAB}}/schematics-core';
import { Schema as EntityOptions } from './schema';

function addToPackageJson() {
  return (host: Tree, context: SchematicContext) => {
    addPackageToPackageJson(
      host,
      'dependencies',
      '@ngrx/{{MODULE_NAME_KEBAB}}',
      platformVersion
    );
    context.addTask(new NodePackageInstallTask());
    return host;
  };
}

export default function (options: EntityOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    return chain([
      options && options.skipPackageJson ? noop() : addToPackageJson(),
    ])(host, context);
  };
}
