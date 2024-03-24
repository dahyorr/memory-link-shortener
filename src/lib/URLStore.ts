import { URLEntry } from "typings";
import { customIdGenerator } from "utils";

class URLStore {
  private store: Record<string, URLEntry> = {};

  // get URL by id and increment stats
  getURL(id: string): URL {
    const urlEntry = this.store[id];
    if (!urlEntry) {
      throw new Error('URL not found');
    }
    urlEntry.stats.hits++;
    return urlEntry.url;
  }

  // decode id without incrementing stats
  // decodeId(id: string) {
  //   const urlEntry = this.store[id];
  //   if (!urlEntry) {
  //     throw new Error('URL not found');
  //   }
  //   return urlEntry.url;
  // }

  saveURL(url: URL) {
    const id = customIdGenerator();
    const urlEntry: URLEntry = {
      url,
      id,
      created_at: new Date().toISOString(),
      stats: {
        hits: 0,
      },
    };
    this.store[id] = urlEntry;
    return id;
  }

  getStats(id: string) {
    const urlEntry = this.store[id];
    if (!urlEntry) {
      throw new Error('URL not found');
    }
    return urlEntry.stats;
  }

  reset() {
    this.store = {};
  }
}
export default URLStore

export const urlStore = new URLStore();