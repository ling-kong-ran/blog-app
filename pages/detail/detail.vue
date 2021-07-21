<template>
	<view v-if="blog.title">
		<uni-card class="detailBox" style="color: #ff1493;" :title="blog.title" mode="basic">

			<view class="detailContent">
				<view class="tips">
					<view class="flag" style="color: #ff8c00;">标记：{{blog.flag}}</view>
					<view class="type" style="color: #00bfff;">类型：{{blog.type.name}}</view>
					<view class="tagBox">
						<view class="tags" selectable space="emsp">
							<view style="max-width: 100%; display: flex;flex-direction: row;">

								<uni-tag v-for="tag in blog.tags" style=" margin-right: 15rpx;margin-top: 5rpx;min-width: 20rpx;" :text="tag.name"
								 type="error" :circle="true">
								</uni-tag>

							</view>
						</view>
					</view>

				</view>
				<!-- 首图 -->
				<image style="width: 100%;" :src="blog.firstPicture" mode="aspectFill">
				</image>
				<!-- 代码解析 -->
				  <view>
					  <!-- <u-parse :content="blog.content" ></u-parse> -->
					<!--  <text id="content" v-highlight v-html="blog.content" class="markdown-body">
					  </text> -->
				        <MDParserHighlight :resource="blog.content"></MDParserHighlight>
				   </view>
				   
				   
				
				<!-- #ifdef APP-PLUS -->
				<view class="ad">
					<ad :data="adData"></ad>
				</view>
				<!-- #endif -->

				<!-- 展示评论 -->
				<view style="margin-top: 50rpx;">
					<text v-if="comments" style="color: #DD524D;">评论展示</text>
					<uni-card v-for="(comment,idx) in comments" :title="comment.nickname" mode="title" :is-shadow="true" :thumbnail="comment.img?comment.img:'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg'"
					 :extra="comment.createTime">
						{{comment.content}}
						<form @submit="replay(comment.id,idx)" >

							<view class="uni-form-item uni-column">
								<view class="title"></view>
								<textarea class="uni-input" v-model="replaycontent[idx]" name="input" placeholder="这里输入内容回复评论" />
								</view>
							<view class="uni-btn-v">
								<button style="background-color: #cd5c5c;color: #e0ffff;" form-type="submit">回复</button>
							</view>
						</form>

						<uni-card v-if="comment.comment_son" v-for="son in comment.comment_son" :title="son.nickname" mode="title"
						 :is-shadow="true" :thumbnail="son.img?son.img:'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg'"
						 :extra="son.createTime">
							{{son.content}}
						</uni-card>

					</uni-card>
				</view>
				<!-- 发表评论 -->
				<view style="margin-top: 50rpx;">
					<form @submit="submitComment" >
						<text style="color: #DD524D;">发表评论</text>

						<view class="uni-form-item uni-column">
							<view class="title"></view>
							<textarea v-model="toComment.content" class="uni-input" name="input" placeholder="期待大佬的精彩留言o((>ω< ))o" />
							</view>
					<view class="uni-btn-v">
						<button style="background-color: #007AFF;color: #e0ffff;"  form-type="submit">提交</button>
					</view>
					</form>	
				</view>
				

			</view>
		</uni-card>
		<!-- 登录弹出层 -->
		<uni-popup ref="popup" type="center">
		<!--  <uni-popup-dialog
			type="info"
			message="成功消息"
			:duration="2000"
			:before-close="true"
			@close="close"
			@confirm="confirm"
			mode="base"
			
			>
			</uni-popup-dialog> -->
			<view style="width: 100%;">
				<uni-card>
					<view style="display: flex;flex-direction: row;justify-content: right;">
						<label for="username">用户名:</label>
						<input placeholder="请输入用户名" class="input" id="username"  v-model="login.username" type="text">
					</view>
					<view style="display: flex;flex-direction: row;justify-content: right;">
						<label style="padding-left: 30rpx;" for="password">密码:</label>
						<input placeholder="请输入密码" class="input" id="password"  v-model="login.password" type="password">
					</view>
					<view style="display: flex;flex-direction: row;">
						<button size="mini" style="background-color: #007AFF;color: #e0ffff;" @click="toLogin" form-type="submit">登录</button>
						<button size="mini" style="background-color: #fa8072;color: #e0ffff;" @click="toRegist"  form-type="submit">注册</button>
					</view>
				</uni-card>
			</view>
			
		</uni-popup>
		<!-- 注册弹出层 -->
		<uni-popup  ref="popupR" type="center">
		<!--  <uni-popup-dialog
			type="info"
			message="成功消息"
			:duration="2000"
			:before-close="true"
			@close="close"
			@confirm="confirm"
			mode="base"
			
			>
			</uni-popup-dialog> -->
			<view style="width: 100%; line-height: 70rpx;">
				<uni-card style="padding-left: 40rpx;padding-right: 40rpx;">
					<view style="display: flex;flex-direction: row;justify-content: right;">
						<label for="username">用户名:</label>
						<input style="padding-top: 15rpx;width: 80%;" class="input" placeholder="请输入用户名" id="username"  v-model="login.username" type="text">
					</view>
					<view style="display: flex;flex-direction: row;justify-content: right;">
						<label style="padding-left: 30rpx;" for="password">密码:</label>
						<input style="padding-top: 15rpx;width: 80%;" class="input" placeholder="请输入密码" id="password"  v-model="login.password" type="password">
					</view>
					<view style="justify-content: right;">
						<!-- <label style="padding-left: 30rpx;padding-top: 30rpx;" for="avatar">头像:</label> -->
						<!-- 带图标 -->
						<uni-collapse style="">
						    <uni-collapse-item title="点我选择头像" >
						        <view style="">
						            <uni-grid   :column="6">
						                <uni-grid-item   v-if="img" v-for="img in array">
						                    <image @click="choseAvatar(img.url)" :src="img.url" style="width: 80%;height: 80%;border-radius: 20rpx;margin-left: 10%;margin-top: 10%;"></image>
						                </uni-grid-item>
						            </uni-grid>
						        </view>
						    </uni-collapse-item>
						   
						</uni-collapse>
						<!-- 预览头像 -->
					<view>
						<image  :src="login.avatar" style="background-color: #999999;margin-top:30rpx;margin-left:  225rpx;width: 100rpx;height: 100rpx;border-radius: 30rpx;"></image>
					</view>	
						 
					</view>
					<view style="display: flex;flex-direction: row;justify-content: right;">
						<label style="padding-left: 30rpx;" for="email">邮箱:</label>
						<input style="padding-top: 15rpx;width: 80%;" class="input" placeholder="请输入邮箱" id="email"  v-model="login.email" type="text">
					</view>
					<view style="display: flex;flex-direction: row;justify-content: right;">
						<label style="padding-left: 30rpx;" for="nickname">昵称:</label>
						<input style="padding-top: 15rpx;width: 80%;" class="input" placeholder="请输入昵称" id="nickname"  v-model="login.nickname" type="text">
					</view>
					<button style="background-color: #2c994f;color: #e0ffff;" @click="regist"  form-type="submit">注册</button>
				</uni-card>
			</view>
			
		</uni-popup>
	
		<uni-fab :class="flag" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction"
		 @trigger="trigger" @fabClick='fabClick'></uni-fab>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uniCard from '@/components/uni-card/uni-card.vue'
	
	import MDParserHighlight from '@/components/cmder-MDParserHighlight/index.vue'
	import uParse from '@/components/u-parse/u-parse.vue'
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	
	
	export default {
		
		components: {
			uniTag,
			MDParserHighlight,
			uParse,
			uniFab,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
			uniGrid,
			uniGridItem,
			uniCollapse,
			uniCollapseItem,
			uniCard
		},
		data() {
			
			return {
				title: 'picker',
				adData: {},
				array:[
				{
					
					url:'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg'
				},
				 {
					 
					 url:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1650652232,2198724031&fm=26&gp=0.jpg'
				 },
				 {
					 
					url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.sohu.com%2Fq_mini%2Cc_zoom%2Cw_640%2Fupload%2F20170708%2F4c291061a99841a0949b3669e77b0724_th.jpg&refer=http%3A%2F%2Fimg.mp.sohu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611922123&t=0308a0f05cf8b21d55a49eb1c4bbb75c'
				 },
				 ,
				 {
				 					 
				 	url:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1136624566,3053705919&fm=26&gp=0.jpg'
				 },
				 
				 {
				 					 
				 	url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F31%2F20181231010434_dtuts.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611922123&t=8641c6e20ba3c0551bbfe15e2e8a69cf'
				 },
				 
				 {
				 					 
				 	url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201512%2F05%2F20151205222624_KjTSd.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611922123&t=e119986360cc5d32aeca624826a93a75'
				 },
				 
				 {
				 					 
				 	url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww2.sinaimg.cn%2Fmw690%2F0071ogI5gy1gj7s0sfweoj30u00u0jt1.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611925916&t=616c084e1e6675dbf3e73473c95bebf0'
				 }
				 ,
				 
				 {
				 					 
				 	url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx3.sinaimg.cn%2Fmw690%2F0073VjWaly1gfn2foiz05j30jg0jgtbs.jpg&refer=http%3A%2F%2Fwx3.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611925982&t=05c2eccfa815788cd692003923741693'
				 },
				 
				 {
				 					 
				 	url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx4.sinaimg.cn%2Fmw690%2F007064jrly1gbvnfuz4xnj32bc2bcb29.jpg&refer=http%3A%2F%2Fwx4.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611925982&t=37b83b62f96ca7d7c3c4fc87a9bdc804'
				 }
				 ,
				 
				 {
				 					 
				 	url:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3025817779,1815184324&fm=26&gp=0.jpg'
				 },
				 {
				 					 
				 	url:'https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=35faeffc72cf3bc7e855c5e8e4309697/2fdda3cc7cd98d10531a1fc0233fb80e7aec9070.jpg'
				 },
				 {
				 					 
				 	url:'https://gss0.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/w=580/sign=794acf532d34349b74066e8df9eb1521/cc8c49a98226cffc427091fbbc014a90f703ea6e.jpg'
				 },
				 {
				 					 
				 	url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201801%2F27%2F20180127172759_bpmor.thumb.700_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611926264&t=b5bd96365e624e7747ef1544b6dc4228'
				 },
				 {
				 					 
				 	url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.wxcha.com%2Ffile%2F201902%2F26%2F772e8643a4.jpg%3Fdown&refer=http%3A%2F%2Fimg.wxcha.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611926294&t=44bc2524a26027914cd6369399a1aa74'
				 },
				 {
				 					 
				 	url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ft1.tp88.net%2Fuploads%2Fallimg%2F2003%2Fco200313042006-11.jpg&refer=http%3A%2F%2Ft1.tp88.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611926333&t=3d1ba5a4a179efa08389bdd75e78b1bd'
				 },
				 {
				 					 
				 	url:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2266661787,1810355149&fm=26&gp=0.jpg'
				 },
				 {
				 					 
				 	url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.hao661.com%2Fqq.hao661.com%2Fuploads%2Fallimg%2F181026%2F1GF363Q-4.jpg&refer=http%3A%2F%2Fimg.hao661.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611926420&t=7ff0085d7737b53eda4b560eea0a31ed'
				 },
				 {
				 					 
				 	url:'https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=6da3ccf966d9f2d320442ceb9cdca625/d1160924ab18972bc250f3d2e2cd7b899e510abb.jpg'
				 },
				 {
				 					 
				 	url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.hao661.com%2Fzt.hao661.com%2Fuploads%2Fallimg%2Fc140930%2F141205S20Q040-162436.jpg&refer=http%3A%2F%2Fimg.hao661.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611926563&t=bb47441196fd146fdcdf969041dfe022'
				 },
				 {
				 					 
				 	url:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1821827341,3215469716&fm=26&gp=0.jpg'
				 }
				 ],
				index: 0,
				
				userInfo: {
					nickname:''
				},
				
				login:{
					username:'',
					password:'',
					avatar:'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
					deleted:false,
					type:false
				},
				
				id: '',
				flag: '',
				blog: {
					title: '',
					flag: '',
					type: '',
					tags: [],
				},
				pattern: {
					color: '#2f4f4f',
					selectedColor: '#007AFF',
					backgroundColor: '#ffffff',
					buttonColor: '#7b68ee'
				},
				// 悬浮按钮菜单选项
				content: [{
						text: '选项1'
					},
					{
						text: '选项2'
					},
					{
						text: '选项3'
					},
					{
						text: '菜单开发中'
					}

				],
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'vertical',
				replaycontent:[],
				comments: [],
				toComment: {
				    blogId: '',
				    nickname: '',
				    avatar: '',
				    content: '',
				    email: '',
				    deleted: false,
				    parentCommentId:''
				}
			}
		},
		onReady() {
			//#ifdef APP-PLUS
			this.getAdData()
			//#endif
		},
		methods: {
			
			choseAvatar(url){
				this.login.avatar=url
				
			},
			//#ifdef APP-PLUS
			 getAdData: function (e) {
			      // 仅APP平台支持
				  
				  
			      plus.ad.getAds({
			          adpid: '120655230312',  // 替换为自己申请获取的广告位标识，此广告位标识仅在HBuilderX标准基座中有效，仅用于测试
			          count: 3,   // 广告数量，默认 3
			            // 根据宽度获取合适的广告(单位px)
			        },
			        (res) => {
			          this.adData = res.ads[0];
					  
			          console.log('广告来啦 ',this.adData);
			        },
			        (err) => {
						console.log('广告报错啦 ')
			          console.log(err);
			        }
			      )
			    },
				//#endif
			toLogin(){
				if(this.login.nickname!=''&&this.login.password!=''){
					uni.request({
						method:'POST',
						data:this.login,
						url:this.baseurl+'/login',
						success: (res) => {
							console.log(res)
							let token=res.header.authentication;
							if(res.data.status){
								// alert('登录成功')
								this.userInfo=res.data.data
								uni.showToast({
									title:'登陆成功',
									icon:'success'
									
								})
								uni.setStorage({
									key:'userInfo',
									data:res.data.data
									
								})
								uni.setStorage({
									key:'token',
									data:token
								})
								this.$refs.popup.close()
							}else{
								// alert(res.data.msg)
								uni.showToast({
									duration:500,
									title:res.data.msg,
									icon:'loading'
									
								})
								this.$refs.popup.close()
							}
						}
					})
				}
			},
			regist(){
				
				if (!(this.login.avatar+'').trim().length || !(this.login.password+'').trim().length || !(this.login.username+'').trim().length || !(this.login.email+'').trim().length||!(this.login.nickname+'').trim().length) {
					let msg = '请输入完整信息'
					if ( !(this.login.username+'').trim().length) {
				
						msg = '用户名不能为空'
				
					} else if (!(this.login.password+'').trim().length) {
						msg = '密码不能为空'
					} else if (!(this.login.email+'').trim().length) {
						msg = '邮箱不能为空'
					} else if (!(this.login.nickname+'').trim().length) {
						msg = '昵称不能为空'
					}else if(!(this.login.avatar+'').trim().length){
						msg = '请选择头像'
					}
					uni.showToast({
						duration: 1000,
						title: msg,
						icon: 'loading'
				
					})
				} else{
					let msga = Validator.rules.email(this.login.email, '请输入正确格式邮箱')
					
					if((this.login.password+'').trim().length<6){
						uni.showToast({
							duration: 1000,
							title: '密码不能低于六位',
							icon: 'loading'
											
						})
					}else if (msga) {
						uni.showToast({
							duration: 1000,
							title: msga,
							icon: 'loading'
					
						})
					} else {
						uni.request({
							method: 'POST',
							data: this.login,
							url: this.baseurl + '/blog/user/register',
							success: (res) => {
								if (res.data.status) {
									uni.showToast({
										title: '注册成功',
										icon: 'success'
					
									})
									this.$refs.popupR.close()
									this.$refs.popup.open()
								} else {
									uni.showToast({
										duration: 500,
										title: res.data.msg,
										icon: 'loading'
					
									})
								}
					
							}
						})
					}
				}
							
			},
			toRegist(){
				this.$refs.popup.close()
				this.$refs.popupR.open()
				this.login.password = ''
				this.login.username = ''
				this.login.email = ''
				this.login.nickname = ''
				
			},
			trigger(data) {
				console.log(data)
			},
			fabClick() {},
			submitComment(){
				console.log('submit',this.toComment.content)
				this.toComment.img=this.userInfo.avatar;
				this.toComment.email=this.userInfo.email;
				this.toComment.nickname=this.userInfo.nickname;
				if(this.toComment.content!=''&&this.userInfo.nickname!=''){
					uni.request({
						url:this.baseurl+'/comment',
						method:'POST',
						data:this.toComment,
						success: () => {
							// 评论完清空内容
							this.toComment.content=''
							this.getComments()
						}
					
					})
				}else if(this.toComment.content==''&&this.userInfo.nickname!=''){
					uni.showModal({
						content:'请输入内容',
						showCancel:false
					})
				}else if(this.userInfo.nickname==''){
					uni.showModal({
						content:'请登录后评论',
						success: (confirm) => {
							console.log(confirm)
							if(confirm.cancel){
								this.$refs.popup.close()
							}else{
								this.$refs.popup.open()
							}
						}
					})
				}
			},
			replay(parentId,idx) {
			    this.toComment.parentCommentId=parentId;
			    this.toComment.img=this.userInfo.avatar;
			    this.toComment.email=this.userInfo.email;
			    this.toComment.nickname=this.userInfo.nickname;
			    this.toComment.content=this.replaycontent[idx];
				
				this.submitComment();
				// 评论完清空内容
				this.replaycontent[idx]=''
			},
			
			getComments(){
				uni.request({
					url:this.baseurl+'/comment/'+this.toComment.blogId,
					success: (res) => {
						this.comments=res.data.data;
						console.log(res.data.data)
					}
				})
			}

		},
		created() {


		},
		onLoad(option) {
		
			
			console.log(option.id)
			// 拿取用户信息
			let userInfo=(uni.getStorageSync('userInfo')) 
			if(userInfo){
				this.userInfo=userInfo;
			}
			
			
			this.id = option.id
			this.toComment.blogId=this.id
			if (this.id) {
				uni.request({
					method: 'GET',
					url: this.baseurl + '/blog/' + this.id,
					success: (res) => {
						var MarkDownIt = require('markdown-it')
						var md = new MarkDownIt();
						this.blog = res.data.data;
						// this.blog.content = md.render(res.data.data.content)
						this.blog.content  = res.data.data.content
						console.log('--------------------------------------')
						console.log(this.blog.content)
					}
				})
				this.getComments()
			}
		}
	}
</script>

<style>
	@import url("@/components/u-parse/u-parse.css");
	.input{
		text-decoration: underline;
		
		line-height: 50rpx;
	}
	.input ::-webkit-input-placeholder{
		border-bottom: #00979D;
	}
	.detailBox {
		min-height: 600rpx;
	}

	.tips {
		display: flex;
		flex-direction: column;
	}

	.tags {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
		margin-bottom: 15rpx;
		margin-top: 15rpx;
	}

	.tag {
		width: 10%;
		margin-right: 15rpx;
	}

	.uni-form-item .title {
		padding: 20rpx 0;
	}
</style>
