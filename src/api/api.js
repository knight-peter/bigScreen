class Api {
  /* 天气 */
  _weather() {
    let res = {
      data: {
        forecast: {
          0: {
            aqi: 21,
            date: "12",
            fl: "<3级",
            fx: "东北风",
            high: "高温 22.0℃",
            low: "低温 17.0℃",
            notice: "出门最好穿雨衣，勿挡视线",
            sunrise: "06:26",
            sunset: "19:01",
            type: "大雨",
            week: "星期五",
            ymd: "2019-04-12"
          },
          1: {
            aqi: 60,
            date: "13",
            fl: "<3级",
            fx: "东风",
            high: "高温 25.0℃",
            low: "低温 18.0℃",
            notice: "雨虽小，注意保暖别感冒",
            sunrise: "06:25",
            sunset: "19:01",
            type: "小雨",
            week: "星期六",
            ymd: "2019-04-13"
          },
          2: {
            aqi: 59,
            date: "14",
            fl: "<3级",
            fx: "东北风",
            high: "高温 26.0℃",
            low: "低温 20.0℃",
            notice: "阵雨来袭，出门记得带伞",
            sunrise: "06:24",
            sunset: "19:02",
            type: "阵雨",
            week: "星期日",
            ymd: "2019-04-14"
          },
          3: {
            aqi: 51,
            date: "15",
            fl: "<3级",
            fx: "东南风",
            high: "高温 25.0℃",
            low: "低温 20.0℃",
            notice: "记得随身携带雨伞哦",
            sunrise: "06:23",
            sunset: "19:02",
            type: "中雨",
            week: "星期一",
            ymd: "2019-04-15"
          }
        }
      }
    };
    return new Promise(resolve => {
      resolve(res);
    });
  }
  /* 最小流量变化曲线 */
  _zxllbh(type) {
    let end;
    let res = {
      ssll_data: [
        [1554393600, -757.0],
        [1554397200, 370.0],
        [1554400800, -426.0],
        [1554404400, -375.0],
        [1554408000, -319.0],
        [1554411600, 633.0],
        [1554422400, 734.0],
        [1554426000, -401.0],
        [1554429600, 20.0],
        [1554433200, -11.0],
        [1554436800, -246.0],
        [1554440400, 342.0],
        [1554444000, -228.0],
        [1554447600, 489.0],
        [1554451200, -1411.0],
        [1554454800, 540.0],
        [1554458400, 80.0],
        [1554462000, -214.0],
        [1554465600, -69.0],
        [1554469200, 472.0],
        [1554472800, -313.0],
        [1554476400, -1111.0],
        [1554480000, -1529.0],
        [1554483600, 178.0],
        [1554487200, -404.0],
        [1554490800, -213.0],
        [1554494400, 13.0],
        [1554498000, 418.0],
        [1554501600, 753.0],
        [1554505200, 2711.0],
        [1554508800, 564.0],
        [1554512400, -341.0],
        [1554516000, -288.0],
        [1554519600, 185.0],
        [1554523200, -98.0],
        [1554526800, -491.0],
        [1554530400, -364.0],
        [1554534000, -392.0],
        [1554537600, -192.0],
        [1554541200, 1266.0],
        [1554544800, 182.0],
        [1554548400, -466.0],
        [1554552000, -59.0],
        [1554555600, 670.0],
        [1554559200, -629.0],
        [1554562800, -685.0],
        [1554566400, -998.0],
        [1554570000, -556.0],
        [1554573600, -737.0],
        [1554577200, -187.0],
        [1554580800, -171.0],
        [1554584400, 511.0],
        [1554588000, 1043.0],
        [1554591600, 2451.0],
        [1554595200, 25.0],
        [1554598800, 124.0],
        [1554602400, -284.0],
        [1554606000, 85.0],
        [1554609600, 312.0],
        [1554613200, -380.0],
        [1554616800, 286.0],
        [1554620400, -50.0],
        [1554624000, -170.0],
        [1554627600, -20.0],
        [1554631200, -17.0],
        [1554634800, -384.0],
        [1554638400, 273.0],
        [1554642000, 34.0],
        [1554645600, -473.0],
        [1554649200, -1877.0],
        [1554652800, -200.0],
        [1554656400, -372.0],
        [1554660000, -277.0],
        [1554663600, -137.0],
        [1554667200, 119.0],
        [1554670800, 679.0],
        [1554674400, 1132.0],
        [1554678000, 1387.0],
        [1554681600, 247.0],
        [1554685200, 30.0],
        [1554688800, 21.0],
        [1554692400, -81.0],
        [1554696000, 240.0],
        [1554699600, -342.0],
        [1554703200, 226.0],
        [1554706800, -831.0],
        [1554710400, 808.0],
        [1554714000, -256.0],
        [1554717600, 299.0],
        [1554721200, -364.0],
        [1554724800, -99.0],
        [1554728400, 913.0],
        [1554732000, -825.0],
        [1554735600, -1111.0],
        [1554739200, -1383.0],
        [1554742800, -179.0],
        [1554746400, -251.0],
        [1554750000, -325.0],
        [1554753600, 2.0],
        [1554757200, 1049.0],
        [1554760800, 998.0],
        [1554764400, 1279.0],
        [1554768000, -267.0],
        [1554771600, -10.0],
        [1554775200, 334.0],
        [1554778800, -161.0],
        [1554782400, 714.0],
        [1554786000, -864.0],
        [1554789600, 522.0],
        [1554793200, -353.0],
        [1554796800, -492.0],
        [1554800400, 602.0],
        [1554804000, 37.0],
        [1554807600, -414.0],
        [1554811200, -100.0],
        [1554814800, 131.0],
        [1554818400, -735.0],
        [1554822000, -1622.0],
        [1554825600, -542.0],
        [1554829200, 152.0],
        [1554832800, -193.0],
        [1554836400, -126.0],
        [1554840000, -153.0],
        [1554843600, 501.0],
        [1554847200, 587.0],
        [1554865200, 1110.0],
        [1554868800, -107.0],
        [1554872400, -836.0],
        [1554876000, -769.0],
        [1554879600, -191.0],
        [1554883200, 272.0],
        [1554886800, 584.0],
        [1554890400, 78.0],
        [1554894000, -347.0],
        [1554897600, -742.0],
        [1554901200, 599.0],
        [1554904800, -157.0],
        [1554908400, -933.0],
        [1554912000, 11.0]
      ],
      xAris_data: [
        1554393600,
        1554480000,
        1554566400,
        1554652800,
        1554739200,
        1554825600,
        1554912000
      ],
      yjzx_data: [
        [1554393780, -830.0],
        [1554488520, -886.0],
        [1554574380, -776.0],
        [1554664080, -560.0],
        [1554746640, -518.0],
        [1554834420, -500.0]
      ]
    };
    switch (type) {
      case 1:
        end = res;
        break;
      case 2:
        end = res;
        break;
      default:
        end = res;
        break;
    }
    // return end;
    return new Promise(resolve => {
      resolve(end);
    });
  }
  /* 区域压力变化曲线 */
  _qyylbh(type) {
    let end;
    let res = {
      min_line_data: [
        ["2019-04-05", "0.220"],
        ["2019-04-06", "0.001"],
        ["2019-04-07", "0.186"],
        ["2019-04-08", "0.117"],
        ["2019-04-09", "0.192"],
        ["2019-04-10", "0.158"],
        ["2019-04-11", "0.168"]
      ],
      xAris_data: [
        "2019-04-05",
        "2019-04-06",
        "2019-04-07",
        "2019-04-08",
        "2019-04-09",
        "2019-04-10",
        "2019-04-11"
      ],
      max_line_data: [
        ["2019-04-05", "0.360"],
        ["2019-04-06", "0.389"],
        ["2019-04-07", "0.375"],
        ["2019-04-08", "0.400"],
        ["2019-04-09", "0.380"],
        ["2019-04-10", "0.370"],
        ["2019-04-11", "0.358"]
      ],
      avg_line_data: [
        ["2019-04-05", "0.27"],
        ["2019-04-06", "0.28"],
        ["2019-04-07", "0.28"],
        ["2019-04-08", "0.28"],
        ["2019-04-09", "0.28"],
        ["2019-04-10", "0.27"],
        ["2019-04-11", "0.24"]
      ]
    };
    switch (type) {
      case 1:
        end = res;
        break;
      case 2:
        end = res;
        break;
      default:
        end = res;
        break;
    }
    return new Promise(resolve => {
      resolve(end);
    });
  }
  /* 分区统计 */
  _fqtj() {
    let res = {
      circle_data: {
        center_name: "\u5e7f\u897f\u8d35\u6e2f\u5317\u63a7\u6c34\u52a1",
        num: 3,
        round_data: [
          {
            num: 4,
            name: "西江农场"
          },
          {
            num: 1,
            name: "侨光岭"
          },
          {
            num: 1,
            name: "南山"
          },
          {
            num: 1,
            name: "根竹镇"
          },
          {
            num: 1,
            name: "上龙"
          },
          {
            num: 1,
            name: "水利大厦"
          },
          {
            num: 1,
            name: "中里乡"
          }
        ]
      },
      level_data: {
        level_1: 3,
        level_2: 7,
        level_3: 10
      }
    };
    return new Promise(resolve => {
      resolve(res);
    });
  }
  /* 区域供水占比图 */
  _qygs() {
    let res = {
      南江水厂: 19430.0,
      龙床井水厂: 33640.0
    };
    return new Promise(resolve => {
      resolve(res);
    });
  }
  /* 分区漏损排名 */
  _fqls() {
    let res = [
      {
        division_name: "侨光岭",
        leakage_percentage: "13.0%",
        water_supply_month: 189874.0,
        water_sale_month: 333
      },
      {
        division_name: "西江农场",
        leakage_percentage: "12.9%",
        water_supply_month: 235465,
        water_sale_month: 5467
      },
      {
        division_name: "中里乡",
        leakage_percentage: "11%",
        water_supply_month: 335465,
        water_sale_month: 546723
      },
      {
        division_name: "水利大厦",
        leakage_percentage: "10%",
        water_supply_month: 234465,
        water_sale_month: 546734
      },
      {
        division_name: "上龙",
        leakage_percentage: "9.8%",
        water_supply_month: 134465,
        water_sale_month: 555734
      },
      {
        division_name: "根竹镇",
        leakage_percentage: "9%",
        water_supply_month: 234465,
        water_sale_month: 546734
      },
      {
        division_name: "南山",
        leakage_percentage: "8%",
        water_supply_month: 134465,
        water_sale_month: 555734
      }
    ];
    return new Promise(resolve => {
      resolve(res);
    });
  }
  /* 小区漏损排名 */
  _xqls() {
    let res = [
      {
        division_name: "桂花园",
        leakage_percentage: "13%",
        water_supply_month: 1000,
        water_sale_month: 3000
      },
      {
        division_name: "红旗新区",
        leakage_percentage: "12.2%",
        water_supply_month: null,
        water_sale_month: null
      },
      {
        division_name: "县东社区",
        leakage_percentage: "11%",
        water_supply_month: null,
        water_sale_month: null
      },
      {
        division_name: "湖畔人家",
        leakage_percentage: "10.5%",
        water_supply_month: 10,
        water_sale_month: 20
      },
      {
        division_name: "贵钢小区",
        leakage_percentage: "10%",
        water_supply_month: 10,
        water_sale_month: 20
      }
    ];
    return new Promise(resolve => {
      resolve(res);
    });
  }
  /* 中间数据展示 */
  _center_data() {
    let res = {
      water_use: 837.0,
      water_use_change: -10.0,
      free: 13.0,
      water_supply: 938.0,
      cxc: 88.0,
      free_change: null,
      leak: 101.0,
      cxc_change: 5.5,
      water_supply_change: 12.5,
      leak_percentage: 9.38,
      leak_percentage_change: null,
      leak_change: 9.9
    };
    return new Promise(resolve => {
      resolve(res);
    });
  }
  /* 地图 */
  _station_list() {
    let res = {
      Data: [],
      Total: 0,
      From: 0,
      Size: 16
    };
    return new Promise(resolve => {
      resolve(res);
    });
  }
  _fqjl_dvtree() {
    let res = [
      {
        area:
          "109.57454681396484 23.0500392175603,109.58209991455078 23.042457092512652,109.61437225341797 23.03455859173856,109.64561462402344 23.031083104715335,109.6658706665039 23.030135229062992,109.68029022216797 23.03455859173856,109.68063354492187 23.042457092512652,109.67720031738281 23.047195970690577,109.67582702636719 23.05351421553845,109.66861724853515 23.063938671278702,109.66312408447265 23.07151958645438,109.65694427490234 23.082574321912375,109.64630126953125 23.08194264722547,109.63703155517578 23.074678175027337,109.6212387084961 23.08099512963042,109.61162567138672 23.085416821274503,109.60132598876953 23.082890158142845,109.59205627441406 23.07657329256602,109.58827972412108 23.070887859839075,109.58484649658203 23.059832163883666",
        color: "#174b87",
        iconCls: "std",
        iconSkin: "std",
        id: "001",
        isParent: false,
        lv: 1,
        name: "南江分区",
        pid: "5bcf3a26e642261150ddf67e",
        _id: "5c26dc51e09375102cb334ed"
      },
      {
        area:
          "109.57789421081543 23.053277286707207,109.57454681396484 23.050197173959503,109.57016944885254 23.05556758127632,109.56793785095213 23.0587265443298,109.56562042236326 23.061727490559796,109.57008361816406 23.074046463246766,109.57042694091797 23.079415918799963,109.57351684570311 23.082890158142845,109.58484649658203 23.084469328165294,109.59720611572264 23.093628148445273,109.60304260253906 23.098996821848434,109.62261199951172 23.100575802607995,109.63102340698242 23.100654751158753,109.63943481445312 23.100260007940914,109.64767456054687 23.100181059158132,109.65591430664062 23.100260007940914,109.65642929077148 23.095128240551595,109.65685844421387 23.091022685510303,109.6570301055908 23.086759091746952,109.65694427490234 23.082495362738807,109.64595794677734 23.081784728090014,109.63720321655273 23.074836102508872,109.62887763977051 23.078073575011032,109.6212387084961 23.08115304969331,109.61677551269531 23.08328495238753,109.61239814758301 23.085179948623292,109.6091365814209 23.085179948623292,109.6076774597168 23.084469328165294,109.60587501525879 23.084153495644827,109.6020984649658 23.082969117084538,109.59840774536133 23.0812320096552,109.59566116333008 23.079021113194262,109.59248542785644 23.07712603015101,109.5875072479248 23.06938749723765,109.58664894104002 23.065833940118736,109.58570480346678 23.06235926018691,109.58467483520506 23.060384970254752,109.5834732055664 23.059516273509302,109.58252906799316 23.05809475764994,109.58115577697754 23.05635732898976",
        color: "#1c8077",
        iconCls: "std",
        iconSkin: "std",
        id: "002",
        isParent: false,
        lv: 1,
        name: "江北旧城区",
        pid: "5bcf3a26e642261150ddf67e",
        _id: "5c26dc5ee09375102cb334ee"
      },
      {
        area:
          "109.63376998901367 23.10041790536725,109.62338447570801 23.100496854010828,109.61179733276367 23.0999442125314,109.60201263427734 23.098286274451482,109.60089683532715 23.09718097103058,109.59978103637695 23.095917755985866,109.59600448608398 23.09268071322303,109.5893096923828 23.08731178745734,109.58476066589355 23.084469328165294,109.57969665527344 23.083600786948526,109.57669258117676 23.083127034828777,109.57497596740722 23.083127034828777,109.57411766052246 23.082811199154793,109.5731735229492 23.08217952558085,109.57154273986815 23.080600328661685,109.57034111022949 23.079021113194262,109.57016944885254 23.074836102508872,109.56965446472168 23.072940960491266,109.56922531127928 23.07207234480905,109.56879615783691 23.071282689321307,109.56716537475586 23.066702596081928,109.5655345916748 23.061964404517532,109.5615005493164 23.065202186804892,109.55703735351562 23.068676793322733,109.55669403076172 23.074994029804955,109.5553207397461 23.081310969570726,109.55120086669922 23.091733271320723,109.54845428466797 23.100891596532662,109.54673767089844 23.110365069004924,109.54811096191406 23.119522123709167,109.55085754394531 23.1248897618681,109.55463409423828 23.128994281453547,109.56253051757812 23.138150064858354,109.57162857055664 23.14256987448653,109.57626342773437 23.14493756970359,109.58089828491211 23.146831695764476,109.58896636962889 23.146831695764476,109.59686279296873 23.146042479825485,109.61248397827148 23.148567954471414,109.6281051635742 23.150146351957765,109.63394165039062 23.150462029224087,109.63909149169922 23.148883635455952,109.65797424316406 23.144148342611462,109.67548370361328 23.141938482032213,109.69161987304687 23.13373010953155,109.68029022216797 23.1226795839242,109.67376708984375 23.11415427085277,109.6658706665039 23.107207319104084,109.6556568145752 23.10041790536725",
        color: "#1e4652",
        iconCls: "std",
        iconSkin: "std",
        id: "003",
        isParent: false,
        lv: 1,
        name: "江北新城区",
        pid: "5bcf3a26e642261150ddf67e",
        _id: "5c26dc68e09375102cb334ef"
      }
    ];
    return new Promise(resolve => {
      resolve(res);
    });
  }
}
export default Api;
