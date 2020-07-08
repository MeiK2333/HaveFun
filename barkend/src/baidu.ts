import { cached } from "./cached";
import { Item } from ".";
import axios from 'axios';
import { parse } from 'node-html-parser';
import iconv from 'iconv-lite';

async function fetch(url: string): Promise<Array<Item>> {
  const headers = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'cache-control': 'max-age=0',
    'dnt': '1',
    'host': 'top.baidu.com',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'cross-site',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
  }
  const { data } = await axios.get(url, { headers, responseType: 'arraybuffer' });
  const root = parse(iconv.decode(data, 'gb2312'));
  const trs = root.querySelector('.list-table').querySelectorAll('tr');
  const result: Array<Item> = [];
  for (const tr of trs) {
    if (!tr.querySelector('.keyword')) {
      continue;
    }
    const a = tr.querySelector('.keyword').querySelector('a');
    const title = a.innerHTML;
    const link = a.getAttribute('href').replace('http://', 'https://');
    const metrics = tr.querySelector('.last').querySelector('span').innerHTML;
    result.push({
      title,
      link,
      metrics,
    });
  }
  return result;
}

export class BaiDu {
  @cached({ cacheTTL: 30 })
  async fetch(): Promise<Array<Item>> {
    const data = await fetch('https://top.baidu.com/buzz?b=1&c=513');
    return data;
  }
}

export class BaiDuDay {
  @cached({ cacheTTL: 60 * 10 })
  async fetch(): Promise<Array<Item>> {
    const data = await fetch('http://top.baidu.com/buzz?b=341&c=513');
    return data;
  }
}

export class BaiDu7Day {
  @cached({ cacheTTL: 60 * 30 })
  async fetch(): Promise<Array<Item>> {
    const data = await fetch('http://top.baidu.com/buzz?b=42&c=513');
    return data;
  }
}
