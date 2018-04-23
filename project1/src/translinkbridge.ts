/// <reference path="ReducersCreators.ts" />
declare var Redux: any;
import * as mapboxgl from 'mapbox-gl';
import Init from './init';
import { BusActionCreators, IState, IBusInfo } from './ReducersCreators';
import * as $ from 'jquery';

class TranslinkBridge {
    private poller: NodeJS.Timer;
    private timer = -1;
    private markers2: { [routeNo: string]: { [busNo: string]: { markerInfo: { updated: boolean, marker: any, updateTime: string } } } } = {};
    unsubscribe: any;
    setup() {
        this.setPollingForBusCoordinates();
        this.unsubscribe = Init.store.subscribe(() => this.setPollingForBusCoordinates());
        this.getDataAndPopulate();
    }
    setPollingForBusCoordinates() {
        var pollingTime = Init.store.getState().PollingInterval;
        if (this.timer != pollingTime) {
            if (this.poller)
                clearInterval(this.poller);
            this.poller = setInterval(() => this.getDataAndPopulate(), pollingTime);
            this.timer = pollingTime;
        }
    }

    private update2(resultJson: IBusInfo[]) {
        Init.store.dispatch(BusActionCreators.updateBusses(resultJson));

        var state = Init.store.getState() as IState;
        
        for (let i = 0; i < state.Busses.length; i++) {
            var busRouteFilterState = state.SelectedRoutes.routes[state.Busses[i].RouteNo];
            if ((busRouteFilterState && busRouteFilterState.isVisible) || !busRouteFilterState) {

                if (this.markers2[state.Busses[i].RouteNo]) {
                    var obj = this.markers2[state.Busses[i].RouteNo][state.Busses[i].VehicleNo];
                    if (obj) {
                        if (obj.markerInfo.updateTime !== state.Busses[i].RecordedTime)
                            obj.markerInfo.marker.setLngLat([state.Busses[i].Longitude, state.Busses[i].Latitude]);
                        obj.markerInfo.updated = true;
                        obj.markerInfo.updateTime = state.Busses[i].RecordedTime;
                    }
                    else {
                        var marker = new mapboxgl.Marker().setLngLat([state.Busses[i].Longitude, state.Busses[i].Latitude]).addTo(Init.map);
                        this.markers2[state.Busses[i].RouteNo][state.Busses[i].VehicleNo]
                            = { markerInfo: { marker: marker, updated: true, updateTime: state.Busses[i].RecordedTime } };
                    }
                }
                else {
                    var marker = new mapboxgl.Marker().setLngLat([state.Busses[i].Longitude, state.Busses[i].Latitude]).addTo(Init.map);
                    this.markers2[state.Busses[i].RouteNo] = {};
                    this.markers2[state.Busses[i].RouteNo][state.Busses[i].VehicleNo]
                        = { markerInfo: { marker: marker, updated: true, updateTime: state.Busses[i].RecordedTime } };

                }

            }
            var currentState = Init.store.getState();
            if (!currentState.SelectedRoutes.routes.hasOwnProperty(state.Busses[i].RouteNo))
                Init.store.dispatch(BusActionCreators.addRoute(state.Busses[i].RouteNo));
        }
        var markerKeys = Object.keys(this.markers2);
        for (let i = 0; i < markerKeys.length; i++) {
            var busKeys = Object.keys(this.markers2[markerKeys[i]]);
            for (let j = 0; j < busKeys.length; j++) {
                if (!this.markers2[markerKeys[i]][busKeys[j]].markerInfo.updated) {
                    this.markers2[markerKeys[i]][busKeys[j]].markerInfo.marker.remove();
                    delete this.markers2[markerKeys[i]][busKeys[j]];
                }
                else {
                    this.markers2[markerKeys[i]][busKeys[j]].markerInfo.updated = false;
                }

            }
        }
    }

    toggleRoute(route: string) {
        Init.store.dispatch(BusActionCreators.filterRoute(route));
        var state = Init.store.getState() as IState;
        var stateRoutes = Object.keys(state.SelectedRoutes.routes);

        if (state.SelectedRoutes.routes.hasOwnProperty(route) && this.markers2.hasOwnProperty(route)) {
            var bussesOnRoute = Object.keys(this.markers2[route]);
            if (state.SelectedRoutes.routes[route].isVisible) {
                
                for (let i = 0; i < bussesOnRoute.length; i++) {
                    this.markers2[route][bussesOnRoute[i]].markerInfo.marker.addTo(Init.map);
                }
            }
            else {
                for (let i = 0; i < bussesOnRoute.length; i++) {
                    this.markers2[route][bussesOnRoute[i]].markerInfo.marker.remove();
                }
            }
        }
    }

    getDataAndPopulate() {
        $.ajax("http://translinkproxy.azurewebsites.net/Home/GetTranslinkInfo",
            {
                headers: {
                    Accept: "application/json"
                },
                success: (result: any) => {
                    let resultJson = JSON.parse(result.result);
                    this.update2(resultJson);
                }
            });
    }
}

export default TranslinkBridge;