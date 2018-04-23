import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import Init from './init';

class RouteList extends React.Component<{ routes: { [routeNo: string]: { isVisible: boolean } }, toggleRoute: (x: string) => void}> {
    render() {
        var rows = [];
        var keys = Object.keys(this.props.routes);
        for (let i = 0; i < keys.length; i++) {
            var divId = `${keys[i]}_div`;
            rows.push(<div id={divId} key={keys[i] + "_divKey"} className="col-xs-25"><input type="checkbox" id={keys[i]} key={keys[i] + "checkKey"}
                defaultChecked={this.props.routes[keys[i]].isVisible}
                onClick={(e) => this.props.toggleRoute(keys[i])} />
                <label key={keys[i]+"labelKey"} htmlFor={keys[i]}>{keys[i]}</label></div>);
        }
        return (
            <div className="route-list">
                <h1>Current routes in service:</h1>
                {rows}
            </div>
        );
    }
}

export default RouteList;