"use strict";(self["webpackChunklegou"]=self["webpackChunklegou"]||[]).push([[894],{4894:function(t,e,s){s.r(e),s.d(e,{default:function(){return u}});var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container"},[e("van-sticky",[e("van-nav-bar",{attrs:{title:"乐购","left-text":"返回","left-arrow":""},on:{"click-left":t.onClickLeft}})],1),t._m(0),e("div",{staticClass:"images"},t._l(t.collectGoodsList,(function(s){return e("div",{key:s.id,staticClass:"imgItem",on:{click:function(e){return t.goGoodsDetail(s.id)}}},[e("img",{attrs:{src:s.list_pic_url}}),e("p",{staticClass:"name"},[t._v(t._s(s.name))]),e("p",{staticClass:"price"},[t._v("￥"+t._s(s.retail_price))])])})),0)],1)},o=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"content"},[e("h1",{staticClass:"title"},[t._v("我的收藏")])])}],c=(s(7658),s(4425)),n={data(){return{collectGoodsList:[]}},methods:{onClickLeft(){this.$router.go(-1)},getCollect(){(0,c.C)({openId:localStorage.getItem("openId")}).then((t=>{this.collectGoodsList=t.collectGoodsList}))},goGoodsDetail(t){this.$router.push({name:"goodsdetail",params:{id:t}})}},created(){this.getCollect()}},l=n,a=s(1001),r=(0,a.Z)(l,i,o,!1,null,"c2c8c850",null),u=r.exports},4425:function(t,e,s){s.d(e,{C:function(){return o},l:function(){return c}});var i=s(8859);function o(t){return(0,i.Z)({url:"/collect/listAction",method:"get",params:t})}function c(t){return(0,i.Z)({url:"/feedback/submitAction",method:"post",data:t})}}}]);
//# sourceMappingURL=894.35775386.js.map