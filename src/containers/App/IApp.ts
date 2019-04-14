import { City } from '../../models';

export interface IAppProps {}

export interface IAppState {
    city: City | null;
    showLoader: boolean;
}
