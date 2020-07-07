import { cached } from "./cached";
import { Item } from ".";
import axios from 'axios';
import { parse } from 'node-html-parser';

export class JianDanNew {
  @cached({ cacheTTL: 60 * 10 })
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
    const { data } = await axios.get('https://jandan.net/new', { headers });
    const root = parse(data);
    const main = root.querySelector('.post').querySelector('ul');
    const lis = main.querySelectorAll('li');
    const result: Array<Item> = [];
    for (const item of lis) {
      const a = item.querySelector('a');
      const title = a.innerHTML;
      const link = a.getAttribute('href');
      const metrics = item.querySelector('span').innerHTML + ' 回复';
      const updated_at = new Date(`${new Date().getFullYear()}-` + item.querySelector('small').innerHTML.replace(' | ', '')).toISOString();
      result.push({
        title,
        link,
        updated_at,
        metrics
      });
    }
    return result;
  }
}
