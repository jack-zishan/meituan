(function () {
    // 得分模版字符串
    let itemTmpl = '<div class="star-score">$starstr</div>';
    function _getStars() {
        //将星级转换成字符串
        let _score = this.score.toString();
        //将星级以小数点为分界线分成两部分 
        let scoreArray = _score.split("."); 
        // 再把整数和小数部分的星星换成数值
        let fullstar = parseInt(scoreArray[0]); 
        // 半星以四舍五入区分
        let halfstar = parseInt(scoreArray[1]) >= 5 ? 1 : 0; 
        // 剩下的都是0星
        let nullstar = 5 - fullstar - halfstar; 
        // 创建一个空字符串存储星星的结构
        let starstr = "";
        for (let i = 0; i < fullstar; i++) {
            starstr += '<div class="star fullstar"></div>';
        }
        for (let j = 0; j < halfstar; j++) {
            starstr += '<div class="star halfstar"></div>';
        }
        for (let k = 0; k < nullstar; k++) {
            starstr += '<div class="star nullstar"></div>';
        }
        return itemTmpl.replace("$starstr", starstr);
    }
    // 创建一个window下的StarScare类，绑定一个函数可以在其他页面调用
    window.StarScore = function (score) {
        this.score = score;
        this.getStars = _getStars;
    };
})();
