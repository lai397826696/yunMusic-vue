let dpr, rem, scale;
let docEl = document.documentElement;
let metaEl = document.querySelector('meta[name="viewport"]');
// let isIPhone = window.navigator.userAgent.match(/iphone/gi);
let isIPhone = null;

function browserRedirect() {
    var sUserAgent = window.navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        console.log("您的浏览设备为：移动端")
        isIPhone=true;
    } else {
        isIPhone=false;
        console.log("您的浏览设备为：PC端")
    }
}
browserRedirect();
dpr = window.devicePixelRatio || 1;
rem = docEl.clientWidth / 10 * 2;
if (!isIPhone) rem = 100;
console.log("dpr:" + dpr);



docEl.setAttribute('data-dpr', dpr);
docEl.setAttribute('style', 'font-size:' + rem + 'px');