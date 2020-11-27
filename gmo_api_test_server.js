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
        this.last_va_issue_ra_id = '';
        this.vaList = {
            "vaTypeCode": "2",
            "vaTypeName": "継続型",
            "expireDateTime": "2099-09-25T12:29:59:59+09:00",
            "vaHolderNameKana": "コインベスト（カ　顧客預金用",
            "vaList":[]
        };
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

        this.account_balances = {accountId_1: 3200000, accountId_2: 3200000};

        this.transfer_status = {
            '1010112345671_2018072902345678': {
                "acceptanceKeyClass": "1",
                "baseDate": "2018-08-10",
                "baseTime": "10:00:00+09:00",
                "count": "500",
                "transferQueryBulkResponses": [
                    {
                        "dateFrom": "2018-07-30",
                        "dateTo": "2018-08-10",
                        "requestNextItemKey": "1234567890",
                        "requestTransferStatuses": [
                            {
                                "requestTransferStatus": "20"
                            }],
                        "requestTransferClass": "1",
                        "requestTransferTerm": "1",
                        "hasNext": true,
                        "nextItemKey": "1234567890"
                    }],
                "transferDetails": [{
                    "transferStatus": "20",
                    "transferStatusName": "手続済",
                    "transferTypeName": "振込振替",
                    "isFeeFreeUse": true,
                    "isFeePointUse": true,
                    "pointName": "GMOポイント",
                    "feeLaterPaymentFlg": true,
                    "transferDetailFee": "345",
                    "totalDebitAmount": "123456",
                    "transferApplies": [
                        {
                            "applyNo": "2018072902345678",
                            "transferApplyDetails": [{
                                "applyDatetime": "2018-07-29T10:00:00+09:00",
                                "applyStatus": "1",
                                "applyUser": "山田二郎",
                                "applyComment": "緊急でお願いします。",
                                "approvalUser": "田中太郎",
                                "approvalComment": "実施しました"
                            }]
                        }], "transferAccepts": [{
                        "acceptNo": "2018072901234567",
                        "acceptDatetime": "2018-07-29T10:00:00+09:00"
                    }
                    ], "transferResponses": [
                        {
                            "accountId": accountId_1,
                            "remitterName": "アオゾラシヨウジ(カ",
                            "transferDesignatedDate": "2018-07-30",
                            "transferInfos": [
                                {
                                    "transferAmount": "1000",
                                    "ediInfo": "セイキヨウシヨバンゴウ1234",
                                    "beneficiaryBankCode": "0398",
                                    "beneficiaryBankName": "アオゾラ",
                                    "beneficiaryBranchCode": "111",
                                    "beneficiaryBranchName": "ホンテン",
                                    "accountTypeCode": "1",
                                    "accountNumber": "1234567",
                                    "beneficiaryName": "カ)アオゾラサンギヨウ",
                                    "transferDetailResponses": [
                                        {
                                            "beneficiaryBankNameKanji": "あおぞら銀行",
                                            "beneficiaryBranchNameKanji": "本店",
                                            "usedPoint": "1000",
                                            "isFeeFreeUsed": false,
                                            "transferFee": "1000"
                                        }],
                                    "unableDetailInfos": [{
                                        "transferDetailStatus": "1"
                                    }
                                    ]
                                }
                            ]
                        }
                    ]
                }
                ]
            }
        };

        let default_key = accountId_1 + '_2018072902345678_1';

        this.bulktransfer_status ={};

        this.bulktransfer_status[default_key] = {
            "acceptanceKeyClass": "1",
            "detailInfoNecessity": true,
            "bulktransferItemKey": "1",
            "baseDate": "2018-08-10",
            "baseTime": "10:00:00+09:00",
            "count": "2",
            "detailInfoResult": true,
            "bulkTransferDetails": [{
                "transferStatus": "20",
                "transferStatusName": "手続済",
                "transferTypeName": "総合振込",
                "remitterCode": "1234567890",
                "isFeeFreeUse": false,
                "isFeePointUse": true,
                "pointName": "GMOポイント",
                "totalFee": "345",
                "totalDebitAmount": "123456",
                "transferApplies": [{
                    "applyNo": "2018072902345678",
                    "transferApplyDetails": [{
                        "applyDatetime": "2018-07-29T10:00:00+09:00",
                        "applyStatus": "4",
                        "applyUser": "山田二郎",
                        "applyComment": "緊急でお願いします。",
                        "approvalUser": "田中太郎",
                        "approvalComment": "実施しました"
                    }]
                }],
                "transferAccepts": [{
                    "acceptNo": "2018072901234567",
                    "acceptDatetime": "2018-07-29T10:00:00+09:00"
                }],
                "bulktransferResponses": [{
                    "accountId": accountId_1,
                    "remitterName": "アオゾラシヨウジ(カ",
                    "transferDesignatedDate": "2018-07-30",
                    "transferDataName": "6月分請求",
                    "totalCount": "2",
                    "totalAmount": "123456",
                    "bulkTransferInfos": [{
                        "itemId": "1",
                        "beneficiaryBankCode": "0398",
                        "beneficiaryBankName": "アオゾラ",
                        "beneficiaryBranchCode": "111",
                        "beneficiaryBranchName": "ホンテン",
                        "clearingHouseName": "0000",
                        "accountTypeCode": "1",
                        "accountNumber": "1234567",
                        "beneficiaryName": "カ)アオゾラサンギヨウ",
                        "transferAmount": "1000",
                        "newCode": "0",
                        "ediInfo": "セイキユウシヨバンゴウ1234",
                        "transferDesignatedType": "7",
                        "identification": "Y",
                        "transferDetailResponses": [{
                            "beneficiaryBankNameKanji": "あおぞら銀行",
                            "beneficiaryBranchNameKanji": "本店",
                            "usedPoint": "10",
                            "isFeeFreeUsed": false,
                            "transferFee": "163"
                        }],
                        "unableDetailInfos": [{
                            "transferDetailStatus": "1"
                        }]
                    },{
                        "itemId": "2",
                        "beneficiaryBankCode": "0398",
                        "beneficiaryBankName": "アオゾラ",
                        "beneficiaryBranchCode": "111",
                        "beneficiaryBranchName": "ホンテン",
                        "clearingHouseName": "0000",
                        "accountTypeCode": "1",
                        "accountNumber": "1234567",
                        "beneficiaryName": "カ)アオゾラサンギヨウ",
                        "transferAmount": "1000",
                        "newCode": "0",
                        "ediInfo": "セイキユウシヨバンゴウ1234",
                        "transferDesignatedType": "7",
                        "identification": "Y",
                        "transferDetailResponses": [],
                        "unableDetailInfos": [{
                            "transferDetailStatus": "2",
                            "refundStatus": "2",
                            "isRepayment": "true",
                            "repaymentDate": "2018-07-30"
                        }]
                    }
                    ]
                }]
            }]
        };


    }

    main_process(req, res, data, para) {
        let post = querystring.parse(data);
        console.log(req.url, para, post);
        let result = "";
        // curl -X POST -H "Content-Type: application/json" -d '{"issueRequestCount":"10","vaTypeCode":"2"}' localhost:3001/va/issue
        if (req.url.split('?')[0]== "/authorization") {

            console.log('認可　/authorization >>>>');
            console.log('post >>>>',para);
            // scope: 'corp:account corp:virtual-account corp:transfer corp:bulk-transfer',
            //     client_id: 'yOuRClineTId',
            //     state: '4a26226393ed20bb92ab7530d17610c7d5897a97bf3998cb885c91d9b378c504',
            //     redirect_uri: 'http://localhost:8012/gmo_token' } {}

            const redirect_uri = para.redirect_uri+'?code=XX0123&state='+para.state
            const request = http.request(redirect_uri, (response) => {
                response.on('data', (chunk) => {
                    console.log(`BODY: ${chunk}`);
                });
                response.on('end', () => {
                    console.log('No more data in response.');
                });
            })
            request.on('error', (e) => {
                console.error(`problem with request: ${e.message}`);
            });

            request.end();

            res.writeHead(302, {
                'Location': redirect_uri
            });
            res.end();
        }
        if (req.url== "/token") {

            console.log('getToken　/token >>>>');
            console.log('post >>>>');
            result = {
                "access_token": "sHRSU6prFacq9xoElWKcrSOtEu5wM9sB",
                "refresh_token": "SuPIua1851djm0a97NSGFzKS01GdwYIu",
                "scope": para.scope,
                "token_type": (para.scope!="")?"Bearer":"refresh_token",
                "expires_in": 2592000
            };
        }
        // curl -X POST -H "Content-Type: application/json" -d '{"issueRequestCount":"10","vaTypeCode":"2"}' localhost:3001/va/issue
        if (req.url == "/va/issue") {
            console.log('バーチャル口座発行　/va/issue >>>>');
            let post = JSON.parse(data);
            console.log('post >>>>',post);
            this.last_va_issue_ra_id = post.raId;
            let count = post.issueRequestCount;

            this.vaList.vaList = [];

            for (let i = 1; i <= count; i++) {
                this.vaList.vaList.push({
                    "vaId": "502" + String(Math.floor(Math.random(0.000001, 0.999999)*1000000)).padStart(7,'0'),
                    "vaBranchCode": "502",
                    "vaBranchNameKana": "アジサイ",
                    "vaAccountNumber": String(Math.floor(Math.random(0.0000001, 0.9999999)*10000000)).padStart(7,'0'),
                });

            }
            result =this.vaList;
            // console.log('result',result);
        }

        // curl -X POST -H "Content-Type: application/json" -d '' localhost:3001/va/list
        if (req.url == "/va/list") {
            let post = JSON.parse(data);
            console.log('/va/list post:',post);
            let now = new Date();
            let vaList = this.vaList.vaList.map(va=>{
                if (va.vaId){
                    va.vaBranchName="あじさい支店";
                    va.vaHolderNameKana="コインベスト (カ ニユウキングチ";
                    va.vaTypeCode="1";
                    va.vaTypeName="期限型";
                    va.vaStatusCode="1";
                    va.vaStatusName="利用可能";
                    va.vaStatusChangePossibleCode="1";
                    va.vaIssueDateTime=now.toLocaleDateString() +"T"+ now.toLocaleTimeString();
                    va.expireDateTime="2025-08-31T12:59:59+09:00";
                    va.latestDepositDate="2020-08-02";
                    va.latestDepositAmount="50000";
                    va.latestDepositCount="3";
                    va.raId=this.last_va_issue_ra_id;
                    va.raBranchCode="101";
                    va.raBranchName="法人営業部";
                    va.raAccountNumber="1234567";
                    va.raHolderName="ｺｲﾝﾍﾞｽﾄ (ｶ";
                    return va
                }else{
                    return false;
                }
                });

            result =  {
                "baseDate":now.toLocaleDateString(),
                "baseTime":now.toLocaleTimeString(),
                "hasNext":true,
                "nextItemKey":"ABC12345",
                "count":vaList.length,
                "vAccounts": vaList
            };
            console.log(result);
        }

        // curl -X POST -H "Content-Type: application/json" -d '' localhost:3001/transfer/request
        if (req.url == "/transfer/request") {
            // console.log("振込依頼（/transfer/request）")
            let post = JSON.parse(data);
            // console.log('/transfer/request:',post.accountId);
            let now = new Date();
            let date = now.getDate();
            if (date < 10) {
                date = '0'+now.getDate();
            }
            let applyNo = now.getFullYear() +''+Number(now.getMonth()+1)+ date +now.getHours()+now.getMinutes()+now.getSeconds()+now.getMilliseconds();
            result =   {
                "accountId":post.accountId,
                "resultCode":"1", "applyNo": applyNo, "applyEndDatetime":now.toLocaleDateString()
            };
            console.log(result);
        }


        // curl -X GET -H "Content-Type: application/json" 'http://localhost:3001/transfer/status?accountId=1010112345671&queryKeyClass=1&applyNo=2018072902345678'
        if (req.url.split('?')[0] =="/transfer/status") {
            let params = para['accountId'] ? para : JSON.parse(data);
            console.log("振込状況照会（/transfer/status）",params)

            let transfer_key = params.accountId + '_' + params.applyNo;
            result = this.transfer_status[transfer_key] || {};
            console.log(result);
        }

        // curl -X POST -H "Content-Type: application/json" -d 'transfer_key=1010112345671_2018072902345678&content={}' localhost:3001/set_transfer_status
        if (req.url.split('?')[0] =="/set_transfer_status") {
            console.log("テスト用＞＞＞＞振込状況照会内容設定（/set_transfer_status）")
            let post = JSON.parse(data);
            console.log('/transfer/request:',post);
            this.transfer_status[post.transfer_key] =post.content
            console.log(this.transfer_status[post.transfer_key] );
        }

        // curl -X GET -H "Content-Type: application/json" -d ' ' localhost:3001/accounts
        if (req.url.split('?')[0]== "/accounts") {
            console.log("GMO銀行口座情報照会 /accounts");
            let now = new Date();
            this.accounts.baseDate=now.toLocaleDateString();
            this.accounts.baseTime=now.toLocaleTimeString();
            console.log(this.accounts);
            result = this.accounts;
        }

        // curl -X GET -H "Content-Type: application/json" -d ' ' localhost:3001/accounts/balances?accountId=301011000192
        if (req.url.split('?')[0] == "/accounts/balances") {
            console.log("GMO銀行口座残高照会 /accounts/balances");
            let params = req.url.split('?')[1];
            let now = new Date();
            this.balances.balances=[];
            this.balances.balances.push(
                {
                    "accountId":accountId_1,
                    "accountTypeCode":"01",
                    "accountTypeName":"普通預金（有利息）",
                    "balance":this.account_balances[accountId_1],
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
                    "balance":this.account_balances[accountId_2],
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
            console.log(this.balances);
            result = this.balances;
        }

        // curl -X GET -H "Content-Type: application/json" -d ' ' localhost:3001/accounts/transactions?accountId=301011000192&nextItemKey=20181012090520112541
        if (req.url.split('?')[0] == "/accounts/transactions") {
            console.log("入出金履歴>>>>>>");
            // let params = req.url.split('?')[2];
            // let accountId = params.split('=')[1];
            let now = new Date();
            let hasNext = (Math.random(0,10)*10)>6?true:false;
            let count = (Math.random(0,10)*10)>6?1:10;
            let accountId = (Math.random(0,10)*10)>6?accountId_1:accountId_2;
            let transactionType = Math.floor(Math.random()*100)%2+1;
            this.account_transactions =
            {
                "accountId":accountId,
                "currencyCode":"JPY",
                "currencyName":"日本円",
                "dateFrom":now.toLocaleDateString(),
                "dateTo":now.toLocaleDateString(),
                "baseDate":now.toLocaleDateString(),
                "baseTime":now.toLocaleTimeString(),
                "hasNext":hasNext,
                "nextItemKey":String(Math.floor(Math.random(0.0000001, 0.9999999)*10000000)).padStart(7,'0'),
                "count":count,
                "transactions":[]
            };
            for (let i = 1; i <= count ; i++) {
                let amount = Math.floor(Math.random()*100)*1000
                this.account_balances[accountId]+=(transactionType==1)?amount:amount*(-1);
                this.account_transactions.transactions.push({
                    "transactionDate":now.toLocaleDateString(),
                    "valueDate":now.toLocaleDateString(),
                    "transactionType":transactionType,
                    "amount":amount,
                    "remarks":"振込 アオゾラ タロウ",
                    "balance":this.account_balances[accountId],
                    "itemKey":String(Math.floor(Math.random(0.0000001, 0.9999999)*10000000)).padStart(7,'0')
                });

            }
            result = this.account_transactions;
        }

        // curl -X GET -H "Content-Type: application/json" -d ' ' localhost:3001/accounts/deposit-transactions?accountId=101011234567&dateFrom=2018-07-30&dateTo=2018-08-01&nextItemKey=20181012090520123456
        if (req.url.split('?')[0] == "/accounts/deposit-transactions") {
            console.log("入金履歴>>>>>>");
            // let params = req.url.split('?')[2];
            // let accountId = params.split('=')[1];
            // console.log(params);
            let hasNext = (Math.random(0,10)*10)>6?true:false;
            let count = (Math.random(0,10)*10)>6?1:10;
            let now = new Date();
            this.account_deposit_transactions = {
                "accountId":accountId_1,
                "dateFrom":now.toLocaleDateString(),
                "dateTo":now.toLocaleDateString(),
                "baseDate":now.toLocaleDateString(),
                "baseTime":now.toLocaleTimeString(),
                "hasNext":hasNext,
                "nextItemKey":String(Math.floor(Math.random(0.0000001, 0.9999999)*10000000)).padStart(7,'0'),
                "count":count,
                "paymentArrivals":[]
            }
             for (let i = 1; i <= count ; i++) {
                 let amount = Math.floor(Math.random()*100)*1000
                 this.account_deposit_transactions.paymentArrivals.push({
                    "transactionDate":now.toLocaleDateString(),
                    "valueDate":now.toLocaleDateString(),
                    "transactionType":"1",
                    "remarks":"振込 ｾｲｷﾕｳｼﾖﾊﾞﾝｺﾞｳ123 アオゾラショウジ（カ",
                    "amount":amount,
                    "applicantName":"ｱｵｿﾞﾗｼﾖｳｼﾞ(ｶ",
                    "paymentBankName":"ｱｵｿﾞﾗｷﾞﾝｺｳ",
                    "paymentBranchName":"ﾎﾝﾃﾝ",
                    "ediInfo":"ｾｲｷﾕｳｼﾖﾊﾞﾝｺﾞｳ123",
                    "itemKey":String(Math.floor(Math.random(0.0000001, 0.9999999)*10000000)).padStart(7,'0')
                 });
                 this.account_balances[accountId_1]+=amount;
            }
            result = this.account_deposit_transactions;
        }

        //测试的时候必须跑2件才能使用这个接口
        // curl -X POST -H "Content-Type: application/json" -d ' ' localhost:3001/bulktransfer/request-result
        if (req.url.split('?')[0] == "/bulktransfer/request-result") {
            // let params = req.url.split('?')[2];
            // let accountId = params.split('=')[1];
            // console.log(params);

            let params = para['accountId'] ? para : JSON.parse(data);

            let transfer_key = params.accountId + '_' + params.applyNo + '_' + params.bulktransferItemKey;
            result = this.bulktransfer_status[transfer_key] || {};

        }

        // curl -X POST -H "Content-Type: application/json" -d 'transfer_key=1010112345671_2018072902345678_1&content={}' localhost:3001/set_bulktransfer_status?
        if (req.url.split('?')[0] == "/set_bulktransfer_status") {
            let params = para['transfer_key'] ? para : JSON.parse(data);
            console.log("テスト用＞＞＞＞振込状況照会内容設定（/set_bulktransfer_status）", params)

            //let post = JSON.parse(data);
            this.bulktransfer_status[params.transfer_key] = params.content
            console.log('set_bulktransfer_status', params.transfer_key, params.content);
        }

        // curl -X POST -H "Content-Type: application/json" -d ' ' localhost:3001/bulktransfer/request
        if (req.url.split('?')[0] == "/bulktransfer/request") {
            let now = new Date();

            result = {
                "accountId": accountId_1,
                "resultCode": "1",
                "applyNo": Date.now(),
                "applyEndDatetime": now.toLocaleDateString() + "T" + now.toLocaleTimeString() + "+09:00"
            };
        }

        // curl -X POST -H "Content-Type: application/json" -d ' ' localhost:3001/accounts/operation
        if (req.url.split('?')[0] == "/accounts/operation") {
            console.log("振込承認省略")
            let now = new Date();
            result =  {
                "accountId":accountId_1,
                "operationApplyDatetime":now.toLocaleDateString() +"T"+ now.toLocaleTimeString()
            };
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
            console.log(result);
        }


        res.end(JSON.stringify(result));

        // console.log(req.url);
        // console.log(JSON.stringify(result));
        return;
    }

}
new gmo_api_test_server(3001);

//node /data/m_admin/src/test/gmo_api_test_server.js