export interface URLEntry {
  url: URL;
  id: string;
  created_at: string;
  stats: URLStats;
}

export interface URLStats {
  hits: number;
}