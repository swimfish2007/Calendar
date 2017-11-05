// JavaScript Document
addDOMLoadEvent(function(){
	calendar("dateControl");
});
var calendar = function(id){
	var date = new Date();
	var year = date.getFullYear();
    var month = date.getMonth();
	var day = date.getDate();
	calendar.prototype.builds(date);
	getid(id).onclick = function(ev){
		var target = delegate(ev);
		if(lowerCase(target,"a")){
			target == target.parentNode.firstElementChild.nextElementSibling?(month>0?month--:(month=11,year--)):target == target.parentNode.lastElementChild.previousElementSibling?(month<11?month++:(month=0,year++)):target == target.parentNode.firstElementChild?year--:year++;
			day=(/^(1)$/.test(month) && date.getDate()>28)?28:(/^(3|5|8|10)$/.test(month) && date.getDate()>30)?30:date.getDate();
			calendar.prototype.builds(new Date(year,month,day));
		}
	};
}
calendar.prototype.builds = function(date){
	getid("date").innerHTML = "";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
	var mOld = date.getMonth();
    var now = date.getDate();
    var day = days(month,year);
	var dayOld = days(mOld,year);
    var number = new Date(year, month - 1, 1).getDay();
	var dayNum = (Math.ceil((number + day)/7))*7;
	var nList = '';
    for(var y=0,x=1,z=1;y<dayNum;y++){
		nList += (y>=number && y<day+number)?(y%7==0 || y%7==6)?"<li class='weekend'>"+(y-number+1)+"</li>":y==(now+number-1)?"<li class='cur'>"+(y-number+1)+"</li>":"<li>"+(y-number+1)+"</li>":y>(day+number-1)?"<li class='old'>"+(x++)+"</li>":"<li class='old'>"+(dayOld-number+(z++))+"</li>";
    }
	getid("date").innerHTML += "<ul id='dateIn'>"+nList+"</ul>";
	getid("dateDetail").innerHTML = year+"年"+month+"月"+now+"日";
	getid("dateIn").children[now+number-1].className = "cur";
}
function days(m,y){
	return m == 2?y % 4 == 0 ? 29 : 28:/^(4|6|9|11)$/.test(m)?30:31;
}
function delegate(e){//事件捕捉
	var e = e || window.event;
	return e.target || e.srcElement;
}
function lowerCase(e,tag){//判断事件捕获标签
	return e.nodeName.toLowerCase() == tag;
}
function getid(id){
	return document.getElementById(id);
}
function addDOMLoadEvent(func) {
    if (!window.__load_events) {
       var init = function () {
           // quit if this function has already been called
           if (arguments.callee.done) return;
           // flag this function so we don't do the same thing twice
           arguments.callee.done = true;
           // kill the timer
           if (window.__load_timer) {
               clearInterval(window.__load_timer);
               window.__load_timer = null;
           }
           // execute each function in the stack in the order they were added
           for (var i=0;i < window.__load_events.length;i++) {
              window.__load_events[i]();
           }
           window.__load_events = null;
       };
       // for Mozilla/Opera9
       if (document.addEventListener) {
           document.addEventListener("DOMContentLoaded", init, false);
       }
       // for Internet Explorer
       /*@cc_on @*/
       /*@if (@_win32)
           document.write("<scr"+"ipt id=__ie_onload defer src=//0><\/scr"+"ipt>");
           var script = document.getElementById("__ie_onload");
           script.onreadystatechange = function() {
               if (this.readyState == "complete") {
                   init(); // call the onload handler
               }
           };
       /*@end @*/
       // for Safari
       if (/WebKit/i.test(navigator.userAgent)) { // sniff
           window.__load_timer = setInterval(function() {
               if (/loaded|complete/.test(document.readyState)) {
                   init(); // call the onload handler
               }
           }, 10);
       }
       // for other browsers
       window.onload = init;
       // create event function stack
       window.__load_events = [];
    }
    // add function to event stack
    window.__load_events.push(func);
}