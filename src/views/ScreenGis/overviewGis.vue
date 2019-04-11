<template>
  <div id="overviewGipCtr"></div>
</template>
<style lang="less">
html {
  width: 100%;
  height: 100%;
  body {
    width: 100%;
    height: 100%;
  }
}
#overviewGipCtr {
  width: 100%;
  height: 100%;
  .leaflet-popup-content-wrapper {
    background: url("./images/kuang1.png");
    box-shadow: none;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .leaflet-popup-tip-container {
    visibility: hidden;
  }
  .leaflet-popup-close-button {
    position: absolute;
    top: 21px;
    right: 40px;
    background-color: #0d1523;
    padding: 10px;
    border-left: 1px solid #368dcf;
    border-bottom: 1px solid #368dcf;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 6px;
    text-align: center;
    width: 18px;
    height: 14px;
    font: 24px/14px Tahoma, Verdana, sans-serif;
    color: #ffffff;
    text-decoration: none;
  }
  .popupTitle {
    margin-left: 30px;
    margin-top: 30px;
    font-size: 26px;
    color: #00aaff;
  }
  .site-content {
    .lineTitle {
      box-sizing: border-box;
      padding: 0px 30px;
      color: #fff;
      font-size: 22px;

      height: auto;
      display: inline-block;
      width: 100%;
      margin-top: 19px;
      .label {
        margin-top: 5px;
        display: inline-block;
      }
      .line {
        float: right;
        color: #fff;
        width: 60%;
        padding: 6px 0 6px 12px;
        background-color: #1e3b65;
        box-sizing: border-box;

        .util {
          float: right;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
<script>
import proxy from "../../../../web/modules/proxy";
import "leaflet/dist/leaflet.js";
import "leaflet/dist/leaflet.css";
import "leaflet.chinatmsproviders/src/leaflet.ChineseTmsProviders.js";
import api from '../../api'
import mark_icon from "./images/icon.png"
export default {
    data() {
        return {
            areaColor: [
                "rgb(29,84,76)",
                "rgb(75,91,66)",
                "rgb(71,49,80)",
                "rgb(30,78,111)",
                "rgb(47,65,78)",
                "rgb(20,97,108)"
            ],
            layGroup: [],
            flag: true,
            isTest: false,
            scInfo: {
                name: "",
                ssll: "",
                sjlj: ""
            }
        };
    },
    components: {},
    methods: {
        renderMap() {
            var self = this;
            var normalm = L.tileLayer.chinaProvider(
                "Geoq.Normal.PurplishBlue",
                {
                    maxZoom: 18,
                    minZoom: 4
                }
            );

            var normal = L.layerGroup([normalm]);

            // console.log(GCtx.customer)
            var map = (this.map = L.map("overviewGipCtr", {
                center: [23.1033731644, 109.613707557],
                zoom: 13,
                layers: [normal],
                attributionControl: false,
                zoomControl: false
            }));

            this.renderPolygon(map);
            this.renderPoint(map);
        },
        renderPoint(map) {
            var self = this;
            if (self.isTest) {
                var stationIDs = ["56458cdd584ce60ca4df4604","56458cdc584ce60ca4df45f6"]; //测试站点
            } else {
                var stationIDs = [
                    "5bdd708fe642261100abb7ae",
                    "5bd9a5b3e642261b6cba181d",
                    "5be3f874e6422646f871d9a3",
                    "5be3f875e6422646f871d9a4",
                    "5bdaaa3de642261b6cba216b"
                ];
            }
            api._station_list().then(response => {

                    var stations = response.Data;
                    $.each(stations, function(i, ele) {
                        self.scInfo.name = ele.Station.Name;
                        var myIcon = L.icon({
                            iconUrl:mark_icon, //图标地址
                            // file:static/webapp/static/customs/guigang/page
                            iconSize: [30, 30] // 图标宽高
                        });
                        if (!!ele.Station.Position) {
                            var marker = new L.marker(
                                [ele.Station.Position.Lat, ele.Station.Position.Lng],
                                {
                                    icon: myIcon,
                                    riseOnHover: true
                                }
                            );
                            var ssll = "";
                            var sjlj = "";
                            $.each(ele.Sensors, function(i, _ele) {
                                if ((_ele.DType == "SSLL")) {
                                    ssll = _ele.Value;
                                } else if ((_ele.DType == "SJLJ")) {
                                    $.ajaxSettings.async = false;
                                    proxy.Post("/guigang/jrlj/query.json", {
                                        senserId:[_ele.Id],today:Date.parse(new Date()) / 1000
                                    }, response => {
                                        sjlj=response[_ele.Id] || ''

                                    });

                                    $.ajaxSettings.async = true;
                                }
                            });
                            marker.bindPopup(
                                `<div class="site-box box-shadow-1" style="z-index:-1;">
                                    <h2 class="popupTitle">${
                                        ele.Station.Name
                                    }</h2>
                                    <div class="site-content"  style="width:450px;height:250px;">
                                        <div class="lineTitle"><span class="label">供水流量：</span><div class="line">${ssll} <span class="util">m³/h</span></div></div>
                                        <div class="lineTitle"><span class="label">供水累计：</span><div class="line">${sjlj} <span class="util">m³</span></div></div>
                                    </div>
                                    </div>`,
                                {
                                    className: "bubble",
                                    closeButton: true,
                                    offset: [-260, 50],
                                    maxWidth: "450"
                                    // maxHeight:"250"
                                }
                            );
                            marker.addTo(map);
                        }
                    });
                })

        },
        renderPolygon(map) {
            var self = this;
            api._fqjl_dvtree().then(response => {
                $.each(response, function(i, ele) {
                    if (!!ele.area && ele.lv == 1) {
                        var arr = ele.area.split(",");
                        var res = arr.map(d => d.split(" "));

                        var realLatlng = [];
                        $.each(res, function(j, itm) {
                            realLatlng.push(itm.reverse());
                        });

                        var polygon = L.polygon(realLatlng, {
                            weight: 1,
                            color: "#fff",
                            fillColor: ele.color || '#fff',
                            fillOpacity: 0.6
                        }).addTo(map);

                        var num = self.getSubNum(response, ele);
                        var layers = [];

                        polygon.bindPopup(
                           `<div class="site-box box-shadow-1" style="z-index:-1;">
                                    <h2 class="popupTitle">${
                                        ele.name
                                    }</h2>
                                    <div class="site-content"  style="width:450px;height:250px;">
                                        <div class="lineTitle"><span class="label">DMA分区数</span><div class="line">${num} <span class="util">个</span></div></div>
                                    </div>
                                    </div>`,
                                {
                                    className: "bubble",
                                    closeButton: true,
                                    offset: [-320, 0],
                                    maxWidth: "450"

                                }
                        )
                        polygon.on("mouseover", function(e) {

                            if (self.flag) {
                                this.openPopup()
                                self.flag = false;
                            }
                        });
                        polygon.on("mouseout", function(e) {
                            var _that=this
                            setTimeout(function(){
                                _that.closePopup()
                            },1000)

                            self.flag = true;
                        });
                    }
                });
            })
            /* proxy.Post("/fqjl/dvtree.json", { gis: true }, response => {
                $.each(response, function(i, ele) {
                    if (!!ele.area && ele.lv == 1) {
                        var arr = ele.area.split(",");
                        var res = arr.map(d => d.split(" "));

                        var realLatlng = [];
                        $.each(res, function(j, itm) {
                            realLatlng.push(itm.reverse());
                        });

                        var polygon = L.polygon(realLatlng, {
                            weight: 1,
                            color: "#fff",
                            fillColor: ele.color || '#fff',
                            fillOpacity: 0.6
                        }).addTo(map);

                        var num = self.getSubNum(response, ele);
                        var layers = [];

                        polygon.bindPopup(
                           `<div class="site-box box-shadow-1" style="z-index:-1;">
                                    <h2 class="popupTitle">${
                                        ele.name
                                    }</h2>
                                    <div class="site-content"  style="width:450px;height:250px;">
                                        <div class="lineTitle"><span class="label">DMA分区数</span><div class="line">${num} <span class="util">个</span></div></div>
                                    </div>
                                    </div>`,
                                {
                                    className: "bubble",
                                    closeButton: true,
                                    offset: [-320, 0],
                                    maxWidth: "450"

                                }
                        )
                        polygon.on("mouseover", function(e) {

                            if (self.flag) {
                                // var center = this.getCenter();
                                // var myIcon = L.divIcon({
                                //     className: "my-div-icon",
                                //     html: `<div style='text-align:center;width:100%;height:100%;line-height:12px;color:#fff;font-size:15px;white-space: nowrap;'>${
                                //         ele.name
                                //     }</div>`,
                                //     iconSize: [80, 12]
                                // });
                                // var marker = new L.marker(
                                //     [center.lat, center.lng],
                                //     {
                                //         icon: myIcon
                                //     }
                                // );
                                // layers.push(marker);
                                // self.layGroup = L.layerGroup(layers);
                                // self.map.addLayer(self.layGroup);
                                this.openPopup()
                                self.flag = false;
                            }
                        });
                        polygon.on("mouseout", function(e) {
                            var _that=this
                            // if (!!self.layGroup) {
                            //     self.layGroup.clearLayers();
                            // }
                            setTimeout(function(){
                                _that.closePopup()
                            },1000)

                            self.flag = true;
                        });
                    }
                });
            }); */
        },
        getSubNum(data, target) {
            var filterdata = data.filter(function(d) {
                return d.pid == target._id;
            });

            return filterdata.length;
        }
    },
    mounted() {
        this.renderMap();
    }
};
</script>
