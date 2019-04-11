export default{
    Post: function(url, params, success, fail){

        function _alert(msg){
            try{
                window.Vue.prototype.$message({message: msg, type: "error", showClose: true});
            }
            catch(e){
                alert(msg);
            }
        }

        function _err(msg){
            let flag = true;
            if(typeof fail == "function"){
                flag = fail(msg);
            }
            flag != false && _alert(msg);
        }

        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(params),
            url: url,
            success: function(json){
                if(json.Code == 0){
                    typeof success == "function" && success(json.Response);
                } else{
                    _err(json.Message);
                }
            },
            error: function(ex){
                _err("请求发生异常(异常代码：" + ex.status + ")");
            }
        });
    },
    GetParams: function(params, callback){
        // params = decodeURIComponent(params);
        // params = JSON.parse(params);
        // if(!params.url){
        //     callback(params.data);
        // } else{
        //     this.Post(params.url, params.params, function(json){
        //         let temp = $.extend(true, {}, params.data, json);
        //         callback(temp);
        //     });
        // }
    }
};