import { injectable } from 'inversify';

import { lazyInject } from '../inversify.config';
import { City, CityFactorySymbol, ICityFactory } from '../models';

export interface ICities {
    getArrayOfCitiesByName(inputValue: string): City[];
    getCityByName(name: string): Promise<City | undefined>;
    downloadCities(): Promise<void>;
}

export const CitiesSymbol = Symbol.for('Cities');
@injectable()
export class CitiesService implements ICities {
    @lazyInject(CityFactorySymbol) private readonly cityFactory!: ICityFactory;
    public cities: City[] = [];

    public getArrayOfCitiesByName(searchName: string): City[] {
        searchName = searchName.trim().toLowerCase();
        return this.cities.filter(({ name }: City) =>
            name
                .trim()
                .toLowerCase()
                .includes(searchName)
        );
    }

    public async getCityByName(searchName: string): Promise<City | undefined> {
        await this.downloadCities();
        return this.cities.find(({ name }: City) => name === searchName);
    }

    public async downloadCities(): Promise<void> {
        if (!this.cities.length) {
            const cities = require('../assets/poland.cities.json');
            this.cities = cities.map(({ id, name, country, coord }: any) =>
                this.cityFactory
                    .setId(id)
                    .setName(name)
                    .setCountry(country)
                    .setCoords(coord.lon, coord.lat)
                    .get()
            );
        }
    }
}
