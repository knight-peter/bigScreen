/**
 * window.mh 兼容scada6原mh对象
 * 多Tab菜单切换Helper
 * 注1：需要初始对象window.Menus
 * 注2：需结合vuex[selectMenu，addMenu，removeMenu]
 */
const utils = require('/web/utils');

window.mh = {
    All: {},
    History: {
        All: {},
        Current: {},
        MaxCount: 8,
        Pages: []
    },
    Open: function (Url, Title) {
        var mm = /^([^\?]+)\??/.exec(Url);
        if (mm != null && mm.length > 1) {
            if (Url.startsWith("#")) {
                Url = Url.replace("#", "").replace("!", "");
            }
            var InHistory = false;
            for (var i = 0, Arr = mh.History.Pages, len = Arr.length; i < len; i++) {
                if (Arr[i].Item.Val.Trim() == Url.Trim()) {
                    InHistory = true;
                    window.App.$store.commit('selectMenu', Arr[i].Item);
                    break;
                }
            }

            if (InHistory == false) {
                window.App.$store.commit('addMenu', mh.GetMenuByUrl(Url));
            }
        }
    },
    Close: function (Id) {
        window.App.$store.commit('removeMenu', Id);
    },
    GetMenuByUrl: function (Url) {
        if (Url.startsWith("#")) {
            Url = Url.replace("#", "");
        }
        var Mi = null;
        for (var Key in mh.All) {
            if (mh.All[Key].Val == Url) {
                Mi = mh.All[Key];
                break;
            }
        }
        if (!Mi) {
            var tts = /\?_title=([^&]+)|\&_title=([^&]+)/.exec(Url);
            var Title = "临时页面";
            if (tts && tts.length > 2) {
                Title = tts[1] || tts[2] || Title;
                Title = decodeURIComponent(Title);
            }
            Mi = { Id: utils.uuid(8, 16), Val: Url, Name: Title };
        }
        return Mi;
    },
    Root: window.Menus
};
window.onhashchange = function () {
    mh.Open(window.location.hash);
};
utils.CreateAll(mh.All, mh.Root, null);