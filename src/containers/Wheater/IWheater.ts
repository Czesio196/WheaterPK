import { City } from '../../models';
import { IWheaterResponse } from '../../services';

export interface IWheaterProps {
    changeLoader(showHide: boolean): void;
    city: City | null;
}

export interface IWheaterState {
    wheaterResponse: IWheaterResponse | null;
}
