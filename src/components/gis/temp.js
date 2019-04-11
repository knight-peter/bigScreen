function parseHtml(fn){
    return fn.toString()
        .replace(/^[^\/]+\/\*!?\s?/,"")
        .replace(/\*\/[^\/]+$/,"")
}
template.config("escape",false);

template.helper("filterValue", function (value) {
    if (value.Sname == "市电") {

        if (value.v == "0") {
            return "无";
        } else {
            return "有";
        }
    }else if(value.Sname == "门子" || value.Sname == "门子开关"){
        if (value.v == "0") {
            return "关";
        } else {
            return "开";
        }
    }else if(value.Sname == "报警代码"){
        return value.v == 0 ? "-" : value.v;
    }else{
        if(value.Unit == null){
            return;
        }
        if (value.Unit&&value.Unit.indexOf("*") != -1) {
            var lst = value.Unit.split("*");
            for(var i in lst){
                if(lst[i]&&typeof lst[i].indexOf == "function"&&lst[i].indexOf(value.v) > -1){
                    return lst[i].split(":")[1].split("#")[0];
                }
            }
            return value.v;
        }else{
            var dPoint = value.precision;
            if(dPoint != undefined && dPoint != null && dPoint != "null"){
                var nValue;
                if(value.v){
                    nValue = value.v.toFixed(dPoint);
                }
                return nValue;
            }else{
                return value.v;
            }

        }
    }
    return value.Value;
})

template.helper("filterUnit", function (value) {
    if(!value.Unit){
        return;
    }
    if (value.Unit.indexOf("*") != -1) {
        return "";
    }
    return value.Unit;
})

function  markerTemplate(data){
    return  template.compile(parseHtml(function () {
        /*
         <div class="site-box box-shadow-1">
           <h2 class="{{if alarmlevel == 0}}blue1{{else}}red1{{/if}}" style="overflow:hidden;{{if hasName&&hasLabel}}border-bottom: 1px solid #95BBD2;{{/if}}{{if !hasName&&hasLabel}}display:none{{/if}}" >
                <div style="cursor:pointer;overflow:hidden;display:flex;justify-content: space-between;" ><span class="title" title="{{sname}}{{[msn]}}">{{sname}}{{[msn]}}</span>{{if !hasName&&!hasLabel}}<i class="el-icon-close close" onclick="window.popupClose('{{code}}')"></i>{{/if}}</div>
           </h2>
           <div class="site-content" {{if hasName&&!hasLabel}}style="display:none;"{{/if}}>
             <table cellpadding="0" cellspacing="0">
             <tr>
             <td style="padding:0;border:none;vertical-align: top;">
             <table cellpadding="0" cellspacing="0" style="width:100%">
              {{each sensors as t}}
                <tr style="color:#858789;">
                    <td class="text01">{{t.Sname}}</td>
                    <td class="text02" {{if t.Alarms}}style="color:red"{{/if}}>{{filterValue t}}</td>
                    <td class="unit" >{{filterUnit t}}</td>
                </tr>
              {{/each}}
             </table>
             </td>
             </tr>
             </table>
             <div class="triangle"></div>
         </div>
         */
    }))(data)
}
module.exports = {
    markerTemplate:markerTemplate
};