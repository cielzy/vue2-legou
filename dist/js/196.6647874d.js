"use strict";(self["webpackChunklegou"]=self["webpackChunklegou"]||[]).push([[196],{5196:function(t,e,s){s.r(e),s.d(e,{default:function(){return f}});var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container"},[t._m(0),e("div",{staticClass:"goods"},t._l(t.list,(function(s){return e("van-swipe-cell",{key:s.id,scopedSlots:t._u([{key:"right",fn:function(){return[e("van-button",{staticClass:"delete-button",attrs:{square:"",text:"删除",type:"danger"},on:{click:function(e){return t.deteleItem(s.id)}}})]},proxy:!0}],null,!0)},[e("div",{staticClass:"content"},[e("van-checkbox",{attrs:{"icon-size":"24px","checked-color":"#b4282d"},model:{value:s.isChecked,callback:function(e){t.$set(s,"isChecked",e)},expression:"item.isChecked"}}),e("img",{attrs:{src:s.list_pic_url}}),e("div",{staticClass:"desc"},[e("p",{staticClass:"name"},[t._v(t._s(s.goods_name))]),e("p",{staticClass:"price"},[t._v("￥"+t._s(s.retail_price))])]),e("div",{staticClass:"count"},[t._v("X"+t._s(s.number))])],1)])})),1),e("div",{staticClass:"order"},[e("div",{staticClass:"left"},[e("van-checkbox",{attrs:{"icon-size":"24px","checked-color":"#b4282d"},model:{value:t.isAllChecked,callback:function(e){t.isAllChecked=e},expression:"isAllChecked"}},[t._v("全选")])],1),e("div",{staticClass:"right"},[e("span",{staticClass:"total"},[t._v("￥"+t._s(t.total))]),e("div",{staticClass:"placeOrder",on:{click:t.order}},[t._v("下单")])])])])},a=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"title"},[e("p",[t._v("✔30天无忧退货")]),e("p",[t._v("✔48小时快速退款")]),e("p",[t._v("✔满88元免邮费")])])}],r=(s(7658),s(8517)),c=s(2061),n=s(8928),l=s(756),o={data(){return{list:[]}},methods:{getInfo(){const t=localStorage.getItem("openId");(0,r.V)({openId:t}).then((t=>{t.data.forEach((t=>{t.isChecked=!1})),this.list=t.data}))},deteleItem(t){n.Z.confirm({message:"确定删除吗？"}).then((()=>{(0,r.M)({id:t}).then((t=>{this.getInfo()}))})).catch((()=>{}))},order(){const t=localStorage.getItem("openId"),e=this.list.filter((t=>t.isChecked)),s=e.map((t=>t.goods_id));0!==e.length?((0,c.f)({openId:t,allPrise:this.total,goodsId:s.join(",")}).then((t=>{})),this.$router.push({name:"order",params:{arr:e}}),localStorage.setItem("arr",JSON.stringify(e)),localStorage.setItem("total",JSON.stringify(this.total))):(0,l.Z)("请选择商品！")}},computed:{isAllChecked:{get(){return this.list.every((t=>t.isChecked))},set(t){return this.list.forEach((e=>e.isChecked=t))}},total(){return this.list.reduce(((t,e)=>e.isChecked?t+e.number*e.retail_price:t),0)}},created(){this.getInfo()}},d=o,u=s(1001),h=(0,u.Z)(d,i,a,!1,null,"7f84654a",null),f=h.exports},2061:function(t,e,s){s.d(e,{f:function(){return a},k:function(){return r}});var i=s(8859);function a(t){return(0,i.Z)({url:"/order/submitAction",method:"post",data:t})}function r(t){return(0,i.Z)({url:"/order/detailAction",method:"get",params:t})}}}]);
//# sourceMappingURL=196.6647874d.js.map