(function () {
    // 顶部模版字符串
    let itemTopTmpl =
        '<div class="content-top">' + '<div class="clearcar" onclick="clearcar()">清空购物车</div>' + "</div>";
    // 底部模版字符串
    let itemBottomTmpl =
        '<div class="bottom-content">' +
        '<div class="shop-icon">' +
        '<div class="dot-num"></div>' +
        "</div>" +
        '<div class="price-content">' +
        '<p class="total-price">¥<span class="total-price-span">0</span></p>' +
        '<p class="other-price">另需配送&nbsp;¥<span class="shipping-fee">9</span></p>' +
        "</div>" +
        '<div class="submit-btn">去结算</div>' +
        "</div>";
    let strTop = document.createElement("div");
    strTop.classList.add("choose-content");
    let strBottom = document.createElement("div");
    strBottom.innerHTML = itemBottomTmpl;
    function changeTotalPrice(str) {
        document.querySelector(".total-price-span").innerHTML = str;
    }
    /**
     * 渲染购物车内部的商品条目
     * param */
    function renderItems() {
        strTop.innerHTML = itemTopTmpl;
        // 给商品条目增加一个div包裹，对它进行设置以达到独立滚动效果
        let inner = document.createElement("div");
        inner.classList.add("choose-inner");
        let tmpl =
            '<div class="item-name">$name</div>' +
            '<div class="price">¥<span class="total">$price</span></div>' +
            '<div class="select-content">' +
            '<div class="minus"></div>' +
            '<div class="count">$chooseCount</div>' +
            '<div class="plus"></div>';
        let totalPrice = 0;

        list.forEach(function (item) {
            item.spus.forEach(function (_item) {
                // 如果有菜品数量大于0就开始渲染这条数据
                if (_item.chooseCount > 0) {
                    // 计算每个菜品的总价
                    let price = _item.min_price * _item.chooseCount;
                    let row = tmpl
                        .replace("$name", _item.name)
                        .replace("$price", price)
                        .replace("$chooseCount", _item.chooseCount);
                    // 计算整个总价
                    let p = document.createElement("div");
                    p.classList.add("choose-item");
                    p.innerHTML = row;
                    inner.append(p);
                    totalPrice += price;
                    // 动态生成的元素绑定事件要在同一个函数定义域下，不然不生效
                    p.querySelector(".minus").addEventListener("click", function (e) {
                        let count = e.currentTarget.parentNode.querySelector(".count");
                        // 点击减少按钮时使数量减一并赋值给count
                        count.innerHTML = --_item.chooseCount;
                        // 调用本函数，达到刷新渲染菜品的作用
                        renderItems();
                        // 模拟点击左侧的按钮同步刷新右边菜品的数量
                        document.querySelector(".active").click();
                        // 在数量为0时修改choose-content的高度,以免产生条目缺失bug
                        if(_item.chooseCount==0){
                            // 获取购物车的内容高度由商品高度加顶部高度
                            let height = document.querySelector(".choose-inner").clientHeight+
                            document.querySelector(".content-top").clientHeight + "px";
                            // 把.choose-content的高度改为修改后的高度
                            document.querySelector(".choose-content").style.height = height;
                        }
                    });
                    p.querySelector(".plus").addEventListener("click", function (e) {
                        let count = e.currentTarget.parentNode.querySelector(".count");
                        count.innerHTML = ++_item.chooseCount;
                        renderItems();
                        document.querySelector(".active").click();
                    });
                }
            });
            // 将渲染的商品都加入strTop中
            strTop.append(inner);
            // 改变总价
            changeTotalPrice(totalPrice);
            // 改变红点个数
            changeDot();
            // 判断价格，若为0则自动收回购物车
            if (totalPrice == 0) {
                document.querySelector(".choose-content").classList.remove("active");
                document.querySelector(".mask").style.display = "none";
            }
        });
    }
    /**
     * 渲染数量红点
     * param */
    function changeDot() {
        // 先拿到所有的counts
        let counts = strTop.querySelectorAll(".count");
        let total = 0; // 遍历每个count 相加
        for (let i = 0; i < counts.length; i++) {
            total += parseInt(counts[i].textContent);
        }
        // 判断总数是否大于0
        if (total > 0) {
            document.querySelector(".dot-num").innerHTML = total;
        } else {
            document.querySelector(".dot-num").innerHTML = 0;
        }
    }
    function addClick() {
        let container = document.querySelector(".choose-content");
        // 给shop-icon绑定一个点击事件
        document.querySelector(".shop-icon").addEventListener("click", function () {
            // 判断此时是否被唤起，如果不包含.active的class则添加一个，否则删除
            if (!container.classList.contains("active")) {
                // 使购物车部分出现
                container.classList.add("active");
                // 让遮罩层出现，使用户不得操作后面的部分
                document.querySelector(".mask").style.display = "block";
                // 这句语句是为了刷新购物车高度
                container.style.height = "auto";
                // 获取购物车的内容高度
                let height = container.clientHeight + "px";
                // 先设置高度为0，然后设置一个高度就会产生动画效果
                container.style.height = "0px";
                // 这里的高度要通过时间函数来触发（在本函数域结束后运行），不然它会覆盖掉上一句高度设置,从而产生动画丢失bug
                setTimeout(function () {
                    container.style.height = height;
                }, 0);
            } else {
                // transition动画是根据设置的宽高进行变化，所以这里设置变化的高度
                container.style.height = "0px";
                document.querySelector(".mask").style.display = "none";
                // 在触发transition动画之后运行函数隐藏购物车
                container.addEventListener("transitionend",function () {
                    container.classList.remove("active");
                },{
                    // 只给购物车绑定一次监听事件，调用后自动删除监听事件，不然会产生自动收回购物车的bug
                    once: true,
                }
                );
            }
        });
        // 给遮罩层也绑定一个点击事件，在点击之后收回购物车
        document.querySelector(".mask").addEventListener("click", function (e) {
            console.log("df");
            container.style.height = "0px";
            document.querySelector(".mask").style.display = "none";
            container.addEventListener("transitionend",function () {
                document.body.style.overflow = "visible";
                document.querySelector(".choose-content").classList.remove("active");
                document.querySelector(".mask").style.display = "none";
            },{
                once: true,
            }
            );
        });
    }
    function init() {
        let content = document.querySelector(".shop-bar");
        content.append(strTop);
        content.append(strBottom);
        addClick();
    }
    let p = getCookie("shop");
    document.querySelector(".title").innerHTML = p;
    init();
    window.ShopBar = {
        renderItems: renderItems,
    };
})();
// 给clearcar块绑定一个点击事件
function clearcar() {
    // 遍历所有的菜品，清零所有的数量，并触发刷新事件
    window.list.forEach(function (item) {
        item.spus.forEach(function (_item) {
            _item.chooseCount = 0;
            window.ShopBar.renderItems();
            document.querySelector(".active").click();
        });
    });
}
