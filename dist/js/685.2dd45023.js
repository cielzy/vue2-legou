"use strict";(self["webpackChunklegou"]=self["webpackChunklegou"]||[]).push([[685],{2685:function(t,i,n){n.r(i),n.d(i,{default:function(){return u}});var e=function(){var t=this,i=t._self._c;return i("div",{staticClass:"container"},[i("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了","immediate-check":!1},on:{load:t.onLoad},model:{value:t.loading,callback:function(i){t.loading=i},expression:"loading"}},t._l(t.topicInfo,(function(n){return i("div",{key:n.id,staticClass:"topicList",on:{click:function(i){return t.goDetail(n.id)}}},[i("img",{attrs:{src:n.scene_pic_url}}),i("p",{staticClass:"title"},[t._v(t._s(n.title))]),i("p",{staticClass:"subtitle"},[t._v(t._s(n.subtitle))]),i("p",{staticClass:"price"},[t._v(t._s(n.price_info)+"元起")])])})),0)],1)},s=[],a=(n(7658),n(2175)),o={data(){return{topicInfo:[],loading:!1,finished:!1,page:1}},methods:{onLoad(){this.page++,this.init()},init(){(0,a.m)({page:this.page}).then((t=>{this.id=t.data.id,this.topicInfo.push(...t.data),this.loading=!1,this.page===t.total&&(this.finished=!0)}))},goDetail(t){this.$router.push("/topic/topicdatail"),this.$store.commit("savaID",t)}},created(){this.init()}},c=o,l=n(1001),r=(0,l.Z)(c,e,s,!1,null,"6c9c9c81",null),u=r.exports},2175:function(t,i,n){n.d(i,{R:function(){return a},m:function(){return s}});var e=n(8859);function s(t){return(0,e.Z)({url:"/topic/listaction",method:"get",params:t})}function a(t){return(0,e.Z)({url:"/topic/detailaction",method:"get",params:t})}}}]);
//# sourceMappingURL=685.2dd45023.js.map