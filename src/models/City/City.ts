import { Coords } from '../Coords';
import { ICity } from './ICity';

export class City implements ICity {
    public id: number;
    public name: string;
    public country: string;
    public coords: Coords;

    constructor(id: number, name: string, country: string, coords: Coords) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.coords = coords;
    }
}
