// Node modules.
import { mkdirp, writeFile } from 'fs-extra';
// Local modules.
import { getRaidBosses } from './jacob';

const main = async () => {
  const outputPath = './artifacts';
  await mkdirp(outputPath);

  // Raid Bosses.
  try {
    const raidBosses = await getRaidBosses();
    await writeFile(`${outputPath}/raid-bosses.json`, JSON.stringify(raidBosses, null, 2));
    await writeFile(`${outputPath}/raid-bosses.min.json`, JSON.stringify(raidBosses));
  } catch (e) {
    console.error(e);
  }

};

main();
