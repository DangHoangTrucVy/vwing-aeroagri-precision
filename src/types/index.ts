export type CropType = 'durian' | 'coffee' | 'avocado';

export interface CropSolution {
  id: CropType;
  name: string;
  subName: string;
  badge: string;
  title: string;
  description: string;
  stats: {
    label: string;
    value: string;
    isPositive?: boolean;
  }[];
  pilotPlot: {
    title: string;
    subtitle: string;
    soilMoisture: string;
    treeCount: string;
    gpsStatus: string;
    image: string;
  };
}

export interface NewsArticle {
  id: string;
  publisher: string;
  date: string;
  title: string;
  summary: string;
  content: string[];
  category: string;
  readTime: string;
}

export interface TelemetryMission {
  id: string;
  code: string;
  location: string;
  crop: string;
  canopyHealthPercent: number;
  altitudeMeters: number;
  speedMs: number;
  windSpeedMs: number;
  batteryPercent: number;
  ndviAverage: number;
  biomassPercent: number;
  canopyAreaM2: number;
  laserPulseFreq: string;
  rtkStatus: string;
  spectralBands: number;
}
