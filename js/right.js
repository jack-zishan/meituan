(function () {
    // 右侧类目item模版字符串
    let itemTmpl =
        '<div class="menu-item">' +
        '<img class="img" src=$picture />' +
        '<div class="menu-item-right">' +
        '<p class="item-title">$name</p>' +
        '<p class="item-desc">$description</p>' +
        '<p class="item-zan">$praise_content</p>' +
        '<p class="item-price">¥$min_price<span class="unit">/$unit</span></p>' +
        "</div>" +
        '<div class="select-content">' +
        '<div class="minus"></div>' +
        '<div class="count">$chooseCount</div>' +
        '<div class="plus"></div>' +
        "</div>" +
        "</div>";
    /**
     * 渲染列表
     * param array */
    function initRightList(list) {
        // 每次刷新都把原先的内容清空
        document.querySelector(".right-list-inner").innerHTML = " ";
        list.forEach(function (item) {
            if (!item.chooseCount) {
                item.chooseCount = 0;
            }
            let str = itemTmpl
                .replace("$picture", item.picture)
                .replace("$name", item.name)
                .replace("$description", item.description)
                .replace("$praise_content", item.praise_content)
                .replace("$min_price", item.min_price)
                .replace("$unit", item.unit)
                .replace("$chooseCount", item.chooseCount);
            let p = document.createElement("div");
            p.innerHTML = str;
            document.querySelector(".right-list-inner").append(p);
            // 动态生成的元素绑定事件要在同一个函数定义域下，不然不生效
            p.querySelector(".minus").addEventListener("click",function(e){
                let count = e.currentTarget.parentNode.querySelector(".count");
                // 加一个条件判断，在数量为0时不继续减少
                if (parseInt(count.textContent) != 0) {
                    count.innerHTML = --item.chooseCount;
                    // console.log(item.chooseCount);
                    window.ShopBar.renderItems();
                }
            })
            p.querySelector(".plus").addEventListener("click",function(e){
                let count = e.currentTarget.parentNode.querySelector(".count");
                count.innerHTML = ++item.chooseCount;
                // console.log(item.chooseCount);
                window.ShopBar.renderItems();
            })
        });
    }
    /**
     * 渲染右侧title
     * param string */
    function initRightTitle(str) {
        document.querySelector(".right-title").innerHTML = str;
    }
    function init(data) {
        initRightList(data.spus || []);
        initRightTitle(data.name);
    }
    // 创建一个对象保存初始化函数init(),每一次调用都初始化
    window.Right = {
        refresh: init,
    };
})();
