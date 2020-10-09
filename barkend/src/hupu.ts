import { cached } from "./cached";
import { Item } from ".";
import axios from 'axios';
import { parse } from 'node-html-parser';

export class HuPu {
  @cached({ cacheTTL: 60 * 5 })
  async fetch(): Promise<Array<Item>> {
    const headers = {
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-encoding': 'gzip',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'cache-control': 'max-age=0',
      'dnt': '1',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'cross-site',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
    }
    const { data } = await axios.get('https://bbs.hupu.com/all-gambia', { headers });
    const root = parse(data);
    const main = root.querySelector('.bbsHotPit').querySelector('.list').querySelector('ul');
    const articles = main.querySelectorAll('li');
    const result: Array<Item> = [];
    for (const article of articles) {
      const a = article.querySelector('a');
      const title = a.querySelector('span').innerHTML;
      const link = 'https://bbs.hupu.com' + a.getAttribute('href');
      const metrics = article.querySelector('em').innerHTML.trim();
      result.push({
        title,
        link,
        metrics
      });
    }
    return result;
  }
}