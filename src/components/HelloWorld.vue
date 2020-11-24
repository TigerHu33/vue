<template>
<div class="hello">
    <div align="left">
        <h1>❏ マーケット情報</h1>
    </div>
    <el-table :data="quoteList" style="width: 100%">
        <el-table-column prop="ex" label="取引所名" width="100" align="center">
        </el-table-column>
        <el-table-column prop="ask_price" label="売値" width="100" align="center">
            <template slot-scope="scope">
                <el-tag type="danger" v-if='scope.row.ex == scope.row.min_ask_ex'>{{scope.row.ask_price}}</el-tag>
                <el-tag type="success" v-else>{{scope.row.ask_price}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="ask_vol" label="数量(売)" width="120" header-align="center" align="right">
        </el-table-column>
        <el-table-column prop="bid_price" label="買値" width="100" align="center">
            <template slot-scope="scope">
                <el-tag type="danger" v-if='scope.row.ex == scope.row.max_bid_ex'>{{scope.row.bid_price}}</el-tag>
                <el-tag type="success" v-else>{{scope.row.bid_price}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="bid_vol" label="数量(買)" width="120" header-align="center" align="right">
        </el-table-column>
        <el-table-column prop="spread" label="スプレッド" width="100" header-align="center" align="right">
        </el-table-column>
        <el-table-column prop="ping" label="ping(ms)" width="80" header-align="center" align="right">
        </el-table-column>
    </el-table>
    <div align="left">【Ask最小】{{ min_ask_ex }} 【Bid最大】{{ max_bid_ex }} 【価格差】 {{ ask_bid_diff }}</div>
    <div align="left">
        <h1></h1>
    </div>
    <div align="left">
        <h1>❏ 裁定チャンス（直近50件）</h1>
        <el-button @click="to_history()">チャンス履歴一覧</el-button>
    </div>
    <el-table :data="arbitrage" style="width: 100%" :default-expand-all="true">
        <!--     
        <el-table-column type="expand">
            <template slot-scope="scope">
                <el-table ref="multipleTable" :data="scope.row.match_details" border stripe tooltip-effect="dark" style="width: 100%">
                    <el-table-column prop="buy_ex" align="center" header-align="center" min-width="100" label="買"></el-table-column>
                    <el-table-column prop="buy_price" align="center" header-align="center" min-width="120" label="買価格"></el-table-column>
                    <el-table-column prop="sell_ex" align="center" header-align="center" min-width="100" label="卖"></el-table-column>
                    <el-table-column prop="sell_price" align="center" header-align="center" min-width="120" label="売価格"></el-table-column>
                    <el-table-column prop="amount" align="center" header-align="center" min-width="100" label="数量"></el-table-column>
                    <el-table-column prop="fee" align="center" header-align="center" min-width="100" label="手数料（見込み）"></el-table-column>
                    <el-table-column prop="profit" align="center" header-align="center" min-width="100" label="利益（見込み）"></el-table-column>
                </el-table>
            </template>
        </el-table-column>
-->
        <el-table-column prop="timestamp" align="center" header-align="center" min-width="100" label="日時"></el-table-column>
        <el-table-column prop="amount_total" align="center" header-align="center" min-width="160" label="取引量（見込み）"></el-table-column>
        <el-table-column prop="profit_total" align="center" header-align="center" min-width="160" label="利益（見込み）"></el-table-column>
        <el-table-column prop="profit_rate" align="center" header-align="center" min-width="160" label="利益率（見込み）"></el-table-column>
    </el-table>
</div>
</template>

<script>
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import io from 'socket.io-client';

Vue.use(ElementUI);

export default {
    name: 'HelloWorld',
    data() {
        return {
            max_bid_ex: '',
            max_bid_price: 0,
            min_ask_ex: '',
            max_ask_price: 0,
            ask_bid_diff: 0,
            quoteList: [],
            arbitrage: [],
        }
    },
    methods: {
        to_history: function () {
            this.$router.push({
                path: 'chance_history',
                replace: true
            });
        },
        init_data: function () {
            const socket = io('http://localhost:8081/');

            socket.on('quote', (quote) => {
                // 处理quote数据
                // console.log(quote);
                this.max_bid_ex = quote.max_bid_ex;
                this.max_bid_price = quote.max_bid_price;
                this.min_ask_ex = quote.min_ask_ex;
                this.min_ask_price = quote.min_ask_price;
                this.ask_bid_diff = quote.diff;

                this.quoteList = [];
                for (let key in quote.ex_data) {
                    quote.ex_data[key]['ask_price'] = Intl.NumberFormat().format(quote.ex_data[key]['ask_price']);
                    quote.ex_data[key]['bid_price'] = Intl.NumberFormat().format(quote.ex_data[key]['bid_price']);
                    quote.ex_data[key]['ask_vol'] = quote.ex_data[key]['ask_vol'] ? quote.ex_data[key]['ask_vol'].toFixed(8) : '-';
                    quote.ex_data[key]['bid_vol'] = quote.ex_data[key]['bid_vol'] ? quote.ex_data[key]['bid_vol'].toFixed(8) : '-';
                    quote.ex_data[key]['max_bid_ex'] = quote.max_bid_ex;
                    quote.ex_data[key]['min_ask_ex'] = quote.min_ask_ex;
                    quote.ex_data[key]['ping'] = new Date().getTime() - quote.ex_data[key]['timestamp'];
                    this.quoteList.push(quote.ex_data[key]);
                }
            });

            socket.on('arbitrage', (arbitrage_data) => {
                //
                // 处理套利交易机会数据
                //
                if (arbitrage_data.profit_total > 0) {
                    arbitrage_data.timestamp = new Date(arbitrage_data.timestamp).toLocaleString('jp-ja', {
                        timeZone: 'asia/tokyo'
                    });
                    arbitrage_data.amount_total = arbitrage_data.amount_total.toFixed(8);
                    this.arbitrage.unshift(arbitrage_data);
                    // console.log('>>>>>>>>>>>>>>>>', arbitrage);

                    if (this.arbitrage.length > 100) {
                        this.arbitrage.pop();
                    }
                }
            });
        }
    },
    mounted: function () {
        this.init_data();
    }
}
</script>
