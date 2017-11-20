<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="UserDoQuery">
				<el-form-item>
					<el-input v-model="UserDoQuery.oper_name" placeholder="用户姓名"></el-input>
				</el-form-item>
                <el-form-item>
					<el-input v-model="UserDoQuery.oper_id" placeholder="登陆账号"></el-input>
				</el-form-item>
                <el-form-item>
					<el-select v-model="UserDoQuery.state" placeholder="账号状态">
                        <el-option value="全部">全部</el-option>
                        <el-option value="有效">有效</el-option>
                        <el-option value="无效">无效</el-option>
                    </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
                <el-form-item>
					<el-button type="primary" @click="handleAdd">新增用户</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row stripe v-loading="listLoading"  style="width: 100%;">
			<!-- <el-table-column type="index" label="序号" align="center" width="70">
			</el-table-column> -->
			<el-table-column prop="oper_name" label="用户姓名" width="100" align="center">
			</el-table-column>
			<el-table-column prop="oper_id" label="登陆账号" width="100" align="center">
			</el-table-column>
			<el-table-column prop="department" label="所在部门" width="100" align="center">
			</el-table-column>
			<el-table-column prop="position" label="职位" width="100" align="center">
			</el-table-column>
            <el-table-column prop="state" label="账号状态" width="90" align="center">
			</el-table-column>
			<el-table-column label="操作" min-width="100" align="center">
				<template slot-scope="scope">
					<el-button size="small" @click="handlePerm(scope.$index, scope.row)">权限设置</el-button>                    
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="登陆账号" prop="name">
					<el-input v-model="editForm.oper_id" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="用户姓名" prop="name">
					<el-input v-model="editForm.oper_name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="重置密码">
					<el-input type="password" v-model="editForm.oper_pwd" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="所在部门">
					<el-input v-model="editForm.department" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="职位">
					<el-input v-model="editForm.position" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="状态">
					<el-radio v-model="editForm.state" label="1">有效</el-radio>
                    <el-radio v-model="editForm.state" label="2">无效</el-radio>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

        <!--新增界面-->
		<el-dialog title="新增用户" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="登陆账号" prop="name">
					<el-input v-model="addForm.oper_id" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="用户姓名" prop="name">
					<el-input v-model="addForm.oper_name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="重置密码">
					<el-input type="password" v-model="addForm.oper_pwd" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="所在部门">
					<el-input v-model="addForm.department" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="职位">
					<el-input v-model="addForm.position" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="状态">
					<el-radio v-model="addForm.state" label="1">有效</el-radio>
                    <el-radio v-model="addForm.state" label="2">无效</el-radio>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
		
        <!--用户权限界面-->
		<el-dialog title="用户权限" v-model="permFormVisible" :close-on-click-modal="false">
			<el-form :model="permForm" label-width="80px" ref="permForm">
				<!-- <el-row style="margin-bottom:10px;"> -->
                <el-checkbox-group v-model="checkList" style="margin-bottom:10px;" v-for="checkName in checkNames" :key="checkName.value" :value="checkName.value" :label="checkName.label">
                    <el-col :span="8">
                        <el-checkbox :label="checkName.name" class="checkWidth"></el-checkbox>
                    </el-col>
                </el-checkbox-group>
                <!-- </el-row>		 -->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="permFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
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
      UserDoQuery: {
        oper_name: "",
        oper_id: "",
        state: ""
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
        oper_id: "",
        oper_name: "",
        oper_pwd: "",
        department: "",
        position: "",
        state: "1"
      },
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        id: [{ required: true, message: "请输入登陆账号", trigger: "blur" }],
        name: [{ required: true, message: "请输入用户姓名", trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
        oper_id: "",
        oper_name: "",
        oper_pwd: "",
        department: "",
        position: "",
        state: "1"
      },
      permFormVisible: false, //权限界面是否显示
      editLoading: false,
      //   editFormRules: {
      //     name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      //   },
      //权限界面数据
      permForm: {
        oper_id: ""
      },
      checkNames: [
        {
          id: 1,
          name: "root",
        },
        {
          id: 2,
          name: "admin",
        },
        {
          id: 4,
          name: "系统管理员",
        },
        {
          id: 5,
          name: "集团管理员",
        },
        {
          id: 6,
          name: "测试人员",
        }
      ]
    };
  },
  methods: {
    //性别显示转换
    formatSex: function(row, column) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers() {
      let para = {
        page: this.page,
        name: this.UserDoQuery.name
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
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        oper_id: "",
        oper_name: "",
        oper_pwd: "",
        department: "",
        position: "",
        state: "1"
      };
    },
    // 显示权限界面
    handlePerm: function() {
      this.permFormVisible = true;
      this.permForm = {
        oper_id: "",
        oper_name: "",
        oper_pwd: "",
        department: "",
        position: "",
        state: "1"
      };
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
    //权限
    addSubmit: function() {
      this.$refs.permForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.permForm);
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
              this.$refs["permForm"].resetFields();
              this.permFormVisible = false;
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
.el-form-item__content {
  line-height: 36px;
  position: relative;
  font-size: 14px;
  margin-left: 0 !important;
}
</style>