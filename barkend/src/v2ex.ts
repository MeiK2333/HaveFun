import { cached } from "./cached";
import { Item } from ".";
import axios from 'axios';

export class V2EX {
  @cached({ cacheTTL: 60 * 10 })
  async fetch(): Promise<Array<Item>> {
    const { data } = await axios.get('https://www.v2ex.com/api/topics/hot.json');
    const result: Array<Item> = [];
    for (const item of data) {
      result.push({
        title: item.title,
        link: item.url,
        excerpt: item.content,
        metrics: item.replies.toString(),
        updated_at: new Date(item.last_touched * 1000).toISOString()
      })
    }
    return result;
  }
}