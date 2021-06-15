export interface AutoCompleteResult {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: Area;
  AdministrativeArea: Area;
}

interface Area {
  ID: string;
  LocalizedName: string;
}
