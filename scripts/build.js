const { readdir, readFile, rm, stat, writeFile, mkdir } = require('fs/promises');
const { basename, extname, join, dirname } = require('path');

const { load: readYaml } = require('js-yaml');

const buildAssets = async (inputitem, basedir, outdir) => {
  const filename = basename(inputitem);
  const ext = extname(filename);
  if (ext !== '.yaml') {
    console.warn(`Unknown file type '${ext}' - Skipping file: ${inputitem}`);
    return;
  }

  console.log(`Building json file from yaml: ${inputitem}`);
  const file = filename.slice(0, -ext.length);
  const yaml = await readFile(join(basedir, inputitem), { encoding: 'utf-8' });
  const obj = readYaml(yaml);

  const outfiledir = join(outdir, dirname(inputitem));
  await ensuredir(outfiledir);

  const outfilepath = join(outfiledir, `${file}.json`);
  await writeFile(outfilepath, JSON.stringify(obj, null, 2));
  await writeFile(join(outfiledir, filename), yaml);
};

const clean = async (outdir) => {
  const elements = await readdir(outdir, { withFileTypes: true });

  for (const element of elements) {
    if (element.name === 'README.md') {
      continue;
    }

    await rm(join(outdir, element.name), { recursive: true });
  }
};

const ensuredir = async (dir) => {
  try {
    await stat(dir);
  } catch (_) {
    await mkdir(dir);
  }
};

const build = async () => {
  const workQueue = [''];

  const basedir = 'descriptions';
  const outdir = 'generated';
  await ensuredir(outdir);
  await clean(outdir);

  while (workQueue.length) {
    const workitem = workQueue.shift();
    const dir = join(basedir, workitem);
    const elements = await readdir(dir, { withFileTypes: true });

    for (const element of elements) {
      const diritem = join(workitem, element.name);

      if(element.isDirectory()) {
        workQueue.push(diritem);
      } else {
        await buildAssets(diritem, basedir, outdir);
      }
    }
  }
};

build().then(() => console.log('Successfully built assets'), console.error);
