<template>
	<view style="z-index: 1;">
		<view>
			<!-- #ifdef APP-PLUS -->
			<app-update></app-update>
			<!-- #endif -->

			<!-- 标题卡片模式 -->
			<view class="background">
				<!-- 背景图片 -->
				<image mode="widthFix" style="width: 100%;" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=649482264,581770947&fm=26&gp=0.jpg">

				</image>
			</view>
			<view v-for="(item,idx) in blogs" style="">
				<!-- <navigator :url="'../detail/detail?id='+item.id" style="width: 80%;padding-left: 0%;" > -->
				<uni-card style="opacity: 0.9;height: 450rpx;width: 80%;margin-left: 10%;" @click="toDetail(item.id)" :title="item.title"
				 mode="style" :thumbnail="item.firstPicture" :is-shadow="true" :extra="item.flag" note="true">

					<view style="display: flex;flex-direction: row;">
						<text selectable style="width: 80%;">
							{{item.description+'...'}}
						</text>


					</view>
					<template v-slot:footer>
						<view class="footer-box">
							<view style="width: 55%;font-size: 30rpx;padding-left: 40rpx;color: #ff1493;"><text>访问量：</text>
								<uni-badge type="error" :text="item.views"></uni-badge>
							</view>
							<view style="width: 55%;font-size: 30rpx;color: #0086B3;padding-right: 0rpx;"><text>更新于：</text><br><text>{{item.createTime!=null?item.createTime:item.updateTime}}</text></view>
						</view>
					</template>
				</uni-card>
				<!-- </navigator> -->
				
			</view>
			<!-- #ifdef APP-PLUS -->
			<view  class="ad" style="width: 80%;margin-left: 10%;text-align: center;">
				<ad :data="adData"></ad>
			</view>
			<!-- #endif -->
			<!-- <uni-pagination  show-icon="true"  @change="change" :total="total"  :current="currentPage" :pageSize="pageSize"></uni-pagination> -->
			<uni-load-more :status="status" iconType="snow" @clickLoadMore="clickLoadMore" :contentText="contentText">
			</uni-load-more>
		</view>
		 
	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import AppUpdate from '@/components/app-update/app-update.vue'
	export default {
		components: {
			uniCard,
			uniPagination,
			uniLoadMore,
			uniBadge,
			AppUpdate
		},
		data() {
			return {
				version: '',
				 adData: {},
				currentPage: 1,
				pageSize: 5, //1页有多少个
				total: 2, //数据总量
				blogs: [],
				pageCount: '2',
				status: 'more',
				contentText: {
					contentdown: "点击进入下一页",
					contentrefresh: "正在加载...",
					contentnomore: "点击回到上一页",
				}

			}
		},

		onLoad(e) {
			this.getBlogPage(this.currentPage)

		},
		onShow() {

		},
		onReady() {
			//#ifdef APP-PLUS
			this.getAdData()
			//#endif
		},
		methods: {
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
			toDetail(id) {
				uni.navigateTo({
					url: '../detail/detail?id=' + id
				})
			},
			getBlogPage(currentPage) {
				uni.request({
					method: 'GET',
					url: this.baseurl + '/blogs?currentPage=' + currentPage,
					success: (res) => {
						this.blogs = res.data.data.records;
						this.total = res.data.data.total;
						this.currentPage = res.data.data.currentPage;
						this.pageSize = res.data.data.pageSize;
						if (res.data.data.pageCount) this.pageCount = res.data.data.pageCount
						console.log(res)
					}
				})

			},

			change(e) {
				uni.request({
					method: 'GET',
					url: this.baseurl + '/blogs?currentPage=' + e.current,
					success: (res) => {
						this.blogs = res.data.data.records;
						this.total = res.data.data.total;
						this.currentPage = res.data.data.currentPage;
						this.pageSize = res.data.data.pageSize;
						this.pageCount = res.data.data.pageCount;
						console.log(res)
					}
				})

			},

			clickLoadMore() {
				console.log("被点击了", '当前第' + this.currentPage + '页' +
					'总共' + this.pageCount + '页'
				)
				if (this.currentPage < this.pageCount) {
					var myVar = setTimeout(function() {
						myStopFunction()
					}, 800);
					const _this = this
					_this.status = 'loading';

					function myStopFunction() {
						_this.currentPage += 1;
						if (_this.currentPage == _this.pageCount) {
							_this.status = 'noMore';
						}
						console.log('111')
						_this.getBlogPage(_this.currentPage);
						clearTimeout(myVar);
					}

				}
				if (this.currentPage == this.pageCount && this.currentPage > 0) {
					this.currentPage -= 1;
					this.getBlogPage(this.currentPage);
					this.status = 'more';
				}

			}
		}
	}
</script>

<style>
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

	.footer-box {
		display: flex;
		flex-direction: row;
	}

	.uni-pagination {
		width: 100%;
	}

	.uni-pagination__num {
		left: auto !important;
	}
</style>
