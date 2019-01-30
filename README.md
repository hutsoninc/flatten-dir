# flatten-dir

[![Build Status](https://travis-ci.com/hutsoninc/flatten-dir.svg?branch=master)](https://travis-ci.com/hutsoninc/flatten-dir) [![Current npm package version](https://img.shields.io/npm/v/@hutsoninc/flatten-dir.svg)](https://www.npmjs.com/package/@hutsoninc/flatten-dir)

Recursively flatten a directory (moves all files from subfolders into the one folder).

## Usage

`npm install @hutsoninc/flatten-dir`

```js
const flatten = require('@hutsoninc/flatten-dir');

await flatten('path-to-directory', {
    // options
});
```

## Options

### rename

Type: `Function`

Used to rename a file when the file name is already taken.

Default:

```js
basename => {
    if (/-\d$/.test(basename)) {
        let arr = basename.split('-');
        arr[arr.length - 1] = Number(arr[arr.length - 1]) + 1;
        return arr.join('-');
    }
    return `${basename}-1`;
}
```

## Related

- [flatten-dir-cli](https://github.com/hutsoninc/flatten-dir-cli) - CLI for this module

## License

MIT © [Hutson Inc](https://www.hutsoninc.com)
