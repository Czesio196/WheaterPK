import { City } from '../../models';

export interface ILocationContainerProps {
    onCityChange(selectedCity: City | null): void;
}

export interface ILocationContainerState {
    value: string;
    suggestions: any[];
    selected: City | null;
}
