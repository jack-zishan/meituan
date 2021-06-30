// 封装一个函数，处理城市和字母数据
function indexSelection(dataList = [], callbackFn = function () {}) {
    fn = callbackFn;
    dataList = defaultDataSource;
    // 添加热门城市内容
    let citys = ["北京市","上海市","成都市","广州市","南京市","武汉市","厦门市","重庆市","长沙市"]
    let str = '<div class="hotcitys"><div class="index_selection_title_p">热门城市</div>'+
    '<ul class="hotcitys clearfix">';
    for(let i = 0;i<citys.length;i++){
        str+='<li class="hotcity" onclick="fn(this.textContent)">'+citys[i]+'</li>'
    }
    str+='</ul></div>';
    // 包装整个城市主体内容块;
    const index_selection_page_container = document.querySelector(".index_selection_page_container");
    let contentHtml = '<div class="index_selection_data_list">';
    for (let index = 0; index < dataList.length; index++) {
        const letter = dataList[index];
        contentHtml += '<ul id="' + letter.key + '"><p class="index_selection_title_p">' + letter.key + "</p>";
        for (let j = 0; j < letter.dataList.length; j++) {
            const data = letter.dataList[j];
            // 绑定一个当前城市数据返回给函数fn()
            contentHtml +=
                '<li onclick="fn(this.textContent)" value="' + data.value + '">' + data.label + "</li>";
        }
        contentHtml += "</ul>";
    }
    contentHtml += "</div>"
    // 生成div添加至内容中
    let div = document.createElement("div");
    div.setAttribute("class", "index_selection_flex_1 index_selection_scroll_bar");
    div.innerHTML = str+contentHtml;
    index_selection_page_container.appendChild(div);

    // 右边的字母导航，遍历数据，绑定锚点定位至字母所在的区域
    let html = "";
    for (let index = 0; index < dataList.length; index++) {
        const letter = dataList[index];
        html += "<li onclick=\"location.href = '#" + letter.key + "'\">" + letter.key + "</li>";
    }
    let ul = document.createElement("ul");
    ul.setAttribute("class", "index_selection_cursor");
    ul.innerHTML = html;
    index_selection_page_container.appendChild(ul);
// 通过函数将数据插入到datalist中addDataList();
    addDataList();
    function addDataList() {
        let opt = "";
        for (let i = 0; i < dataList.length; i++) {
            const letter = dataList[i];
            for(let j = 0;j<letter.dataList.length;j++){
                opt += '<option value="' + letter.dataList[j].label + '">';
            }
        }
        document.querySelector("#citys").innerHTML = opt;
    }
}
// 遍历城市查找是否有符合的城市
    function searchcity(){
        let dataInput = document.querySelector(".searchcity").value;
        let flag = false;
        dataList = defaultDataSource;
        for (let i = 0; i < dataList.length; i++) {
            const letter = dataList[i];
            for(let j = 0;j<letter.dataList.length;j++){
                if(dataInput===letter.dataList[j].label){
                    flag = true;
                }
            }
        }
        if(flag){
            document.querySelector(".now").innerHTML = "当前定位："+dataInput;
            document.cookie = "city="+dataInput; 
        }else{
            document.querySelector(".now").innerHTML = "未查找到此城市";
        }
        document.querySelector(".index_selection_flex_1").style.display = "none";
        document.querySelector(".index_selection_cursor").style.display = "none";
    }

let defaultDataSource = [
    {
        key: "A",
        dataList: [
            { value: "内蒙古 阿拉善盟", label: "阿拉善盟" },
            { value: "辽宁省 鞍山市", label: "鞍山市" },
            { value: "安徽省 安庆市", label: "安庆市" },
            { value: "河南省 安阳市", label: "安阳市" },
            { value: "四川省 阿坝藏族羌族自治州", label: "阿坝藏族羌族自治州" },
            { value: "贵州省 安顺市", label: "安顺市" },
            { value: "西藏 阿里地区", label: "阿里地区" },
            { value: "陕西省 安康市", label: "安康市" },
            { value: "新疆 阿克苏地区", label: "阿克苏地区" },
            { value: "新疆 阿拉尔", label: "阿拉尔" },
            { value: "澳门", label: "澳门" },
        ],
    },
    {
        key: "B",
        dataList: [
            { value: "北京市", label: "北京市" },
            { value: "河北省 保定市", label: "保定市" },
            { value: "内蒙古 包头市", label: "包头市" },
            { value: "内蒙古 巴彦淖尔盟", label: "巴彦淖尔盟" },
            { value: "辽宁省 本溪市", label: "本溪市" },
            { value: "吉林省 白山市", label: "白山市" },
            { value: "吉林省 白城市", label: "白城市" },
            { value: "安徽省 蚌埠市", label: "蚌埠市" },
            { value: "安徽省 亳州市", label: "亳州市" },
            { value: "山东省 滨州市", label: "滨州市" },
            { value: "广东省 佛山市", label: "佛山市" },
            { value: "广西 北海市", label: "北海市" },
            { value: "广西 百色市", label: "百色市" },
            { value: "海南省 白沙黎族自治县", label: "白沙黎族自治县" },
            { value: "海南省 保亭黎族苗族自治县", label: "保亭黎族苗族自治县" },
            { value: "四川省 巴中市", label: "巴中市" },
            { value: "贵州省 毕节地区", label: "毕节地区" },
            { value: "云南省 保山市", label: "保山市" },
            { value: "陕西省 宝鸡市", label: "宝鸡市" },
            { value: "甘肃省 白银市", label: "白银市" },
            { value: "新疆 巴音郭楞蒙古自治州", label: "巴音郭楞蒙古自治州" },
            { value: "新疆 博尔塔拉蒙古自治州", label: "博尔塔拉蒙古自治州" },
        ],
    },
    {
        key: "C",
        dataList: [
            { value: "河北省 承德市", label: "承德市" },
            { value: "河北省 沧州市", label: "沧州市" },
            { value: "内蒙古 赤峰市", label: "赤峰市" },
            { value: "江苏省 常州市", label: "常州市" },
            { value: "安徽省 滁州市", label: "滁州市" },
            { value: "安徽省 巢湖市", label: "巢湖市" },
            { value: "安徽省 池州市", label: "池州市" },
            { value: "湖南省 常德市", label: "常德市" },
            { value: "湖南省 郴州市", label: "郴州市" },
            { value: "广东省 潮州市", label: "潮州市" },
            { value: "广西 崇左市", label: "崇左市" },
            { value: "海南省 昌江黎族自治县", label: "昌江黎族自治县" },
            { value: "四川省 成都市", label: "成都市" },
            { value: "云南省 楚雄彝族自治州", label: "楚雄彝族自治州" },
            { value: "西藏 昌都地区", label: "昌都地区" },
            { value: "新疆 昌吉回族自治州", label: "昌吉回族自治州" },
        ],
    },
    {
        key: "D",
        dataList: [
            { value: "山西省 大同市", label: "大同市" },
            { value: "辽宁省 大连市", label: "大连市" },
            { value: "辽宁省 丹东市", label: "丹东市" },
            { value: "黑龙江省 大庆市", label: "大庆市" },
            { value: "黑龙江省 大兴安岭地区", label: "大兴安岭地区" },
            { value: "山东省 东营市", label: "东营市" },
            { value: "山东省 德州市", label: "德州市" },
            { value: "广东省 东莞市", label: "东莞市" },
            { value: "海南省 儋州市", label: "儋州市" },
            { value: "海南省 东方市", label: "东方市" },
            { value: "海南省 澄迈县", label: "澄迈县" },
            { value: "海南省 定安县", label: "定安县" },
            { value: "四川省 德阳市", label: "德阳市" },
            { value: "四川省 达州市", label: "达州市" },
            { value: "云南省 德宏傣族景颇族自治州", label: "德宏傣族景颇族自治州" },
            { value: "云南省 迪庆藏族自治州", label: "迪庆藏族自治州" },
            { value: "云南省 大理白族自治州", label: "大理白族自治州" },
            { value: "甘肃省 定西市", label: "定西市" },
        ],
    },
    {
        key: "E",
        dataList: [
            { value: "湖北省 鄂州市", label: "鄂州市" },
            { value: "湖北省 恩施土家族苗族自治州", label: "恩施土家族苗族自治州" },
        ],
    },
    {
        key: "F",
        dataList: [
            { value: "辽宁省 抚顺市", label: "抚顺市" },
            { value: "辽宁省 阜新市", label: "阜新市" },
            { value: "安徽省 阜阳市", label: "阜阳市" },
            { value: "福建省 福州市", label: "福州市" },
            { value: "江西省 抚州市", label: "抚州市" },
            { value: "广西 防城港市", label: "防城港市" },
        ],
    },
    {
        key: "G",
        dataList: [
            { value: "江西省 赣州市", label: "赣州市" },
            { value: "广东省 广州市", label: "广州市" },
            { value: "广西 桂林市", label: "桂林市" },
            { value: "广西 贵港市", label: "贵港市" },
            { value: "四川省 广元市", label: "广元市" },
            { value: "四川省 广安市", label: "广安市" },
            { value: "四川省 甘孜藏族自治州", label: "甘孜藏族自治州" },
            { value: "贵州省 贵阳市", label: "贵阳市" },
            { value: "甘肃省 甘南藏族自治州", label: "甘南藏族自治州" },
            { value: "青海省 果洛藏族自治州", label: "果洛藏族自治州" },
            { value: "宁夏 固原市", label: "固原市" },
            { value: "台湾省 高雄市", label: "高雄市" },
        ],
    },
    {
        key: "H",
        dataList: [
            { value: "河北省 邯郸市", label: "邯郸市" },
            { value: "河北省 衡水市", label: "衡水市" },
            { value: "内蒙古 呼和浩特市", label: "呼和浩特市" },
            { value: "内蒙古 呼伦贝尔市", label: "呼伦贝尔市" },
            { value: "辽宁省 葫芦岛市", label: "葫芦岛市" },
            { value: "黑龙江省 哈尔滨市", label: "哈尔滨市" },
            { value: "黑龙江省 鹤岗市", label: "鹤岗市" },
            { value: "黑龙江省 黑河市", label: "黑河市" },
            { value: "江苏省 淮安市", label: "淮安市" },
            { value: "浙江省 杭州市", label: "杭州市" },
            { value: "浙江省 湖州市", label: "湖州市" },
            { value: "安徽省 合肥市", label: "合肥市" },
            { value: "安徽省 淮南市", label: "淮南市" },
            { value: "安徽省 淮北市", label: "淮北市" },
            { value: "安徽省 黄山市", label: "黄山市" },
            { value: "山东省 菏泽市", label: "菏泽市" },
            { value: "河南省 鹤壁市", label: "鹤壁市" },
            { value: "湖北省 黄石市", label: "黄石市" },
            { value: "湖北省 黄冈市", label: "黄冈市" },
            { value: "湖南省 衡阳市", label: "衡阳市" },
            { value: "湖南省 怀化市", label: "怀化市" },
            { value: "广东省 惠州市", label: "惠州市" },
            { value: "广东省 河源市", label: "河源市" },
            { value: "广西 贺州市", label: "贺州市" },
            { value: "广西 河池市", label: "河池市" },
            { value: "海南省 海口市", label: "海口市" },
            { value: "云南省 红河哈尼族彝族自治州", label: "红河哈尼族彝族自治州" },
            { value: "陕西省 汉中市", label: "汉中市" },
            { value: "青海省 海东地区", label: "海东地区" },
            { value: "青海省 海北藏族自治州", label: "海北藏族自治州" },
            { value: "青海省 海南藏族自治州", label: "海南藏族自治州" },
            { value: "青海省 黄南藏族自治州", label: "黄南藏族自治州" },
            { value: "青海省 海西蒙古族藏族自治州", label: "海西蒙古族藏族自治州" },
            { value: "新疆 哈密地区", label: "哈密地区" },
            { value: "新疆 和田地区", label: "和田地区" },
        ],
    },
    { key: "I", dataList: [] },
    {
        key: "J",
        dataList: [
            { value: "山西省 晋城市", label: "晋城市" },
            { value: "山西省 晋中市", label: "晋中市" },
            { value: "辽宁省 锦州市", label: "锦州市" },
            { value: "吉林省 吉林市", label: "吉林市" },
            { value: "黑龙江省 鸡西市", label: "鸡西市" },
            { value: "黑龙江省 佳木斯市", label: "佳木斯市" },
            { value: "浙江省 嘉兴市", label: "嘉兴市" },
            { value: "浙江省 金华市", label: "金华市" },
            { value: "江西省 景德镇市", label: "景德镇市" },
            { value: "江西省 九江市", label: "九江市" },
            { value: "江西省 吉安市", label: "吉安市" },
            { value: "山东省 济南市", label: "济南市" },
            { value: "山东省 济宁市", label: "济宁市" },
            { value: "河南省 焦作市", label: "焦作市" },
            { value: "河南省 焦作市", label: "焦作市" },
            { value: "湖北省 荆州市", label: "荆州市" },
            { value: "湖北省 荆门市", label: "荆门市" },
            { value: "广东省 揭阳市", label: "揭阳市" },
            { value: "广东省 江门市", label: "江门市" },
            { value: "甘肃省 嘉峪关市", label: "嘉峪关市" },
            { value: "甘肃省 金昌市", label: "金昌市" },
            { value: "甘肃省 酒泉市", label: "酒泉市" },
        ],
    },
    {
        key: "K",
        dataList: [
            { value: "河南省 开封市", label: "开封市" },
            { value: "云南省 昆明市", label: "昆明市" },
            { value: "新疆 克拉玛依市", label: "克拉玛依市" },
            { value: "新疆 喀什地区", label: "喀什地区" },
            { value: "新疆 克孜勒苏柯尔克孜自治州", label: "克孜勒苏柯尔克孜自治州" },
        ],
    },
    {
        key: "L",
        dataList: [
            { value: "河北省 廊坊市", label: "廊坊市" },
            { value: "山西省 吕梁市", label: "吕梁市" },
            { value: "山西省 临汾市", label: "临汾市" },
            { value: "辽宁省 辽阳市", label: "辽阳市" },
            { value: "吉林省 辽源市", label: "辽源市" },
            { value: "江苏省 连云港市", label: "连云港市" },
            { value: "浙江省 丽水市", label: "丽水市" },
            { value: "安徽省 六安市", label: "六安市" },
            { value: "福建省 龙岩市", label: "龙岩市" },
            { value: "山东省 莱芜市", label: "莱芜市" },
            { value: "山东省 临沂市", label: "临沂市" },
            { value: "山东省 聊城市", label: "聊城市" },
            { value: "河南省 洛阳市", label: "洛阳市" },
            { value: "湖南省 娄底市", label: "娄底市" },
            { value: "广西 柳州市", label: "柳州市" },
            { value: "广西 来宾市", label: "来宾市" },
            { value: "海南省 临高县", label: "临高县" },
            { value: "海南省 陵水黎族自治县", label: "陵水黎族自治县" },
            { value: "四川省 泸州市", label: "泸州市" },
            { value: "四川省 凉山彝族自治州", label: "凉山彝族自治州" },
            { value: "贵州省 六盘水市", label: "六盘水市" },
            { value: "云南省 丽江市", label: "丽江市" },
            { value: "云南省 临沧市", label: "临沧市" },
            { value: "西藏 拉萨市", label: "拉萨市" },
            { value: "西藏 林芝地区", label: "林芝地区" },
            { value: "甘肃省 兰州市", label: "兰州市" },
            { value: "甘肃省 陇南市", label: "陇南市" },
            { value: "甘肃省 临夏回族自治州", label: "临夏回族自治州" },
        ],
    },
    {
        key: "M",
        dataList: [
            { value: "黑龙江省 牡丹江市", label: "牡丹江市" },
            { value: "安徽省 马鞍山市", label: "马鞍山市" },
            { value: "广东省 茂名市", label: "茂名市" },
            { value: "广东省 梅州市", label: "梅州市" },
            { value: "四川省 绵阳市", label: "绵阳市" },
            { value: "四川省 眉山市", label: "眉山市" },
        ],
    },
    {
        key: "N",
        dataList: [
            { value: "江苏省 南京市", label: "南京市" },
            { value: "江苏省 南通市", label: "南通市" },
            { value: "浙江省 宁波市", label: "宁波市" },
            { value: "福建省 南平市", label: "南平市" },
            { value: "福建省 宁德市", label: "宁德市" },
            { value: "江西省 南昌市", label: "南昌市" },
            { value: "河南省 南阳市", label: "南阳市" },
            { value: "广西 南宁市", label: "南宁市" },
            { value: "四川省 内江市", label: "内江市" },
            { value: "四川省 南充", label: "南充" },
            { value: "云南省 怒江傈僳族自治州", label: "怒江傈僳族自治州" },
            { value: "西藏 那曲地区", label: "那曲地区" },
        ],
    },
    { key: "O", dataList: [] },
    {
        key: "P",
        dataList: [
            { value: "辽宁省 盘锦", label: "盘锦" },
            { value: "福建省 莆田市", label: "莆田市" },
            { value: "江西省 萍乡市", label: "萍乡市" },
            { value: "河南省 平顶山市", label: "平顶山市" },
            { value: "河南省 濮阳市", label: "濮阳市" },
            { value: "四川省 攀枝花市", label: "攀枝花市" },
            { value: "云南省 普洱市", label: "普洱市" },
            { value: "甘肃省 平凉市", label: "平凉市" },
        ],
    },
    {
        key: "Q",
        dataList: [
            { value: "河北省 秦皇岛市", label: "秦皇岛市" },
            { value: "辽宁省 其他", label: "其他" },
            { value: "吉林省 其他", label: "其他" },
            { value: "黑龙江省 齐齐哈尔市", label: "齐齐哈尔市" },
            { value: "黑龙江省 七台河市", label: "七台河市" },
            { value: "黑龙江省 其他", label: "其他" },
            { value: "江苏省 其他", label: "其他" },
            { value: "浙江省 衢州市", label: "衢州市" },
            { value: "安徽省 其他市", label: "其他市" },
            { value: "福建省 泉州市", label: "泉州市" },
            { value: "福建省 其他", label: "其他" },
            { value: "江西省 其他", label: "其他" },
            { value: "山东省 青岛市", label: "青岛市" },
            { value: "山东省 其他", label: "其他" },
            { value: "河南省 其他", label: "其他" },
            { value: "湖北省 潜江市", label: "潜江市" },
            { value: "湖北省 其他", label: "其他" },
            { value: "湖南省 其他", label: "其他" },
            { value: "广东省 清远市", label: "清远市" },
            { value: "广西 钦州市", label: "钦州市" },
            { value: "广西 其他市", label: "其他市" },
            { value: "海南省 琼海市", label: "琼海市" },
            { value: "海南省 琼中黎族苗族自治县", label: "琼中黎族苗族自治县" },
            { value: "海南省 其他", label: "其他" },
            { value: "四川省 其他", label: "其他" },
            { value: "贵州省 黔西南布依族苗族自治州", label: "黔西南布依族苗族自治州" },
            { value: "贵州省 黔东南苗族侗族自治州", label: "黔东南苗族侗族自治州" },
            { value: "贵州省 黔南布依族苗族自治州", label: "黔南布依族苗族自治州" },
            { value: "贵州省 其他", label: "其他" },
            { value: "云南省 曲靖市", label: "曲靖市" },
            { value: "云南省 其他", label: "其他" },
            { value: "西藏 其他", label: "其他" },
            { value: "陕西省 其他", label: "其他" },
            { value: "甘肃省 庆阳市", label: "庆阳市" },
            { value: "甘肃省 其他", label: "其他" },
            { value: "青海省 其他", label: "其他" },
            { value: "宁夏 其他", label: "其他" },
            { value: "新疆 其他", label: "其他" },
        ],
    },
    {
        key: "R",
        dataList: [
            { value: "山东省 日照市", label: "日照市" },
            { value: "西藏 日喀则地区", label: "日喀则地区" },
        ],
    },
    {
        key: "S",
        dataList: [
            { value: "河北省 石家庄市", label: "石家庄市" },
            { value: "山西省 朔州市", label: "朔州市" },
            { value: "辽宁省 沈阳市", label: "沈阳市" },
            { value: "吉林省 四平", label: "四平" },
            { value: "吉林省 松原市", label: "松原市" },
            { value: "黑龙江省 双鸭山", label: "双鸭山" },
            { value: "黑龙江省 绥化市", label: "绥化市" },
            { value: "上海市", label: "上海市" },
            { value: "江苏省 苏州市", label: "苏州市" },
            { value: "江苏省 宿迁市", label: "宿迁市" },
            { value: "浙江省 绍兴市", label: "绍兴市" },
            { value: "安徽省 宿州市", label: "宿州市" },
            { value: "福建省 三明市", label: "三明市" },
            { value: "江西省 上饶市", label: "上饶市" },
            { value: "河南省 三门峡市", label: "三门峡市" },
            { value: "河南省 商丘市", label: "商丘市" },
            { value: "湖北省 十堰市", label: "十堰市" },
            { value: "湖北省 随州市", label: "随州市" },
            { value: "湖北省 神农架林区", label: "神农架林区" },
            { value: "湖南省 邵阳市", label: "邵阳市" },
            { value: "广东省 深圳市", label: "深圳市" },
            { value: "广东省 汕头市", label: "汕头市" },
            { value: "广东省 韶关市", label: "韶关市" },
            { value: "广东省 汕尾市", label: "汕尾市" },
            { value: "海南省 三亚市", label: "三亚市" },
            { value: "四川省 遂宁市", label: "遂宁市" },
            { value: "西藏 山南地区", label: "山南地区" },
            { value: "陕西省 商洛市", label: "商洛市" },
            { value: "宁夏 石嘴山市", label: "石嘴山市" },
            { value: "新疆 石河子", label: "石河子" },
        ],
    },
    {
        key: "T",
        dataList: [
            { value: "天津市", label: "天津市" },
            { value: "河北省 唐山市", label: "唐山市" },
            { value: "山西省 太原市", label: "太原市" },
            { value: "内蒙古 通辽市", label: "通辽市" },
            { value: "辽宁省 铁岭市", label: "铁岭市" },
            { value: "吉林省 通化市", label: "通化市" },
            { value: "江苏省 泰州市", label: "泰州市" },
            { value: "浙江省 台州市", label: "台州市" },
            { value: "安徽省 铜陵市", label: "铜陵市" },
            { value: "山东省 泰安市", label: "泰安市" },
            { value: "河南省 漯河市", label: "漯河市" },
            { value: "湖北省 天门市", label: "天门市" },
            { value: "贵州省 铜仁地区", label: "铜仁地区" },
            { value: "陕西省 铜川市", label: "铜川市" },
            { value: "甘肃省 天水市", label: "天水市" },
            { value: "新疆 吐鲁番地区", label: "吐鲁番地区" },
            { value: "新疆 图木舒克", label: "图木舒克" },
            { value: "台湾省 台北市", label: "台北市" },
            { value: "台湾省 桃园市", label: "桃园市" },
            { value: "台湾省 台中市", label: "台中市" },
            { value: "台湾省 台南市", label: "台南市" },
        ],
    },
    { key: "U", dataList: [] },
    { key: "V", dataList: [] },
    {
        key: "W",
        dataList: [
            { value: "内蒙古 乌海市", label: "乌海市" },
            { value: "内蒙古 乌兰察布盟", label: "乌兰察布盟" },
            { value: "江苏省 无锡市", label: "无锡市" },
            { value: "浙江省 温州市", label: "温州市" },
            { value: "安徽省 芜湖市", label: "芜湖市" },
            { value: "山东省 潍坊市", label: "潍坊市" },
            { value: "山东省 威海市", label: "威海市" },
            { value: "湖北省 武汉市", label: "武汉市" },
            { value: "广西 梧州市", label: "梧州市" },
            { value: "海南省 五指山市", label: "五指山市" },
            { value: "海南省 文昌市", label: "文昌市" },
            { value: "海南省 万宁市", label: "万宁市" },
            { value: "云南省 文山壮族苗族自治州", label: "文山壮族苗族自治州" },
            { value: "陕西省 渭南市", label: "渭南市" },
            { value: "甘肃省 武威市", label: "武威市" },
            { value: "宁夏 吴忠市", label: "吴忠市" },
            { value: "新疆 乌鲁木齐市", label: "乌鲁木齐市" },
            { value: "新疆 五家渠", label: "五家渠" },
        ],
    },
    {
        key: "X",
        dataList: [
            { value: "河北省 邢台市", label: "邢台市" },
            { value: "山西省 忻州市", label: "忻州市" },
            { value: "内蒙古 兴安盟", label: "兴安盟" },
            { value: "内蒙古 锡林郭勒盟", label: "锡林郭勒盟" },
            { value: "江苏省 徐州市", label: "徐州市" },
            { value: "安徽省 宣城市", label: "宣城市" },
            { value: "福建省 厦门市", label: "厦门市" },
            { value: "江西省 新余市", label: "新余市" },
            { value: "河南省 新乡市", label: "新乡市" },
            { value: "河南省 许昌市", label: "许昌市" },
            { value: "河南省 信阳市", label: "信阳市" },
            { value: "湖北省 襄樊市", label: "襄樊市" },
            { value: "湖北省 孝感市", label: "孝感市" },
            { value: "湖北省 咸宁市", label: "咸宁市" },
            { value: "湖北省 仙桃市", label: "仙桃市" },
            { value: "湖南省 湘潭市", label: "湘潭市" },
            { value: "湖南省 湘西土家族苗族自治州", label: "湘西土家族苗族自治州" },
            { value: "云南省 西双版纳傣族自治州", label: "西双版纳傣族自治州" },
            { value: "陕西省 西安市", label: "西安市" },
            { value: "陕西省 咸阳市", label: "咸阳市" },
            { value: "青海省 西宁市", label: "西宁市" },
            { value: "台湾省 新北市", label: "新北市" },
            { value: "香港", label: "香港" },
        ],
    },
    {
        key: "Y",
        dataList: [
            { value: "山西省 阳泉市", label: "阳泉市" },
            { value: "山西省 运城市", label: "运城市" },
            { value: "内蒙古 伊克昭盟", label: "伊克昭盟" },
            { value: "辽宁省 营口市", label: "营口市" },
            { value: "吉林省 延边朝鲜族自治州", label: "延边朝鲜族自治州" },
            { value: "黑龙江省 伊春市", label: "伊春市" },
            { value: "江苏省 扬州市", label: "扬州市" },
            { value: "江苏省 盐城市", label: "盐城市" },
            { value: "江西省 鹰潭市", label: "鹰潭市" },
            { value: "江西省 宜春市", label: "宜春市" },
            { value: "山东省 烟台市", label: "烟台市" },
            { value: "湖北省 宜昌市", label: "宜昌市" },
            { value: "湖南省 岳阳市", label: "岳阳市" },
            { value: "湖南省 益阳市", label: "益阳市" },
            { value: "湖南省 永州市", label: "永州市" },
            { value: "广东省 云浮市", label: "云浮市" },
            { value: "广东省 阳江市", label: "阳江市" },
            { value: "广西 玉林市", label: "玉林市" },
            { value: "海南省 乐东黎族自治县", label: "乐东黎族自治县" },
            { value: "四川省 乐山市", label: "乐山市" },
            { value: "四川省 宜宾市", label: "宜宾市" },
            { value: "四川省 雅安市", label: "雅安市" },
            { value: "云南省 玉溪市", label: "玉溪市" },
            { value: "陕西省 延安市", label: "延安市" },
            { value: "陕西省 榆林市", label: "榆林市" },
            { value: "青海省 玉树藏族自治州", label: "玉树藏族自治州" },
            { value: "宁夏 银川市", label: "银川市" },
            { value: "新疆 伊犁哈萨克自治州", label: "伊犁哈萨克自治州" },
        ],
    },
    {
        key: "Z",
        dataList: [
            { value: "河北省 张家口", label: "张家口" },
            { value: "山西省 长治市", label: "长治市" },
            { value: "辽宁省 朝阳市", label: "朝阳市" },
            { value: "吉林省 长春市", label: "长春市" },
            { value: "江苏省 镇江市", label: "镇江市" },
            { value: "浙江省 舟山市", label: "舟山市" },
            { value: "福建省 漳州市", label: "漳州市" },
            { value: "山东省 淄博市", label: "淄博市" },
            { value: "山东省 枣庄市", label: "枣庄市" },
            { value: "河南省 郑州市", label: "郑州市" },
            { value: "河南省 周口市", label: "周口市" },
            { value: "河南省 驻马店市", label: "驻马店市" },
            { value: "湖南省 长沙市", label: "长沙市" },
            { value: "湖南省 株洲市", label: "株洲市" },
            { value: "湖南省 张家界市", label: "张家界市" },
            { value: "广东省 中山市", label: "中山市" },
            { value: "广东省 珠海市", label: "珠海市" },
            { value: "广东省 湛江市", label: "湛江市" },
            { value: "广东省 肇庆市", label: "肇庆市" },
            { value: "海南省 屯昌县", label: "屯昌县" },
            { value: "重庆市", label: "重庆市" },
            { value: "四川省 自贡市", label: "自贡市" },
            { value: "四川省 资阳市", label: "资阳市" },
            { value: "贵州省 遵义市", label: "遵义市" },
            { value: "云南省 昭通市", label: "昭通市" },
            { value: "甘肃省 张掖市", label: "张掖市" },
            { value: "宁夏 中卫市", label: "中卫市" },
        ],
    },
    { key: "#", dataList: [] },
];
