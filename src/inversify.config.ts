import { Container } from 'inversify';

import { CityFactory, CityFactorySymbol, ICityFactory } from './models';
import { CitiesService, CitiesSymbol, DarkSkyApiService, DarkSkyApiServiceSymbol, ICities, IDarkSkyApi } from './services';

const container = new Container();
container
    .bind<IDarkSkyApi>(DarkSkyApiServiceSymbol)
    .to(DarkSkyApiService)
    .inSingletonScope();

container.bind<ICityFactory>(CityFactorySymbol).to(CityFactory);

container
    .bind<ICities>(CitiesSymbol)
    .to(CitiesService)
    .inSingletonScope();

// const { lazyInject } = getDecorators(container);
function lazyInject(identifier: symbol | string) {
    return (protoOrDescriptor: any, name?: any): any => ({
        configurable: false,
        enumerable: false,
        get: () => container.get(identifier),
        set: () => void 0,
    });
}
export { lazyInject };
