import { CurrentCondition } from './CurrentCondition';
import { Location } from './Location';

export interface Favorite {
  location: Location;
  currentCondition: CurrentCondition | null;
  lastUpdated: Date | null;
}
