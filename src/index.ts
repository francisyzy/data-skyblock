// Node modules.
import { mkdirp, writeFile } from 'fs-extra';
// Local modules.
import { getJacobEvents } from './jacob';

const main = async () => {
  const outputPath = './artifacts';
  await mkdirp(outputPath);

  // Raid Bosses.
  try {
    const raidBosses = await getJacobEvents();
    await writeFile(`${outputPath}/jacob-events.json`, JSON.stringify(raidBosses, null, 2));
    await writeFile(`${outputPath}/jacob-events.min.json`, JSON.stringify(raidBosses));
  } catch (e) {
    console.error(e);
  }

};

main();
