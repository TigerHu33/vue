<template>
<div class="first_page">

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

<!-- <el-container>
  <el-aside width="200px">
    <el-image :src="src" style="height:150px;display:flex"></el-image>
    <el-menu
      default-active="0"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose" style="height:700px">
      <el-menu-item index="1"  v-on:click="makeActive1('A')" >
          <i class="el-icon-location"></i>
          <span>本日出勤</span>
      </el-menu-item>
      <el-menu-item index="2" v-on:click="makeActive1('B')">
        <i class="el-icon-menu"></i>
        <span slot="title">在籍</span>
      </el-menu-item>
      <el-menu-item index="3" >
        <i class="el-icon-document"></i>
        <span slot="title">消费</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">联系</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
  <el-container>
    <el-image :src="src" style="height:150px"> </el-image>
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">处理中心</el-menu-item>
  <el-submenu index="2">
    <template slot="title">我的工作台</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="3" disabled>消息中心</el-menu-item>
  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
</el-menu>
    </el-header>
    <el-main>
 <div class="tab1" v-if="type === 'A'">
<el-row :gutter="20" >
  <el-col :span="6" ><div class="grid-content bg-purple">
    <el-image :src="src" style="height:150px"> </el-image>   
    </div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">
     <el-image :src="src" style="height:150px"> </el-image>   
    </div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">
     <el-image :src="src" style="height:150px"> </el-image>   
    </div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">
     <el-image :src="src" style="height:150px"> </el-image>   
    </div></el-col>
</el-row>
<el-row :gutter="20" >
  <el-col :span="6" ><div class="grid-content bg-purple">
    <el-image :src="src" style="height:150px"> </el-image>   
    </div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">
     <el-image :src="src" style="height:150px"> </el-image>   
    </div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">
     <el-image :src="src" style="height:150px"> </el-image>   
    </div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">
     <el-image :src="src" style="height:150px"> </el-image>   
    </div></el-col>
</el-row>
      </div>
 <div class="tab2" v-if="type === 'B'">
<el-row :gutter="20" >
  <el-col :span="6" ><div class="grid-content bg-purple">
    <el-image :src="src" style="height:100px"> </el-image>   
    </div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">
     <el-image :src="src" style="height:100px"> </el-image>   
    </div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">
     <el-image :src="src" style="height:100px"> </el-image>   
    </div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">
     <el-image :src="src" style="height:100px"> </el-image>   
    </div></el-col>
</el-row>
<el-row :gutter="20" >
  <el-col :span="6" ><div class="grid-content bg-purple">
    <el-image :src="src" style="height:100px"> </el-image>   
    </div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">
     <el-image :src="src" style="height:100px"> </el-image>   
    </div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">
     <el-image :src="src" style="height:100px"> </el-image>   
    </div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">
     <el-image :src="src" style="height:100px"> </el-image>   
    </div></el-col>
</el-row>
      </div>
    </el-main>
  </el-container>
</el-container> -->


</div>

</template>

<style>
  .el-header, .el-footer {
    background-color: #FFF;
    color: rgb(235, 27, 27);
    text-align: center;
    line-height: 150px;
  }
  
  .el-aside {
    background-color:#FFF;
    color: #333;
    text-align: center;
    line-height: 100px;
  }
  
  .el-main {
    background-color: #FFF;
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
</style>


<script>
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from 'vue-resource';

Vue.use(ElementUI);
Vue.use(http);
  export default {

    name:"my_first",  
    data() {
      return {
       src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
       type: '',
       activeIndex:"0",
       disabledFlg:'false'
      };
    },
    methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        makeActive1(items){
        // 模型改变，视图会自动更新
        this.type = items;
      },
      getRequest(){
        //发送get请求,searchForm.offset ,searchForm.limit作为参数传入
        let get_url = 'http://localhost:3001/accounts/balances';
        let params = {params:{"accountId":"1234567","balances":"20000"}};
        this.$http.get(get_url,params).then(response => {
          // console.log('response',response);
          let res = JSON.stringify(response.bodyText);
          console.log(res);
          
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
