({607:function(){var e=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(o,a){function i(e){try{u(r.next(e))}catch(e){a(e)}}function c(e){try{u(r.throw(e))}catch(e){a(e)}}function u(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(i,c)}u((r=r.apply(e,n||[])).next())}))},n=this&&this.__generator||function(e,n){var t,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(a){return function(c){return function(a){if(t)throw new TypeError("Generator is already executing.");for(;i;)try{if(t=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=n.call(e,i)}catch(e){a=[6,e],r=0}finally{t=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,c])}}},t=document.querySelector("#weathericon"),r=document.querySelector("#weatherinfo");function o(){return e(this,void 0,void 0,(function(){return n(this,(function(e){switch(e.label){case 0:return[4,fetch("https://api.openweathermap.org/data/2.5/weather?q=London&APPID=7e80142b9823ee5dd2cb673abe21ffd3")];case 1:return[4,e.sent().json()];case 2:return[2,e.sent()]}}))}))}!function(){e(this,void 0,void 0,(function(){var e,a,i,c;return n(this,(function(n){switch(n.label){case 0:return[4,o()];case 1:return e=n.sent(),a=e.weather[0].main,i=function(e){return Math.round(e-273.15)}(e.main.temp),c=e.weather[0].icon,r.innerHTML="<p>Weather: ".concat(a,"</p><p>Temp: ").concat(i,"&#176;C</p>"),t.innerHTML='<img src="http://openweathermap.org/img/wn/'.concat(c,'@2x.png" />'),[2]}}))}))}()}})[607]();