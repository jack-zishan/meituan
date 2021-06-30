(function () {
    // 左侧类目item模版字符串
    let itemTmpl = 
    '<div class="item-text">$getItemContent</div>'
    /**
     * 请求数据
     * param */
    function getList() {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            // console.log(this.response);
            window.list = JSON.parse(this.response).data.food_spu_tags;
            initContentList(window.list);
            };
        xhttp.open("GET", "json/food.json");
        xhttp.send();
    }
    /**
     * 渲染item内容
     * param obj */
    function getItemContent(data) {
        if (data.icon) {
            return '<img class="item-icon" src=' + data.icon + " />" + data.name;
        } else {
            return data.name;
        }
    }
    /**
     * 渲染列表
     * param array */
    function initContentList(list) {
        list.forEach(function (item) {
            let str = itemTmpl.replace("$getItemContent", getItemContent(item)); 
            let p = document.createElement("div");
            p.classList.add("left-item");
            p.innerHTML = str;
            // 动态生成的元素绑定事件要在同一个函数定义域下，不然不生效
            p.addEventListener("click", function (e) {
                let target = e.currentTarget;
                // console.log(target.textContent);
                // 点击刷新右边的内容
                window.Right.refresh(item);
                target.classList.add("active");
                // 对兄弟数组再次使用循环移除class
                siblings(target).forEach(item => {
                    item.classList.remove("active");
                });
            });
            document.querySelector(".left-bar-inner").append(p);
        });
        document.querySelector(".left-item").click();
    }
        
    function siblings(elm){
        let a = [];    //保存所有兄弟节点
        let p = elm.parentNode.children; //获取父级的所有子节点
        for(let i = 0; i < p.length; i++){  //循环
            if(p[i].nodeType == 1 && p[i] != elm){  //如果该节点是元素节点与不是这个节点本身
                a.push(p[i]);      // 添加到兄弟节点里
            }
        } 
        return a;//返回所有的兄弟节点
    }
    getList();
})();
