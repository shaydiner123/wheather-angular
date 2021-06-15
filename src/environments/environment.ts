export const environment = {
  production: false,
  //WEATHER API
  WEATHER_API_KEY: 'KVz0JDL6gH6pUl3RkUKqTeGWLEcaAd2G',
  FORCAST_API_URL:
    'http://dataservice.accuweather.com/forecasts/v1/daily/5day/',
  CURRENT_API_URL: 'http://dataservice.accuweather.com/currentconditions/v1/',
  AUTO_COMPLETE_URL:
    'http://dataservice.accuweather.com/locations/v1/cities/autocomplete',
  GEOPOSITION_URL:
    'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search',
};

//http://dataservice.accuweather.com/forecasts/v1/daily/5day/{locationKey}

// Returns daily forecast data for a specific location. Forecast searches
// require a location key. Please use the Locations API to obtain the
// location key for your desired location. By default, a truncated version
//  of the hourly forecast data is returned. The full object can be
//   obtained by passing "details=true" into the url string.

//http://dataservice.accuweather.com/currentconditions/v1/{locationKey}

//auto complete
