<template>
<div class="nantong_page">

<el-form label-width="160px" :inline="true">
  <h1 align="center">维修单申报</h1>
  <el-row>
      <el-form-item label="保修产品" >
        <el-select v-model="add_form.porduct_type_id" clearable style="width:100px">
          <el-option 
                  v-for="item in transform_list.products"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
        <el-input  style="width:100px" v-if="add_form.porduct_type_id == 8"></el-input>
      </el-form-item>
  </el-row>
  <el-row>
      <el-form-item label="故障类型" >
        <el-select v-model="add_form.bad_type_category" clearable style="width:50px">
          <el-option 
                  v-for="item in transform_list.bad_type_category"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="add_form.bad_type_major_subject" clearable style="width:50px">
          <el-option 
                  v-for="item in transform_list.bad_type_major_subjects"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
  </el-row>
  <el-row>
      <el-form-item label="维修时间" >
        <el-date-picker
          v-model="add_form.serveice_time"
          type="date"
          style="width:100px"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
  </el-row>
  <el-row>
      <el-form-item label="产品型号" >
      </el-form-item>
  </el-row>
  <el-row>
      <el-form-item label="产品序列号" >
      </el-form-item>
  </el-row>
  <el-row>
      <el-form-item label="故障图片" >
        <!-- <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload> -->

      </el-form-item>
  </el-row>
  <el-row>
      <el-form-item label="故障描述" >
          <el-input  type="textarea" style="width:100px"></el-input>
      </el-form-item>
  </el-row>
  <el-row>
      <el-form-item label="维修类型" >
          
      </el-form-item>
  </el-row>
  <el-row>
      <el-form-item label="联系人" >
        <el-button type="primary" size="medium" @click="add_contact_person"> 添加 </el-button>
      </el-form-item>
  </el-row>
  <el-row>
      <el-form-item label="收费标准" >
        <el-button type="primary" size="medium"> 查看 </el-button>
      </el-form-item>
  </el-row>
  <div align="center">
    <el-button type="success" > 提交 </el-button>
  </div>
</el-form>

<el-dialog 
    :visible.sync="dialogFormVisible" 
    title="添加联系人"
    >
      <el-form ref="contact_person_form" :model="contact_person_form" label-width="160px"  >
        <el-row>
            <el-form-item label="姓名:" >
                <el-input  style="width:100px"></el-input>
            </el-form-item>
            <el-form-item label="住址:" >
                <el-input  style="width:100px"></el-input>
            </el-form-item>
            <el-form-item label="手机:" >
                <el-input  style="width:100px"></el-input>
            </el-form-item>
        </el-row>
      </el-form>

</el-dialog>


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
        dialogFormVisible : false,
        add_form: {
          porduct_type_id         :'',
          bad_type_category         :'',
          bad_type_major_subject          :'',
          serveice_time       :'',
        },
        contact_person_form:{
          
        },
        transform_list:{
          products: [
              {"value": '0', "label": 'AIS'},
              {"value": '1', "label": '鱼探测仪'},
              {"value": '2', "label": '测深仪'},
              {"value": '3', "label": '换能器'},
              {"value": '4', "label": '电子海图系列'},
              {"value": '5', "label": '导航仪'},
              {"value": '6', "label": '天线'},
              {"value": '7', "label": '板子'},
              {"value": '8', "label": '其他'},
          ],
          bad_type_category: [
              {"value": '0', "label": '开机问题'},
              {"value": '1', "label": '定位问题'},
              {"value": '2', "label": '屏幕问题'},
              {"value": '3', "label": '接受发射问题'},
              {"value": '4', "label": '其他'},
          ],
          bad_type_major_subjects: [
              {"value": '0-0', "label": '开不了机'},
              {"value": '0-1', "label": '开机自动关机'},
              {"value": '1-0', "label": '不定位'},
              {"value": '1-1', "label": 'GPS信号时有时无'},
              {"value": '2-0', "label": '黑屏'},
              {"value": '2-1', "label": '花屏'},
              {"value": '2-2', "label": '白屏'},
              {"value": '2-3', "label": '屏幕有一条条竖线'},
              {"value": '2-4', "label": '屏幕暗'},
              {"value": '3-0', "label": '不发射'},
              {"value": '3-1', "label": '不接受'},
              {"value": '3-2', "label": '发射弱'},
              {"value": '3-3', "label": '接受少'},
              {"value": '4-0', "label": '按键无反应'},
              {"value": '4-1', "label": '遥控不灵'},
              {"value": '4-2', "label": '测深数值不准'},
              {"value": '4-3', "label": '测不到水深'},
              {"value": '4-4', "label": '其他'},
          ],
        },

      };
    },
    methods: {
      add_contact_person(){
        this.dialogFormVisible  = true;
      }
      
    }
  }
</script>
