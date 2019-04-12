<template>
  <div
    class="full-width-height flex-box inner-padding"
    style="flex-flow: column;align-items: center"
  >
    <div class="full-width flex-box" style="height:90%;">
      <div class="flex-box" style="width:80%;align-items:center">
        <div class="full-height flex-box" style="width:12vw">
          <object
            class="g-pr--5"
            style="width:38%"
            v-bind:data="weather_data.today.icon"
          ></object>
          <div class="flex-box flex-grow-1 justify-content-center flex-column">
            <span style="font-size:.7vw;"
              >{{ weather_data.today.min_temperature }}/{{
                weather_data.today.max_temperature
              }}</span
            >
            <span style="font-size:.6vw">{{ weather_data.today.weekday }}</span>
          </div>
        </div>
        <div class="full-height flex-box flex-grow-1">
          <div
            class="full-height flex-box justify-content-center flex-fill flex-column g-ta--c"
          >
            <span class="g-mb--5">{{
              weather_data.one_day_after.weekday
            }}</span>
            <object
              style="max-height:30%"
              :data="weather_data.one_day_after.icon"
            ></object>
            <span
              >{{ weather_data.one_day_after.min_temperature }}/{{
                weather_data.one_day_after.max_temperature
              }}</span
            >
          </div>
          <div
            class="full-height flex-box justify-content-center flex-fill flex-column g-ta--c"
          >
            <span class="g-mb--5">{{
              weather_data.two_day_after.weekday
            }}</span>
            <object
              style="max-height:30%"
              :data="weather_data.two_day_after.icon"
            ></object>
            <span
              >{{ weather_data.two_day_after.min_temperature }}/{{
                weather_data.two_day_after.max_temperature
              }}</span
            >
          </div>
          <div
            class="full-height flex-box justify-content-center flex-fill flex-column g-ta--c"
          >
            <span class="g-mb--5">{{
              weather_data.three_day_after.weekday
            }}</span>
            <object
              style="max-height:30%"
              :data="weather_data.three_day_after.icon"
            ></object>
            <span
              >{{ weather_data.three_day_after.min_temperature }}/{{
                weather_data.three_day_after.max_temperature
              }}</span
            >
          </div>
        </div>
      </div>
      <div
        class="full-height flex-box"
        style="width:20%;justify-content:center;align-items:flex-end;flex-flow: column"
      >
        <span class="font-blue" style="font-size: 1.5vw;letter-space:10px">{{
          clock_data.time
        }}</span>
        <span
          >{{ clock_data.year }}年{{ clock_data.month }}月{{
            clock_data.day
          }}号</span
        >
      </div>
    </div>
    <div class="flex full-width flex-box" style="height: 10%">
      <div
        style="width:100%;height:10%;background:linear-gradient(270deg, rgba(84, 143, 246,1), rgba(0, 168, 255,1))"
      ></div>
    </div>
  </div>
</template>

<script>
// weather api: http://t.weather.sojson.com/api/weather/city/101300801
// 贵港city_code 101300801
import day_icon from "../../../../assets/images/svg/icon/weather/white/cloud.svg";
import api from "../../../../api";
export default {
  name: "index",

  data() {
    return {
      city_code: "101300801",

      weather_data: {
        today: {
          icon: day_icon,
          weekday: "星期六",
          max_temperature: "30°C",
          min_temperature: "15°C"
        },
        one_day_after: {
          icon: day_icon,
          weekday: "星期六",
          max_temperature: "30°C",
          min_temperature: "15°C"
        },
        two_day_after: {
          icon: day_icon,
          weekday: "星期六",
          max_temperature: "30°C",
          min_temperature: "15°C"
        },
        three_day_after: {
          icon: day_icon,
          weekday: "星期六",
          max_temperature: "30°C",
          min_temperature: "15°C"
        }
      },

      weather2icon: {
        晴: require("../../../../assets/images/svg/icon/weather/white/day_sunny.svg"),
        多云: require("../../../../assets/images/svg/icon/weather/white/fog.svg"),
        阴: require("../../../../assets/images/svg/icon/weather/white/cloud.svg"),
        阵雨: require("../../../../assets/images/svg/icon/weather/white/day_rain.svg"),
        雷阵雨: require("../../../../assets/images/svg/icon/weather/white/day_rain.svg"),
        雨夹雪: require("../../../../assets/images/svg/icon/weather/white/hail.svg"),
        小雨: require("../../../../assets/images/svg/icon/weather/white/rain_light.svg"),
        中雨: require("../../../../assets/images/svg/icon/weather/white/rain.svg"),
        大雨: require("../../../../assets/images/svg/icon/weather/white/rain_heavy.svg"),
        暴雨: require("../../../../assets/images/svg/icon/weather/white/rain_lightning.svg"),
        特大暴雨: require("../../../../assets/images/svg/icon/weather/white/rain_lightning.svg"),
        阵雪: require("../../../../assets/images/svg/icon/weather/white/snow.svg"),
        小雪: require("../../../../assets/images/svg/icon/weather/white/snow_light.svg"),
        中雪: require("../../../../assets/images/svg/icon/weather/white/snow.svg"),
        大雪: require("../../../../assets/images/svg/icon/weather/white/snow_heavy.svg"),
        暴雪: require("../../../../assets/images/svg/icon/weather/white/snow.svg"),
        "小雨-中雨": require("../../../../assets/images/svg/icon/weather/white/rain.svg"),
        "中雨-大雨": require("../../../../assets/images/svg/icon/weather/white/rain_heavy.svg"),
        "大雨-暴雨": require("../../../../assets/images/svg/icon/weather/white/rain_lightning.svg"),
        "暴雨-大暴雨": require("../../../../assets/images/svg/icon/weather/white/rain_lightning.svg"),
        "大暴雨-特大暴雨": require("../../../../assets/images/svg/icon/weather/white/rain_lightning.svg"),
        "小雪-中雪": require("../../../../assets/images/svg/icon/weather/white/snow.svg"),
        "中雪-大雪": require("../../../../assets/images/svg/icon/weather/white/snow_heavy.svg"),
        "大雪-暴雪": require("../../../../assets/images/svg/icon/weather/white/snow_heavy.svg")
      },

      clock_data: {
        year: "----",
        month: "-",
        day: "-",
        weekday: "___",
        time: "--:--:--"
      }
    };
  },

  methods: {
    reflesh_weather_data: function() {
      let that = this;
      api._weather().then(result => {
        let useful_data_set = result.data.forecast;
        that.weather_data.today = that.parse_one_day_weather(
          useful_data_set[0]
        );
        that.weather_data.one_day_after = that.parse_one_day_weather(
          useful_data_set[1]
        );
        that.weather_data.two_day_after = that.parse_one_day_weather(
          useful_data_set[2]
        );
        that.weather_data.three_day_after = that.parse_one_day_weather(
          useful_data_set[3]
        );
      });
      /* $.ajax({
        url: "http://t.weather.sojson.com/api/weather/city/" + this.city_code,
        success: function(result) {
          let useful_data_set = result.data.forecast;
          that.weather_data.today = that.parse_one_day_weather(
            useful_data_set[0]
          );
          that.weather_data.one_day_after = that.parse_one_day_weather(
            useful_data_set[1]
          );
          that.weather_data.two_day_after = that.parse_one_day_weather(
            useful_data_set[2]
          );
          that.weather_data.three_day_after = that.parse_one_day_weather(
            useful_data_set[3]
          );
        }
      }); */
    },

    parse_one_day_weather: function(one_day_result) {
      let min_temperature = one_day_result.low.replace("低温", "");
      let max_temperature = one_day_result.high.replace("高温", "");
      let icon = this.weather2icon[one_day_result.type];
      let weekday = one_day_result.week;

      let parsed_result = {
        min_temperature: min_temperature,
        max_temperature: max_temperature,
        icon: icon,
        weekday: weekday
      };
      return parsed_result;
    },

    reflesh_clock_data() {
      let date = new Date();

      let num2weekday = {
        0: "星期日",
        1: "星期一",
        2: "星期二",
        3: "星期三",
        4: "星期四",
        5: "星期五",
        6: "星期六"
      };

      this.clock_data = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        weekday: num2weekday[date.getDay()],
        time:
          this.PrefixInteger(date.getHours(), 2) +
          ":" +
          this.PrefixInteger(date.getMinutes(), 2) +
          ":" +
          this.PrefixInteger(date.getSeconds(), 2)
      };
    },

    PrefixInteger(num, n) {
      return (Array(n).join(0) + num).slice(-n);
    }
  },

  mounted: function() {
    this.reflesh_weather_data();
    setInterval(this.reflesh_weather_data, 1000 * 60 * 60);
    setInterval(this.reflesh_clock_data, 1000);
  }
};
</script>

<style></style>
