function searchcity() {
    // 提交之前先判断需不需要存储，如果当前数据中已经存在的，那么不去重复添加
    let dataInput = document.querySelector(".searchcity").value;
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
        if (locData.length > 10) {
            locData = locData.slice(locData.length - 10, locData.length);
        }
        for (let i = 0, len = locData.length; i < len; i++) {
            opt += '<option value="' + locData[i] + '">';
        }
        document.querySelector("#citys").innerHTML = opt;
    }
}
