import {Coordinate} from "ol/coordinate";
import {Extent} from "ol/extent";
import {Size} from "ol/size";
import LayerGroup from "ol/layer/Group";
import TileLayer from "ol/layer/Tile";
import {OSM, XYZ} from "ol/source";
import {Circle, LineString, Polygon} from "ol/geom";
import {getArea, getLength} from "ol/sphere";

export class DefaultSettingMap {

    static Host = 'autotimelapse.com';
    static UrlCdnScIconMarker = `https://cdn-sc.${DefaultSettingMap.Host}/files/icon/marker`;
    static continuePolygonMsg = 'Click to continue drawing the polygon';
    static continueLineMsg = 'Click to continue drawing the line';

    static DefaultEPSG = 'EPSG:4326';

    static baseLayerGroup = new LayerGroup({
        // @ts-ignore
        name: 'Layergroup',
        visible: true,
        layers: [
            new TileLayer({
                // @ts-ignore
                title: 'Google Roadmap',
                type: 'base',
                visible: true,
                preload: Infinity,
                source: new XYZ({
                    url: 'https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}',
                    crossOrigin: '',
                })
            }),
            new TileLayer({
                // @ts-ignore
                title: 'Google Terrain',
                type: 'base',
                visible: false,
                preload: Infinity,
                source: new XYZ({
                    url: 'https://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
                    crossOrigin: '',
                })
            }),
            new TileLayer({
                // @ts-ignore
                title: 'Google Satellite only',
                type: 'base',
                visible: false,
                preload: Infinity,
                source: new XYZ({
                    url: 'https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}',
                    crossOrigin: '',

                })
            }),
            new TileLayer({
                // @ts-ignore
                title: 'Open Street Map',
                type: 'base',
                visible: false,
                preload: Infinity,
                source: new OSM({
                    crossOrigin: '',

                })
            }),
        ]
    });

    static GoogleMapKey = 'AIzaSyA7lClxgJVRg0xqLXjFlf4MDe-OYiidd1w';

    static mapMinZoom: number = 15;
    static mapMaxZoom: number = 22;

    static defaultZoom: number = 15;
    static defaultTileGridExtent: Extent = [-180, -90, 180, 90];
    static defaultTileGridOrigin: Coordinate = [-180, -90];
    static defaultTileGridResolutions: number[] = [1.40625, 0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 0.0006866455078125, 0.00034332275390625, 0.000171661376953125, 8.58306884765625e-05, 4.291534423828125e-05, 2.1457672119140625e-05, 1.07288360595703125e-05, 5.36441802978515625e-06, 2.68220901489257812e-06, 1.34110450744628906e-06, 6.70552253723144531e-07];
    static defaultTileSize: Size = [256, 256];
    static defaultContourStyle: string = 'Contour';
    static defaultCenter: Coordinate = [105.84308235369714, 21.006284117960863];

    static formatLength = function (line: LineString) {
        const length = getLength(line, {
            projection: DefaultSettingMap.DefaultEPSG,
        });
        let output;
        if (length > 100) {
            output = Math.round((length / 1000) * 100) / 100 + ' km';
        } else {
            output = Math.round(length * 100) / 100 + ' m';
        }
        return output;
    };

    static formatArea = function (polygon: Polygon) {
        const area = getArea(polygon, {
            projection: DefaultSettingMap.DefaultEPSG,
        });
        let output;
        if (area > 10000) {
            output = Math.round((area / 1000000) * 100) / 100 + ' km<sup>2</sup>';
        } else {
            output = Math.round(area * 100) / 100 + ' m<sup>2</sup>';
        }
        return output;
    };
    static formatCircle = function (circle: Circle) {
        const radius = circle.getRadius();
        console.log(radius)
        let output;
        if (radius * 1000 > Math.PI) {
            output = (Math.PI * (radius * 100) * (radius * 100)).toFixed(3) + ' km<sup>2</sup>';
        } else {
            output = (Math.PI * (radius * 10000) * (radius * 10000)).toFixed(3) + '  m<sup>2</sup>';
        }
        return output;
    };
}