(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-my"],{"3a39":function(t,e,i){"use strict";i.r(e);var n=i("6f17"),o=i("48a9");for(var a in o)"default"!==a&&function(t){i.d(e,t,(function(){return o[t]}))}(a);i("cd3c");var s,r=i("f0c5"),u=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,"c5bd37d8",null,!1,n["a"],s);e["default"]=u.exports},"48a9":function(t,e,i){"use strict";i.r(e);var n=i("ca46"),o=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a},"5cb1":function(t,e,i){"use strict";var n=i("4ea4");i("4160"),i("ac1f"),i("1276"),i("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(i("b85c")),a=n(i("d4ec")),s=n(i("bee2")),r=n(i("ade3")),u={required:function(t,e){return""===t?e:void 0},min:function(t,e,i){return t.length<e?i:void 0},max:function(t,e,i){return t.length>e?i:void 0},phone:function(t,e){return/^1([35789])[0-9]{9}$/.test(t)?void 0:e},email:function(t,e){return/^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(t)?void 0:e}},c=function(){function t(){(0,a.default)(this,t),this.hooks=[]}return(0,s.default)(t,[{key:"init",value:function(){return this.hooks.length&&(this.hooks=[]),this}},{key:"add",value:function(e,i){var n,a=this,s=(0,o.default)(i);try{var r=function(){var i=n.value,o=i.type.split(":");a.hooks.push((function(){var n=o.shift();return o.unshift(e),o.push(i.message),t.rules[n]?t.rules[n].apply(null,o):i.callback?i.callback.apply(null,o):void 0}))};for(s.s();!(n=s.n()).done;)r()}catch(u){s.e(u)}finally{s.f()}return this}},{key:"validation",value:function(t){var e,i=(0,o.default)(this.hooks);try{for(i.s();!(e=i.n()).done;){var n=e.value,a=n();if(a)return t?t(a):a}}catch(s){i.e(s)}finally{i.f()}if(t)return t()}}],[{key:"start",value:function(t,e){var i=this;return this.hooks.length&&(this.hooks=[]),t.forEach((function(t){i.add(t.value,t.rules)})),this.validation(e),this}}]),t}();(0,r.default)(c,"rules",u);var l=c;e.default=l},6137:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".input[data-v-c5bd37d8]{text-decoration:underline;width:80%;line-height:%?50?%}.input[data-v-c5bd37d8] ::-webkit-input-placeholder{border-bottom:#00979d}.background[data-v-c5bd37d8]{position:fixed;top:0;left:0;width:100%;height:%?1300?%;\n\t/* \t\tbackground-image: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180611%2F5550b2529de24a1e91e96e616e2fd424.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612256190&t=6734a6e0dfed2bc6ec16541655d66345);\n*/z-index:-1}",""]),t.exports=e},"6f17":function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var n={uniCard:i("d6c8").default,uniIcons:i("b557").default,uniTag:i("9a56").default,uniPopup:i("174c").default,uniCollapse:i("d303").default,uniCollapseItem:i("dc93").default,uniGrid:i("db8f").default,uniGridItem:i("b97b").default},o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticStyle:{opacity:"0.9"}},[i("v-uni-view",{staticClass:"background"},[i("v-uni-image",{staticStyle:{width:"100%"},attrs:{mode:"widthFix",src:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=649482264,581770947&fm=26&gp=0.jpg"}})],1),i("uni-card",{directives:[{name:"show",rawName:"v-show",value:t.userInfo.nickname,expression:"userInfo.nickname"}],attrs:{title:"昵称："+t.userInfo.nickname,mode:"title","is-shadow":!0,thumbnail:t.userInfo.avatar?t.userInfo.avatar:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg",extra:"用户名: "+t.userInfo.username}},[i("v-uni-view",{staticStyle:{display:"flex","flex-direction":"row"}},[i("v-uni-view",{staticStyle:{width:"auto"}},[i("uni-icons",{attrs:{type:"contact",size:"24",color:"powderblue"}})],1),i("v-uni-view",{staticStyle:{"min-width":"70%","padding-top":"5rpx"}},[t._v("用户详细信息")]),i("v-uni-view",{staticStyle:{"padding-top":"5rpx",float:"right"}},[i("uni-tag",{attrs:{circle:!0,type:t.type,inverted:t.inverted,text:t.text},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showif.apply(void 0,arguments)}}})],1)],1)],1),i("uni-card",{directives:[{name:"show",rawName:"v-show",value:"显示"!=t.text,expression:"text!='显示'"}]},[i("v-uni-view",{staticStyle:{"line-height":"80rpx"}},[i("v-uni-view",[i("v-uni-text",{attrs:{selectable:!0}},[t._v("用户名"),i("v-uni-text",{staticStyle:{float:"right",color:"#C0C0C0"}},[t._v(t._s(t.loginForm.username))])],1)],1),i("v-uni-view",[i("v-uni-text",{attrs:{selectable:!0}},[t._v("昵称"),i("v-uni-text",{staticStyle:{float:"right",color:"#C0C0C0"}},[t._v(t._s(t.loginForm.nickname))])],1)],1),i("v-uni-view",[i("v-uni-text",{attrs:{selectable:!0}},[t._v("邮箱"),i("v-uni-text",{staticStyle:{float:"right",color:"#C0C0C0"}},[t._v(t._s(t.loginForm.email))])],1)],1)],1)],1),t.userInfo.nickname?i("uni-card",[i("v-uni-view",{staticStyle:{display:"flex","flex-direction":"row"}},[i("v-uni-view",{staticStyle:{width:"auto"}},[i("uni-icons",{attrs:{type:"minus",size:"24",color:"powderblue"}})],1),i("v-uni-view",{staticStyle:{"min-width":"95%","padding-top":"5rpx"}},[t._v("设置")])],1),i("uni-card",{staticStyle:{"text-align":"center"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changePassword.apply(void 0,arguments)}}},[t._v("修改密码")]),i("uni-card",{staticStyle:{"text-align":"center"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeInfo.apply(void 0,arguments)}}},[t._v("修改信息")]),i("uni-card",{staticStyle:{"text-align":"center"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeUser.apply(void 0,arguments)}}},[t._v("切换账号")]),i("uni-card",{staticStyle:{"text-align":"center"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.logout.apply(void 0,arguments)}}},[t._v("退出账号")])],1):t._e(),i("uni-popup",{ref:"popupLogin",staticStyle:{width:"100%","line-height":"100rpx"},attrs:{maskClick:!1,type:"center"}},[i("v-uni-view",[i("uni-card",[i("v-uni-view",{staticStyle:{display:"flex","flex-direction":"row","justify-content":"right"}},[i("v-uni-label",{staticStyle:{width:"25%"},attrs:{for:"username"}},[t._v("用户名:")]),i("v-uni-input",{staticClass:"input",staticStyle:{"padding-top":"30rpx"},attrs:{placeholder:"请输入用户名",id:"username",type:"text"},model:{value:t.loginForm.username,callback:function(e){t.$set(t.loginForm,"username",e)},expression:"loginForm.username"}})],1),i("v-uni-view",{staticStyle:{display:"flex","flex-direction":"row","justify-content":"right"}},[i("v-uni-label",{staticStyle:{"padding-left":"30rpx",width:"20%"},attrs:{for:"password"}},[t._v("密码:")]),i("v-uni-input",{staticClass:"input",staticStyle:{"padding-top":"30rpx","text-align":"left"},attrs:{placeholder:"请输入密码",id:"password",type:"password"},model:{value:t.loginForm.password,callback:function(e){t.$set(t.loginForm,"password",e)},expression:"loginForm.password"}})],1),i("v-uni-view",{staticStyle:{display:"flex","flex-direction":"row"}},[i("v-uni-button",{staticStyle:{"background-color":"#007AFF",color:"#e0ffff"},attrs:{size:"mini","form-type":"submit"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toLogin.apply(void 0,arguments)}}},[t._v("登录")]),i("v-uni-button",{staticStyle:{"background-color":"#fa8072",color:"#e0ffff"},attrs:{size:"mini","form-type":"submit"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toRegist.apply(void 0,arguments)}}},[t._v("注册")])],1)],1)],1)],1),i("uni-popup",{ref:"popupRegist",attrs:{maskClick:!1,type:"center"}},[i("v-uni-view",{staticStyle:{width:"100%","line-height":"70rpx"}},[i("uni-card",[i("v-uni-view",{staticStyle:{display:"flex","flex-direction":"row","justify-content":"right"}},[i("v-uni-label",{attrs:{for:"username"}},[t._v("用户名:")]),i("v-uni-input",{staticClass:"input",staticStyle:{"padding-top":"15rpx"},attrs:{placeholder:"请输入用户名",id:"username",type:"text"},model:{value:t.loginForm.username,callback:function(e){t.$set(t.loginForm,"username",e)},expression:"loginForm.username"}})],1),i("v-uni-view",{staticStyle:{display:"flex","flex-direction":"row","justify-content":"right"}},[i("v-uni-label",{staticStyle:{"padding-left":"30rpx"},attrs:{for:"password"}},[t._v("密码:")]),i("v-uni-input",{staticClass:"input",staticStyle:{"padding-top":"15rpx"},attrs:{placeholder:"请输入密码",id:"password",type:"password"},model:{value:t.loginForm.password,callback:function(e){t.$set(t.loginForm,"password",e)},expression:"loginForm.password"}})],1),i("v-uni-view",{staticStyle:{"justify-content":"right"}},[i("uni-collapse",{staticStyle:{"padding-left":"10rpx"}},[i("uni-collapse-item",{attrs:{title:"———————点我选择头像———————"}},[i("v-uni-view",{staticStyle:{padding:"30rpx"}},[i("uni-grid",{attrs:{column:6}},t._l(t.array,(function(e){return e?i("uni-grid-item",[i("v-uni-image",{staticStyle:{width:"80%",height:"80%","border-radius":"20rpx","margin-left":"10%","margin-top":"10%"},attrs:{src:e.url},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.choseAvatar(e.url)}}})],1):t._e()})),1)],1)],1)],1),i("v-uni-view",[i("v-uni-image",{staticStyle:{"background-color":"#999999","margin-top":"30rpx","margin-left":"275rpx",width:"100rpx",height:"100rpx","border-radius":"30rpx"},attrs:{src:t.loginForm.avatar}})],1)],1),i("v-uni-view",{staticStyle:{display:"flex","flex-direction":"row","justify-content":"right"}},[i("v-uni-label",{staticStyle:{"padding-left":"30rpx"},attrs:{for:"email"}},[t._v("邮箱:")]),i("v-uni-input",{staticClass:"input",staticStyle:{"padding-top":"15rpx"},attrs:{placeholder:"请输入邮箱",id:"email",type:"text"},model:{value:t.loginForm.email,callback:function(e){t.$set(t.loginForm,"email",e)},expression:"loginForm.email"}})],1),i("v-uni-view",{staticStyle:{display:"flex","flex-direction":"row","justify-content":"right"}},[i("v-uni-label",{staticStyle:{"padding-left":"30rpx"},attrs:{for:"nickname"}},[t._v("昵称:")]),i("v-uni-input",{staticClass:"input",staticStyle:{"padding-top":"15rpx"},attrs:{placeholder:"请输入昵称",id:"nickname",type:"text"},model:{value:t.loginForm.nickname,callback:function(e){t.$set(t.loginForm,"nickname",e)},expression:"loginForm.nickname"}})],1),i("v-uni-view",{staticStyle:{display:"flex","flex-direction":"row"}},[i("v-uni-button",{staticStyle:{"background-color":"#ff6347",color:"#fffafa"},attrs:{"form-type":"submit"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.returnLogin.apply(void 0,arguments)}}},[t._v("返回")]),i("v-uni-button",{staticStyle:{"background-color":"#40e0d0",color:"#fffafa"},attrs:{"form-type":"submit"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.regist.apply(void 0,arguments)}}},[t._v("注册")])],1)],1)],1)],1),i("uni-popup",{ref:"popupInfo",attrs:{maskClick:!0,type:"center"}},[i("v-uni-view",{staticStyle:{width:"100%","line-height":"70rpx"}},[i("uni-card",[i("v-uni-view",{staticStyle:{display:"flex","flex-direction":"row","justify-content":"right"}},[i("v-uni-label",{attrs:{for:"username"}},[t._v("用户名:")]),i("v-uni-input",{staticStyle:{"padding-top":"15rpx"},attrs:{disabled:!0,placeholder:"[不可修改]",id:"username",type:"text"}})],1),i("v-uni-view",{staticStyle:{"justify-content":"right"}},[i("uni-collapse",{staticStyle:{"padding-left":"10rpx"}},[i("uni-collapse-item",{attrs:{title:"———————点我选择头像———————"}},[i("v-uni-view",{staticStyle:{padding:"30rpx"}},[i("uni-grid",{attrs:{column:6}},t._l(t.array,(function(e,n){return e?i("uni-grid-item",[i("v-uni-image",{staticStyle:{width:"80%",height:"80%","border-radius":"20rpx","margin-left":"10%","margin-top":"10%"},attrs:{src:e.url},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.choseAvatar(e.url,n)}}})],1):t._e()})),1)],1)],1)],1),i("v-uni-view",[i("v-uni-image",{staticStyle:{"background-color":"#999999","margin-top":"30rpx","margin-left":"275rpx",width:"100rpx",height:"100rpx","border-radius":"30rpx"},attrs:{src:t.loginForm?t.loginForm.avatar:t.userInfo.avatar}})],1)],1),i("v-uni-view",{staticStyle:{display:"flex","flex-direction":"row","justify-content":"right"}},[i("v-uni-label",{staticStyle:{"padding-left":"30rpx"},attrs:{for:"email"}},[t._v("邮箱:")]),i("v-uni-input",{staticClass:"input",staticStyle:{"padding-top":"15rpx",width:"80%"},attrs:{placeholder:"请输入新邮箱",id:"email",type:"text"},model:{value:t.loginForm.email,callback:function(e){t.$set(t.loginForm,"email",e)},expression:"loginForm.email"}})],1),i("v-uni-view",{staticStyle:{display:"flex","flex-direction":"row","justify-content":"right"}},[i("v-uni-label",{staticStyle:{"padding-left":"30rpx"},attrs:{for:"nickname"}},[t._v("昵称:")]),i("v-uni-input",{staticClass:"input",staticStyle:{"padding-top":"15rpx"},attrs:{placeholder:"请输入新昵称",id:"nickname",type:"text"},model:{value:t.loginForm.nickname,callback:function(e){t.$set(t.loginForm,"nickname",e)},expression:"loginForm.nickname"}})],1),i("v-uni-view",{staticStyle:{display:"flex","flex-direction":"row"}},[i("v-uni-button",{staticStyle:{"background-color":"#b793ff",color:"#fffafa"},attrs:{"form-type":"submit"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.quickChangeInfo.apply(void 0,arguments)}}},[t._v("退出")]),i("v-uni-button",{staticStyle:{"background-color":"#ff6347",color:"#fffafa"},attrs:{"form-type":"submit"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.doChangeInfo.apply(void 0,arguments)}}},[t._v("提交")])],1)],1)],1)],1),i("uni-popup",{ref:"popupPassword",attrs:{maskClick:!0,type:"center"}},[i("v-uni-view",{staticStyle:{width:"100%","line-height":"70rpx"}},[i("uni-card",[i("v-uni-view",{staticStyle:{display:"flex","flex-direction":"row",width:"100%"}},[i("v-uni-label",{staticStyle:{"padding-left":"10rpx",width:"30%"},attrs:{for:"password"}},[t._v("新密码:")]),i("v-uni-input",{staticClass:"input",staticStyle:{"padding-top":"15rpx"},attrs:{placeholder:"请输入新密码",id:"password",type:"password"},model:{value:t.loginForm.password,callback:function(e){t.$set(t.loginForm,"password",e)},expression:"loginForm.password"}})],1),i("v-uni-view",{staticStyle:{display:"flex","flex-direction":"row"}},[i("v-uni-button",{staticStyle:{"background-color":"#ff6347",color:"#fffafa"},attrs:{"form-type":"submit"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.doChangePassword.apply(void 0,arguments)}}},[t._v("提交")])],1)],1)],1)],1)],1)},a=[]},"78db":function(t,e,i){var n=i("6137");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("1eb9bf8e",n,!0,{sourceMap:!1,shadowMode:!1})},ca46:function(t,e,i){"use strict";(function(t){var n=i("4ea4");i("498a"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(i("b557")),a=n(i("174c")),s=n(i("276b")),r=n(i("10af")),u=n(i("d303")),c=n(i("dc93")),l=n(i("d6c8")),p=n(i("9a56")),d=n(i("db8f")),g=n(i("b97b")),f=n(i("5cb1")),m=(new f.default,{components:{uniIcons:o.default,uniPopup:a.default,uniPopupMessage:s.default,uniPopupDialog:r.default,uniCollapse:u.default,uniCollapseItem:c.default,uniCard:l.default,uniGrid:d.default,uniGridItem:g.default,uniTag:p.default},data:function(){return{type:"primary",inverted:!0,text:"显示",userInfo:uni.getStorageSync("userInfo"),token:uni.getStorageSync("token"),loginForm:{username:"",password:"",avatar:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg",deleted:!1,type:!1},array:[{url:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg"},{url:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1650652232,2198724031&fm=26&gp=0.jpg"},{url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.sohu.com%2Fq_mini%2Cc_zoom%2Cw_640%2Fupload%2F20170708%2F4c291061a99841a0949b3669e77b0724_th.jpg&refer=http%3A%2F%2Fimg.mp.sohu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611922123&t=0308a0f05cf8b21d55a49eb1c4bbb75c"},,{url:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1136624566,3053705919&fm=26&gp=0.jpg"},{url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F31%2F20181231010434_dtuts.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611922123&t=8641c6e20ba3c0551bbfe15e2e8a69cf"},{url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201512%2F05%2F20151205222624_KjTSd.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611922123&t=e119986360cc5d32aeca624826a93a75"},{url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww2.sinaimg.cn%2Fmw690%2F0071ogI5gy1gj7s0sfweoj30u00u0jt1.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611925916&t=616c084e1e6675dbf3e73473c95bebf0"},{url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx3.sinaimg.cn%2Fmw690%2F0073VjWaly1gfn2foiz05j30jg0jgtbs.jpg&refer=http%3A%2F%2Fwx3.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611925982&t=05c2eccfa815788cd692003923741693"},{url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx4.sinaimg.cn%2Fmw690%2F007064jrly1gbvnfuz4xnj32bc2bcb29.jpg&refer=http%3A%2F%2Fwx4.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611925982&t=37b83b62f96ca7d7c3c4fc87a9bdc804"},{url:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3025817779,1815184324&fm=26&gp=0.jpg"},{url:"https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=35faeffc72cf3bc7e855c5e8e4309697/2fdda3cc7cd98d10531a1fc0233fb80e7aec9070.jpg"},{url:"https://gss0.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/w=580/sign=794acf532d34349b74066e8df9eb1521/cc8c49a98226cffc427091fbbc014a90f703ea6e.jpg"},{url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201801%2F27%2F20180127172759_bpmor.thumb.700_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611926264&t=b5bd96365e624e7747ef1544b6dc4228"},{url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.wxcha.com%2Ffile%2F201902%2F26%2F772e8643a4.jpg%3Fdown&refer=http%3A%2F%2Fimg.wxcha.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611926294&t=44bc2524a26027914cd6369399a1aa74"},{url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ft1.tp88.net%2Fuploads%2Fallimg%2F2003%2Fco200313042006-11.jpg&refer=http%3A%2F%2Ft1.tp88.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611926333&t=3d1ba5a4a179efa08389bdd75e78b1bd"},{url:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2266661787,1810355149&fm=26&gp=0.jpg"},{url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.hao661.com%2Fqq.hao661.com%2Fuploads%2Fallimg%2F181026%2F1GF363Q-4.jpg&refer=http%3A%2F%2Fimg.hao661.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611926420&t=7ff0085d7737b53eda4b560eea0a31ed"},{url:"https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=6da3ccf966d9f2d320442ceb9cdca625/d1160924ab18972bc250f3d2e2cd7b899e510abb.jpg"},{url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.hao661.com%2Fzt.hao661.com%2Fuploads%2Fallimg%2Fc140930%2F141205S20Q040-162436.jpg&refer=http%3A%2F%2Fimg.hao661.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611926563&t=bb47441196fd146fdcdf969041dfe022"},{url:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1821827341,3215469716&fm=26&gp=0.jpg"}]}},methods:{changePassword:function(){this.$refs.popupPassword.open(),t("log",this.userInfo," at pages/my/my.vue:398")},clearMsgs:function(){uni.removeStorageSync("msgs")},changeInfo:function(){this.loginForm=this.userInfo,this.$refs.popupInfo.open()},quickChangeInfo:function(){this.$refs.popupInfo.close()},doChangePassword:function(){var e=this;t("log",this.loginForm," at pages/my/my.vue:421"),uni.request({header:{Authentication:uni.getStorageSync("token")},method:"POST",data:this.loginForm,url:this.baseurl+"/blog/user/update",success:function(t){if(t.data.msg)uni.showToast({title:"修改成功"}),e.userInfo=e.loginForm,uni.setStorage({key:"userInfo",data:e.userInfo}),e.$refs.popupPassword.close(),e.loginForm.password="",e.$refs.popupLogin.open();else{var i=e;setTimeout((function(){i.$refs.popupInfo.close()}),1100);uni.showToast({title:"修改失败",icon:"loading"})}}})},doChangeInfo:function(){var e=this;t("log",this.loginForm," at pages/my/my.vue:467"),t("log",this.token," at pages/my/my.vue:469"),"小凌"==this.loginForm.nickname&&"小凌"!==this.userInfo.nickname||"小刘"==this.loginForm.nickname&&"小刘"!==this.userInfo.nickname?uni.showToast({title:"昵称非法",icon:"loading"}):uni.request({header:{Authentication:this.token},method:"POST",data:this.loginForm,url:this.baseurl+"/blog/user/update",success:function(t){if(t.data.msg)uni.showToast({title:"修改成功"}),e.userInfo=e.loginForm,uni.setStorage({key:"userInfo",data:e.userInfo}),e.$refs.popupInfo.close();else{var i=e;setTimeout((function(){i.$refs.popupInfo.close()}),1100);uni.showToast({title:"修改失败",icon:"loading"})}},complete:function(e){t("log",e," at pages/my/my.vue:516")}})},changeUser:function(){var t=this;uni.showModal({content:"确定要切换账号吗",success:function(e){e.confirm&&(t.loginForm={},t.loginForm.username=t.userInfo.username,t.userInfo.nickname="",uni.removeStorageSync("userInfo"),uni.removeStorageSync("token"),t.loginForm.username="",t.loginForm.password="",t.loginForm.nickname="",t.clearMsgs(),t.$refs.popupLogin.open())}})},showif:function(){"primary"==this.type?(this.type="error",this.text="隐藏"):(this.type="primary",this.text="显示"),this.userInfo=uni.getStorageSync("userInfo"),this.loginForm=this.userInfo,this.inverted=!this.inverted},choseAvatar:function(t,e){this.loginForm.avatar=t},returnLogin:function(){this.$refs.popupLogin.open(),this.$refs.popupRegist.close()},toLogin:function(){var e=this;t("log","登录按钮被点击"," at pages/my/my.vue:589"),""!=this.loginForm.username&&""!=this.loginForm.password&&uni.request({method:"POST",data:this.loginForm,url:this.baseurl+"/login",success:function(i){t("log","登录执行",e.loginForm," at pages/my/my.vue:598"),t("log",i," at pages/my/my.vue:599"),e.$refs.popupLogin.close(),e.token=i.header.authentication,t("log","当前token为",e.token," at pages/my/my.vue:613"),!0===i.data.status?(e.userInfo=i.data.data,uni.showToast({title:"登陆成功",icon:"success"}),uni.setStorage({key:"userInfo",data:i.data.data}),uni.setStorage({key:"token",data:e.token})):(e.$refs.popupLogin.open(),uni.showToast({duration:500,title:i.data.msg,icon:"loading"}))}})},regist:function(){var t=this;if((this.loginForm.avatar+"").trim().length&&(this.loginForm.password+"").trim().length&&(this.loginForm.username+"").trim().length&&(this.loginForm.email+"").trim().length&&(this.loginForm.nickname+"").trim().length){var e=f.default.rules.email(this.loginForm.email,"请输入正确格式邮箱");(this.loginForm.password+"").trim().length<6?uni.showToast({duration:1e3,title:"密码不能低于六位",icon:"loading"}):e?uni.showToast({duration:1e3,title:e,icon:"loading"}):uni.request({method:"POST",data:this.loginForm,url:this.baseurl+"/blog/user/register",success:function(e){e.data.status?(uni.showToast({title:"注册成功",icon:"success"}),t.$refs.popupRegist.close(),t.$refs.popupLogin.open()):uni.showToast({duration:500,title:e.data.msg,icon:"loading"})}})}else{var i="请输入完整信息";(this.loginForm.username+"").trim().length?(this.loginForm.password+"").trim().length?(this.loginForm.email+"").trim().length?(this.loginForm.nickname+"").trim().length?(this.loginForm.avatar+"").trim().length||(i="请选择头像"):i="昵称不能为空":i="邮箱不能为空":i="密码不能为空":i="用户名不能为空",uni.showToast({duration:1e3,title:i,icon:"loading"})}},logout:function(){var e=this;uni.showModal({content:"确定要退出吗",success:function(i){1==i.confirm&&(e.doLogout(),t("log",i," at pages/my/my.vue:727"),uni.removeStorageSync("userInfo"),uni.removeStorageSync("token"),e.loginForm.username="",e.loginForm.password="",e.loginForm.nickname="",e.userInfo.nickname="",e.clearMsgs(),e.$refs.popupLogin.open())}})},doLogout:function(){var e=this;uni.request({method:"GET",url:this.baseUrl+"/logout",success:function(){t("log","执行退出"," at pages/my/my.vue:749"),uni.removeStorageSync("userInfo"),uni.removeStorageSync("token"),location.reload(),e.loginForm.username="",e.loginForm.password="",e.loginForm.nickname="",e.$refs.popupLogin.open()}})},toRegist:function(){this.$refs.popupLogin.close(),this.$refs.popupRegist.open(),this.loginForm.password="",this.loginForm.username="",this.loginForm.email="",this.loginForm.nickname=""}},onLoad:function(){var e=uni.getStorageSync("userInfo");e&&(this.userInfo=e,this.loginForm=e,t("log",this.loginForm," at pages/my/my.vue:778")),this.token=uni.getStorageSync("token")},onShow:function(){var t=this;(this.loginForm.username="")&&this.$refs.popupLogin.open(),uni.getStorageSync("userInfo")?(this.userInfo=uni.getStorageSync("userInfo"),this.loginForm.username=this.userInfo.username):(this.userInfo={},this.userInfo.username="",this.userInfo.nickname="",this.loginForm.username="",this.userInfo.password="",uni.showToast({icon:"loading",title:"请登录"}),setTimeout((function(){t.$refs.popupLogin.open()}),2e3))},onReady:function(){this.userInfo.nickname||this.$refs.popupLogin.open()}});e.default=m}).call(this,i("0de9")["log"])},cd3c:function(t,e,i){"use strict";var n=i("78db"),o=i.n(n);o.a}}]);