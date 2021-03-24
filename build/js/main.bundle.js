(()=>{"use strict";const e={flat:"Квартира",bungalow:"Бунгало",house:"Дом",palace:"Дворец"},t=document.querySelector("#card").content.querySelector(".popup"),o=e=>1===e?`${e} гостя`:`${e} гостей`,r=e=>1===e?`${e} комната`:e>=5?`${e} комнат`:`${e} комнаты`,n=e=>{e.style.display="none"},a=e=>{e.disabled=!0},i=e=>{e.disabled=!1},l=e=>"Esc"===e.key||"Escape"===e.key,c={SIZE:[40,40],ANCHOR:[20,40]},d={lat:35.685,lng:139.7514},s=document.querySelector("#address"),u=document.querySelector("#map-canvas"),p=window.L.map("map-canvas").setView(d,10),y=window.L.icon({iconUrl:"img/main-pin.svg",iconSize:c.SIZE,iconAnchor:c.ANCHOR}),m=window.L.icon({iconUrl:"img/pin.svg",iconSize:c.SIZE,iconAnchor:c.ANCHOR}),h=window.L.marker(d,{icon:y,draggable:!0});let v=window.L.layerGroup();h.on("move",(e=>{const t=e.target.getLatLng();s.value=`${t.lat.toFixed(5)}, ${t.lng.toFixed(5)}`}));const g=e=>{e.slice(0,10).forEach((e=>f(e))),v.addTo(p)},f=a=>{window.L.marker([a.location.lat,a.location.lng],{icon:m}).addTo(v).bindPopup((a=>{const i=t.cloneNode(!0),l=i.querySelector(".popup__avatar"),c=i.querySelector(".popup__title"),d=i.querySelector(".popup__text--address"),s=i.querySelector(".popup__text--price"),u=i.querySelector(".popup__type"),p=i.querySelector(".popup__text--capacity"),y=i.querySelector(".popup__text--time"),m=i.querySelector(".popup__features"),h=i.querySelector(".popup__description"),v=i.querySelector(".popup__photos"),{author:{avatar:g},offer:{address:f,checkin:S,checkout:L,descriptions:_,features:q,guests:E,photos:w,price:$,rooms:C,title:b,type:x}}=a;return b?c.textContent=b:n(c),f?d.textContent=f:n(d),$?s.innerHTML=`${$} <span>₽/ночь</span>`:n(s),x?u.textContent=e[x]:n(x),C||E?p.textContent=C?E?`${r(C)} для ${o(E)}`:`${r(C)}`:`Для ${o(E)}`:n(p),S||L?y.textContent=`Заезд после ${S} выезд до ${L}`:n(y),q?((e,t)=>{e.innerHTML="",t.forEach((t=>{const o=document.createElement("li");o.classList.add("popup__feature",`popup__feature--${t}`),e.appendChild(o)}))})(m,q):n(m),_?h.textContent=_:n(h),w?((e,t)=>{e.innerHTML="",t.forEach(((t,o)=>{const r=document.createElement("img");r.classList.add("popup__photo"),r.width=45,r.height=40,r.alt=`Фотография жилья ${o}`,r.src=`${t}`,e.appendChild(r)}))})(v,w):n(v),g?l.src=g:n(l),i})(a))},S="https://22.javascript.pages.academy/keksobooking",L=e=>{if(e.ok)return e;const{statusText:t,status:o}=e;throw new Error(`${o} - ${t}`)},q=document.querySelector("main"),E=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),w=e=>{l(e)&&(e.preventDefault(),$())},$=()=>{document.body.style.overflow="visible",E.removeEventListener("click",$),q.querySelector(".error__button").removeEventListener("click",$),document.removeEventListener("keydown",w),q.removeChild(q.querySelector(".error"))},C=()=>{document.body.style.overflow="hidden",E.addEventListener("click",$),E.querySelector(".error__button").addEventListener("click",$),document.addEventListener("keydown",w),q.appendChild(E)},b=document.querySelector("main"),x=document.querySelector("#success").content.querySelector(".success").cloneNode(!0),k=e=>{l(e)&&(e.preventDefault(),V())},V=()=>{document.body.style.overflow="visible",x.removeEventListener("click",V),document.removeEventListener("keydown",k),b.removeChild(b.querySelector(".success"))},N=document.querySelector(".map__filters"),A=()=>{N.classList.add("map__filters--disabled"),N.childNodes.forEach(a)},T=["gif","jpg","jpeg","png"],F=(e,t)=>{const o=e.files;if((e=>{const t=[];for(let o=0;o<e.length;o++)t.push(e[o].name.toLowerCase());return t})(o).every((e=>T.some((t=>e.endsWith(t)))))){let e=(e=>{const t=new Array(e.length);for(let e=0;e<t.length;e++){let o=new FileReader;t[e]=o}return t})(o);e.forEach((e=>{e.addEventListener("load",(()=>{if(t.src)t.src=e.result;else{let o=document.createElement("img");o.src=e.result,o.width=40,o.height=44,t.append(o)}}))})),((e,t)=>{for(let o=0;o<e.length;o++)t[o].readAsDataURL(e[o])})(o,e)}},M=document.querySelector(".ad-form"),D=M.querySelector("#title"),H=M.querySelector("#address"),O=M.querySelector("#type"),R=M.querySelector("#price"),j=M.querySelector("#timein"),U=M.querySelector("#timeout"),z=M.querySelector("#room_number"),I=M.querySelector("#capacity"),Z=M.querySelector(".ad-form__reset"),P=M.querySelector("#avatar"),G=M.querySelector(".ad-form-header__preview img"),W=M.querySelector("#images"),B=M.querySelector(".ad-form__photo"),J={flat:1e3,bungalow:0,house:5e3,palace:1e4},K={1:["1"],2:["1","2"],3:["1","2","3"],100:["0"]},Q=Array.from(I.options),X=()=>{M.reset(),N.reset(),p.setView(d,10),h.setLatLng(d),H.value=`${d.lat.toFixed(5)}, ${d.lng.toFixed(5)}`,Y(z.value)};D.addEventListener("invalid",(()=>{D.validity.valueMissing?D.setCustomValidity("Обязательное поле для заполнения!"):D.setCustomValidity("")})),D.addEventListener("input",(()=>{const e=D.value.length;D.validity.tooShort?D.setCustomValidity(`Длинна заголовка не менее 30 символов (${e}/30)`):D.validity.tooLong?D.setCustomValidity("Длинна заголовка не более 100 символов"):D.validity.valueMissing?D.setCustomValidity("Обязательное поле для заполнения!"):D.setCustomValidity(""),D.reportValidity()})),O.addEventListener("change",(()=>{R.min=J[O.value],R.placeholder=J[O.value]})),R.addEventListener("change",(()=>{R.validity.rangeUnderflow?R.setCustomValidity(`Стоимость должна быть выше ${R.placeholder}`):R.validity.rangeOverflow?R.setCustomValidity(`Стоимость должна быть ниже ${R.max}`):R.validity.valueMissing?R.setCustomValidity("Обязательное поле для заполнения!"):R.setCustomValidity(""),R.reportValidity()})),j.addEventListener("change",(()=>{U.value=j.value})),U.addEventListener("change",(()=>{j.value=U.value}));const Y=e=>{Q.forEach((t=>{t.hidden=!K[e].includes(t.value),t.selected=!t.hidden}))};z.addEventListener("change",(()=>{Y(z.value)})),Z.addEventListener("click",(e=>{e.preventDefault(),X()}));const ee=()=>{X(),document.body.style.overflow="hidden",x.addEventListener("click",V),document.addEventListener("keydown",k),b.appendChild(x)},te=()=>{C()};M.addEventListener("submit",(e=>{var t,o,r;e.preventDefault(),t=ee,o=te,r=new FormData(e.target),fetch(`${S}`,{method:"POST",body:r}).then(L).then(t).catch(o)})),P.addEventListener("change",(()=>{F(P,G)})),W.addEventListener("change",(()=>{F(W,B)}));const oe="any",re={low:{min:0,max:1e4},middle:{min:1e4,max:5e4},high:{min:5e4,max:1e6}},ne=document.querySelector(".map__filters"),ae=ne.querySelector("#housing-type"),ie=ne.querySelector("#housing-price"),le=ne.querySelector("#housing-rooms"),ce=ne.querySelector("#housing-guests"),de=(e,t,o)=>o===oe||e.offer[t].toString()===(o||oe),se=e=>{const t=de(e,"type",ae.value),o=de(e,"rooms",le.value),r=de(e,"guests",ce.value),n=((e,t)=>t===oe||((e,t)=>e>=re[t].min&&e<re[t].max)(e.offer.price,t))(e,ie.value),a=(e=>{let t=Array.from(ne.querySelectorAll("input[type=checkbox]:checked"));return!t.length||t.every((t=>e.offer.features.includes(t.value)))})(e);return t&&o&&r&&n&&a};var ue,pe;p?((()=>{const e=p.getCenter();window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(p),h.addTo(p),u.childNodes.forEach((e=>e.hidden=!1)),M.classList.remove("ad-form--disabled"),M.childNodes.forEach(i),Y(z.value),N.classList.remove("map__filters--disabled"),N.childNodes.forEach(i),H.value=`${e.lat.toFixed(5)}, ${e.lng.toFixed(5)}`})(),ue=e=>{var t;g(e),t=_.debounce((()=>{v.clearLayers(),g((e=>e.filter(se))(e))})),N.addEventListener("change",(()=>{t()}))},pe=()=>{A(),C()},fetch(`${S}/data`).then(L).then((e=>e.json())).then(ue).catch(pe)):(u.childNodes.forEach((e=>e.hidden=!0)),M.classList.add("ad-form--disabled"),M.childNodes.forEach(a),A())})();
//# sourceMappingURL=main.bundle.js.map