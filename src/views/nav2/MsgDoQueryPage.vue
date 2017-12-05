<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="msgDoQuery">
					<el-col class="toolbar" style="border-radius: 4px;">
						<el-row :gutter="50">
							<el-col :span="6" style="padding-bottom: 0px;">
								<el-input v-model="msgDoQuery.message_type_name" placeholder="接口名称"></el-input>
							</el-col>
							<el-col :span="6" style="padding-bottom: 0px;">   
								<el-select v-model="msgDoQuery.status" placeholder="消息状态" style="width: 100%;">
							            <el-option value="全部">全部</el-option>
									<el-option value="接收成功">接收成功</el-option>
									<el-option value="已发送">已发送</el-option>
									<el-option value="对方已接收">对方已接收</el-option>
									<el-option value="失败">失败</el-option>
								</el-select>
							</el-col>  
							<el-col :span="6" style="padding-bottom: 0px;">   
								<el-select v-model="msgDoQuery.from_to" placeholder="消息来源" style="width: 100%;">
									<el-option value="全部">全部</el-option>
									<el-option value="请求">请求</el-option>
									<el-option value="修改">修改</el-option>
									<el-option value="删除">删除</el-option>
								</el-select>
							</el-col>
							<el-col :span="6" style="padding-bottom: 0px;">
								<el-input v-model="msgDoQuery.request_system" placeholder="请求系统"></el-input>
							</el-col>
						</el-row>
						<el-row :gutter="50">
							<el-col :span="6" style="padding-bottom: 0px;">
								<el-input v-model="msgDoQuery.request_content" placeholder="请求内容"></el-input>
							</el-col>
							<el-col :span="6" style="padding-bottom: 0px;">   
								<el-input v-model="msgDoQuery.message" placeholder="消息结果"></el-input>
							</el-col>  
							<el-col :span="6" style="padding-bottom: 0px;">   
								<el-date-picker
									v-model="msgDoQuery.all_time"
									type="daterange"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
                                                      :picker-options="pickerOptions0"
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
			<el-table :data="system" highlight-current-row stripe v-loading="listLoading" style="width: 100%;">
				<el-table-column type="index" label="序号" align="center" width="70" style="padding:0 10px;">
				</el-table-column>
				<el-table-column prop="message_type_name" label="接口名称" min-width="80" align="center">
				</el-table-column>
				<el-table-column prop="from_to" label="消息来源" min-width="100" align="center">
				</el-table-column>
				<el-table-column prop="request_system" label="请求系统" min-width="80" align="center">
				</el-table-column>
				<el-table-column prop="status" label="消息状态" min-width="80" align="center">
				</el-table-column>
				<el-table-column prop="message" label="消息结果" min-width="100" align="center">
				</el-table-column>
				<el-table-column prop="create_time" label="创建时间" min-width="100" align="center">
				</el-table-column>
				<el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                    </template>
			    </el-table-column>
			</el-table>
			<el-col :span="24" class="toolbar">
				<el-pagination layout="prev, pager, next, jumper" 
                    @size-change="handleSizeChange"
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
import moment from "../../api/moment";
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
      system: [],
      totalCount: 0,
      pageSize: 20,
      currentPage: 1,
      msgDoQuery: {
        message_type_name: null,
        status: null,
        from_to: null,
        request_system: null,
        request_content: null,
        message: null,
        all_time: null,
        page_num: 1,
        page_size: 20
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  methods: {
    checkMessage() { //''处理
      if(this.msgDoQuery.message_type_name == '') {
          this.msgDoQuery.message_type_name = null;
      }
      if(this.msgDoQuery.status == '') {
          this.msgDoQuery.status = null;
      }
      if(this.msgDoQuery.from_to == '') {
          this.msgDoQuery.from_to = null;
      }
      if(this.msgDoQuery.request_system == '') {
          this.msgDoQuery.request_system = null;
      }
      if(this.msgDoQuery.request_content == '') {
          this.msgDoQuery.request_content = null;
      }
      if(this.msgDoQuery.message == '') {
          this.msgDoQuery.message = null;
      }
      if(this.msgDoQuery.all_time == '') {
          this.msgDoQuery.all_time = null;
      }
    },
    //加载分页数据
    loadData(pageNum, pageSize) {
      this.listLoading = true;
      this.checkMessage();
      this.msgDoQuery.page_num = pageNum;
      this.msgDoQuery.page_size = pageSize;
      this.$http({
        method: "post", //方法
        url: "monitor/interface/list", //地址
        data: this.msgDoQuery,
        headers: {
          sign: localStorage.getItem("sign")
        }
      }).then(response => {
        let msgData = response.data.data;  
        this.system = msgData.result;
        this.totalCount = msgData.total_count;
        this.listLoading = false;
      }).catch(function (error) {
        this.listLoading = false;
      });
    },  
    logTimeChange(val) {
      console.log(val);
    },
    onSearchData() {  //查询数据
       this.currentPage = 1;
       this.loadData(this.currentPage, this.pageSize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadData(this.currentPage, this.pageSize);
    },
    getUsers() {
      let para = {
        page: this.page,
        name: this.filters.name
      };
      this.listLoading = true;
      //NProgress.start();
      getUserListPage(para).then(res => {
        this.total = res.data.total;
        this.users = res.data.users;
        this.addFormVisible = false;
        this.listLoading = false;
        //NProgress.done();
      });
    },
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    }
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