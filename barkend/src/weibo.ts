import { cached } from "./cached";
import { Item } from ".";
import axios from 'axios';
import { parse } from 'node-html-parser';

export class WeiBo {
  @cached({ cacheTTL: 5 })
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
    const { data } = await axios.get('https://s.weibo.com/top/summary?cate=realtimehot', { headers });
    const root = parse(data);
    const trs = root.querySelector('.data').querySelector('tbody').querySelectorAll('tr');
    const result: Array<Item> = [];
    for (const tr of trs) {
      const td = tr.querySelectorAll('td')[1];
      const a = td.querySelector('a');
      const title = a.innerHTML;
      const link = `https://s.weibo.com` + a.getAttribute('href');
      const span = td.querySelector('span');
      const img = td.querySelector('img');
      const metrics = span ? span.innerHTML : null;
      const image = img ? `https:` + img.getAttribute('src') : null;
      result.push({
        title,
        link,
        metrics,
        image,
      });
    }
    return result;
  }
}