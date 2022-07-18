// Node modules.
import { mkdirp, writeFile } from 'fs-extra';
// Local modules.
import { getFetchurQuest } from './fetchur';
import { getJacobEvents } from './jacob';

const main = async () => {
  const outputPath = './artifacts';
  await mkdirp(outputPath);

  // Raid Bosses.
  try {
    const fetchur = await getFetchurQuest()
    await writeFile(`${outputPath}/fetchur-events.json`, JSON.stringify(fetchur, null, 2));
    await writeFile(`${outputPath}/fetchur-events.min.json`, JSON.stringify(fetchur));
    const jacob = await getJacobEvents();
    await writeFile(`${outputPath}/jacob-events.json`, JSON.stringify(jacob, null, 2));
    await writeFile(`${outputPath}/jacob-events.min.json`, JSON.stringify(jacob));
  } catch (e) {
    console.error(e);
  }

};

main();
