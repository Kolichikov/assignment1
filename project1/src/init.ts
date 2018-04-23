import * as $ from 'jquery';
import * as mapboxgl from 'mapbox-gl';
import * as React from 'react';
import * as Redux from 'redux';
import TranslinkBridge from "./translinkbridge";
import { BusMapReducers, IState } from './ReducersCreators';
class Init {
    public static map: any;
    public static bridge: any;
    public static store: Redux.Store<IState>;

    constructor() {
        (window as any).jQuery = $;
        (window as any).$ = $;
        (global as any).jQuery = $;

        Init.store = Redux.createStore(new BusMapReducers().reducer);
        Init.bridge = new TranslinkBridge();
        Init.bridge.setup();
    }
}

export default Init;