import { Request } from "express";
import { URLVisit } from "typings";

class URLVisits {
  visits: URLVisit[] = [];
  constructor() { }

  logVisit(urlId: string, req: Request) {
    const visit: URLVisit = {
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'] || "",
      ip: req.ip,
      urlId: urlId
    }
    this.visits.push(visit);
  }

  getVisitsByURLId(id: string) {
    return this.visits.filter(visit => visit.urlId === id)
  }

  reset() {
    this.visits = []
  }
}

export const urlVisits = new URLVisits();

export default URLVisits;