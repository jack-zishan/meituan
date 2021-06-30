(function () {
    let itemTmpl =
        '<a class="$key btn-item" href="$key.html">' +
        '<div class="tab-icon"></div>' +
        '<div class="btn-name">$text</div>' +
        "</a>";

    function init() {
        let items = [
            {
                key: "index",
                text: "首页",
            },
            {
                key: "order",
                text: "订单",
            },
            {
                key: "my",
                text: "我的",
            },
        ];
        let str = "";

        items.forEach(function (item) {
            str += itemTmpl.replace(/\$key/g, item.key).replace("$text", item.text);
        });
        
        document.querySelector(".bottom-bar").innerHTML = str; 
        // 找到当前页面的url来确定key值
        let arr = window.location.pathname.split("/");
        let page = arr[arr.length - 1].replace(".html", ""); 
        // 将当前的页面对应的key值的a元素设置active的class
        document.querySelector("a." + page).classList.add("active");
    }

    init();
})();
