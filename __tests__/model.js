'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs-extra');
describe('generator-hiroki:model', function() {
    beforeAll(function() {
        return helpers.run(path.join(__dirname, '../generators/model'))
            .withPrompts({
                modelName: 'examples',
                timestamps:true
            })
            .toPromise()
            .then(() => {
                return;
            });
    });

    it('creates model files', function() {
        assert.file('index.js');
        assert.file('examples.js');
    });
});
describe('generator-hiroki:model with previous files', function() {
    beforeAll(function() {
        return helpers.run(path.join(__dirname, '../generators/model'))
            .inTmpDir(function(dir) {
                const pathEnd = path.join(__dirname, './mocks/users.js');
                fs.copySync(pathEnd, path.join(dir, 'lib/models/users.js'));
            })
            .withPrompts({
                modelName: 'examples',
                timestamps:true
            })
            .toPromise()
            .then(() => {
                return;
            });
    });

    it('creates model files', function() {
        assert.file('index.js');
        assert.file('examples.js');
        assert.file('users.js');
    });
});
