import { Degree } from './FiveDaysForcastResult.model';

export interface CurrentCondition {
  LocalObservationDateTime: Date;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: any;
  IsDayTime: boolean;
  Temperature: {
    Metric: Degree;
    Imperial: Degree;
  };
  MobileLink: string;
  Link: string;
}
