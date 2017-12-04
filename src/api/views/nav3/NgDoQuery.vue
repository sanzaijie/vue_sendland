<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="NgDoQuery">
                <el-form-item>
					<el-select v-model="NgDoQuery.type" placeholder="字典类型">
                        <el-option value="全部" v-for="type in NgDoQuery" :key="type.value">{{type.type}}</el-option>
                    </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row stripe v-loading="listLoading"  style="width: 100%;">
			<el-table-column type="index" label="序号" align="center" width="70">
			</el-table-column>
			<el-table-column prop="role_name" label="字典名" width="100" align="center">
			</el-table-column>
			<el-table-column prop="oper_name" label="字典类型" width="100" align="center">
			</el-table-column>
			<el-table-column prop="create_time" label="字典值" align="center">
			</el-table-column>
			<el-table-column prop="role_state" label="售前字典值" width="100" align="center">
			</el-table-column>
            <el-table-column prop="role_state" label="销售系统字典值" width="100" align="center">
			</el-table-column>
            <el-table-column prop="role_state" label="物业系统字典值" width="100" align="center">
			</el-table-column>
            <el-table-column prop="role_state" label="状态" width="100" align="center">
			</el-table-column>
            <el-table-column prop="role_state" label="创建时间" width="100" align="center">
			</el-table-column>
			<el-table-column label="操作" width="80" align="center">
				<template slot-scope="scope">                    
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
            <!-- <el-table-column label="操作" width="200" align="center">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>                    
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column> -->
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
			<el-pagination layout="prev, pager, next, jumper" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" width="100%" top="10%" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item label="字典名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="字典类型" prop="name">
					<el-input v-model="editForm.type" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="字典值">
					<el-input v-model="editForm.sq_code" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="售前字典值">
					<el-input v-model="editForm.sz_code" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="售中字典值">
					<el-input v-model="editForm.sh_code" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="售后字典值">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="状态">
					<el-select v-model="NgDoQuery.status">
                        <el-option value="有效">有效</el-option>
                        <el-option value="无效">无效</el-option>
                    </el-select>
				</el-form-item>
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
      NgDoQuery: {
        type: "",
        value: ""
      },
      checkList: [],
      checkNames: [],
      users: [],
      total: 0,
      page: 1,
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
    //性别显示转换
    // formatSex: function(row, column) {
    //   return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    // },
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers() {
      let para = {
        page: this.page,
        name: this.NgDoQuery.name
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
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);
            para.birth =
              !para.birth || para.birth == ""
                ? ""
                : util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
            editUser(para).then(res => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getUsers();
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
            this.getUsers();
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getUsers();
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