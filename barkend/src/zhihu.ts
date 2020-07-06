import { cached } from "./cached";
import { Item } from ".";
import axios from 'axios';

export class ZhiHu {
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
    const { data } = await axios.get('https://www.zhihu.com/billboard', { headers });
    const reg = /<script id="js-initialData" type="text\/json">.*?<\/script>/;
    const raw = reg.exec(data)[0];
    const json = JSON.parse(raw.substr(45, raw.length - 54)).initialState.topstory.hotList;
    const result: Array<Item> = [];
    for (const item of json) {
      result.push({
        title: item.target.titleArea.text,
        metrics: item.target.metricsArea.text.replace('热度', ''),
        excerpt: item.target.excerptArea.text,
        image: '',
        link: item.target.link.url
      })
    }
    return result;
  }
}