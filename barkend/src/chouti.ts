import { cached } from "./cached";
import { Item } from ".";
import axios from 'axios';

export class ChouTi24H {
  @cached({ cacheTTL: 60 * 5 })
  async fetch(): Promise<Array<Item>> {
    const headers = {
      'accept': 'application/json,text/javascript,*/*;q=0.01',
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
      'Referer': 'https://dig.chouti.com/',
      'X-Requested-With': 'XMLHttpRequest',
    }
    const { data } = await axios.get(`https://dig.chouti.com/top/24hr?_=${Math.floor(new Date().getTime() / 1000)}`, { headers });
    const result: Array<Item> = [];
    for (const item of data.data) {
      result.push({
        title: item.title,
        link: `https://dig.chouti.com/link/${item.id}`,
        image: item.imgUrl,
        updated_at: new Date(item.actionTime / 1000).toISOString(),
        metrics: item.ups.toString(),
      })
    }
    return result;
  }
}

export class ChouTi3D {
  @cached({ cacheTTL: 60 * 10 })
  async fetch(): Promise<Array<Item>> {
    const headers = {
      'accept': 'application/json, text/javascript, */*; q=0.01',
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
      'Referer': 'https://dig.chouti.com/',
      'X-Requested-With': 'XMLHttpRequest',
    }
    const { data } = await axios.get(`https://dig.chouti.com/top/72hr?_=${Math.floor(new Date().getTime() / 1000)}`, { headers });
    const result: Array<Item> = [];
    for (const item of data.data) {
      result.push({
        title: item.title,
        link: `https://dig.chouti.com/link/${item.id}`,
        image: item.imgUrl,
        updated_at: new Date(item.actionTime / 1000).toISOString(),
        metrics: item.ups.toString(),
      })
    }
    return result;
  }
}

export class ChouTi1W {
  @cached({ cacheTTL: 60 * 60 })
  async fetch(): Promise<Array<Item>> {
    const headers = {
      'accept': 'application/json, text/javascript, */*; q=0.01',
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
      'Referer': 'https://dig.chouti.com/',
      'X-Requested-With': 'XMLHttpRequest',
    }
    const { data } = await axios.get(`https://dig.chouti.com/top/168hr?_=${Math.floor(new Date().getTime() / 1000)}`, { headers });
    const result: Array<Item> = [];
    for (const item of data.data) {
      result.push({
        title: item.title,
        link: `https://dig.chouti.com/link/${item.id}`,
        image: item.imgUrl,
        updated_at: new Date(item.actionTime / 1000).toISOString(),
        metrics: item.ups.toString(),
      })
    }
    return result;
  }
}
