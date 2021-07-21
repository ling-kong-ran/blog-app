<template>
	<view style="opacity: 0.9;">
		<view class="background">
			<!-- 背景图片 -->
			<image mode="widthFix" style="width: 100%;" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=649482264,581770947&fm=26&gp=0.jpg">

			</image>
		</view>
		<uni-card v-show="userInfo.nickname" :title="'昵称：'+userInfo.nickname" mode="title" :is-shadow="true" :thumbnail="userInfo.avatar?userInfo.avatar:'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg'"
		 :extra="'用户名: '+userInfo.username">

			<view style="display: flex;flex-direction: row;">
				<view style="width: auto;">
					<uni-icons type='contact' size='24' color='powderblue'></uni-icons>
				</view>
				<view style="min-width: 70%;padding-top: 5rpx;">
					用户详细信息
				</view>
				<view style="padding-top: 5rpx;float: right;">
					<uni-tag circle :type="type" :inverted="inverted" @click="showif" :text="text"></uni-tag>
				</view>

			</view>



		</uni-card>



		<uni-card v-show="text!='显示'">
			<view style="line-height: 80rpx;">
				<view>
					<text selectable>
						用户名
						<text style="float: right;color: #C0C0C0;">{{loginForm.username}}</text>
					</text>
				</view>

				<view>
					<text selectable>
						昵称<text style="float: right;color: #C0C0C0;">{{loginForm.nickname}}</text>
					</text>
				</view>
				<view>
					<text selectable>
						邮箱<text style="float: right;color: #C0C0C0;">{{loginForm.email}}</text>
					</text>
				</view>

			</view>
		</uni-card>



		<uni-card v-if="userInfo.nickname">

			<view style="display: flex;flex-direction: row;">
				<view style="width: auto;">
					<uni-icons type='minus' size='24' color='powderblue'></uni-icons>
				</view>
				<view style="min-width: 95%;padding-top: 5rpx;">
					设置
				</view>

			</view>
			<uni-card style="text-align: center;" @click="changePassword">修改密码</uni-card>
			<uni-card style="text-align: center;" @click="changeInfo">修改信息</uni-card>
			<uni-card style="text-align: center;" @click="changeUser">切换账号</uni-card>
			<!-- <uni-card style="text-align: center;" @click="clearMsgs">清空消息记录</uni-card> -->
			<uni-card @click="logout" style="text-align: center;">退出账号</uni-card>

		</uni-card>


		<!-- 登录弹出层 -->
		<uni-popup style="width: 100%;line-height: 100rpx;" :maskClick="false" ref="popupLogin" type="center">
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
			<view>
				<uni-card>
					<view style="display: flex;flex-direction: row;justify-content: right;">
						<label for="username" style="width: 25%;">用户名:</label>
						<input style="padding-top: 30rpx;" class="input" placeholder="请输入用户名" id="username" v-model="loginForm.username" type="text">
					</view>
					<view style="display: flex;flex-direction: row;justify-content: right;">
						<label style="padding-left: 30rpx;width: 20%;" for="password">密码:</label>
						<input style="padding-top: 30rpx;text-align: left;" class="input" placeholder="请输入密码" id="password" v-model="loginForm.password" type="password">
					</view>
					<view style="display: flex;flex-direction: row;">
						<button size="mini" style="background-color: #007AFF;color: #e0ffff;" @click="toLogin" form-type="submit">登录</button>
						<button size="mini" style="background-color: #fa8072;color: #e0ffff;" @click="toRegist" form-type="submit">注册</button>
					</view>
				</uni-card>
			</view>

		</uni-popup>
		<!-- 注册弹出层 -->
		<uni-popup :maskClick="false" ref="popupRegist" type="center">
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
				<uni-card>
					<view style="display: flex;flex-direction: row;justify-content: right;">
						<label for="username" style="">用户名:</label>
						<input style="padding-top: 15rpx;" class="input" placeholder="请输入用户名" id="username" v-model="loginForm.username" type="text">
					</view>
					<view style="display: flex;flex-direction: row;justify-content: right;">
						<label style="padding-left: 30rpx;" for="password">密码:</label>
						<input style="padding-top: 15rpx;" class="input" placeholder="请输入密码" id="password" v-model="loginForm.password" type="password">
					</view>
					<view style="justify-content: right;">
						<!-- <label style="padding-left: 30rpx;padding-top: 30rpx;" for="avatar">头像:</label> -->
						<!-- 带图标 -->
						<uni-collapse style="padding-left: 10rpx;">
							<uni-collapse-item title="点我选择头像">
								<view style="padding: 30rpx;">
									<uni-grid :column="4">
										<uni-grid-item v-if="img" v-for="img in array">
											<image @click="choseAvatar(img.url)" :src="img.url" style="width: 80%;height: 80%;border-radius: 20rpx;margin-left: 10%;margin-top: 10%;"></image>
										</uni-grid-item>
									</uni-grid>
								</view>
							</uni-collapse-item>

						</uni-collapse>
						<!-- 预览头像 -->
						<view>
							<image :src="loginForm.avatar" style="background-color: #999999;margin-top:30rpx;margin-left:  275rpx;width: 100rpx;height: 100rpx;border-radius: 30rpx;"></image>
						</view>

					</view>
					<view style="display: flex;flex-direction: row;justify-content: right;">
						<label style="padding-left: 30rpx;" for="email">邮箱:</label>
						<input style="padding-top: 15rpx;" class="input" placeholder="请输入邮箱" id="email" v-model="loginForm.email" type="text">
					</view>
					<view style="display: flex;flex-direction: row;justify-content: right;">
						<label style="padding-left: 30rpx;" for="nickname">昵称:</label>
						<input style="padding-top: 15rpx;" class="input" placeholder="请输入昵称" id="nickname" v-model="loginForm.nickname" type="text">
					</view>
					<view style="display: flex;flex-direction: row;">
						<button style="background-color: #ff6347;color: #fffafa;" @click="returnLogin" form-type="submit">返回</button>
						<button style="background-color: #40e0d0;color: #fffafa;" @click="regist" form-type="submit">注册</button>
					</view>

				</uni-card>
			</view>

		</uni-popup>
		<!-- 修改信息弹出层 -->
		<uni-popup :maskClick="true" ref="popupInfo" type="center">
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
				<uni-card>
					<view style="display: flex;flex-direction: row;justify-content: right;">
						<label for="username">用户名:</label>
						<input disabled style="padding-top: 15rpx;" :placeholder="'[不可修改]'" id="username" type="text">
					</view>

					<view style="justify-content: right;">
						<!-- <label style="padding-left: 30rpx;padding-top: 30rpx;" for="avatar">头像:</label> -->
						<!-- 带图标 -->
						<uni-collapse style="padding-left: 10rpx;">
							<uni-collapse-item  title="点我选择头像">
								<view style="padding: 30rpx;">
									<uni-grid :column="4">
										<uni-grid-item v-if="img" v-for="(img,idx) in array">

											<image @click="choseAvatar(img.url,idx)" :src="img.url" style="width: 80%;height: 80%;border-radius: 20rpx;margin-left: 10%;margin-top: 10%;"></image>


										</uni-grid-item>
									</uni-grid>
								</view>
							</uni-collapse-item>

						</uni-collapse>
						<!-- 预览头像 -->
						<view>
							<image :src="loginForm?loginForm.avatar:userInfo.avatar" style="background-color: #999999;margin-top:30rpx;margin-left:  275rpx;width: 100rpx;height: 100rpx;border-radius: 30rpx;"></image>
						</view>

					</view>
					<view style="display: flex;flex-direction: row;justify-content: right;">
						<label style="padding-left: 30rpx;" for="email">邮箱:</label>
						<input class="input" style="padding-top: 15rpx;width: 80%;" placeholder="请输入新邮箱" id="email" v-model="loginForm.email" type="text">
					</view>
					<view style="display: flex;flex-direction: row;justify-content: right;">
						<label style="padding-left: 30rpx;" for="nickname">昵称:</label>
						<input style="padding-top: 15rpx;" class="input" placeholder="请输入新昵称" id="nickname" v-model="loginForm.nickname" type="text">
					</view>
					<view style="display: flex;flex-direction: row;">
						<button style="background-color: #b793ff;color: #fffafa;" @click="quickChangeInfo" form-type="submit">退出</button>
						<button style="background-color: #ff6347;color: #fffafa;" @click="doChangeInfo" form-type="submit">提交</button>
					</view>

				</uni-card>
			</view>

		</uni-popup>
		<!-- 修改密码弹出层 -->
		<uni-popup :maskClick="true" ref="popupPassword" type="center">
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
				<uni-card>


					<view style="display: flex;flex-direction: row; width: 100%;">
						<label style="padding-left: 10rpx;width: 30%;" for="password">新密码:</label>
						<input style="padding-top: 15rpx;" class="input" placeholder="请输入新密码" id="password" v-model="loginForm.password" type="password">
					</view>

					<view style="display: flex;flex-direction: row;">
						<button style="background-color: #ff6347;color: #fffafa;" @click="doChangePassword" form-type="submit">提交</button>
					</view>

				</uni-card>
			</view>

		</uni-popup>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import uniCard from '@/components/uni-card/uni-card.vue'
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import Validator from '../../common/dist/validator.esm.js'
	const validator = new Validator()
	export default {
		components: {
			uniIcons,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
			uniCollapse,
			uniCollapseItem,
			uniCard,
			uniGrid,
			uniGridItem,
			uniTag

		},
		data() {
			return {
				type: 'primary',
				inverted: true,
				text: '显示',
				userInfo: uni.getStorageSync('userInfo'),
				token: uni.getStorageSync('token'),
				loginForm: {
					username: '',
					password: '',
					avatar: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
					deleted: false,
					type: false
				},
				array: [{

						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg'
					},
					{

						url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1650652232,2198724031&fm=26&gp=0.jpg'
					},
					{

						url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.sohu.com%2Fq_mini%2Cc_zoom%2Cw_640%2Fupload%2F20170708%2F4c291061a99841a0949b3669e77b0724_th.jpg&refer=http%3A%2F%2Fimg.mp.sohu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611922123&t=0308a0f05cf8b21d55a49eb1c4bbb75c'
					}, ,
					{

						url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1136624566,3053705919&fm=26&gp=0.jpg'
					},

					{

						url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F31%2F20181231010434_dtuts.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611922123&t=8641c6e20ba3c0551bbfe15e2e8a69cf'
					},

					{

						url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201512%2F05%2F20151205222624_KjTSd.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611922123&t=e119986360cc5d32aeca624826a93a75'
					},

					{

						url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww2.sinaimg.cn%2Fmw690%2F0071ogI5gy1gj7s0sfweoj30u00u0jt1.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611925916&t=616c084e1e6675dbf3e73473c95bebf0'
					},

					{

						url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx3.sinaimg.cn%2Fmw690%2F0073VjWaly1gfn2foiz05j30jg0jgtbs.jpg&refer=http%3A%2F%2Fwx3.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611925982&t=05c2eccfa815788cd692003923741693'
					},

					{

						url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx4.sinaimg.cn%2Fmw690%2F007064jrly1gbvnfuz4xnj32bc2bcb29.jpg&refer=http%3A%2F%2Fwx4.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611925982&t=37b83b62f96ca7d7c3c4fc87a9bdc804'
					},

					{

						url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3025817779,1815184324&fm=26&gp=0.jpg'
					},
					{

						url: 'https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=35faeffc72cf3bc7e855c5e8e4309697/2fdda3cc7cd98d10531a1fc0233fb80e7aec9070.jpg'
					},
					{

						url: 'https://gss0.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/w=580/sign=794acf532d34349b74066e8df9eb1521/cc8c49a98226cffc427091fbbc014a90f703ea6e.jpg'
					},
					{

						url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201801%2F27%2F20180127172759_bpmor.thumb.700_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611926264&t=b5bd96365e624e7747ef1544b6dc4228'
					},
					{

						url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.wxcha.com%2Ffile%2F201902%2F26%2F772e8643a4.jpg%3Fdown&refer=http%3A%2F%2Fimg.wxcha.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611926294&t=44bc2524a26027914cd6369399a1aa74'
					},
					{

						url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ft1.tp88.net%2Fuploads%2Fallimg%2F2003%2Fco200313042006-11.jpg&refer=http%3A%2F%2Ft1.tp88.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611926333&t=3d1ba5a4a179efa08389bdd75e78b1bd'
					},
					{

						url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2266661787,1810355149&fm=26&gp=0.jpg'
					},
					{

						url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.hao661.com%2Fqq.hao661.com%2Fuploads%2Fallimg%2F181026%2F1GF363Q-4.jpg&refer=http%3A%2F%2Fimg.hao661.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611926420&t=7ff0085d7737b53eda4b560eea0a31ed'
					},
					{

						url: 'https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=6da3ccf966d9f2d320442ceb9cdca625/d1160924ab18972bc250f3d2e2cd7b899e510abb.jpg'
					},
					{

						url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.hao661.com%2Fzt.hao661.com%2Fuploads%2Fallimg%2Fc140930%2F141205S20Q040-162436.jpg&refer=http%3A%2F%2Fimg.hao661.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611926563&t=bb47441196fd146fdcdf969041dfe022'
					},
					{

						url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1821827341,3215469716&fm=26&gp=0.jpg'
					},
					
					{
					
						url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F22%2F20190122110422_xifue.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612854939&t=d8e4b75bb8797368bd7958283b90c9d7'
					},
					{
					
						url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201604%2F10%2F20160410105902_jLzNY.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612854987&t=4bf348f35100ce2658bea90ecd2276e7'
					},
					{
					
						url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3761222528,404694658&fm=26&gp=0.jpg'
					},
					{
					
						url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2786749539,2154694959&fm=26&gp=0.jpg'
					},
					{
					
						url: 'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh=450,600/sign=c83ae13941166d2238221d90731325c1/83025aafa40f4bfb662cf8a6014f78f0f6361847.jpg'

					}
				]
			}
		},
		methods: {

			changePassword() {

				this.$refs.popupPassword.open()
				//this.getDetailUserInfo(this.userInfo.id)
				console.log(this.userInfo)



			},
			clearMsgs() {
				uni.removeStorageSync('msgs')
			},
			//修改用户信息
			changeInfo() {
				//先获取用户信息
				//this.getDetailUserInfo(this.userInfo.id)
				//this.loginForm.password=''
				this.loginForm = this.userInfo
				this.$refs.popupInfo.open()


			},
			quickChangeInfo() {
				this.$refs.popupInfo.close()
			},
			doChangePassword() {
				//发送修改请求
				console.log(this.loginForm)
				uni.request({
					header: {
						"Authentication": uni.getStorageSync('token')
					},
					method: 'POST',
					data: this.loginForm,
					url: this.baseurl + '/blog/user/update',
					success: (res) => {

						if (res.data.msg) {
							//修改成功
							uni.showToast({
								title: '修改成功'
							})
							this.userInfo = this.loginForm
							uni.setStorage({
								key: 'userInfo',
								data: this.userInfo
							})
							this.$refs.popupPassword.close()
							//this.changeUser()
							this.loginForm.password = ''
							this.$refs.popupLogin.open()
						} else {
							const _this = this
							let myVar = setTimeout(function() {
								_this.$refs.popupInfo.close()
							}, 1100);

							uni.showToast({
								title: '修改失败',
								icon: 'loading'
							})


						}

					}

				})
			},
			doChangeInfo() {
				//发送修改请求
				console.log(this.loginForm)
				//const token=uni.getStorageSync('token')
				console.log(this.token)
				if((this.loginForm.nickname=='小凌'&&this.userInfo.nickname!=='小凌')||(this.loginForm.nickname=='小刘'&&this.userInfo.nickname!=='小刘')){
					uni.showToast({
					title: '昵称非法',
					icon: 'loading'
				})
				return;
				}
				
				uni.request({
					header: {

						"Authentication": this.token

					},
					method: 'POST',
					data: this.loginForm,
					url: this.baseurl + '/blog/user/update',
					success: (res) => {

						if (res.data.msg) {
							//修改成功
							uni.showToast({
								title: '修改成功'
							})
							this.userInfo = this.loginForm
							uni.setStorage({
								key: 'userInfo',
								data: this.userInfo
							})
							this.$refs.popupInfo.close()
						} else {
							const _this = this
							let myVar = setTimeout(function() {
								_this.$refs.popupInfo.close()
							}, 1100);

							uni.showToast({
								title: '修改失败',
								icon: 'loading'
							})


						}

					},
					complete: (e) => {
						console.log(e)
					}

				})
			},
			//切换用户
			changeUser() {
				uni.showModal({
					content: '确定要切换账号吗',
					success: (e) => {
						if (e.confirm) {
							this.loginForm = {}
							this.loginForm.username = this.userInfo.username
							this.userInfo.nickname = ''
							uni.removeStorageSync('userInfo')
							uni.removeStorageSync('token')
							//location.reload()

							this.loginForm.username = ''
							this.loginForm.password = ''
							this.loginForm.nickname = ''
							this.clearMsgs()
							this.$refs.popupLogin.open()

						}
					}
				})

			},
			showif() {
				if (this.type == 'primary') {
					this.type = 'error'
					this.text = '隐藏'

				} else {
					this.type = 'primary'
					this.text = '显示'
				}
				this.userInfo = uni.getStorageSync('userInfo')
				// if(this.login.username==''){
				// 	this.login=this.userInfo
				// }
				this.loginForm = this.userInfo
				this.inverted = !this.inverted
			},
			choseAvatar(url, idx) {
				//this.login.avatar = url
				// this.loginForm={
				// 	username:'',
				// 	avatar:'',
				// 	nickname:'',
				// 	email:'',
				// 	id:''
				// }

				this.loginForm.avatar = url
				// this.loginForm.nickname=this.userInfo.nickname
				// this.loginForm.email=this.userInfo.email
				// this.loginForm.id=this.userInfo.id
				// this.loginForm.username=this.userInfo.username







			},
			returnLogin() {
				this.$refs.popupLogin.open()
				this.$refs.popupRegist.close()
			},
			toLogin() {
				console.log('登录按钮被点击')
				//this.loginForm=this.userInfo
				if (this.loginForm.username != '' && this.loginForm.password != '') {

					uni.request({
						method: 'POST',
						data: this.loginForm,
						url: this.baseurl + '/login',
						success: (res) => {
							console.log('登录执行', this.loginForm)
							console.log(res)
							this.$refs.popupLogin.close()
							//app代码

							// #ifdef APP-PLUS
							this.token = res.header.Authentication;
							// #endif

							//H5代码
							// #ifdef H5 || MP-WEIXIN
							this.token = res.header.authentication;
							// #endif


							console.log('当前token为', this.token)
							if (res.data.status === true) {

								this.userInfo = res.data.data
								uni.showToast({
									title: '登陆成功',
									icon: 'success'

								})

								uni.setStorage({
									key: 'userInfo',
									data: res.data.data

								})
								uni.setStorage({
									key: 'token',
									data: this.token
								})

							} else {
								// alert(res.data.msg)
								this.$refs.popupLogin.open()
								uni.showToast({
									duration: 500,
									title: res.data.msg,
									icon: 'loading',


								})

							}
						}
					})
				}
			},
			regist() {
				

				if (!(this.loginForm.avatar+'').trim().length || !(this.loginForm.password+'').trim().length || !(this.loginForm.username+'').trim().length || !(this.loginForm.email+'').trim().length||!(this.loginForm.nickname+'').trim().length) {
					let msg = '请输入完整信息'
					if ( !(this.loginForm.username+'').trim().length) {

						msg = '用户名不能为空'

					} else if (!(this.loginForm.password+'').trim().length) {
						msg = '密码不能为空'
					} else if (!(this.loginForm.email+'').trim().length) {
						msg = '邮箱不能为空'
					} else if (!(this.loginForm.nickname+'').trim().length) {
						msg = '昵称不能为空'
					}else if(!(this.loginForm.avatar+'').trim().length){
						msg = '请选择头像'
					}
					uni.showToast({
						duration: 1000,
						title: msg,
						icon: 'loading'

					})
				} else{
					let msga = Validator.rules.email(this.loginForm.email, '请输入正确格式邮箱')
					
					if((this.loginForm.password+'').trim().length<6){
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
							data: this.loginForm,
							url: this.baseurl + '/blog/user/register',
							success: (res) => {
								if (res.data.status) {
									uni.showToast({
										title: '注册成功',
										icon: 'success'
					
									})
									this.$refs.popupRegist.close()
									this.$refs.popupLogin.open()
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
			logout() {
				uni.showModal({
					content: '确定要退出吗',
					success: (e) => {
						if (e.confirm == true) {

							this.doLogout()
							console.log(e)
							uni.removeStorageSync('userInfo')
							uni.removeStorageSync('token')
							//location.reload()

							this.loginForm.username = ''
							this.loginForm.password = ''
							this.loginForm.nickname = ''
							this.userInfo.nickname = ''
							this.clearMsgs()
							this.$refs.popupLogin.open()
						}
					}

				})
			},
			doLogout() {

				uni.request({
					method: 'GET',
					url: this.baseUrl + '/logout',
					success: () => {
						console.log('执行退出')
						uni.removeStorageSync('userInfo')
						uni.removeStorageSync('token')
						location.reload()
						this.loginForm.username = ''
						this.loginForm.password = ''
						this.loginForm.nickname = ''
						this.$refs.popupLogin.open()
					}
				})

			},
			toRegist() {
				this.$refs.popupLogin.close()
				this.$refs.popupRegist.open()
				this.loginForm.password = ''
				this.loginForm.username = ''
				this.loginForm.email = ''
				this.loginForm.nickname = ''

			}
		},
		onLoad() {
			// 拿取用户信息

			let userInfo = (uni.getStorageSync('userInfo'))
			if (userInfo) {
				this.userInfo = userInfo;
				this.loginForm = userInfo
				console.log(this.loginForm)
				//alert(this.userInfo.id)
			}
			this.token = uni.getStorageSync('token')

		},
		onShow() {
			if (this.loginForm.username = '') {
				this.$refs.popupLogin.open()
			}
			if (uni.getStorageSync('userInfo')) {
				this.userInfo = uni.getStorageSync('userInfo')
				this.loginForm.username=this.userInfo.username
			} else {
				this.userInfo = {}
				this.userInfo.username = ''
				this.userInfo.nickname = ''
				this.loginForm.username = ''
				this.userInfo.password = ''
				uni.showToast({
					icon: 'loading',
					title: '请登录'
				})
				setTimeout(() => {
					this.$refs.popupLogin.open()
				}, 2000)

			}

		},
		onReady() {
			if (!this.userInfo.nickname) {
				this.$refs.popupLogin.open()
			}
		}



	}
</script>

<style>
	.input{
		text-decoration: underline;
		width: 80%;
		line-height: 50rpx;
	}
	.input ::-webkit-input-placeholder{
		border-bottom: #00979D;
	}
	.background {
		position: fixed;
		top: 0;
		left: 0;

		width: 100%;
		height: 1300rpx;
		/* 		background-image: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180611%2F5550b2529de24a1e91e96e616e2fd424.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612256190&t=6734a6e0dfed2bc6ec16541655d66345);
	*/

		z-index: -1;
	}
</style>
