<template>
<div class="second_page">

<el-form label-width="160px" :inline="true">
    <el-row>
        <el-col :span="24" align="left">
            <el-form-item label=" ">
                <el-button plain type="primary" @click="getRequest" round >GET検索</el-button>
                <el-button plain type="primary" @click="postRequest" round>POST検索</el-button>
            </el-form-item>
        </el-col>
    </el-row>
</el-form>



</div>

</template>

<script>
import Vue from 'vue';
import ElementUI from 'element-ui';
import http from 'vue-resource';

Vue.use(ElementUI);
Vue.use(http);
  export default {

    name:"my_first",  
    data() {
      return {
      };
    },
    methods: {
      getRequest(){
        let get_url = 'http://localhost:3001/accounts/balances';
        let params = {params:{"accountId":"1234567","balances":"20000"}};
        this.$http.get(get_url,params).then(response => {
          // console.log('response',response);
          let res = JSON.stringify(response.bodyText);
          console.log('res>>>>>>>>>>>>>>>>>>>>',res);
          
        });
      },
      postRequest(){
        let post_url = 'http://localhost:3001/transfer/transferfee';
        let params = {params:{"accountId":"1234567"}};
        this.$http.post(post_url,params,{emulateJSON:true}).then(response => { 
          // console.log('response',response);
          let res = JSON.stringify(response.bodyText);
          console.log(res);
        });
      }
    }
  }
</script>
