var Prefix = '';

$.po = function (url,data) {
    return $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        url:url,
        contentType:'application/json; charset=utf-8',
        dataType:'json'
    })
}

function co(func) {
    var self=this;
    return $.Deferred(function(def){
        return func.then(function(rep){
            if(rep.Code == 0){
                return def.resolve(rep.Response);
            }else{
                window.App.$message.error(rep.Message);
                return def.reject(rep.Response);
            }
        });
    });
}

export const API = {
    getLayer:(param)=>{
        // var rst=$.po("/hd/gis/layer.json", param);
        var rst=function(){
            var def = $.Deferred();
            setTimeout(function(){
                def.resolve({Code:0,Response:{gis:{}}});
            }, 100);
            return def;
        };
        return co(rst());
    }
}
