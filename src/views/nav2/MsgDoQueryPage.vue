<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="MsgDoQuery">
					<el-col class="toolbar" style="border-radius: 4px;">
						<el-row :gutter="50">
							<el-col :span="6" style="padding-bottom: 0px;">
								<el-input v-model="MsgDoQuery.message_type_name" placeholder="接口名称"></el-input>
							</el-col>
							<el-col :span="6" style="padding-bottom: 0px;">   
								<el-select v-model="MsgDoQuery.status" placeholder="消息状态" style="width: 100%;">
							            <el-option value="全部">全部</el-option>
									<el-option value="接收成功">接收成功</el-option>
									<el-option value="已发送">已发送</el-option>
									<el-option value="对方已接收">对方已接收</el-option>
									<el-option value="失败">失败</el-option>
								</el-select>
							</el-col>  
							<el-col :span="6" style="padding-bottom: 0px;">   
								<el-select v-model="MsgDoQuery.from_to" placeholder="消息来源" style="width: 100%;">
									<el-option value="全部">全部</el-option>
									<el-option value="请求">请求</el-option>
									<el-option value="修改">修改</el-option>
									<el-option value="删除">删除</el-option>
								</el-select>
							</el-col>
							<el-col :span="6" style="padding-bottom: 0px;">
								<el-input v-model="MsgDoQuery.request_system" placeholder="请求系统"></el-input>
							</el-col>
						</el-row>
						<el-row :gutter="50">
							<el-col :span="6" style="padding-bottom: 0px;">
								<el-input v-model="MsgDoQuery.request_content" placeholder="请求内容"></el-input>
							</el-col>
							<el-col :span="6" style="padding-bottom: 0px;">   
								<el-input v-model="MsgDoQuery.message" placeholder="消息结果"></el-input>
							</el-col>  
							<el-col :span="6" style="padding-bottom: 0px;">   
								<el-date-picker
									v-model="MsgDoQuery.all_time"
									type="daterange"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
                                                      :picker-options="pickerOptions0"
                                                      @change="logTimeChange">
								</el-date-picker>
							</el-col>
							<el-col :span="6" style="padding-bottom: 0px;">
								<el-button type="primary" @click="">查询</el-button>
							</el-col>  
						</el-row>
					</el-col>
				</el-form>
			</el-col>
			<!--列表-->
			<el-table :data="system" highlight-current-row stripe style="width: 100%;">
				<!-- <el-table-column type="selection" width="0">
				</el-table-column> -->
				<el-table-column type="id" label="序号" align="center" width="70" style="padding:0 10px;">
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
				<!-- <el-table-column prop="cer_id" label="证件号码" min-width="100" align="center">
				</el-table-column>
				<el-table-column label="操作" width="200" align="center">
					<template slot-scope="scope">
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>                    
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column> -->
			</el-table>
			<el-col :span="24" class="toolbar">
				<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
				<el-pagination layout="prev, pager, next, jumper" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
				</el-pagination>
			</el-col>
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
      system: [],
      total: 0,
      page: 1,
      MsgDoQuery: {
        message_type_name: "",
        status: "",
        from_to: "",
        request_system: "",
        request_content: "",
        message: "",
        all_time: ""
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  methods: {
    logTimeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
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
    // this.getUsers();
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