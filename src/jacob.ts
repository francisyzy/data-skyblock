// Node modules.
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';
// Local modules.
import { extractNumbers } from './extractNumbers';
// import { sbGetYear } from './sbUtils';
// const sbYear = sbGetYear(new Date().getTime());
// console.log(sbYear);
const yearFinder =
  'https://hypixel-skyblock.fandom.com/wiki/Jacob%27s_Farming_Contest/Events';
async function getSbYear(): Promise<number> {
  let currentYear = 0;
  const res = await fetch(yearFinder);
  const xml = await res.text();
  const root = parse(xml);
  const listItems = root.querySelectorAll('td.darkmsgbox-bottom');
  listItems.forEach((item) => {
    if (item.rawText.includes('The current SkyBlock year')) {
      currentYear = extractNumbers(item.rawText)[0];
    }
  });
  return currentYear;
}
const getJacobEvents = async () => {
  const sbYear = await getSbYear();
  const jacobEvent = `https://hypixel-skyblock.fandom.com/api.php?action=query&format=json&prop=revisions&titles=Jacob's_Farming_Contest/Events/Year ${sbYear}&formatversion=2&rvprop=content&rvslots=*`;
  const res = await fetch(jacobEvent);
  const xml = (await res.json()).query.pages[0].revisions[0].slots.main.content;

  const root = parse(xml);
  let list: { mcDate: String; rlDate: Date; crops: String[] }[] = [];
  root.childNodes.forEach((node) => {
    if (node.rawText.includes('0 || {{Hl|{{ID|')) {
      const spilt = node.rawText.split(' || ');
      let crops = spilt[3].split('}}|{{ID|');
      crops[0] = crops[0].substring(10);
      crops[2] = crops[2].replace('}}}}', '');
      const mcDate = spilt[1];
      const rlDate = new Date(spilt[2]);
      list.push({ mcDate, rlDate, crops });
    }
  });
  return list;
};

export { getJacobEvents };
