const { readdir, readFile, writeFile } = require('fs/promises');
const { basename, extname, join } = require('path');

const { load: readYaml } = require('js-yaml');

const buildJsonAsset = async (inputfile, dir) => {
  const filename = basename(inputfile);
  const ext = extname(filename);
  if (ext !== '.yaml') {
    console.warn(`Unknown file type '${ext}' - Skipping file: ${inputfile}`);
    return;
  }

  console.log(`Building json file from yaml: ${inputfile}`);
  const file = filename.slice(0, -ext.length);
  const yaml = await readFile(inputfile, { encoding: 'utf-8' });
  const obj = readYaml(yaml);
  const outputfile = join(dir, `${file}.json`);
  await writeFile(outputfile, JSON.stringify(obj, null, 2));
};

const build = async () => {
  const workQueue = ['descriptions'];

  while (workQueue.length) {
    const dir = workQueue.shift();
    const elements = await readdir(dir, { withFileTypes: true });

    for (const element of elements) {
      const workItem = join(dir, element.name);

      if(element.isDirectory()) {
        workQueue.push(workItem);
      } else {
        await buildJsonAsset(workItem, dir);
      }
    }
  }
};

build();
