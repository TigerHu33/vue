<template>
<div class="chance_history">
    <!--タイトル-->
    <div align="left">
        <h1 id="history_title">❏ チャンス履歴</h1>
    </div>
    <!--テーブルヘッダ-->
    <el-page-header @back="go_back()" >
    </el-page-header>
    
    <div align="left" style="float:left" @click="change_type()">
        <el-button >CHANCE切り替え</el-button>
    </div>
    <div align="right">
        <el-button @click="to_interval('hour')"  :type="searchForm.interval_time=='hour'?'primary':''" >一時間</el-button>
        <el-button @click="to_interval('day')"  :type="searchForm.interval_time=='day'?'primary':''"  >一日</el-button>
        <el-button @click="to_interval('week')"  :type="searchForm.interval_time=='week'?'primary':''"  >一週間</el-button>
        <el-button @click="to_interval('month')"  :type="searchForm.interval_time=='month'?'primary':''"  >一ヶ月</el-button>
        <el-button @click="to_interval('year')"  :type="searchForm.interval_time=='year'?'primary':''"  >一年</el-button>
    </div>
    <!--テーブル内容-->
    <el-table :data="arbitrage" style="width: 100%" :default-expand-all="false">
        <el-table-column type="expand">
            <template slot-scope="scope">
                <el-table ref="multipleTable" :data="scope.row.match_details" border stripe tooltip-effect="dark" style="width: 100%">
                    <el-table-column prop="buy_ex" align="center" header-align="center" min-width="100" label="買">
                    </el-table-column>
                    <el-table-column prop="buy_price" align="center" header-align="center" min-width="100" label="買価格">
                    </el-table-column>
                    <el-table-column prop="sell_ex" align="center" header-align="center" min-width="100" label="卖">
                    </el-table-column>
                    <el-table-column prop="sell_price" align="center" header-align="center" min-width="100" label="売価格">
                    </el-table-column>
                    <el-table-column prop="amount" align="center" header-align="center" min-width="100" label="数量">
                    </el-table-column>
                    <el-table-column prop="fee" align="center" header-align="center" min-width="100" label="手数料（見込み）">
                    </el-table-column>
                    <el-table-column prop="profit" align="center" header-align="center" min-width="100" label="利益（見込み）">
                    </el-table-column>
                </el-table>
            </template>
        </el-table-column>
        <el-table-column prop="timestamp" align="center" header-align="center" min-width="100" label="日時">
        </el-table-column>
        <el-table-column prop="amount_total" align="center" header-align="center" min-width="160" label="取引量（見込み）">
        </el-table-column>
        <el-table-column prop="profit_total" align="center" header-align="center" min-width="160" label="利益（見込み）">
        </el-table-column>
        <el-table-column prop="profit_rate" align="center" header-align="center" min-width="160" label="利率（見込み）">
        </el-table-column>
    </el-table>
    
    <!--テーブルフッター-->
    <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleIndexChange"
      :current-page="pageIndex"
      :page-sizes="[30, 60, 90, 120]"
      :page-size="30"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
</div>
</template>

<script>
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from 'vue-resource';
import pako from 'pako';

Vue.use(ElementUI);
Vue.use(http);
Vue.use(pako);

export default {
    name: 'history',
    data() {
        return {
            arbitrage: [],
            pageIndex: 1,  //offset=pageIndex*pageSize
            pageSize: 30,  //limit
            total : 0,
            searchForm :{
                history_type : 1, // 1.chances 2.no_chances (default :1)
                limit  : '30',
                currentPage : 1,
                interval_time : 'hour'
            }
        }
    },
    methods: {
        go_back:function(){
                this.$router.push({path: '/', replace: true});
                // this.$router.go(1);
        },
        handleSizeChange(size) {
            this.pageSize = size;
            this.init_data();
        },
        handleIndexChange(index) {
            this.pageIndex = index;
            this.init_data();
        },
        change_type(){
            let title = document.getElementById("history_title");
            if (this.searchForm.history_type == 1) {
                title.innerHTML = "❏ ノーチャンス履歴";
                this.searchForm.history_type = 2;
            }else{
                title.innerHTML = "❏ チャンス履歴";
                this.searchForm.history_type = 1;
            }
                this.init_data();
        },
        to_interval(interval){
            this.searchForm.interval_time = interval;
            this.init_data();
        },
        init_data: function () {
                this.searchForm.limit = this.pageSize;
                this.searchForm.currentPage = this.pageIndex;
                //发送get请求,searchForm.offset ,searchForm.limit作为参数传入
                let get_url = 'http://localhost:8081/history';
                this.$http.get(get_url,{params : this.searchForm }).then(response => {
                    let pako_data = JSON.parse(pako.inflate(response.bodyText, { to: 'string' }));
                    // console.log('pako_data!!!!',pako_data);
                    // get body data
                    // let res = response.body[1];
                    let res = pako_data[1];

                    // let list = [];
                    if ( pako_data[0]) {
                        if (res.data.length == 0) {
                            alert('not data');
                        }
                        this.arbitrage = res.data;
                        this.total = res.count;
                        res.data.forEach(element => {
                                let date = new Date(element.timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                                let Y = date.getFullYear() + '-';
                                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                                let D = date.getDate() + ' ';
                                let h = date.getHours() + ':';
                                let m = date.getMinutes() + ':';
                                let s = date.getSeconds();
                                let timestamp = Y+M+D+h+m+s;
                                element.timestamp = timestamp;
                        });
                    }
                    console.log(res);
                });
        }
    },
    mounted: function () {
        this.init_data();
    }
}
</script>
