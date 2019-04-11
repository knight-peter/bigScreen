<!--
# Module  : hdmap[GIS底图封装]
# Author  : xujiawe@chinahddz.com
# Date    : 2017-05-22
# Version : 1.0

@params:
type: 未配置时取后台customer中定义
    // case "tdt":{    //天地图
    // case "tdtwx":{  //天地图（影像）
    // case "gd":{     //高德
    // case "gdwx":{   //高德（影像）
    // case "bd":{     //百度
    // case "bdwx":{   //百度（影像）
    // case "gg":{     //谷歌
    // case "yjms":{   //夜间模式
    // case "rjms":{   //日间模式
-->
<template>
    <div class="map">
        <div :id='id' class="container"></div>
    </div>
</template>
<script>
    import {Gis} from '../../modules/service';
    import {GlobalGis} from '../../modules/service';
    const L=require('./L.js');
    const proj4 = require('../../modules/leaflet-plugins/proj4.js');
    const coordtransform = require('coordtransform');
    require('proj4leaflet');
    export default {
        props:{
            type:"",
            id:null,
            // gis:{
            //     type:Object,
            //     default(){
            //         return {
            //             zoom:8,
            //             lat:22.533123,
            //             lng:114.112133,
            //             minZoom:5,
            //             maxZoom:18
            //         }
            //     }
            // }
        },
        store:[],
        data() {
            return {             
                mapty:"gd",//判断地图类型,
                gis:{
                    zoom:8,
                    lat:22.533123,
                    lng:114.112133,
                    minzoom:5,
                    maxzoom:18
                },
            }
        },
        created(){
            this.mapty = "gd"
        },
        methods: {
            ChangeMap:function (t,n) {
                this.mapname = n;
                this.mapty = t;
                if(t=="gd"){
                    this.mapty = "gd";
                }else if(t=="gdwx"){
                    this.mapty = "gd";
                }else if(t=="bd"){
                    this.mapty = "bd";
                }else if(t=="bdwx"){
                    this.mapty = "bd";
                }else if(t=="yjms"){
                    this.mapty = "gd";
                }else if(t=="gg"){
                    this.mapty = "gg";
                }else if(t=="rjms"){
                    this.mapty = "gd";
                }else if(t=="tdt"){
                    this.mapty = "tdt";
                }else if(t=="tdtwx"){
                    this.mapty = "tdt";
                }
                this.renderMap(true);
            },
            CreateLayer: function () {
                return new L.featureGroup().addTo(this.map);
            },
            RemoveLayer:function (_layer) {
                this.map.removeLayer(_layer);
            },
            Render: function (CB) {
                let self = this;
                if($(`#${self.id}`).hasClass("leaflet-container")){
                    self.map.remove();
                }
                self.renderLayer(CB);
            },
            renderLayer:function(CB){
                let self = this;
                $(`#${self.id}`).resize(function(){
                    if(self.map){
                        if(self.map.invalidateSize){
                            self.map.invalidateSize();
                        }
                    }
                });
                self.renderMap();
                if(CB){
                    CB();
                }
            },
            renderMap:function (notfirst) {
                var self = this;
                switch (this.mapty){
                    case "tdt":{    //天地图
                        this.renderTianDiTu();
                    }break;
                    case "tdtwx":{  //天地图（影像）
                        this.renderTianDiTu(true);
                    }break;
                    case "gd":{     //高德
                        this.renderGaode();
                    }break;
                    case "gdwx":{   //高德（影像）
                        this.renderGaode(true);
                    }break;
                    case "bd":{     //百度
                        this.renderBaidu();
                    }break;
                    case "bdwx":{   //百度（影像）
                        this.renderBaidu(true);
                    }break;
                    case "gg":{     //谷歌
                        this.renderGuge();
                    }break;
                    case "yjms":{   //夜间模式
                        this.renderYjms();
                    }break;
                    case "rjms":{   //日间模式
                        this.renderYjms(true);
                    }break;
                    case "arcgis":{
                        this.renderArcgis();
                    }break;
                }
            },
            renderGaode:function (wx) {
                if (this.map) {
                    if(this.map.remove){
                        this.map.remove();
                    }
                }
                var normal;
                if(wx){
                    var imgm = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {
                        maxZoom: 18,
                        minZoom: 5
                    });
                    var imga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {
                        maxZoom: 18,
                        minZoom: 5
                    });
                    normal = L.layerGroup([imgm, imga]);
                }else{
                    var normalm = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
                        maxZoom: 18,
                        minZoom: 5
                    });
                    normal = L.layerGroup([normalm]);
                }
                var map = this.map = L.map(this.id, {
                    center: [this.gis.lat||22.533123, this.gis.lng||114.112133],
                    zoom: this.gis.zoom,
                    layers: [normal],
                    attributionControl:false,
                    zoomControl:false,
                    minZoom:this.gis.minzoom,
                    maxZoom:this.gis.maxzoom
                });
                this.$emit('complete');
            },
            renderArcgis:function () {
                if(this.map) {
                    if(this.map.remove){
                        this.map.remove();
                    }
                }
                let proj = this.gis.proj4,self = this;
                let origin = self.gis.origin.split(',');
                for(let i=0;i<origin.length;i++){
                    origin[i] = parseFloat(origin[i]);
                }
                let resolution = self.gis.resolution.split(',');
                for(let i=0;i<resolution.length;i++){
                    resolution[i] = parseFloat(resolution[i]);
                }
                let crs = new L.Proj.CRS("EPSG:2435", proj,
                {
                    origin: origin,
                    resolutions: resolution
                });
                let tileLayer = new L.TileLayer(`${self.gis.service}/tile/{z}/{y}/{x}`);
                let normal  = new L.layerGroup([tileLayer]);
                let region = self.gis.region.split(',');
                for(let i=0;i<region.length;i++){
                    region[i] = parseFloat(region[i]);
                }
                let center = proj4(self.gis.proj4).inverse([(region[0] + region[2])/2, (region[1] + region[3])/2]);
                let map = self.map = L.map(self.id, {
                    center: center.reverse(),
                    zoom: this.gis.zoom,
                    attributionControl:false,
                    zoomControl:false,
                    minZoom:this.gis.minzoom,
                    maxZoom:this.gis.maxzoom,
                    doubleClickZoom: false,
                    crs:crs,
                    layers: [normal]
                });
                this.$emit('complete','arcgis');

            },
            renderTianDiTu:function (wx) {
                if (this.map) {
                    if(this.map.remove){
                        this.map.remove();
                    }
                }
                var normal;
                if(wx){
                    var imgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {
                        maxZoom: 18,
                        minZoom: 5
                    });
                    var imga = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {
                        maxZoom: 18,
                        minZoom: 5
                    });
                    normal = L.layerGroup([imgm, imga]);
                }else{
                    var normalm = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
                        maxZoom: 18,
                        minZoom: 5
                    });
                    normal = L.layerGroup([normalm]);
                }
                var map = this.map = L.map(this.id, {
                    center: [this.gis.lat||22.533123, this.gis.lng||114.112133],
                    zoom: this.gis.zoom,
                    layers: [normal],
                    attributionControl:false,
                    zoomControl:false,
                    minZoom:this.gis.minzoom,
                    maxZoom:this.gis.maxzoom
                });
                this.$emit('complete');
            },
            renderBaidu:function (wx) {
                if (this.map) {
                    if(this.map.remove){
                        this.map.remove();
                    }
                }
                var crs = new L.Proj.CRS('EPSG:900913', '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
                    {
                        resolutions: function () {
                            var level = 19;
                            var res = [];
                            res[0] = Math.pow(2, 18);
                            for (var i = 1; i < level; i++) {
                                res[i] = Math.pow(2, (18 - i))
                            }
                            return res;
                        }(),
                        origin: [0,0],
                        bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
                    });
                var latlng = this.gcjtobd(this.gis.lat,this.gis.lng);
                var map = this.map =  L.map(this.id, {
                    crs: crs,
                    center: [this.gis.lat||22.533123, this.gis.lng||114.112133],
                    zoom: this.gis.zoom,
                    attributionControl:false,
                    zoomControl:false,
                    minZoom:this.gis.minzoom,
                    maxZoom:this.gis.maxzoom
                });
                if(wx){
                    new L.TileLayer('http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46&udt=20170412&app=webearth2&v=009&udt=20170412', {
                        maxZoom: 18,
                        minZoom: 5,
                        subdomains: [0,1,2],
                        tms: true
                    }).addTo(map);
                    new L.TileLayer('http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=sl&udt=20170412', {
                        maxZoom: 18,
                        minZoom: 5,
                        subdomains: [0,1,2],
                        tms: true
                    }).addTo(map);
                }else{
                    new L.TileLayer('http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20170412', {
                        maxZoom: 18,
                        minZoom: 5,
                        subdomains: [0,1,2],
                        tms: true
                    }).addTo(map);
                }
                this.$emit('complete');
            },
            renderGuge:function(wx){
                if (this.map) {
                    if(this.map.remove){
                        this.map.remove();
                    }
                }
                var normal;
                if(wx){
                    var imgm = L.tileLayer.chinaProvider('Google.Satellite.Map', {
                        maxZoom: 18,
                        minZoom: 5
                    });
                    normal = L.layerGroup([imgm]);
                }else{
                    var normalm = L.tileLayer.chinaProvider('Google.Normal.Map', {
                        maxZoom: 18,
                        minZoom: 5
                    });
                    normal = L.layerGroup([normalm]);
                }
                var map = this.map = L.map(this.id, {
                    center: [this.gis.lat||22.533123, this.gis.lng||114.112133],
                    zoom: this.gis.zoom,
                    layers: [normal],
                    attributionControl:false,
                    zoomControl:false,
                    minZoom:this.gis.minzoom,
                    maxZoom:this.gis.maxzoom
                });
                
                this.$emit('complete');
            },
            gcjtobd:function (lat,lng) {
                return coordtransform.gcj02tobd09(lng, lat).reverse();
            }
        },
    }
</script>

<style lang='less'>
    .map{
        height: 100%;
        position: relative;
        .container{
            height: 100%;
            width: 100%;
            padding: 0;
            margin: 0;
            .leaflet-control{
                margin-bottom: 50px;
            }
        }
    }
</style>