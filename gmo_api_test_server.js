var http = require('http');
var url = require('url');
var querystring = require("querystring");
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
const accountId_1 = "101011002970";
const accountId_2 = "101011002992";

class gmo_api_test_server {
    constructor(port) {
        this.server = http.createServer((req, res) => {
            res.setHeader("Access-Control-Allow-Origin","*");
            res.setHeader('Content-Type', 'application/json');
            let data = '';
            let para = url.parse(decodeURI(req.url), true).query;
            if (req.method === 'POST') {
                req.on('data', (chunk) => {
                    data += chunk;
                });
                req.on('end', () => {
                    try {
                        data = data;
                        // data = JSON.parse(data);
                    } catch (e) {
                        data = '';
                        // res.end(JSON.stringify({code:-1}));
                        // return;
                    }
                    this.main_process(req, res, data, para);
                });
            }
            else {
                this.main_process(req, res, data, para);
            }
        }).listen(port);
        this.accounts = {
            "baseDate" : new Date().toLocaleDateString(),
            "baseTime" : new Date().toLocaleTimeString(),
            "accounts" : [
                {
                    "accountId" : accountId_1,
                    "branchCode" : "101",
                    "branchName" : "法人営業部",
                    "accountTypeCode" : "01",
                    "accountTypeName" : "普通預金(有利息)",
                    "accountNumber" : "2023913",
                    "primaryAccountCode" : "1",
                    "primaryAccountCodeName" : "代表口座",
                    "accountName" : "コインベスト株式会社",
                    "accountNameKana" : "ｺｲﾝﾍﾞｽﾄ (ｶ ｼﾞｺ",
                    "currencyCode" : "JPY",
                    "currencyName" : "日本円",
                    "transferLimitAmount" : "5000000"
                },
                {
                    "accountId" : accountId_2,
                    "branchCode" : "101",
                    "branchName" : "法人営業部",
                    "accountTypeCode" : "01",
                    "accountTypeName" : "普通預金(有利息)",
                    "accountNumber" : "2023677",
                    "primaryAccountCode" : "1",
                    "primaryAccountCodeName" : "代表口座",
                    "accountName" : "コインベスト株式会社顧客預り金",
                    "accountNameKana" : "ｺｲﾝﾍﾞｽﾄ (ｶ ｺｷｬｸｱｽﾞｶﾘｷﾝ",
                    "currencyCode" : "JPY",
                    "currencyName" : "日本円",
                    "transferLimitAmount" : "5000000"
                }
            ]
        };
        this.balances = {"balances": []};
    }
    main_process(req, res, data, para) {
        let post = querystring.parse(data);
        // console.log(req.url, para, post);
        let result = "";

        // curl -X GET -H "Content-Type: application/json" -d ' ' localhost:3001/accounts
        if (req.url.split('?')[0]== "/accounts") {
            // console.log("GMO銀行口座情報照会 /accounts");
            let now = new Date();
            this.accounts.baseDate=now.toLocaleDateString();
            this.accounts.baseTime=now.toLocaleTimeString();
            // console.log(this.accounts);
            result = this.accounts;
        }

        // curl -X GET -H "Content-Type: application/json" -d ' ' localhost:3001/accounts/balances?accountId=301011000192
        if (req.url.split('?')[0] == "/accounts/balances") {
            // console.log("GMO銀行口座残高照会 /accounts/balances");
            let params = req.url.split('?')[1];
            console.log('url',req.url);
            console.log('params',params);
            let now = new Date();
            this.balances.balances=[];
            this.balances.balances.push(
                {
                    "accountId":accountId_1,
                    "accountTypeCode":"01",
                    "accountTypeName":"普通預金（有利息）",
                    "balance":200,
                    "baseDate":now.toLocaleDateString(),
                    "baseTime":now.toLocaleTimeString(),
                    "withdrawableAmount":"50000000",
                    "previousDayBalance":Math.floor(Math.random(0,1000)*1000000),
                    "previousMonthBalance":65000000,
                    "currencyCode":"JPY",
                    "currencyName":"日本円",
                    "fcyTotalBalance":"350.48",
                    "ttb":"110.5",
                    "baseRateDate":now.toLocaleDateString(),
                    "baseRateTime":now.toLocaleTimeString(),
                    "yenEquivalent":"38728"
                }
            );
            this.balances.balances.push(
                {
                    "accountId":accountId_2,
                    "accountTypeCode":"01",
                    "accountTypeName":"普通預金（有利息）",
                    "balance":300,
                    "baseDate":now.toLocaleDateString(),
                    "baseTime":now.toLocaleTimeString(),
                    "withdrawableAmount":"50000000",
                    "previousDayBalance":Math.floor(Math.random(0,1000)*1000000),
                    "previousMonthBalance":35000000,
                    "currencyCode":"JPY",
                    "currencyName":"日本円",
                    "fcyTotalBalance":"0",
                    "ttb":"0",
                    "baseRateDate":now.toLocaleDateString(),
                    "baseRateTime":now.toLocaleTimeString(),
                    "yenEquivalent":"0"
                }
            )
            // console.log(this.balances);
            result = this.balances;
        }

        // curl -X POST -H "Content-Type: application/json" -d '' localhost:3001/transfer/transferfee
        if (req.url == "/transfer/transferfee") {
            // let post = JSON.parse(data);
            // console.log('/va/list post:',post);
            result =
            {
                "accountId":post.accountId, 
                "baseDate":"2018-07-10", 
                "baseTime":"10:00:00+09:00", 
                "totalFee":"200", 
                "transferFeeDetails": 
                [ 
                    {
                        "itemId":"1", "transferFee":"150" 
                    }, 
                    { 
                        "itemId":"2", "transferFee":"0" 
                    }, 
                    {
                        "itemId":"3", "transferFee":"50" 
                    } 
                ] 
            };
            // console.log(result);
        }


        res.end(JSON.stringify(result));

        // console.log(req.url);
        // console.log(JSON.stringify(result));
        return;
    }

}
new gmo_api_test_server(3001);

//node /data/m_admin/src/test/gmo_api_test_server.js