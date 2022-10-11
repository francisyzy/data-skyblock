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
  const currSbYear = await getSbYear();
  let findTwenty = currSbYear;
  while (findTwenty % 20 !== 0) {
    findTwenty++;
  }
  const sbYear = `20${findTwenty - 19}-${findTwenty}`;

  const jacobEvent = `https://hypixel-skyblock.fandom.com/api.php?action=query&format=json&prop=revisions&titles=Jacob%27s_Farming_Contest%2FEvents%2FYear%${sbYear}&formatversion=2&rvprop=content&rvslots=*`;
  const res = await fetch(jacobEvent);
  const xml = (await res.json()).query.pages[0].revisions[0].slots.main.content;

  const root = parse(xml);
  let list: { mcDate: String; rlDate: Date; crops: String[] }[] = [];
  root.childNodes.forEach((node) => {
    if (node.rawText.includes('{| class = "wikitable"')) {
      const lines = node.rawText.split('|-');
      lines.forEach((line) => {
        line.replace('\n', '');
        if (
          line.includes('Spring') ||
          line.includes('Summer') ||
          line.includes('Autumn') ||
          line.includes('Winter')
        ) {
          const spilt = line.split(' || ');

          let crops: String[] = [];
          spilt.forEach((item) => {
            if (item.includes('{{#var:')) {
              crops.push(item.replace('{{#var:', '').replace('}}', ''));
            }
          });
          const mcDate = spilt[1];
          const rlDate = new Date(spilt[2]);
          list.push({ mcDate, rlDate, crops });
        }
      });
    }
  });
  return list;
};

export { getJacobEvents };
