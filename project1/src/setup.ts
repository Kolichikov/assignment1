/// <reference path="ReducersCreators.ts" />
import * as mapboxgl from 'mapbox-gl';
import * as React from 'react';
import Init from './init';
import * as Redux from 'redux';
import TranslinkBridge from "./translinkbridge";
import { BusMapReducers } from './ReducersCreators';
class Setup {
    
    constructor() {
        (mapboxgl as any).accessToken = 'pk.eyJ1Ijoia29saWNoaWtvdiIsImEiOiJjaXoweTlpZG0wNTF6MnFvYTYyNzNqeng0In0.Iv86KdGTesIzUEUemPkdug';
        Init.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [-123.067962, 49.246788],
            zoom: 12
        });
        
    }
}

export default Setup;