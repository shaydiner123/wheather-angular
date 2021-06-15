import { Location } from '../models/Location';

export interface ForcastResult {
  Headline: Headline;
  DailyForecasts: DailyForecast[];
  Location?: Location;
}

interface Headline {
  EffectiveDate: string;
  EffectiveEpochDate: number;
  Severity: number;
  Text: string;
  Category: string;
  EndDate: string;
  EndEpochDate: number;
  MobileLink: string;
  Link: string;
}

export interface DailyForecast {
  Date: string;
  EpochDate: number;
  Temperature: Temperature;
  Day: TwelveHoursPeriod;
  Night: TwelveHoursPeriod;
  Sources: string[];
  MobileLink: string;
  Link: string;
}

interface Temperature {
  Minimum: Degree;
  Maximum: Degree;
}

export interface Degree {
  Value: number;
  Unit: string;
  UnitType: number;
}

export interface TwelveHoursPeriod {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  PrecipitationType?: string;
  PrecipitationIntensity?: string;
}
