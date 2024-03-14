import { getLCP, getFID, getCLS } from 'web-vitals';

export function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getLCP(onPerfEntry);
    getFID(onPerfEntry);
    getCLS(onPerfEntry);
  }
}
