export interface IWheater {
    apparentTemperature: number;
    cloudCover: number;
    dateTime: any; // moment
    dewPoint: number;
    humidity: number;
    icon: string;
    ozone: number;
    precipIntensity: number;
    precipProbability: number;
    pressure: number;
    summary: string;
    temperature: number;
    time: number;
    uvIndex: number;
    visibility: number;
    windBearing: number;
    windDirection: string;
    windGust: number;
    windSpeed: number;
}
