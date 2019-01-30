'use strict';
const fs = require('fs-extra');
const path = require('path');
const globby = require('globby');
const deleteEmpty = require('delete-empty');

const defaults = {
    rename: basename => {
        if (/-\d$/.test(basename)) {
            let arr = basename.split('-');
            arr[arr.length - 1] = Number(arr[arr.length - 1]) + 1;
            return arr.join('-');
        }
        return `${basename}-1`;
    },
};

module.exports = async (dir, opts) => {
    if (dir) {
        dir = path.resolve(dir);
    } else {
        dir = process.cwd();
    }
    opts = Object.assign({}, defaults, opts);

    const files = await globby(dir, {
        expandDirectories: {
            files: ['*'],
        },
    });

    const dirs = await globby(dir, { onlyDirectories: true });

    for (let i = 0; i < files.length; i++) {
        let file = path.basename(files[i]);
        if (path.relative(dir, files[i]) === file) {
            continue;
        }
        moveFile(files[i], file, dir, opts);
    }

    for (let i = 0; i < dirs.length; i++) {
        try {
            if (fs.existsSync(dirs[i])) {
                deleteEmpty.sync(dirs[i]);
            }
        } catch (err) {
            console.error(err);
        }
    }
};

function moveFile(originalPath, basename, dir, opts) {
    if (!fs.existsSync(path.join(dir, basename))) {
        try {
            fs.moveSync(originalPath, path.join(dir, basename));
        } catch (err) {
            console.error(err);
        }
        return;
    }
    let fileObj = path.parse(basename);
    let name = opts.rename(fileObj.name);
    name = name + fileObj.ext;
    moveFile(originalPath, name, dir, opts);
}
