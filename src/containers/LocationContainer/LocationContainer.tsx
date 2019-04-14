import './LocationContainer.scss';

import autobind from 'autobind-decorator';
import React from 'react';
import Autosuggest from 'react-autosuggest';

import { debounce } from '../../debounce';
import { lazyInject } from '../../inversify.config';
import { City } from '../../models';
import { CitiesSymbol, ICities } from '../../services';
import { ILocationContainerProps, ILocationContainerState } from './ILocationContainer';

export class LocationContainer extends React.Component<ILocationContainerProps, ILocationContainerState> {
    @lazyInject(CitiesSymbol) private readonly citiesService!: ICities;

    constructor(props: ILocationContainerProps) {
        super(props);
        this.state = {
            value: '',
            suggestions: [],
            selected: null,
        };

        this.onSuggestionsFetchRequested = debounce(this.onSuggestionsFetchRequested, 100);
    }

    @autobind
    private onSearchClick() {
        this.props.onCityChange(this.state.selected);
    }

    @autobind
    private onSuggestionSelected(event: any, { suggestion: selected }: any) {
        this.setState({ selected });
    }

    @autobind
    private onChange(event: any, { newValue: value }: any) {
        this.setState({ value });
    }

    @autobind
    private onSuggestionsFetchRequested({ value }: any) {
        const inputValue = value.trim().toLowerCase();

        this.setState({
            suggestions: inputValue.length === 0 ? [] : this.citiesService.getArrayOfCitiesByName(inputValue),
        });
    }

    @autobind
    private onSuggestionsClearRequested() {
        this.setState({
            suggestions: [],
        });
    }

    private getSuggestionValue(suggestion: City) {
        return suggestion.name;
    }

    public render() {
        return (
            <div className="locationContainer">
                <Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.getSuggestionValue}
                    onSuggestionSelected={this.onSuggestionSelected}
                    inputProps={{
                        placeholder: 'Type name of Poland city',
                        value: this.state.value,
                        onChange: this.onChange,
                    }}
                />
                <button className="locationContainer_search" onClick={this.onSearchClick}>
                    Search
                </button>
            </div>
        );
    }
}
