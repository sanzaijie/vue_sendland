<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="dateForm">
                <el-form-item>
                    <el-date-picker v-model="dateForm.begin_date" type="date" placeholder="开始日期" @change="logTimeChange">
                    </el-date-picker>    
                    <el-date-picker v-model="dateForm.end_date" type="date" placeholder="结束日期" @change="logTimeChange">
                    </el-date-picker>
                </el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSearchData">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
        <!--列表-->
        <el-table :data="listData" highlight-current-row stripe style="width: 100%;">
            <el-table-column type="index" label="序号" align="center" width="70">
			</el-table-column>
			<el-table-column prop="name" label="接口名称" min-width="100" align="center">
			</el-table-column>
			<el-table-column prop="status_count" label="消息数量" width="100" align="center">
			</el-table-column>
			<el-table-column prop="request_system" label="调用系统" width="100" align="center">
			</el-table-column>
			<el-table-column prop="status" label="消息结果" min-width="100" align="center">
			</el-table-column>
		</el-table>
	</section>
</template>

<script>
import util from "../../common/js/util";
//import NProgress from 'nprogress'
import {
  getUserListPage,
  removeUser,
  batchRemoveUser,
  editUser,
  addUser
} from "../../api/api";

export default {
  data() {
    return {
      dateForm: {
        begin_date: "",
        end_date: ""
      },
      listData: []
    };
  },
  methods: {
   checkDateForm() { //''处理
      if(this.dateForm.begin_date == '') {
          this.dateForm.begin_date = null;
      }
      if(this.dateForm.end_date == '') {
          this.dateForm.end_date = null;
      }
    },
    //加载分页数据
    loadData(pageNum, pageSize) {
      this.listLoading = true;
      this.checkDateForm();
      this.$http({
        method: "post",           //方法
        url: "monitor/sys/list", //URL地址
        data: this.dateForm,
        headers: {
          sign: localStorage.getItem("sign")
        }
      }).then(response => {
        let data = response.data.data;  
        this.listData = data.bottom_body;
        this.listLoading = false;
      }).catch(error => {  //function (error) {
        //console.log(error);
        this.listLoading = false;
      });
    },
    onSearchData() {  //查询数据
       this.loadData();
    },
    logTimeChange(val) {
      console.log(val);
    }
  },
  mounted() {
    //首次加载页面
    this.loadData();
  }
};
</script>

<style scoped>
.checkBoxs_name {
  width: 12%;
  display: inline-block;
  text-align: right;
}
.checkWidth {
  margin-right: 5px;
}
</style>