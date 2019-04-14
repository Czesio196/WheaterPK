import { injectable } from 'inversify';

import { Coords } from '../Coords';
import { City } from './City';

export interface ICityFactory {
    setId(id: number): CityFactory;
    setName(name: string): CityFactory;
    setCountry(country: string): CityFactory;
    setCoords(lon: string, lat: string): CityFactory;
    get(): City;
}

export const CityFactorySymbol = Symbol.for('CityFactory');
@injectable()
export class CityFactory implements ICityFactory {
    public name!: string;
    public country!: string;
    public id!: number;
    public coords!: Coords;

    public setId(id: number): CityFactory {
        this.id = id;
        return this;
    }

    public setName(name: string): CityFactory {
        this.name = name;
        return this;
    }

    public setCountry(country: string): CityFactory {
        this.country = country;
        return this;
    }

    public setCoords(lon: string, lat: string): CityFactory {
        this.coords = new Coords(lon, lat);
        return this;
    }

    public get(): City {
        return new City(this.id, this.name, this.country, this.coords);
    }
}
