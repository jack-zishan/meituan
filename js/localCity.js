(function () {
    //获取用户所在城市信息
    function showCityInfo() {
        //实例化城市查询类
        let citysearch = new AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city && result.bounds) {
                    let cityinfo = result.city;
                    console.log(cityinfo);
                    document.querySelector(".location-text").innerHTML = cityinfo;
                    document.cookie = "city="+cityinfo; 
                    //地图显示当前城市
                }
            }else{
                // 无法获取定位（定位至国外，未给定位权限等错误）
                document.querySelector(".location-text").innerHTML = "定位中";
            }
        });
    }
    // 添加一个条件判断，在手动添加了地址之后，不进行自动定位
    let city=getCookie("city");
    if(city){
            document.querySelector(".location-text").innerHTML = city;
    }else{
        showCityInfo();
    }
})();