import * as React from 'react';
import './App.css';
import MapBus from './Map';
import RouteListContainer from './RouteListContainer';
import UpdateSettingsContainer from "./UpdateSettingsContainer";
import logo from './logo.svg';
import Init from './init';
import { BusActionCreators } from './stuff';
class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <div className="col-xs-10 col-md-6" id="mapContainer">
            <MapBus />
        </div>
        <div className="col-xs-10 col-md-3">
            <RouteListContainer routes={{}} toggleRoute={() => { }} />
        </div>
        <div className="col-xs-10 col-md-1">
            <UpdateSettingsContainer time={Init.store.getState().PollingInterval}
                    togglePolling={(x) => Init.store.dispatch(BusActionCreators.setPollingInterval(x))} />
        </div>
      </div>
    );
  }
}

export default App;
