<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="custChange">
                <el-col class="toolbar" style="border-radius: 4px;">
                    <el-row :gutter="50">
                        <el-col :span="6" style="padding-bottom: 0px;">
                            <el-input v-model="custChange.cust_name" placeholder="客户名称"></el-input>
                        </el-col>
                        <el-col :span="6" style="padding-bottom: 0px;">   
                            <el-input v-model="custChange.mobile" placeholder="手机号"></el-input>
                        </el-col>  
                        <el-col :span="6" style="padding-bottom: 0px;">   
                            <el-select v-model="custChange.change_type" placeholder="操作类型" style="width: 100%;">
                                <el-option value="">全部</el-option>
                                <el-option value="新增">新增</el-option>
                                <el-option value="修改">修改</el-option>
                                <el-option value="删除">删除</el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="6" style="padding-bottom: 0px;">
                            <el-input v-model="custChange.change_user" placeholder="操作人"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="50">
                        <el-col :span="6" style="padding-bottom: 0px;">   
                            <el-date-picker
                                v-model="custChange.begin_time"
                                type="date"
                                :editable=false
                                placeholder="开始日期"
                                :picker-options="pickerBeginDateBefore">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="6" style="padding-bottom: 0px;">
                            <el-date-picker
                                v-model="custChange.end_time"
                                type="date"
                                :editable=false
                                placeholder="结束日期"
                                :picker-options="pickerBeginDateAfter"
                                @change="logTimeChange">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="6" style="padding-bottom: 0px;">
                            <el-button type="primary" @click="onSearchData">查询</el-button>
                        </el-col>                          
                    </el-row>
                </el-col>
            </el-form>
		</el-col>
        <!--列表-->
        <el-table :data="custLog" highlight-current-row stripe v-loading="listLoading" style="width: 100%;">
			<!-- <el-table-column type="selection" width="0">
			</el-table-column> -->
            <el-table-column type="index" label="序号" align="center" width="70" style="padding:0 10px;">
			</el-table-column>
			<el-table-column prop="cust_name" label="客户姓名" min-width="80" align="center">
			</el-table-column>
			<el-table-column prop="mobile" label="手机号" min-width="100" align="center">
			</el-table-column>
			<el-table-column prop="change_type" label="操作类型" min-width="80" align="center">
			</el-table-column>
			<el-table-column prop="change_column" label="操作内容" min-width="80" align="center">
			</el-table-column>
            <el-table-column prop="before_value" label="操作前内容" min-width="100" align="center">
			</el-table-column>
			<el-table-column prop="after_value" label="操作后内容" min-width="100" align="center">
			</el-table-column>
			<el-table-column prop="change_user" label="操作人" min-width="80" align="center">
			</el-table-column>
            <el-table-column prop="changetime" label="操作时间" :formatter="hangleDateFormat" min-width="100" align="center">
			</el-table-column>
			<el-table-column prop="from_sys" label="操作系统" min-width="90" align="center">
			</el-table-column>
		</el-table>
        <!--工具条, 分页-->
        <el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next, jumper" 
            @current-change="handleCurrentChange" 
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :total="totalCount"
            style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
import util from "../../common/js/util";
//import moment from '../../api/moment'
import {dateFormat1, formatDate} from "../../api/dateutil";

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
      custLog: [],
      totalCount: 0,
      pageSize: 20,
      currentPage: 1,
      activeNames: ['1'],
      listLoading: false,
      custChange: {
        cust_name:null,
        mobile: null,
        change_type: null,
        change_user: null,
        begin_time: null,
        end_time: null,
        page_num: 1,
        page_size: 20
      },
      pickerBeginDateBefore: {
          disabledDate(time) {
              return time.getTime() > Date.now();
          }
      },
      pickerBeginDateAfter: {
          disabledDate: (time) => {
            let beginDateVal = this.custChange.begin_time;
            if (beginDateVal) {
                return time.getTime() < beginDateVal || time.getTime() > Date.now();
            }else{
                return time.getTime() > Date.now();
            }  
         }
      }
    };
  },
  methods: {
     //时间格式化
    hangleDateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return dateFormat1(row, column);
    },
    checkCustChange() { //''处理
      if(this.custChange.cust_name == '') {
          this.custChange.cust_name = null;
      }
      if(this.custChange.mobile == '') {
          this.custChange.mobile = null;
      }
      if(this.custChange.change_type == '') {
          this.custChange.change_type = null;
      }
      if(this.custChange.change_user == '') {
          this.custChange.change_user = null;
      }
      if(this.custChange.begin_time) {
          this.custChange.begin_time = formatDate(this.custChange.begin_time, 'YYYY/MM/DD');
      }
      if(this.custChange.end_time) {
          this.custChange.end_time = formatDate(this.custChange.end_time, 'YYYY/MM/DD');
      }
    },
    //加载分页数据
    loadData(pageNum, pageSize) {
      this.custLog = null;
      this.listLoading = true;
      this.checkCustChange();
      this.custChange.page_num = pageNum;
      this.custChange.page_size = pageSize;
      this.$http({
        method: "post",           //方法
        url: "monitor/cust/list", //URL地址
        data: this.custChange,
        headers: {
          sign: localStorage.getItem("sign")
        }
      }).then(response => {
        let custLogData = response.data.data;  
        this.custLog = custLogData.result;
        this.totalCount = custLogData.total_count;
        this.listLoading = false;
      }).catch(error => {  //function (error) {
        //console.log(error);
        this.listLoading = false;
      });
    },
    onSearchData() {  //查询数据
       this.currentPage = 1;
       this.loadData(this.currentPage, this.pageSize);
    },
    logTimeChange(val) {
      if(!this.custChange.begin_time){
        this.$message({message: "请先选择开始时间",type: "warning"});
        this.custChange.end_time = null;
        return;
      }
    },
    handleSizeChange: function(val) {
      //console.log(`每页 ${val} 条`);
      handleCurrentChange(val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadData(this.currentPage, this.pageSize);
    },
  },
  mounted() {
    //首次加载页面
    this.loadData(this.currentPage, this.pageSize);
  }
};
</script>

<style scoped>
.title {
  display: block;
  margin-bottom: 10px;
  border-left: 4px solid #0a8ddf;
  padding-left: 5px;
}
.toolbar {
  background: #f2f2f2;
  padding: 10px 30px 10px 30px;
  margin: 10px 0px;
}
.el-row {
  margin-bottom: 15px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-date-editor.el-input {
  width: 100%;
}
.el-table .cell,
.el-table th > div {
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  text-overflow: ellipsis;
}
</style>