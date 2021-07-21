<template>
	<scroll-view :refresher-triggered="triggered" :refresherrefresh="onRefresh" :refresher-threshold="80"
	 refresher-background="lightgreen" @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
	 @refresherabort="onAbort" refresher-enabled enable-back-to-top :scroll-y="true" :scroll-top="scrollTop" @scroll="scrollToBottom">

		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view id="body" class="body m-item" style="display: flex;flex-direction: column;padding-bottom: 100rpx;">
			<view class="background">
				<image mode="widthFix" style="width: 100%;" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=649482264,581770947&fm=26&gp=0.jpg">

				</image>
			</view>
			<view style="color: #DD524D;text-align: center;padding-top: 50px;">{{getStoryText}}</view>
			<view style="position: fixed;top: 300rpx;width: 100%;">
				<cmd-notice-bar type="default" scrollable :text="text"></cmd-notice-bar>
			</view>


			<!-- message组件 -->
			<view v-for="item in objcs" v-if="objcs" style="padding-bottom: 20px;">
				<!-- 消息展示区 -->
				<view :class="{mychatBox:item.isMine,otherchatBox:!item.isMine}">
					<view v-if="!item.isMine" class="otherchatTopBox">
						<!-- 他人头像 -->
						<image class="otherAvatarBox" :src="item.avatar"></image>
					</view>
					<view :class="{mychatTopBox:item.isMine,otherChatBottomBox:!item.isMine}">
						<view :class="{mynicknameArea:item.isMine,othernicknameArea:!item.isMine}" style="color: #fffafa;">
							<!-- 昵称 -->
							{{item.nickname}}
						</view>
						<text   selectable class="contentArea">
							<!-- 消息内容 -->
							<text style="width: auto;padding-left: 15px;padding-right: 10px;ming-height: 100rpx;">
								{{item.msg}}
							</text>
						</text>
						<!-- 其他人时间 -->
						<view></view>
						<text  style="position: absolute;padding-left: 230rpx;color: #F0F0F0;" v-if="!item.isMine" v-show="item.time">{{item.time}}</text>
						
					</view>					

					<view v-if="item.isMine" :class="{myChatBottomBox:item.isMine,otherChatBottomBox:!item.isMine}">
						<!-- 自己头像 -->
						<image :class="{myAvatarBox:item.isMine,otherAvatarBox:!item.isMine}" :src="item.avatar"></image>
					</view>
				</view>
				<!-- 自己时间 -->
				<view style="">
					<text v-if="item.isMine" :class="{myTimeArea:item.isMine}" v-show="item.time">{{item.time}}</text>
					
				</view>
				
				
			</view>



			<!-- 锚点 -->
			<!-- <a v-if="objcs" id='ff'></a> -->

			<!-- <a  v-show='false' href='#ff'></a> -->
			<!-- 提示未读消息 -->
			<view style="width: 100%;">
				<uni-tag v-show="newMsgCount>0" style="position: fixed;bottom: 60px;margin-left: 38%;" type="primary" text='滑至底部' @click="bindClick"></uni-tag>
				<uni-badge v-show="newMsgCount>0" :text="newMsgCount" type="error" style="right: 10rpx;position: fixed;bottom: 65px;z-index: 3;" @click="bindClick"></uni-badge>
			</view>
			

			<!-- 输入框和发送按钮 -->
			<!-- 手机上下面的bootom要设为0 -->
			<view style="z-index: 2;" :class="{phone:platform=='android'
			,h5:platform=='h5',ios:platform=='ios'
			}">
				<view style="width: 80%;">
					<input placeholder="各各都是人才,说话又好听" v-model="content.msg" style="background-color: #FFFFFF;height: 40px;border-radius: 30rpx;margin-left: 5rpx;padding-left: 20rpx;"
					 type="text">

					</input>
				</view>


				<view style="padding-left: 5rpx;">
					<uni-tag :inverted="false" style="width: 100rpx;height: 33px;padding-top: 4px;" @click="sendMsg" circle text="发送"
					 type="primary"></uni-tag>
				</view>

			</view>

			<view :class="{androidShowNumbers:platform=='android',otherShowNumbers:platform!='android'}" style="position: fixed;width: 100%;text-align: center; z-index: 1;">
				<text style="width: 100%;text-align: center;color: #FFFFFF;">在线人数:{{sysmsg.number}}</text>
			</view>

		</view>

	</scroll-view>

</template>

<script>
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import SOtime from '@/utils/SOtime.js'
	import message from '@/components/quick-message/quick-message.vue'
	import cmdNoticeBar from "@/components/cmd-notice-bar/cmd-notice-bar.vue"
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	// let userId=''
	// const ws = new WebSocket('ws://localhost:8889'+userId)
	export default {

		components: {
			uniTag,
			message,
			cmdNoticeBar,
			uniBadge
		},
		data() {
			return {
				count:0,
				text: '',
				n: 0,
				triggered: false,
				_freshing: false,
				unReadMsgCount: 0,
				newMsgCount:0,
				msgCountFlag: false,
				getStoryText: '下拉加载历史消息',
				//isShowLoadStoryMsg: true, //是否显示 加载历史消息

				scrollTop: 0,
				platform: true,
				screenHeight: '',
				content: {
					userId: '',
					msg: '',
					avatar: '',
					nickname: '',
					address: '',
					time:''
				},
				getStoryKey: '@!$&^%$#%^&**',
				ifMine: true,
				// 聊天页面时时滚动样式
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0
				},
				socketTask: null,
				is_open_socket: false,
				objcs: [],
				address: { //
					addr: '', //ip
					country: '',
					province: '',
					city: '',
					isp: '' //运营商
				},
				sysmsg: {
					msg: '',
					number: 0
				},
				userInfo: {

				},
				sockenOpen: false
			}
		},
		mounted() {
			// this.scrollToBottom()
		},
		updated() {
			// this.scrollToBottom()
		},
		onLoad() {
			// 
			this.scrollToBottom()
			console.log('当前用户信息是否存在？', uni.getStorageSync('userInfo'))
			if (!uni.getStorageSync('userInfo')) {

				setTimeout(() => {
					this.$refs.message.show({
						msg: '没有登录可不能加入群聊哦，都不知道你是谁',
						mask: true,
						direction: 'center',
						time: 1000,
						type: 'error'

					})
					uni.switchTab({
						url: '../my/my'
					})
				}, 1000)

			} else {
				this.userInfo = uni.getStorageSync('userInfo')
				// if(!this.is_open_socket){
				// 	setTimeout(() => {
				// 	this.connectSocketInit()
				// }, 1)
				// }
				

			}
			this.getAddress()
			this._freshing = false;

			const res = uni.getSystemInfoSync(); //获取手机可使用窗口高度  api为获取系统信息同步接口
			this.style.pageHeight = res.windowHeight;
			this.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (100) - 70; //像素


			if (res.platform === 'android' || res.platform === 'ios') {
				this.platform = res.platform
			} else {
				this.platform = 'h5'
			}

			this.objcs = uni.getStorageSync('msgs')

		},
		onHide() {


			this.unReadMsgCount = 0;
			//开始计数有多少条未读消息
			this.msgCountFlag = true;
			this.n = 0;
			this.count=0
			// this.closeSocket()
			// this.is_open_socket=false

		},

		onShow() {
			this.n = 0;
			uni.removeStorageSync('unReadCount')
			// this.scrollToBottom()
			setTimeout(() => {
				
				console.log('当前通道是否打开？ ', this.is_open_socket)
				console.log('当前通道是否打开？ ', uni.getStorageSync('userInfo'))
				if (!uni.getStorageSync('userInfo')) {
					if(this.is_open_socket){
						this.closeSocket()
					}
					 

					setTimeout(() => {
						uni.showToast({
							icon: 'loading',
							title: '请先登录',
							duration: 1000
						});
						setTimeout(() => {


							uni.switchTab({
								url: '../my/my'
							})
						}, 500);
					}, 1000)


				} else {
					//用户已登录
					console.log('yhydl',this.is_open_socket,this.count)
					this.userInfo = uni.getStorageSync('userInfo')
					if (this.is_open_socket==false) {

						if (this.userInfo) {

							uni.showToast({
								icon: 'loading',
								title: '正在连接'
							})

							setTimeout(() => {
								this.connectSocketInit()
								// 连接成功获取最新消息并且弹出右下角最新消息数
								
								setTimeout(()=>{
									this.socketTask.send({
										data: this.getStoryKey,
										async success() {
											console.log('获取历史消息')
										}
									})
								},1000)
								
							}, 1000)
							
							
						}

						//this.is_open_socket=true
					}
				}

			}, 1000)

			// if(this.is_open_socket===false){
			// 	setTimeout(()=>{
			// 		this.connectSocketInit()
			// 	},1000)
			// }

			if (!uni.getStorageSync('msgs')) {
				//刚退出的
				this.objcs = []
				// this.closeSocket()

			} else if (this.objcs.length > 0) {
				if (this.msgCountFlag && this.unReadMsgCount > 0) {

					uni.removeTabBarBadge({
						index: 1
					})
					setTimeout(() => {
						this.text = '当前已更新' + this.unReadMsgCount + '条未读群消息';
						this.unReadMsgCount = 0;
					}, 1000)
				}
				//没退出并且拉取过历史记录重新刷新信息
				this.socketTask.send({
					data: this.getStoryKey,
					async success() {
						console.log('获取历史消息')
					}
				})
			}

			console.log(uni.getStorageSync('msgs'))

			this.msgCountFlag = false;

		},

		beforeDestroy() {
			this.closeSocket();
		},
		onUnload() {

		},
		//////////////////
		methods: {
			//-------------
			// 滚动至聊天底部
			scrollToBottom: function() {
				console.log('滚动至聊天底部')
				setTimeout(() => {
					uni.pageScrollTo({
						scrollTop: 99999,
						duration: 500
					});
				}, 1);


			},
			bindClick(){
				this.newMsgCount=0
				this.scrollToBottom()
			},
			async sendMsg() {
				console.log('点击了发送按钮')
				this.clickRequest()
				this.scrollToBottom()

			},
			//获取地址  
			getAddress() {
				const val = uni.getStorageSync('address')
				if (val) {
					uni.request({
						url: 'https://app.bilibili.com/x/resource/ip',
						success: (res) => {
							this.address = res.data.data
							console.log(res.data)
							uni.setStorageSync('address', res.data)
						}
					})
				} else this.address.addr = '127.0.0.1'

			},
			getStoryMsg(code, data) {
				if (code === 1) {
					let list = data
					for (var i = 0; i < list.length; i++) {
						let obj = {
							isMine: false,
							avatar: '',
							msg: '',
							nickname: ''
						}
						if (list[i].userId == this.userInfo.id) {

							obj.isMine = true
						}
						obj.avatar = list[i].avatar
						obj.msg = list[i].msg
						obj.nickname = list[i].nickname
						
						obj.time=SOtime.time2(list[i].time) 
						list[i] = obj
					}
					this.objcs = list
				}

			},
			connectSocketInit() {
				// 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
				
				this.socketTask = uni.connectSocket({
					// 【非常重要】必须确保你的服务器是成功的,如果是手机测试千万别使用ws://127.0.0.1:9099【特别容易犯的错误】
					url: this.wsurl + '/chat/' + this.userInfo.nickname + '@' + this.userInfo.username,
					async success(data) {
						uni.setStorageSync('open',true)
						console.log("websocket连接成功");

					},
				});



				// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
				this.socketTask.onOpen((res) => {
					console.log("WebSocket连接正常打开中...！");
					this.is_open_socket = true;

					this.socketTask.onMessage((res) => {


						const data = JSON.parse(res.data)
						console.log("收到服务器内容：",data);
						if(data=='101'){
							console.log('收到下线通知-----------')
						}
						console.log(data);
						if (data.number) {
							console.log('收到系统通知')
							//不允许一个账号两个或两个以上app端同时登陆
							let count = 0;
							let list = data.chaters
							
							const key=this.userInfo.nickname
							for (var i = 0; i < list.length; i++) {
								if(list[i]==key) count++;
							}
							console.log('map',list)
							console.log('此账号' + this.userInfo.username + '有' + count + '个设备同时登录')
							console.log('当前n为' + this.n)
							this.count=count
							if (count > 1&&this.sysmsg.number>1) {
								this.closeSocket()
								if (this.n > 0 && this.n < 10000) {
									//另一台设备下线
									this.n += 20000
									console.log('你已被挤下线')
									this.closeSocket()
									uni.removeStorageSync('userInfo')
									uni.removeStorageSync('token')
									uni.removeStorageSync('msg')
									uni.switchTab({
										url: '../my/my'
									})
									uni.showToast({
										icon: 'loading',
										title: '已被挤下线'
									})
								}

								if (this.n = -9999) {
									this.n = 0
								}
								// if(this.n==-9999){
								// 	this.closeSocket()
								// 	uni.removeStorageSync('userInfo')
								// 	uni.removeStorageSync('token')
								// 	uni.removeStorageSync('msg')
								// 	uni.switchTab({
								// 		url:'../my/my'
								// 	})
								// }
								//




								if (this.n == 0) {
									this.n++;
									uni.showModal({

										cancelText: '我要下线',
										confirmText: '重新登录',
										title: '已在另一台设备登录',
										complete: (e) => {
											console.log(e)
											if (e.cancel) {
												//下线先放着
												this.closeSocket()
												this.n += 100;
												console.log('此设备已下线')
											}
											if (e.confirm) {
												this.closeSocket()
												this.is_open_socket = true
												this.connectSocketInit()
												this.n -= 10000;
											}
										}
									})

								}



							}




							if (this.text !== '') {
								setTimeout(() => {
									this.text = data.msg
								}, 10000)
							} else {
								this.text = data.msg
							}



							this.sysmsg = data
						} else {

							if (!data.length) {
								console.log('收到群消息')
								if (this.msgCountFlag) {
									this.unReadMsgCount++;
								}
								this.newMsgCount++
								console.log('你有'+this.newMsgCount+'条新消息')
								uni.setStorageSync('unReadCount', this.unReadMsgCount)
								console.log('当前有' + this.unReadMsgCount + '条消息未读')
								if (this.unReadMsgCount > 0) {
									uni.setTabBarBadge({
										index: 1,
										text: '' + this.unReadMsgCount,
										complete: (e) => {
											console.log(e)
										}
									})
								}
								let content = {
									isMine: false,
									nickname: '',
									msg: '',
									avatar: '',
									time:''
								}
								if (data.userId == this.userInfo.id) {
									content.isMine = true
									this.newMsgCount=0
								}
								content.nickname = data.nickname
								content.msg = data.msg
								content.avatar = data.avatar
								content.time=SOtime.time2(data.time) 
								console.log('msgTime--------------',content.time)
								this.objcs.push(content)
								//将消息存到本地
								uni.setStorageSync('msgs', this.objcs)
								setTimeout(()=>{
									// this.scrollToBottom()
								},1000)
								

							} else { //加载历史消息
								console.log('加载历史消息')
								// setTimeout(() => {
								// 	this.scrollToBottom()
								// }, 1000)
								const oldmsg = uni.getStorageSync('msgs')
								let newMsgCoung=data.length-oldmsg.length
								
								console.log('ssssssssssssssssssssssssssssssssssssss',newMsgCoung)
								this.newMsgCount=newMsgCoung;
								this.getStoryMsg(1, data)
								//将消息存到本地
								setTimeout(()=>{
									uni.setStorageSync('msgs', this.objcs)
								},1000)
								

							}


						}
					});

				})
				// 这里仅是事件监听【如果socket关闭了会执行】
				this.socketTask.onClose(() => {
					if (this.sysmsg.number > 0) {
						this.sysmsg.number -= 1
					}
					// if(uni.getStorageSync('userInfo')&&!this.is_open_socket){
					// 	this.connectSocketInit()
					// }else
					console.log("已经被关闭了")
					
					uni.removeStorageSync('open')
					this.is_open_socket = false
					
					// uni.removeStorageSync('userInfo')
					// uni.removeStorageSync('token')
					// uni.removeStorageSync('msgs')
					// uni.switchTab({
					// 	url: '../my/my'
					// })

				})

			},

			// 关闭websocket【离开这个页面的时候执行关闭】
			closeSocket() {
				const that=this
				this.socketTask.close({
					async success(res) {
						that.is_open_socket = false;
						console.log("关闭成功", res)
						
					},
					fail(err) {
						console.log("关闭失败", err)
					}
				})
			},




			clickRequest() {
				
				//console.log('ip'+this.address.addr)
				let that = this
				if (!this.content.msg.trim().length) {
					uni.showToast({
						title: '请输入内容',
						icon: 'loading'
					})
				}
				if (this.is_open_socket && this.content.msg.trim().length) {
					const val = uni.getStorageSync('address')
					// websocket的服务器的原理是:发送一次消,同时返回一组数据【否则服务器会进去死循环崩溃.】
					if (!val) {
						this.address = {
							addr: '127.0.0.1'
						}
					} else {
						this.address = val
					}
					this.content.address = this.address.addr
					this.content.avatar = this.userInfo.avatar
					this.content.nickname = this.userInfo.nickname
					this.content.userId = this.userInfo.id
					this.socketTask.send({
						data: JSON.stringify(that.content),
						async success() {
							console.log("消息发送成功");
							that.newMsgCount=0
							setTimeout(()=>{
								that.scrollToBottom()
							},1000)
							that.content.msg = ''
							
						},
					});
					that.content.msg = ''
				}


			},
			onPullDownRefresh() {
				console.log('下拉刷新被触发')
				let that =this;
				if (this.is_open_socket) {
					setTimeout(() => {
						this.socketTask.send({
							data: this.getStoryKey,
							async success() {
								console.log("获取历史记录成功");
								//this.isShowLoadStoryMsg=false
								setTimeout(()=>{
									that.scrollToBottom()
								},1000)
								
								uni.stopPullDownRefresh()
							}
						})
					}, 2000)

				}
			},
			onPulling(e) {
				console.log("onpulling", e);
				this.newMsgCount=0;
			},
			onRefresh() {
				console.log('自定义下拉刷新被触发')
				if (this._freshing) {
					this.triggered = false
					return
				}
				this._freshing = true;
				if (!this.triggered) this.triggered = true
				if (this.is_open_socket) {
					setTimeout(() => {
						this.socketTask.send({
							data: this.getStoryKey,
							async success() {
								console.log("获取历史记录成功");
								//this.isShowLoadStoryMsg=false
								this.triggered = false
								this._freshing = false
							}
						})

					}, 2000)

				}
				//this.triggered = true
			},
			onRestore() {
				this._freshing = false
				this.triggered = false; // 需要重置
				console.log("onRestore");
			},
			onAbort() {
				console.log("onAbort");
			}




			//-------------------
		},

		////////////////
	}
</script>

<style>
	.otherTimeArea{
		position: absolute;padding-left: 40rpx;width: 100%;text-align: center;color: #fffefd;
	}
	.myTimeArea{
		position: absolute;padding-left: 320rpx;margin-left: 10rpx;width: 600px;padding-top: 60rpx;color: #fffefd;
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.androidShowNumbers {
		top: 100px;
	}

	.otherShowNumbers {
		top: 70px;
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

	.h5 {
		bottom: 50px;
		display: flex;
		flex-direction: row;
		background-color: #9c83ff;
		height: 45px;
		padding-top: 5px;
		position: fixed;
		width: 100%;

	}

	.phone {
		bottom: 0 !important;
		display: flex;
		flex-direction: row;
		background-color: #9c83ff;
		height: 45px;
		padding-top: 5px;
		position: fixed;
		width: 100%;
	}

	.ios {
		bottom: 50px;
		display: flex;
		flex-direction: row;
		background-color: #9c83ff;
		height: 45px;
		padding-top: 5px;
		position: fixed;
		width: 100%;
	}

	.body {
		/* background-color: #afeeee; */
	}

	.mychatBox {
		padding: 5px;
		display: flex;
		flex-direction: row;
		float: right;
		margin-top: 50rpx;
		min-height: 70%;
	}

	.otherchatBox {
		padding: 5px;
		display: flex;
		flex-direction: row;
		margin-top: 50rpx;
	}
	

	.mychatTopBox {
		display: flex;
		flex-direction: column;
	}

	.otherchatTopBox {
		width: 80rpx;
		padding-top: 20rpx;
	}

	.myChatBottomBox {
		width: 80rpx;
		padding-top: 20rpx;
		
	}

	.otherChatBottomBox {
		display: flex;
		flex-direction: column;
	}

	.myAvatarBox {
		width: 30px;
		height: 30px;
		border-radius: 20px;
		float: right;
	}

	.otherAvatarBox {
		width: 30px;
		height: 30px;
		border-radius: 20px;
	}

	.contentArea {
		color: #333333;
		padding-top: 20rpx;
		padding-bottom: 10px;
		background-color: #FFFFFF;
		border-radius: 20px;
		/* text-align: left; */
		padding: 5px;
		padding-left: 5px;
		
		max-width: 520rpx;
		
		word-wrap: break-word;
		word-break: break-all;
	}



	.mynicknameArea {
		text-align: right;
	}

	.othernicknameArea {
		text-align: left;
	}
</style>
