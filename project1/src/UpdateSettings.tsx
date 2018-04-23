import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import Init from './init';

class UpdateSettings extends React.Component<{ time : number, togglePolling: (x: number) => void}>{
    render() {
        return (
            <div className="route-list">
                <h1>Adjust update rate</h1>
                <div className="col-md-10 col-xs-25">
                    <input type="radio" name="update" id="5sec_radio" value="5000" checked={this.props.time == 5000} onChange={(e) => this.props.togglePolling(5000)} />5 seconds
                </div>
                <div className="col-md-10 col-xs-25">
                    <input type="radio" name="update" id="30sec_radio" value="30000" checked={this.props.time == 30000} onChange={(e) => this.props.togglePolling(30000)} />30 seconds
                </div>
                <div className="col-md-10 col-xs-25">
                    <input type="radio" name="update" id="1min_radio" value="60000" checked={this.props.time == 60000} onChange={(e) => this.props.togglePolling(60000)} />1 minute
                </div>
                <div className="col-md-10 col-xs-25">
                    <input type="radio" name="update" id="5min_radio" value="300000" checked={this.props.time == 300000} onChange={(e) => this.props.togglePolling(300000)} />5 minutes
                </div>
            </div>
        );
    }
}

export default UpdateSettings;