// Node modules.
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

const getFetchurQuest = async () => {
  const fetchur = `https://hypixel-skyblock.fandom.com/wiki/Fetchur`;
  const res = await fetch(fetchur);
  const xml = await res.text();

  const root = parse(xml);
  let day = root.querySelectorAll('span.plainlinks')[0].rawText;
  const box = root.querySelectorAll('span.custom-widgetbox-gold');
  const item = box[0].rawText.replace(day, '');
  day = day.replace(' (refresh)', '');
  return { day, item };
};

export { getFetchurQuest };
