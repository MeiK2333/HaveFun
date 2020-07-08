import { cached } from "./cached";
import { Item } from ".";
import axios from 'axios';

async function fetch(url: string): Promise<Array<Item>> {
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
  const { data } = await axios.get(url, { headers });
  const reg = /<script>window.initialState=.*?<\/script>/;
  const result: Array<Item> = [];
  const raw = reg.exec(data)[0];
  const json = JSON.parse(raw.substr(28, raw.length - 37));
  for (const item of json.hotListDetail.articleList.itemList) {
    result.push({
      title: item.widgetTitle,
      link: `https://www.36kr.com/p/${item.itemId}`,
      image: item.widgetImage,
      metrics: item.statHot + ' 热度',
      updated_at: new Date(item.publishTime).toISOString(),
      excerpt: item.summary,
    })
  }
  return result;
}

export class Kr {
  @cached({ cacheTTL: 60 * 5 })
  async fetch(): Promise<Array<Item>> {
    const date = new Date().toISOString().substr(0, 10);
    const data = await fetch(`https://www.36kr.com/hot-list/zonghe/${date}/1`);
    return data;
  }
}

export class KrHOT {
  @cached({ cacheTTL: 60 * 5 })
  async fetch(): Promise<Array<Item>> {
    const date = new Date().toISOString().substr(0, 10);
    const data = await fetch(`https://www.36kr.com/hot-list/renqi/${date}/1`);
    return data;
  }
}
