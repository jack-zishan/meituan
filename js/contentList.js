(function () {
    // 商家详情模版字符串
    let itemTmpl =
        '<div class="r-item-content">' +
        '<img class="item-img" src=$pic_url />' +
        "$brand" +
        '<div class="item-info-content">' +
        '<p class="item-title">$name</p>' +
        '<div class="item-desc clearfix">' +
        '<div class="item-score">$wm_poi_score</div>' +
        '<div class="item-count">月售$monthNum</div>' +
        '<div class="item-distance">&nbsp;$distance</div>' +
        '<div class="item-time">$mt_delivery_time&nbsp;|</div>' +
        "</div>" +
        '<div class="item-price">' +
        '<div class="item-pre-price">$min_price_tip</div>' +
        "</div>" +
        '<div class="item-others">' +
        "$others" +
        "</div>" +
        "</div>" +
        "</div>";
    let page = 0;
    let isLoading = false;
    /**
     *  获取商家列表数据
     *  param */
    function getList() {
        page++;
        isLoading = true;
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            // console.log(this.response);
            let list = JSON.parse(this.response).data.poilist;
            initContentList(list);
            isLoading = false;
            };
        xhttp.open("GET", "json/homelist.json");
        xhttp.send();
    }
    /**
     *  渲染新到和热门品牌标签
     *  param {} data */
    function getBrand(data) {
        if (data.brand_type) {
            return '<div class="brand brand-pin">品牌</div>';
        } else {
            return '<div class="brand brand-xin">新到</div>';
        }
    }
    /**
     *  渲染月售
     *  param {} data */
    function getMonthNum(data) {
        let num = data.month_sale_num; 
        // 大于999采用999+
        if (num > 999) {
            return "999+";
        }
        return num;
    }
    /**
     *  渲染商家活动
     *  param {} data */
    function getOthers(data) {
        let array = data.discounts2;
        let str = "";

        array.forEach(function (item) {
            // 内部的商家活动模版字符串
            let _str =
                '<div class="other-info">' +
                '<img src=$icon_url class="other-tag" />' +
                '<p class="other-content one-line">$info</p>' +
                "</div>"; 
            // 模版字符串替换数据
            _str = _str.replace("$icon_url", item.icon_url).replace("$info", item.info); 
            // 字符串拼接
            str = str + _str;
        });
        return str;
    }
    /**
     *  渲染列表数据
     *  param [] */
    function initContentList(list) {
        list.forEach(function (item) {
            let str = itemTmpl
                .replace("$pic_url", item.pic_url)
                .replace("$name", item.name)
                .replace("$distance", item.distance)
                .replace("$min_price_tip", item.min_price_tip)
                .replace("$mt_delivery_time", item.mt_delivery_time)
                .replace("$brand", getBrand(item))
                .replace("$monthNum", getMonthNum(item))
                .replace("$others", getOthers(item))
                .replace("$wm_poi_score", new StarScore(item.wm_poi_score).getStars());
            let p = document.createElement("a");
            p.href = "cart.html";
            p.innerHTML = str;
            // 给每个块绑定一个点击事件，找到同级的店名，最后存储在cookie中
            p.addEventListener("click",function(e){
                let shop = e.target.parentNode.parentNode.querySelector(".item-title").textContent;
                document.cookie = "shop="+shop;
                console.log(document.cookie)
            })
            document.querySelector(".list-wrap").append(p);
        });
    }
    function addEvent() {
        // 监听屏幕滑动
        window.addEventListener("scroll", function () {
            // 获取当前窗口高度
            let clientHeight = document.documentElement.clientHeight;
            // 获取整个body的高度
            let scrollHeight = document.body.scrollHeight;
            // 当前位置距离顶部的高度
            let scrollTop = document.documentElement.scrollTop;
            // 当滑动到底部时，触发刷新条件
            if (scrollTop + clientHeight == scrollHeight) {
                // 最多滚动加载3页
                if (page < 3) {
                    // 在发送ajax请求时避免触发多次滚动加载
                    if (isLoading) {
                        return;
                    }
                    // 模拟网络加载，延时两秒执行代码
                    setTimeout(() => {
                        getList();
                    }, 2000);
                } else {
                    document.querySelector(".loading").innerHTML = "加载完成";
                }
            }
        });
    }
    
    function init() {
        getList();
        addEvent();
    }

    init();
})();
