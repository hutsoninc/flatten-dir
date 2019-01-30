const flatten = require('../');
const path = require('path');
const fs = require('fs-extra');

const tmp = 'tmp';
const dirs = ['tmp1', 'tmp2', 'tmp2/tmp3'];
const files = [
    'a.tmp',
    'b.tmp',
    'c.tmp',
    'tmp1/a.tmp',
    'tmp1/d.tmp',
    'tmp2/e.tmp',
    'tmp2/b.tmp',
    'tmp2/tmp3/b.tmp',
];

const checklist = [
    'a.tmp',
    'a-1.tmp',
    'b.tmp',
    'b-1.tmp',
    'b-2.tmp',
    'c.tmp',
    'd.tmp',
    'e.tmp',
];

beforeAll(() => {
    if (!fs.existsSync(tmp)) {
        fs.mkdirSync(path.join(__dirname, tmp));
    }
    dirs.forEach(dir => fs.mkdirSync(path.join(__dirname, tmp, dir)));
    files.forEach(file => fs.writeFileSync(path.join(__dirname, tmp, file)));
});

afterAll(() => {
    fs.remove(path.join(__dirname, tmp));
});

describe('Should flatten dir', async () => {
    test('Flatten', async () => {
        await flatten(path.join(__dirname, tmp));
        let files = fs.readdirSync(path.join(__dirname, tmp));
        expect(files.length).toEqual(checklist.length);
        checklist.forEach(file => {
            let index = files.indexOf(file) >= 0;
            expect(index).toBeTruthy();
        });
    });
});
