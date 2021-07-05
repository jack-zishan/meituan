(function () {
    // 添加热门城市内容
    let hot = ["床头柜","简洁双开门衣柜","可爱冰箱吸","现代文艺吊灯","小清新客厅绿植","儿童床"]
    let str = '<div class="hotgoods"><div class="hotgoods-text">大家都在搜</div>'+
    '<ul class="hotgoods clearfix">';
    for(let i = 0;i<hot.length;i++){
        str+='<li class="hotgood">'+hot[i]+'</li>'
    }
    str+='</ul></div><div class="history">'+
    '<p class="history-title">历史记录</p>'+
    '<ul class="history-inner">'+
    '</ul></div>'+
    '<div class="clear-history" onclick="clearhis()">清除搜索历史</div>';
    const main= document.querySelector(".main");
    let div = document.createElement("div");
    div.innerHTML = str;
    main.appendChild(div);
    searchgoods();
})()
function searchgoods() {
    // 提交之前先判断需不需要存储，如果当前数据中已经存在的，那么不去重复添加
    let dataInput = document.querySelector(".searchgoods").value;
    console.log(dataInput);
    let locData = JSON.parse(localStorage.getItem("dataList"));
    console.log(locData);
    if (!locData || !locData.includes(dataInput)) {
        if (!locData) {
            localStorage.setItem("dataList", JSON.stringify([dataInput]));
        } else {
            localStorage.setItem("dataList", JSON.stringify(locData.concat([dataInput])));
        }
    }
    addDataList();
    // 通过函数将数据插入到datalist中
    function addDataList() {
        let opt = "";
        let locData = JSON.parse(localStorage.getItem("dataList"));
        // 当历史记录达到五条，就不进行显示
        if (locData.length > 6) {
            locData = locData.slice(locData.length - 6, locData.length);
        }
        for (let i = 1, len = locData.length; i < len; len--) {
            // 从后往前添加，新历史记录放在最上方
            opt += '<li class="history-content">'+locData[len-1]+'</li>';
        }
        document.querySelector(".history-inner").innerHTML = opt;
    }
}
function clearhis(){
    localStorage.setItem("dataList", JSON.stringify([""]));
    document.querySelector(".history-inner").innerHTML = "";
}