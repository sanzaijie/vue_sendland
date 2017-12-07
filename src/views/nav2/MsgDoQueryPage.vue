<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <!-- 
                :model="msgDoQuery"
             -->
			<el-form :inline="true" >
					<el-col class="toolbar" style="border-radius: 4px;">
						<el-row :gutter="50">
							<el-col :span="6" style="padding-bottom: 0px;">
								<el-input v-model="msgDoQuery.message_type_name" placeholder="接口名称"></el-input>
							</el-col>
							<el-col :span="6" style="padding-bottom: 0px;">   
								<el-select v-model="requestStatus" placeholder="消息状态" style="width: 100%;">
							        <el-option value="">全部</el-option>
									<el-option value="接收成功">接收成功</el-option>
									<el-option value="已发送">已发送</el-option>
									<el-option value="对方已接收">对方已接收</el-option>
									<el-option value="失败">失败</el-option>
								</el-select>
							</el-col>  
							<el-col :span="6" style="padding-bottom: 0px;">   
								<el-select v-model="requestFromTo" placeholder="消息来源" style="width: 100%;">
									<el-option value="">全部</el-option>
									<el-option value="请求">请求</el-option>
									<el-option value="应答">应答</el-option>
									<el-option value="反向同步">反向同步</el-option>
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
                                    v-model="msgDoQuery.begin_time"
                                    type="date"
                                    placeholder="开始日期"
                                    :picker-options="pickerBeginDateBefore">
                                </el-date-picker>
                            </el-col>
                            <el-col :span="6" style="padding-bottom: 0px;">
                                <el-date-picker
                                    v-model="msgDoQuery.end_time"
                                    type="date"
                                    placeholder="结束日期"
                                    :picker-options="pickerBeginDateAfter"
                                    @change="logTimeChange">
                                </el-date-picker>
                            </el-col>
						</el-row>
                        <el-row :gutter="50" class="align-r">
                            <el-col :span="24" style="padding-bottom: 0px;">
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
				<el-table-column prop="create_time" label="创建时间" :formatter="hangleDateFormat" min-width="100" align="center">
				</el-table-column>
				<el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row, system.message_body)">详情</el-button>
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
            <!--详细-->
            <el-dialog title="消息内容" v-model="detailFormVisible" :close-on-click-modal="false">
                <!-- message_body -->
                <el-row>
                    <el-col :span="24" >
                        <!-- {{editForm|jsonData}} -->
                        {{editForm|formateJson}}
                    </el-col>
                </el-row>
                    
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click.native="detailFormVisible = false">关闭</el-button>
                </div>
            </el-dialog>
	</section>
</template>

<script>
import util from "../../common/js/util";
import {dateFormat1, formatDate} from "../../api/dateutil";
//import {_fromTo, _PubMsgLogStatus} from "../../api/change";
import * as change from "../../api/change.js";

export default {
  data() {
    return {
      system: [],
      totalCount: 0,
      pageSize: 20,
      currentPage: 1,
      listLoading: false,
      requestStatus: null,
      requestFromTo: null,
      detailFormVisible: false,
      editForm: {},
      msgDoQuery: {
        message_type_name: null,
        status: null,
        from_to: null,
        request_system: null,
        request_content: null,
        message: null,
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
            let beginDateVal = this.msgDoQuery.begin_time;
            if (beginDateVal) {
                return time.getTime() < beginDateVal || time.getTime() > Date.now();
            }else{
                return time.getTime() > Date.now();
            }  
         }
      }
    };
  },
  filters: {
  formateJson: function (value) {
      //JSON.stringify(value[, replacer[, space]])
    let jsonData = JSON.stringify(value, ',', 4)
    return jsonData;
  }
  },
  methods: {
    //时间格式化
    hangleDateFormat: function(row, column) {
      return dateFormat1(row, column);
    },
    checkMessage() { //''处理
      if(this.msgDoQuery.message_type_name == '') {
          this.msgDoQuery.message_type_name = null;
      }
      if(this.requestStatus == '') {
          this.msgDoQuery.status = null;
      }else{
          this.msgDoQuery.status = change._PubMsgLogStatus(this.requestStatus);
      }
      if(this.requestFromTo == '') {
          this.msgDoQuery.from_to = null;
      }else{
          this.msgDoQuery.from_to = change._fromTo(this.requestFromTo);
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
      if(this.msgDoQuery.begin_time) {
          this.msgDoQuery.begin_time = formatDate(this.msgDoQuery.begin_time, 'YYYY/MM/DD');
      }
      if(this.msgDoQuery.end_time) {
          this.msgDoQuery.end_time = formatDate(this.msgDoQuery.end_time, 'YYYY/MM/DD');
      }
    },
    //加载分页数据
    loadData(pageNum, pageSize) {
      this.system = null;
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
        let sysData = msgData.result;
        for (let temp of sysData){
            temp.from_to = change.fromTo(temp.from_to);
            temp.status  = change.PubMsgLogStatus(temp.status);
        }
        this.system = sysData;
        this.totalCount = msgData.total_count;
        this.listLoading = false;
      }).catch(function (error) {
        this.listLoading = false;
      });
    },  
    logTimeChange(val) {
      if(!this.msgDoQuery.begin_time){
        this.$message({message: "请先选择开始时间",type: "warning"});
        this.msgDoQuery.end_time = null;
        return;
      }
    },
    onSearchData() {  //查询数据
       this.currentPage = 1;
       this.loadData(this.currentPage, this.pageSize);
    },
    handleSizeChange: function(val) {
      handleCurrentChange(val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadData(this.currentPage, this.pageSize);
    },
    handleEdit: function(index, row, messageBody) {
      this.detailFormVisible = true;
      //let jsonData = JSON.stringify(messageBody);
      let jsonData = JSON.stringify(messageBody, null, 4)
      this.editForm = Object.assign({}, row, jsonData);
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
.align-r{
    text-align: right;
}
</style>