import autobind from 'autobind-decorator';
import React from 'react';

import { lazyInject } from '../../inversify.config';
import { City } from '../../models';
import { CitiesSymbol, ICities } from '../../services';
import { Loader } from '../Loader';
import { LocationContainer } from '../LocationContainer';
import { Wheater } from '../Wheater';
import { IAppProps, IAppState } from './IApp';

export class App extends React.Component<IAppProps, IAppState> {
    @lazyInject(CitiesSymbol) private readonly citiesService!: ICities;

    constructor(props: IAppProps) {
        super(props);

        this.state = {
            city: null,
            showLoader: true,
        };
    }

    @autobind
    public changeLoader(showLoader: boolean) {
        this.setState({ showLoader });
    }

    public componentDidMount() {
        this.citiesService.downloadCities().then(() => {
            this.setState({ showLoader: false });
        });
    }

    @autobind
    public onCityChange(city: City) {
        this.changeLoader(true);
        this.setState({ city });
    }

    public render() {
        return (
            <div className="App">
                <Loader show={this.state.showLoader} />
                <LocationContainer onCityChange={this.onCityChange} />
                <Wheater city={this.state.city} changeLoader={this.changeLoader} />
            </div>
        );
    }
}
