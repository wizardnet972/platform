import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { Schema } from './schema';
import { createWorkspace } from '../../../schematics-core/testing';

describe('{{MODULE_NAME_KEBAB}} ng-add Schematic', () => {
  const schematicRunner = new SchematicTestRunner(
    '@ngrx/{{MODULE_NAME_KEBAB}}',
    path.join(__dirname, '../collection.json')
  );
  const defaultOptions: Schema = {
    skipPackageJson: false,
  };

  let appTree: UnitTestTree;

  beforeEach(async () => {
    appTree = await createWorkspace(schematicRunner, appTree);
  });

  it('should update package.json', () => {
    const options = { ...defaultOptions };

    const tree = schematicRunner.runSchematic('ng-add', options, appTree);
    const packageJson = JSON.parse(tree.readContent('/package.json'));

    expect(
      packageJson.dependencies['@ngrx/{{MODULE_NAME_KEBAB}}']
    ).toBeDefined();
  });

  it('should skip package.json update', () => {
    const options = { ...defaultOptions, skipPackageJson: true };

    const tree = schematicRunner.runSchematic('ng-add', options, appTree);
    const packageJson = JSON.parse(tree.readContent('/package.json'));

    expect(
      packageJson.dependencies['@ngrx/{{MODULE_NAME_KEBAB}}']
    ).toBeUndefined();
  });
});
