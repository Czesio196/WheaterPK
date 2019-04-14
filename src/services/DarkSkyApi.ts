import DarkSkyApi from 'dark-sky-api';
import { injectable } from 'inversify';

import { IWheater, IWheaterUnits } from '../interfaces';
import { Coords } from '../models';

export interface IWheaterResponse {
    wheater: IWheater;
    units: IWheaterUnits;
}

export interface IDarkSkyApi {
    loadCurrent(position: any): Promise<IWheaterResponse>;
}

export const DarkSkyApiServiceSymbol = Symbol.for('DarkSkyApiService');

@injectable()
export class DarkSkyApiService implements IDarkSkyApi {
    private apiInstance!: any;

    constructor() {
        this.apiInstance = new DarkSkyApi('fb4631d3cba1eefe0fda67285dd52c0a', null, 'si', 'us');
    }

    public async loadCurrent(position: Coords): Promise<IWheaterResponse> {
        const wheater = await DarkSkyApi.loadCurrent(position);

        return {
            wheater,
            units: this.apiInstance.getResponseUnits(),
        };
    }
}
