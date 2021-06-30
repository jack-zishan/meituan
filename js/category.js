(function () {
    // 类目模版字符串
    let itemTmpl =
        '<div class="category-item">' +
        '<img class="item-icon" src=$url />' +
        '<p class="item-name">$name</p>' +
        "</div>";
    /**
     *  渲染category元素
     * param */
    function initCategory() {
        let content = document.querySelector(".swiper-wrapper");
        let i = 1;
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            // 获取category的数据，返回值是字符串需要JSON.parse()转换成JSON文件
            let list = JSON.parse(this.response).data.primary_filter;
            // 创建一个空字符串保存一页的图标
            let slide = "";
            list.forEach(function (item) {
                let str = itemTmpl.replace("$url", item.url).replace("$name", item.name);
                if(i%8==1){
                    slide = "";
                }else if(i%8==0||i==list.length){
                    slide+=str;
                    // 把前面保存的一页字符串添加进一个div并且加上class名，最后追加到容器中
                    let p = document.createElement("div");
                    p.classList.add("swiper-slide");
                    p.innerHTML = slide;
                    content.append(p);
                }
                slide+=str;
                i++;
            });
        }
        xhttp.open("GET", "json/head.json");
        xhttp.send();
    }
    const mySwiper = new Swiper ('.swiper-container', { 
        // 以下是为了防止出现滑动bug，追加元素的时候要初始化swiper
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true//修改swiper的父元素时，自动初始化swiper
    })
    initCategory();
})();
