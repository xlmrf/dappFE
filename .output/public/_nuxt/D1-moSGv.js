const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./C2wCgOwX.js","./I0J7D7wH.js","./DOvt5s4i.js","./Ckh0oh2P.js","./chunk-pg-(ranking).BvAF5Vr6.css","./Bf6kWBt7.js","./chunk-pg-settings.BZxPkVe1.css","./3EwUDpM_.js","./Cy19EL0k.js","./mIYJAZJv.js"])))=>i.map(i=>d[i]);
import{d as _,h as g,e as h,w as m,ae as x,o as l,a,i as y,m as V,c as i,F as k,G as A,E as v,t as u,g as d,a0 as $,a1 as P,f as C,l as p,bL as T,a$ as z,b as O,_ as L,bM as B,p as j,y as E,B as I}from"./I0J7D7wH.js";import{c as R}from"./Ckh0oh2P.js";const b={small:"sm",large:"lg"},M={default:"default",withText:"with-text"},D=["src","loading"],N=_({__name:"AppLogo",props:{variant:{default:M.default},size:{default:b.small},lazyLoaded:{type:Boolean,default:!0}},setup(r){const n=r,o=g(()=>`logos/logo-${n.variant}`),c=g(()=>{switch(n.size){case b.small:return"tw-w-750 lg:tw-w-950 tw-h-auto";case b.large:return"tw-w-4500 lg:tw-w-5750 tw-h-auto";default:throw new Error("Unknown app logo size value "+n.size)}});return(w,e)=>{const s=x;return l(),h(s,{to:"/"},{default:m(()=>[a("img",{src:`/images/${o.value}.gif`,alt:"dapp expert logo",class:y(c.value),loading:w.lazyLoaded?"lazy":"eager"},null,10,D)]),_:1})}}}),F=[{label:"menu.header.ranking",to:"/ranking"},{label:"menu.header.news",to:"/news"},{label:"menu.header.articles",to:"/analytics"},{label:"menu.header.defight"}],U={class:"tw-flex tw-gap-7.5"},H={key:1},G=_({__name:"AppMainMenu",emits:["navigate"],setup(r,{emit:n}){const o=n,{t:c}=V();return(w,e)=>{const s=x;return l(),i("ul",U,[(l(!0),i(k,null,A(d(F),t=>(l(),i("li",{key:t.label,class:"tw-italic tw-uppercase tw-font-bold tw-leading-500"},[t.to?(l(),h(s,{key:0,to:t.to,onClick:e[0]||(e[0]=f=>o("navigate"))},{default:m(()=>[v(u(d(c)(t.label)),1)]),_:2},1032,["to"])):(l(),i("span",H,u(d(c)(t.label)),1))]))),128))])}}}),Y={primary:"primary",secondary:"secondary"},X=_({__name:"DeCollapsibleListbox",props:$({options:{},optionLabel:{},optionValue:{},appendTo:{},popupAlignment:{default:"left"},placeholder:{},category:{default:Y.primary},iconName:{default:"chevron-down-filled"},panelClass:{}},{modelValue:{},modelModifiers:{}}),emits:$(["change"],["update:modelValue"]),setup(r,{emit:n}){const o=P(r,"modelValue"),c=n;function w(e){c("change",e)}return(e,s)=>(l(),h(R,{modelValue:o.value,"onUpdate:modelValue":s[0]||(s[0]=t=>o.value=t),options:e.options,class:y(["de-collapsible-listbox",`de-collapsible-listbox-${e.category}`]),placeholder:e.placeholder,"option-label":e.optionLabel,"option-value":e.optionValue,"panel-class":e.panelClass,"append-to":e.appendTo,"popup-alignment":e.popupAlignment,onChange:w},{value:m(t=>[C(e.$slots,"trigger",{slotProps:t},()=>[p(z,{label:t.value?t.value:t.placeholder,icon:e.iconName,"icon-pos":d(T).right,class:"tw-w-full tw-justify-between"},null,8,["label","icon","icon-pos"])])]),option:m(({option:t})=>[C(e.$slots,"option",{option:t})]),dropdownicon:m(()=>s[1]||(s[1]=[v(u(null))])),_:3},8,["modelValue","options","class","placeholder","option-label","option-value","panel-class","append-to","popup-alignment"]))}}),Z={key:0,class:"heading-h5.1 tw-font-normal tw-mb-5 tw-text-primary-300 tw-text-center"},q={class:"tw-flex tw-gap-2 tw-flex-wrap"},J=["aria-label"],K=["href","title"],Q=["href","title"],W=_({__name:"SocialsList",props:{showHeader:{type:Boolean,default:!0},center:{type:Boolean,default:!1}},setup(r){const n=[{id:"facebook",icon:"socials--facebook-round",link:"https://www.facebook.com/dappexpert",linkRu:"https://www.facebook.com/dapp.expert_russian"},{id:"telegram",icon:"socials--telegram-round",link:"https://t.me/dappexpert",linkRu:"https://t.me/dappexpert_russia"},{id:"instagram",icon:"socials--instagram",link:"https://www.instagram.com/dapp.expert/",linkRu:"https://www.instagram.com/dapp.expert_russian/"},{id:"vk",icon:"socials--ru--vk",link:"https://vk.com/dappexpert"},{id:"twitter",icon:"socials--twitter",link:"https://twitter.com/Dappexpert"},{id:"youtube",icon:"socials--youtube",link:"https://www.youtube.com/@dappexpert"},{id:"discord",icon:"socials--discord",link:"https://discord.com/channels/873147314410237983/873147315408490568"},{id:"reddit",icon:"socials--reddit",link:"https://www.reddit.com/user/DappExpert/"},{id:"medium",icon:"socials--medium",link:"https://medium.com/@Dapp.Expert"}],{t:o}=V(),c=g(()=>B.map(e=>({...e,label:e.code==="ru"?o("common.shortLocale.ru"):o("common.shortLocale.en")})));function w(e,s){e.value==="ru"?window.open(s.linkRu,"_blank"):window.open(s.link,"_blank")}return(e,s)=>(l(),i("div",null,[r.showHeader?(l(),i("h2",Z,u(e.$t("mainPage.subscribe.joinCommunity")),1)):O("",!0),a("div",{class:y(["tw-flex tw-flex-col tw-gap-5 tw-items-center tw-justify-center xl:tw-flex-col",{"md:tw-flex-row":!r.center}])},[a("ul",q,[(l(),i(k,null,A(n,t=>a("li",{key:t.id,class:"tw-p-1"},[t.linkRu?(l(),h(X,{key:0,options:c.value,"append-to":"self","popup-alignment":"center","panel-class":"tw-p-0","list-item-class":"tw-py-0.5 tw-bg-primary-800",class:"tw-leading-600",style:{"--p-anchor-gutter":"6px"},onChange:f=>w(f,t)},{trigger:m(()=>[a("button",{"aria-label":t.id},[p(L,{name:t.icon,class:"tw-w-500 tw-h-500"},null,8,["name"])],8,J)]),option:m(({option:f})=>[a("a",{href:f.code==="ru"?t.linkRu:t.link,title:t.id,target:"_blank",rel:"noopener",class:"tw-inline-block tw-text-300 tw-leading-400 tw-uppercase"},u(f.label),9,K)]),_:2},1032,["options","onChange"])):(l(),i("a",{key:1,href:t.link,title:t.id,target:"_blank",rel:"noopener"},[p(L,{name:t.icon,class:"tw-w-500 tw-h-500"},null,8,["name"])],8,Q))])),64))])],2)]))}}),ee={class:"tw-flex tw-justify-between tw-px-10 tw-py-2.5 tw-bg-primary-700 tw-border-b-2 tw-border-primary-800 tw-tracking-wider"},te={class:"tw-flex tw-items-center"},oe=_({__name:"HeaderNavBar",setup(r){return(n,o)=>(l(),i("nav",ee,[a("div",te,[p(N,{"lazy-loaded":!1,class:"tw-mr-8"}),p(G)])]))}}),be=Object.freeze(Object.defineProperty({__proto__:null,default:oe},Symbol.toStringTag,{value:"Module"})),ae={class:"tw-w-full md:tw-w-auto"},le={class:"tw-flex tw-gap-7.5 tw-justify-center"},ne={class:"heading-h4"},se={class:"heading-h4"},ie={class:"heading-h4"},re=_({__name:"AppFooterMenu",setup(r){const n=E(()=>I(()=>import("./C2wCgOwX.js").then(e=>e.A),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9]),import.meta.url)),o=j(),c=()=>{o.toggleSubmitDialog(!0)},w=()=>{o.showCustomerService(!0)};return(e,s)=>{const t=x;return l(),i(k,null,[a("nav",ae,[a("ul",le,[a("li",ne,[a("button",{onClick:c},u(e.$t("menu.footer.items.submit")),1)]),a("li",se,[p(t,{to:"/"},{default:m(()=>[v(u(e.$t("menu.footer.items.deFight")),1)]),_:1})]),a("li",ie,[a("button",{onClick:w},u(e.$t("menu.footer.items.contactUs")),1)])])]),d(o).customerService.isVisible?(l(),h(d(n),{key:0,modelValue:d(o).customerService.isVisible,"onUpdate:modelValue":s[0]||(s[0]=f=>d(o).customerService.isVisible=f)},null,8,["modelValue"])):O("",!0)],64)}}}),ce={class:"tw-text-300 tw-leading-400 tw-text-center tw-text-primary-300"},S=_({__name:"AppCopyright",setup(r){const n=g(()=>new Date().getFullYear());return(o,c)=>(l(),i("div",ce,u(o.$t("common.copyright",{currentYear:n.value})),1))}}),pe={class:"tw-pt-10 md:tw-pt-7.5 tw-pb-7.5 xl:tw-py-20 tw-bg-primary-900 tw-mt-auto"},de={class:"tw-px-4 md:tw-px-8 xl:tw-px-10"},ue={class:"tw-flex tw-flex-col xl:tw-flex-row tw-justify-between"},we={class:"tw-flex tw-flex-col md:tw-flex-row tw-items-center md:tw-justify-between tw-border-b xl:tw-border-b-0 tw-border-primary-600 tw-gap-10 xl:tw-gap-15 tw-pb-10 xl:tw-pb-0 md:tw-pb-7.5"},me={class:"tw-flex tw-flex-col tw-items-start tw-gap-5 tw-relative xl:tw-pl-15 before:tw-content-none before:xl:tw-content-[''] before:tw-w-px before:tw-h-2500 before:tw-absolute before:tw-left-0 before:tw-top-1/2 before:tw-bg-primary-600 before:tw-transform before:tw--translate-y-1/2"},_e=_({__name:"MainFooter",setup(r){return(n,o)=>(l(),i("footer",pe,[a("div",de,[a("div",ue,[a("div",we,[p(N,{variant:d(M).withText,size:d(b).large},null,8,["variant","size"]),a("div",me,[p(re),p(S,{class:"tw-hidden xl:tw-block"})])]),p(W,{"show-header":!1,class:"tw-mt-10 tw-mb-7.5"})]),p(S,{class:"xl:tw-hidden"})])]))}}),ge=Object.freeze(Object.defineProperty({__proto__:null,default:_e},Symbol.toStringTag,{value:"Module"}));export{be as H,ge as M,_e as _,N as a,G as b,W as c,oe as d};