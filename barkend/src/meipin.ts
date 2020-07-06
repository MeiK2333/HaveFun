import { cached } from "./cached";
import { Item } from ".";
import axios from 'axios';
import { parse } from 'node-html-parser';

export class MeiPin {
  @cached({ cacheTTL: 60 * 60 })
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
    const { data } = await axios.get('https://meipin.im/', { headers });
    const root = parse(data);
    const main = root.querySelector('#main');
    const articles = main.querySelectorAll('article');
    const result: Array<Item> = [];
    for (const article of articles) {
      const a = article.querySelector('a');
      const title = a.innerHTML;
      const link = a.getAttribute('href');
      const updated_at = new Date(article.querySelector('footer').querySelector('a').querySelector('time').getAttribute('datetime')).toISOString();
      result.push({
        title,
        link,
        updated_at
      });
    }
    return result;
  }
}