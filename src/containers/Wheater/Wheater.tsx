import './Wheater.scss';

import React from 'react';

import { lazyInject } from '../../inversify.config';
import { Coords } from '../../models';
import { DarkSkyApiServiceSymbol, IDarkSkyApi } from '../../services';
import { IWheaterProps, IWheaterState } from './IWheater';

export class Wheater extends React.Component<IWheaterProps, IWheaterState> {
    @lazyInject(DarkSkyApiServiceSymbol) private readonly darkSkyApiService!: IDarkSkyApi;

    constructor(props: IWheaterProps) {
        super(props);

        this.state = {
            wheaterResponse: null,
        };
    }

    public componentWillReceiveProps(nextProps: IWheaterProps) {
        const { city } = nextProps;
        if (!city) {
            return;
        }

        this.getWheater(city.coords);
    }

    public render() {
        const { city, changeLoader } = this.props;
        const { wheaterResponse } = this.state;

        if (!city || !wheaterResponse) {
            return null;
        }

        changeLoader(false);

        const { wheater, units } = wheaterResponse;

        return (
            <div className="wheater">
                <h2>
                    City: <span>TEST</span>
                </h2>
                <div className="wheater_summary">
                    <div>
                        <div>Summary: </div>
                        <div>
                            <strong>{wheater.summary}</strong>
                        </div>
                    </div>
                    <div>
                        <div>Wind Direction: </div>
                        <div>{wheater.windDirection}</div>
                    </div>
                    <div>
                        <div>Temperature: </div>
                        <div>
                            {wheater.temperature} {units.temperature}
                        </div>
                    </div>
                    <div>
                        <div>Wind Speed: </div>
                        <div>
                            {wheater.temperature} {units.temperature}
                        </div>
                    </div>
                    <div>
                        <div>Pressure: </div>
                        <div>
                            {wheater.pressure} {units.pressure}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private async getWheater(position: Coords) {
        const wheaterResponse = await this.darkSkyApiService.loadCurrent(position);

        this.setState({ wheaterResponse });
    }
}
