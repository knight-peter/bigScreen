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

export function CRUD(model,_prefix){
    var pre=_prefix||Prefix;
    var qurl=`/${pre}/${model}/query.json`;
    var key="_id";
    return {
        query:(params)=>{return co($.po(qurl,params||{}))},
        insert:(record)=>{return co($.po(`/${pre}/${model}/insert.json`,{record:record}))},
        update:(record)=>{return co($.po(`/${pre}/${model}/update.json`,{record:record}))},
        save:(record)=>{
            if(record[key]){
                return co($.po(`/${pre}/${model}/update.json`,{record:record}));
            }else{
                return co($.po(`/${pre}/${model}/insert.json`,{record:record}));
            }
        },
        delete:(record)=>{return co($.po(`/${pre}/${model}/delete.json`,{record:record}))},
        get:(id)=>{return co($.po(`/${pre}/${model}/get.json`,id))},
        url:qurl,
        post:(m,record)=>{return co($.po(`/${pre}/${model}/${m}.json`,record))},
        key:key
    }
}

export const API = {
    getUser:(uid)=>{
        return co($.po(`${Prefix}/ubiz/user/get.json`, {"_id":uid}))
    },
    loadApp:(appsn)=>{
        return co($.po(`${Prefix}/webapp/menu.json`, {"app":appsn}))
    },
    changePwd:(record)=>{
        return co($.po(`${Prefix}/ubiz/user/changepwd/update.json`, {"record":record}))
    }
}

export const CurveService = {
    getList: (p, c) => {
        $.post(`${Prefix}/hd/sensor/realtime.json`, p, c, 'json');
    },
    getHistory: (p, c) => {
        $.post(`${Prefix}/hd/sensor/history.json`, p, c, 'json');
    },
    getStation: (p, c) => {
        $.post(`${Prefix}/hd/station/tree.json`, p, c, 'json');
    }
}

export const Favs = CRUD('favs','ubiz');

