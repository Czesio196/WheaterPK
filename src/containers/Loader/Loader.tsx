import './Loader.scss';

import React from 'react';

import { ILoaderProps } from './ILoader';

export class Loader extends React.Component<ILoaderProps> {
    public render() {
        if (!this.props.show) {
            return null;
        }

        return <div className="loader" />;
    }
}
