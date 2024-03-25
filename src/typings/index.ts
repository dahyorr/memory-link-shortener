export interface URLEntry {
  url: URL;
  id: string;
  created_at: string;
  stats: URLStats;
}

export interface URLStats {
  hits: number;
}

export interface URLVisit{
  timestamp: string;
  userAgent: string;
  ip: string;
  urlId: string
}