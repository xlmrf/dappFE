const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./CRLu3Lm3.js","./C2wCgOwX.js","./I0J7D7wH.js","./DOvt5s4i.js","./Ckh0oh2P.js","./chunk-pg-(ranking).BvAF5Vr6.css","./Bf6kWBt7.js","./chunk-pg-settings.BZxPkVe1.css","./3EwUDpM_.js","./Cy19EL0k.js","./BOOWZ2Vl.js"])))=>i.map(i=>d[i]);
import{d as ne,m as W,s as P,c as f,a as D,t as c,g as n,l as I,a$ as Ce,o as u,b0 as _e,ah as ge,aY as ce,H as j,an as ve,h as A,q as be,p as fe,aS as L,aj as ye,ar as we,am as ke,ao as Ve,ap as Se,e as k,w as l,aK as ie,b as he,b1 as x,E as z,ae as ze,b2 as re,aq as De,F as Ue,aU as Fe,y as xe,B as Be}from"./I0J7D7wH.js";import{T as Pe,g as Te,c as se,i as ue,D as t,a as Me,e as B,h as $e,d as de,j as Ee,k as pe,l as Ie,m as Ae}from"./Ckh0oh2P.js";import{u as Ne,_ as Oe,g as Re,c as Le}from"./Bf6kWBt7.js";function r(o,s){const g=Object.values(Pe).join("|"),C=new RegExp(`(${g})$`),m=o.match(C),d=m?m[0]:null;if(d){const h=`coins.metrics.${o.replace(d,"")}`,V=Te(d,s);return s("coins.metrics.metricForXTime",{metric:h,time:V})}return s(`coins.metrics.${o}`)}const je="de.ranking_dapps_table_customize",qe="de.ranking_dapp_page_size",He=[100,50,20],le=100,Ke={class:"tw-flex tw-flex-col tw-gap-7.5 lg:tw-flex-row tw-justify-between tw-mb-5"},Qe={class:"heading-h2"},Ze={class:"tw-flex tw-justify-between tw-gap-3.5"},Ge={class:"tw-flex tw-items-center tw-gap-1.5 sm:tw-order-1 lg:tw-order-none"},Xe={class:"tw-text-300 tw-leading-400 tw-text-primary-300"},Ye=ne({__name:"DigitalAssetRankingTableHeader",props:{activeCategoryIndex:{default:0},pageSize:{default:le},dialogPending:{type:Boolean}},emits:["open-customize","change-page-size"],setup(o,{emit:s}){const g=o,{t:C}=W(),m=P(g.pageSize),d=s;function _(){d("open-customize")}function h(){d("change-page-size",m.value)}return(V,S)=>(u(),f("div",Ke,[D("h1",Qe,c(n(C)("dapp.rankingTableTitle")),1),D("div",Ze,[D("div",Ge,[D("span",Xe,c(n(C)("form.rows"))+": ",1),I(se,{modelValue:m.value,"onUpdate:modelValue":S[0]||(S[0]=T=>m.value=T),options:n(He),"panel-class":"tw-w-[91px]",type:"chips",onChange:h},null,8,["modelValue","options"])]),I(Ce,{icon:"settings-filled","icon-class":"tw-w-300 tw-h-300 tw-text-primary-400 tw-mr-2",class:"tw-pl-2.5 tw-pr-3",label:n(C)("common.buttons.customize"),loading:V.dialogPending,onClick:_},null,8,["label","loading"])])]))}});function We(o){return{id:o.id,shortName:o.short_name,name:o.name,sortOrder:o.sort_order,status:o.status,logo:o.logo}}const me=o=>({async getBlockchains(s){return await o("api/additional/blockchains",{params:ue(s)})},async getCategories(s){return await o("api/additional/categories",{params:ue(s)})},async getCurrencies(){return(await o("api/additional/currency")).map(We)}}),Je=_e("cacheEntries",()=>{const{$customFetch:o}=ge(),s=P([]),g=P([]);return{blockchains:s,fetchBlockchains:async()=>{const d=me(o),{data:_}=await ce(()=>d.getBlockchains({perPage:1e4,page:1}),"$c1Syozrn2T");j(_,h=>{s.value=(h==null?void 0:h.blockchains)||[]},{immediate:!1})},categories:g,fetchCategories:async()=>{const d=me(o),{data:_}=await ce(()=>d.getCategories({perPage:1e4,page:1}),"$Ts6ay50WBH");j(_,h=>{g.value=(h==null?void 0:h.categories)||[]},{immediate:!1})}}}),ea={class:"tw-capitalize"},aa={class:"tw-capitalize"},ta={class:"tw-flex tw-items-center tw-w-full"},oa=["src","alt"],sa={class:"heading-h5 tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis"},na={key:1},la={key:1},ca={key:1},ia={key:1},ra={key:1},ua={key:1},da={key:1},ma={key:1},ga={key:1},ha=ne({__name:"DappsRankingTable",props:{columns:{},columnVisibility:{},columnOrder:{},pageSize:{default:le}},async setup(o){var Y,q;let s,g;const C=o,{t:m}=W(),d=Je(),_=[];(Y=d.blockchains)!=null&&Y.length||_.push(d.fetchBlockchains()),(q=d.categories)!=null&&q.length||_.push(d.fetchCategories()),[s,g]=ve(()=>Promise.allSettled(_)),await s,g();const h=A(()=>[{id:"all",name:m("common.all")},...d.categories]),V=A(()=>[{id:"all",name:m("common.all")},...d.blockchains]),{$customFetch:S}=ge(),T=Me(S),N=be(),O=fe(),y=L("page",1,{transform:Number}),U=L("sortBy",t.Volume7d),F=L("sortDirection","desc"),M=L("blockchainId",void 0,{transform:Number}),$=L("categoryId",void 0,{transform:Number}),E=P(C.pageSize),p=A(()=>({paginationData:{page:y.value,perPage:E.value},sortData:{sortBy:$e(U.value),sortDirection:F.value,blockchainId:M.value||void 0,categoryId:$.value||void 0},currency:N.user.currencyShortName})),{data:v,isLoading:w,suspense:Q}=ye({queryKey:A(()=>de.rankingList(p.value)),queryFn:i=>T.getDappsRanking(i,O.locale),staleTime:we}),R=A(()=>{var i;return((i=v.value)==null?void 0:i.data.map((b,e)=>({position:(y.value-1)*E.value+e+1,...b})))||[]}),J=Ne({get data(){return R.value},get columns(){return C.columns},getCoreRowModel:Re(),manualPagination:!0,manualSorting:!0,get rowCount(){var i;return((i=v.value)==null?void 0:i.total)||0},state:{get columnVisibility(){return C.columnVisibility},get columnOrder(){return C.columnOrder},get pagination(){return{pageIndex:y.value-1,pageSize:E.value}},get sorting(){return[{id:U.value,desc:F.value==="desc"}]}},initialState:{columnPinning:{left:["position","title"]}}});j(y,async(i,b)=>{i!==b&&window.scrollTo({top:0,behavior:"smooth"})}),j(()=>C.pageSize,async i=>{y.value=1,E.value=i}),j(()=>O.locale,i=>{ae(i)});const ee=ke();function ae(i){ee.setQueryData(de.rankingList(p.value),b=>b&&{...b,data:b.data.map(e=>({...e,...Ee(e,i,N.user.currencyShortName)}))})}function Z(i){U.value=i.id,F.value=i.desc?"asc":"desc"}const te=Ve(),G=Se();function X(i){te.push(G(`/dapp/${i.original.slug}`))}return(i,b)=>{const e=ze;return u(),k(Oe,{table:n(J),loading:n(w),"thead-class":"tw-whitespace-nowrap",onSort:Z,onRowClick:X},{header_category:l(()=>[I(se,{modelValue:n($),"onUpdate:modelValue":b[0]||(b[0]=a=>ie($)?$.value=a:null),options:h.value,placeholder:n(m)("coins.metrics.category"),"option-value":"id","option-label":"name",type:"chips","panel-class":"tw-capitalize",class:"tw-capitalize"},null,8,["modelValue","options","placeholder"])]),header_blockchain:l(()=>[I(se,{modelValue:n(M),"onUpdate:modelValue":b[1]||(b[1]=a=>ie(M)?M.value=a:null),options:V.value,placeholder:n(m)("coins.metrics.blockchain"),type:"chips","option-value":"id","option-label":"name","panel-class":"tw-capitalize",class:"tw-capitalize"},null,8,["modelValue","options","placeholder"])]),body_blockchain:l(({data:a})=>{var H,K;return[D("span",ea,c((K=(H=V.value)==null?void 0:H.find(oe=>a.blockchain===oe.id))==null?void 0:K.name),1)]}),body_category:l(({data:a})=>{var H,K;return[D("span",aa,c((K=(H=h.value)==null?void 0:H.find(oe=>a.category===oe.id))==null?void 0:K.name),1)]}),body_title:l(({data:a})=>[I(e,{to:`/dapp/${a.slug}`,title:a.title,class:"tw-flex tw-items-center heading-h5"},{default:l(()=>[D("div",ta,[a.icon?(u(),f("img",{key:0,loading:"lazy",src:a.icon,decoding:"async",fetchpriority:"low",alt:`${a.title} logo`,class:"tw-w-700 tw-h-700 tw-mr-2.5 tw-rounded-full"},null,8,oa)):he("",!0),D("span",sa,c(a.title),1)])]),_:2},1032,["to","title"])]),body_balanceChange24h:l(({data:a})=>[n(x)(a.balanceChange24h)?(u(),k(B,{key:0,value:a.balanceChange24h},{default:l(()=>[z(c(a.balanceChange24hFormatted),1)]),_:2},1032,["value"])):(u(),f("span",na,c(a.balanceChange24hFormatted),1))]),body_balanceChange7d:l(({data:a})=>[n(x)(a.balanceChange7d)?(u(),k(B,{key:0,value:a.balanceChange7d},{default:l(()=>[z(c(a.balanceChange7dFormatted),1)]),_:2},1032,["value"])):(u(),f("span",la,c(a.balanceChange7dFormatted),1))]),body_balanceChange30d:l(({data:a})=>[n(x)(a.balanceChange30d)?(u(),k(B,{key:0,value:a.balanceChange30d},{default:l(()=>[z(c(a.balanceChange30dFormatted),1)]),_:2},1032,["value"])):(u(),f("span",ca,c(a.balanceChange30dFormatted),1))]),body_userChange24h:l(({data:a})=>[n(x)(a.userChange24h)?(u(),k(B,{key:0,value:a.userChange24h},{default:l(()=>[z(c(a.userChange24hFormatted),1)]),_:2},1032,["value"])):(u(),f("span",ia,c(a.userChange24hFormatted),1))]),body_userChange7d:l(({data:a})=>[n(x)(a.userChange7d)?(u(),k(B,{key:0,value:a.userChange7d},{default:l(()=>[z(c(a.userChange7dFormatted),1)]),_:2},1032,["value"])):(u(),f("span",ra,c(a.userChange7dFormatted),1))]),body_userChange30d:l(({data:a})=>[n(x)(a.userChange30d)?(u(),k(B,{key:0,value:a.userChange30d},{default:l(()=>[z(c(a.userChange30dFormatted),1)]),_:2},1032,["value"])):(u(),f("span",ua,c(a.userChange30dFormatted),1))]),body_volumeChange24h:l(({data:a})=>[n(x)(a.volumeChange24h)?(u(),k(B,{key:0,value:a.volumeChange24h},{default:l(()=>[z(c(a.volumeChange24hFormatted),1)]),_:2},1032,["value"])):(u(),f("span",da,c(a.volumeChange24hFormatted),1))]),body_volumeChange7d:l(({data:a})=>[n(x)(a.volumeChange7d)?(u(),k(B,{key:0,value:a.volumeChange7d},{default:l(()=>[z(c(a.volumeChange7dFormatted),1)]),_:2},1032,["value"])):(u(),f("span",ma,c(a.volumeChange7dFormatted),1))]),body_volumeChange30d:l(({data:a})=>[n(x)(a.volumeChange30d)?(u(),k(B,{key:0,value:a.volumeChange30d},{default:l(()=>[z(c(a.volumeChange30dFormatted),1)]),_:2},1032,["value"])):(u(),f("span",ga,c(a.volumeChange30dFormatted),1))]),empty:l(()=>[z(c(n(m)("form.noXFound",{field:n(m)("coins.dapp",2)})),1)]),_:1},8,["table","loading"])}}});function pa(){const{t:o}=W(),s=Le(),g=s.accessor("position",{id:"position",cell:e=>e.getValue(),header:"#",enableHiding:!1,size:40,minSize:40,maxSize:40,enableSorting:!1,meta:{thClass:"!tw-px-2",tdClass:"!tw-px-2"}}),C=s.accessor("id",{id:"title",cell:e=>e.getValue(),header:o("coins.dapp"),meta:{thClass:"!tw-max-w-[150px] md:!tw-max-w-[250px] !tw-pl-0",tdClass:"!tw-max-w-[150px] md:!tw-max-w-[250px] !tw-pl-0"}}),m=s.accessor("totalUsers24hFormatted",{id:t.TotalUsers24h,cell:e=>e.getValue(),header:r(t.TotalUsers24h,o)}),d=s.accessor("totalUsers7dFormatted",{id:t.TotalUsers7d,cell:e=>e.getValue(),header:r(t.TotalUsers7d,o)}),_=s.accessor("totalUsers30dFormatted",{id:t.TotalUsers30d,cell:e=>e.getValue(),header:r(t.TotalUsers30d,o)}),h=s.accessor(t.UserChange24h,{id:t.UserChange24h,cell:e=>e.getValue(),header:r(t.UserChange24h,o)}),V=s.accessor(t.UserChange7d,{id:t.UserChange7d,cell:e=>e.getValue(),header:r(t.UserChange7d,o)}),S=s.accessor(t.UserChange30d,{id:t.UserChange30d,cell:e=>e.getValue(),header:r(t.UserChange30d,o)}),T=s.accessor("volume24hFormatted",{id:t.Volume24h,cell:e=>e.getValue(),header:r(t.Volume24h,o)}),N=s.accessor("volume7dFormatted",{id:t.Volume7d,cell:e=>e.getValue(),header:r(t.Volume7d,o)}),O=s.accessor("volume30dFormatted",{id:t.Volume30d,cell:e=>e.getValue(),header:r(t.Volume30d,o)}),y=s.accessor("volumeUSD24hFormatted",{id:t.VolumeUSD24h,cell:e=>e.getValue(),header:r(t.VolumeUSD24h,o)}),U=s.accessor("volumeUSD7dFormatted",{id:t.VolumeUSD7d,cell:e=>e.getValue(),header:r(t.VolumeUSD7d,o)}),F=s.accessor("volumeUSD30dFormatted",{id:t.VolumeUSD30d,cell:e=>e.getValue(),header:r(t.VolumeUSD30d,o)}),M=s.accessor(t.VolumeChange24h,{id:t.VolumeChange24h,cell:e=>e.getValue(),header:r(t.VolumeChange24h,o)}),$=s.accessor(t.VolumeChange7d,{id:t.VolumeChange7d,cell:e=>e.getValue(),header:r(t.VolumeChange7d,o)}),E=s.accessor(t.VolumeChange30d,{id:t.VolumeChange30d,cell:e=>e.getValue(),header:r(t.VolumeChange30d,o)}),p=s.accessor("balance24hFormatted",{id:t.Balance24h,cell:e=>e.getValue(),header:r(t.Balance24h,o)}),v=s.accessor("balance7dFormatted",{id:t.Balance7d,cell:e=>e.getValue(),header:r(t.Balance7d,o)}),w=s.accessor("balance30dFormatted",{id:t.Balance30d,cell:e=>e.getValue(),header:r(t.Balance30d,o)}),Q=s.accessor(t.BalanceChange24h,{id:t.BalanceChange24h,cell:e=>e.getValue(),header:r(t.BalanceChange24h,o)}),R=s.accessor(t.BalanceChange7d,{id:t.BalanceChange7d,cell:e=>e.getValue(),header:r(t.BalanceChange7d,o)}),J=s.accessor(t.BalanceChange30d,{id:t.BalanceChange30d,cell:e=>e.getValue(),header:r(t.BalanceChange30d,o)}),ee=s.accessor(t.Blockchain,{id:t.Blockchain,cell:e=>e.getValue(),header:r(t.Blockchain,o),enableSorting:!1}),ae=s.accessor(t.Category,{id:t.Category,cell:e=>e.getValue(),header:r(t.Category,o),enableSorting:!1}),Z=[g,C,m,d,_,h,V,S,T,N,O,y,U,F,M,$,E,p,v,w,Q,R,J,ee,ae],te=new Map(Z.map(e=>[e.id,e])),G=re(je),X=P(G.value||[...pe]),Y=A(()=>Object.fromEntries(Array.from(te.keys()).map(e=>[e,e==="title"||e==="position"?!0:X.value.includes(e)]))),q=re(qe),i=L("perPage",q.value||le,{transform:Number});function b(e){q.value=e,i.value=e}return{pageSize:i,onChangePageSize:b,customizedMetrics:X,savedMetricsCookie:G,columns:Z,columnVisibility:Y}}const Ca={class:"tw-sr-only"},_a={class:"tw-container tw-mt-7.5 tw-mb-15"},va=ne({__name:"index",setup(o){const s=xe(()=>Be(()=>import("./CRLu3Lm3.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]),import.meta.url)),{t:g}=W(),{onChangePageSize:C,pageSize:m,columns:d,customizedMetrics:_,savedMetricsCookie:h,columnVisibility:V}=pa(),S=P(Object.entries(Ie).reduce((p,[v,w])=>{const Q=w.map(R=>({key:R,label:r(R,g),category:v,categoryLabel:g(Ae(v))}));return p.concat(Q)},[]));function T(p){return p!==void 0}const N=A(()=>_.value.map(p=>{const v=S.value.find(w=>w.key===p);return v||console.error(`there is no table column defined with the metric ${p}`),v}).filter(T)),O=pe.map(p=>{const v=S.value.find(w=>w.key===p);return v||console.error(`there is no table column defined with the metric ${p}`),v}).filter(T),y=P(!1),U=P(!1),F=P(!1);function M(){y.value=!0,U.value=!0}function $(){F.value=!1}j(y,()=>{F.value=!0},{once:!0});function E(p){_.value=p,h.value=p}return De({title:g("common.site.metadata.ranking.title"),description:g("common.site.metadata.ranking.description"),keywords:g("common.site.metadata.ranking.keywords"),relativeUrl:"ranking"}),(p,v)=>(u(),f(Ue,null,[D("h1",Ca,c(n(g)("common.site.metadata.ranking.h1")),1),D("div",_a,[I(Ye,{"page-size":n(m),"dialog-pending":F.value,onOpenCustomize:M,onChangePageSize:n(C)},null,8,["page-size","dialog-pending","onChangePageSize"]),I(ha,{columns:n(d),"page-size":n(m),"column-visibility":n(V),"column-order":n(_),"row-hover":""},null,8,["columns","page-size","column-visibility","column-order"]),y.value?(u(),k(n(s),{key:0,modelValue:U.value,"onUpdate:modelValue":v[0]||(v[0]=w=>U.value=w),"metric-options":S.value,"selected-metrics":N.value,"default-metrics":n(O),onSubmit:E,onVnodeMounted:$},null,8,["modelValue","metric-options","selected-metrics","default-metrics"])):he("",!0)]),I(Fe)],64))}}),wa=Object.freeze(Object.defineProperty({__proto__:null,default:va},Symbol.toStringTag,{value:"Module"}));export{me as A,wa as i};