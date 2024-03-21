import { URLEntry } from "typings";
import { customIdGenerator } from "utils";


class URLStore {
  private store: Record<string, URLEntry> = {};

  // get URL by id and increment stats
  getUrl(id: string) {
    const urlEntry = this.store[id];
    if (!urlEntry) {
      throw new Error('URL not found');
    }
    urlEntry.stats.hits++;
    return urlEntry.url;
  }

  // decode id without incrementing stats
  decodeId(id: string) {
    const urlEntry = this.store[id];
    if (!urlEntry) {
      throw new Error('URL not found');
    }
    return urlEntry.url;
  }

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
  }

  getStats(id: string) {
    const urlEntry = this.store[id];
    if (!urlEntry) {
      throw new Error('URL not found');
    }
    return urlEntry.stats;
  }
}

export default URLStore