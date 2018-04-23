import * as Redux from 'redux';
import Init from './init';

export interface IState {
    Busses: Array<IBusInfo>;
    SelectedBus: string;
    SelectedRoutes: IRoutesInfo;
    PollingInterval: number;
}


export class BusMapReducers {

    reducer: any;
    constructor() {
        this.reducer = Redux.combineReducers(
            {
                Busses: this.updateBusses,
                SelectedBus: this.selectBus,
                SelectedRoutes: this.toggleRoute,
                PollingInterval: this.setPollingInterval
            });
    }

    setPollingInterval(state: number = 30000, action: ISetPollingIntervalAction): number {
        if (action.type == ActionType.SET_POLLING) {
            return action.interval;
        }
        return state;
    }
    updateBusses(state: Array<IBusInfo> = [], action: IUpdateBusAction): Array<IBusInfo> {
        if (action.type == ActionType.UPDATE_BUSSES)
            return action.busses;
        return state;
    }

    selectBus(state: string = '', action: ISelectBusAction): string {
        if (action.type == ActionType.SELECT_BUS)
            return action.vehicleNo;
        return state;
    }

    toggleRoute(state: IRoutesInfo = { displayAll: true, routes: {} }, action: IFilterRouteAction): IRoutesInfo {
        if (action.type == ActionType.FILTER_ROUTE) {
            let stateCopy = Object.assign({}, state);
            stateCopy.routes = Object.assign({}, state.routes);
            if (!stateCopy.routes.hasOwnProperty(action.routeNo)) //route doesn't exist to be filtered
                return stateCopy;

            stateCopy.routes[action.routeNo].isVisible = !stateCopy.routes[action.routeNo].isVisible;

            return stateCopy;
        }
        else if (action.type == ActionType.CREATE_ROUTES) {
            let stateCopy = Object.assign({}, state);
            stateCopy.routes = Object.assign({}, state.routes);
            if (!stateCopy.routes.hasOwnProperty(action.routeNo))
                stateCopy.routes[action.routeNo] = { isVisible: true };
            return stateCopy;
        }
        return state;
    }


}

export class BusActionCreators {
    static setPollingInterval(interval: number): ISetPollingIntervalAction {
        return {
            type: ActionType.SET_POLLING,
            interval: interval
        }
    }

    static updateBusses(busses: Array<IBusInfo>): IUpdateBusAction {
        return {
            type: ActionType.UPDATE_BUSSES,
            busses: busses
        }
    }

    static filterRoute(route: string): IFilterRouteAction {
        return {
            type: ActionType.FILTER_ROUTE,
            routeNo: route
        }
    }

    static addRoute(route: string): IFilterRouteAction {
        return {
            type: ActionType.CREATE_ROUTES,
            routeNo: route,
        }
    }

    static selectBus(busNo: string): ISelectBusAction {
        return {
            type: ActionType.SELECT_BUS,
            vehicleNo: busNo
        }
    }
}

export interface ISetPollingIntervalAction {
    type: ActionType;
    interval: number;
}
export interface IUpdateBusAction {
    type: ActionType;
    busses: Array<IBusInfo>;
}

export interface IFilterRouteAction {
    type: ActionType;
    routeNo: string;
}

export interface ISelectBusAction {
    type: ActionType;
    vehicleNo: string;
}

export interface IRoutesInfo {
    displayAll: boolean;
    routes: { [routeNo: string]: { isVisible: boolean } };
}

export interface IBusInfo {
    VehicleNo: string;
    TripId: number;
    RouteNo: string;
    Direction: string;
    Destination: string;
    Patter: string;
    Latitude: number;
    Longitude: number;
    RecordedTime: string;
    RouteMap: { Href: string };
    Marker: any;
}

export enum ActionType {
    UPDATE_BUSSES = "UPDATE_BUSSES",
    FILTER_ROUTE = "FILTER_ROUTE",
    SELECT_BUS = "SELECT_BUS",
    SET_POLLING = "SET_POLLING",
    CREATE_ROUTES = "CREATE_ROUTES"
}