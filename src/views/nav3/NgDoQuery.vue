<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="NgDoQuery">
                <el-form-item>
					<el-select v-model="searchType" placeholder="字典类型">
                        <el-option value="全部" v-for="item in options" :key="item.value" 
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getCodeList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row stripe v-loading="listLoading"  style="width: 100%;">
			<el-table-column type="index" label="序号" align="center" width="70">
			</el-table-column>
			<el-table-column prop="name" label="字典名" width="100" align="center">
			</el-table-column>
			<el-table-column prop="type" label="字典类型" width="100" align="center">
			</el-table-column>
			<el-table-column prop="code" label="字典值" align="center">
			</el-table-column>
			<el-table-column prop="sq_code" label="售前字典值" min-width="100" align="center">
			</el-table-column>
            <el-table-column prop="sz_code" label="销售字典值" min-width="100" align="center">
			</el-table-column>
            <el-table-column prop="sh_code" label="物业字典值" min-width="100" align="center">
			</el-table-column>
            <el-table-column prop="status" label="状态" width="100" align="center">
			</el-table-column>
            <el-table-column prop="createtime" label="创建时间" :formatter="dateFormat" min-width="150" align="center">
			</el-table-column>
			<el-table-column label="操作" width="80" align="center">
				<template slot-scope="scope">                    
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!-- <el-pagination layout="prev, pager, next, jumper" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination> -->
      <el-pagination layout="total, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :total="totalCount"
            style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" width="100%" top="10%" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        
				<el-form-item label="字典名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="字典类型" prop="type">
					<el-input v-model="editForm.type" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="字典值">
					<el-input v-model="editForm.code" auto-complete="off" ></el-input>
				</el-form-item>
				<el-form-item label="售前字典值">
					<el-input v-model="editForm.sq_code" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="售中字典值">
					<el-input v-model="editForm.sz_code" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="售后字典值">
					<el-input v-model="editForm.sh_code" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item label="状态">
					          <el-radio v-model="editForm.status" label="1">有效</el-radio>
                    <el-radio v-model="editForm.status" label="-1">无效</el-radio>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

	
	</section>
</template>

<script>
import util from "../../common/js/util";
import moment from "../../api/moment";
// import {
//   getUserListPage,
//   removeUser,
//   batchRemoveUser,
//   editUser,
//   addUser
// } from "../../api/api";

export default {
  data() {
    return {
      NgDoQuery: {
        type: "",
        value: ""
      },
      options: [
        {
          value: "cst_type",
          label: "cst_type"
        },
        {
          value: "family",
          label: "family"
        },
        {
          value: "edu_level",
          label: "edu_level"
        },
        {
          value: "age_group",
          label: "age_group"
        },
        {
          value: "resided_state",
          label: "resided_state"
        },
        {
          value: "gender",
          label: "gender"
        },
        {
          value: "comefrom",
          label: "comefrom"
        },
        {
          value: "work_type",
          label: "work_type"
        }
      ],
      searchType: "",
      checkList: [],
      checkNames: [],
      users: [],
      page_num: 1,
      pageSize: 20,
      page: 1,
      currentPage: 1,
      totalCount: 100,
      listLoading: true,
      sels: [], //列表选中列
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        id: 0,
        name: "",
        type: "",
        code: "",
        sq_code: "",
        sz_code: "",
        sh_code: "",
        status: ""
      }
    };
  },
  methods: {
    loadData(pageNum, pageSize) {
      this.listLoading = true;
      this.$http({
        method: "post", //方法
        url: "dict/list", //地址
        data: {
          page_num: pageNum,
          page_size: pageSize
        },
        headers: {
          sign: localStorage.getItem("sign")
        }
      }).then(res => {
        this.users = res.data.data.result;
        this.listLoading = false;
      });
    },
    handleSizeChange: function(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.loadData(this.currentPage, this.pageSize);
      //this.page = val;
      //this.getUsers();
    },
    //获取用户列表
    getCodeList() {
      this.$http({
        method: "post", //方法
        url: "dict/list", //地址
        data: {
          type: this.searchType,
          page_num: 1,
          page_size: 20
        },
        headers: {
          sign: localStorage.getItem("sign")
        }
      }).then(res => {
        this.users = res.data.data.result;
        this.totalCount = res.data.data.total_count;
        this.listLoading = false;
      });
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
      if (row.status) this.editForm.status = String(row.status);
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            //this.editLoading = true;
            this.$http({
              method: "post",
              url: "dict/update",
              data: this.editForm,
              headers: {
                sign: localStorage.getItem("sign")
              }
            }).then(res => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功!",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.loadData(1, 20);
            });
          });
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    //时间格式化
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  mounted() {
    //this.getUsers();
    this.$http({
      // 字典列表
      method: "post", //方法
      url: "dict/list", //地址
      data: {
        page_num: 1,
        page_size: 20
      },
      headers: {
        sign: localStorage.getItem("sign")
      }
    }).then(res => {
      this.users = res.data.data.result;
      this.totalCount = res.data.data.total_count;
      this.listLoading = false;
    });
    //---
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