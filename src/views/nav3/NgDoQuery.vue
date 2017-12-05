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
            <el-table-column prop="sz_code" label="销售系统字典值" min-width="100" align="center">
			</el-table-column>
            <el-table-column prop="sh_code" label="物业系统字典值" min-width="100" align="center">
			</el-table-column>
            <el-table-column prop="status" label="状态" width="100" align="center">
			</el-table-column>
            <el-table-column prop="createtime" label="创建时间" width="100" align="center">
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
         <!-- <el-form-item label="状态">
					<el-select v-model="editForm.status">
                        <el-option value="有效">有效</el-option>
                        <el-option value="无效">无效</el-option>
                    </el-select>
				</el-form-item> -->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--更多查询界面-->
		<el-dialog title="更多查询" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-col style="margin-bottom:10px;">
                    <!-- {{checklists}} -->
                    <el-checkbox-group v-model="checkList" style="margin-bottom:10px;" v-for="checkName in checkNames" :key="checkName.value" :value="checkName.value" :label="checkName.label">
                        <span class="checkBoxs_name">{{checkName.name + "："}}</span>
                        <el-checkbox :label="checkBoxs.name" class="checkWidth" v-for="checkBoxs in checkName.checkBoxs" :key="checkBoxs.value" :value="checkBoxs.value">{{checkBoxs.name}}</el-checkbox>
                        <!-- <el-checkbox label="复选框 B"></el-checkbox>
                        <el-checkbox label="复选框 C"></el-checkbox> -->
                    </el-checkbox-group>
                </el-col>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="getUsers" :loading="addLoading">查询</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
import util from "../../common/js/util";
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
      options: [{
          value: 'cst_type',label: 'cst_type'
        }, {
          value: 'family',label: 'family'
        }, {
          value: 'edu_level',label: 'edu_level'
        }, {
          value: 'age_group',label: 'age_group'
        }, {
          value: 'resided_state',label: 'resided_state'
        }, {
          value: 'gender',label: 'gender'
        }, {
          value: 'comefrom',label: 'comefrom'
        }, {
          value: 'work_type',label: 'work_type'
        }],
      searchType: '',
      checkList: [],
      checkNames: [],
      users: [],
      page_num: 1,
      pageSize: 20,
      page: 1,
      currentPage: 1,
      totalCount: 100,
      listLoading: false,
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
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
        name: "",
        sex: -1,
        age: 0,
        birth: "",
        addr: ""
      }
    };
  },
  methods: {
    loadData(pageNum, pageSize) {
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
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { id: row.id };
          removeUser(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getUsers();
          });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //显示更多查询界面
    handleAdd: function() {
      this.addFormVisible = true;
      //   this.addForm = {
      //     name: "",
      //     sex: -1,
      //     age: 0,
      //     birth: "",
      //     addr: ""
      //   };
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
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.addForm);
            para.birth =
              !para.birth || para.birth == ""
                ? ""
                : util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
            addUser(para).then(res => {
              this.addLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              this.getUsers();
            });
          });
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    //批量删除
    batchRemove: function() {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveUser(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            //this.getUsers();
          });
        })
        .catch(() => {});
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