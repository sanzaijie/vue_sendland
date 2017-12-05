<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="RoleDoQuery">
				<el-form-item>
					<el-input v-model="RoleDoQuery.name" placeholder="角色名称"></el-input>
				</el-form-item>
                <el-form-item>
					<el-select v-model="RoleDoQuery.value" placeholder="角色状态">
                        <el-option value="全部">全部</el-option>
                        <el-option value="有效">有效</el-option>
                        <el-option value="无效">无效</el-option>
                    </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增角色</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row stripe v-loading="listLoading"  style="width: 100%;">
			<el-table-column type="index" label="序号" align="center" width="70">
			</el-table-column>
			<el-table-column prop="name" label="角色姓名" min-width="100" align="center">
			</el-table-column>
			<el-table-column prop="creator_name" label="创建人" width="80" align="center">
			</el-table-column>
			<el-table-column prop="createtime" label="创建时间" :formatter="dateFormat" align="center">
			</el-table-column>
			<el-table-column prop="status" label="角色状态" width="100" align="center">
			</el-table-column>
			<el-table-column label="操作" min-width="100" align="center">
				<template slot-scope="scope">
					<el-button size="small" @click="handlePrem(scope.$index, scope.row)">权限设置</el-button>                    
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
			<el-pagination layout="total, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :total="total"
            style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="角色名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="角色状态" prop="name">
					<el-select v-model="editForm.value" placeholder="请选择">
                        <el-option value="有效">有效</el-option>
                        <el-option value="无效">无效</el-option>
                    </el-select>
				</el-form-item>
                <el-form-item label="角色描述">
					<el-input type="textarea" :rows="5" v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增角色" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="角色名称" prop="name">
					<el-input v-model="addForm.role_name" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="角色状态" prop="name">
					<el-select v-model="addForm.value" placeholder="请选择">
                        <el-option value="有效">有效</el-option>
                        <el-option value="无效">无效</el-option>
                    </el-select>
				</el-form-item>
                <el-form-item label="角色描述">
					<el-input type="textarea" :rows="5" v-model="addForm.remark" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

        <!-- 权限管理界面 -->
        <el-dialog title="权限设置" v-model="premFormVisible" :close-on-click-modal="false">
            <el-form :model="{permForm}" label-width="80px;" ref="permForm">
                <el-row>
                    <el-col :span="24">
                        <el-tree
                        :data="premFormData"
                        show-checkbox
                        node-key="id"
                        ref="tree"
                        highlight-current
                        :props="defaultProps">
                        </el-tree>
                    </el-col>
                  <!-- <el-col :span="20"></el-col> -->
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="premFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="premSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
	</section>
</template>

<script>
import util from "../../common/js/util";
// import moment from "../../api/moment";
import dateFormat from "../../api/dateformat.js";
// import //   getUserListPage,
// //   removeUser,
// //   batchRemoveUser,
// //   editUser,
// //   addUser
// "../../api/api";

export default {
  data() {
    return {
      premFormData: [],
      defaultProps: {
        children: "sub",
        label: "name"
      },
      RoleDoQuery: {
        name: "",
        value: ""
      },
      checkList: [],
      checkNames: [],
      users: [],
      page_num: 1,
      pageSize: 20,
      page: 1,
      currentPage: 1,
      total: 1,
      listLoading: false,
      sels: [], //列表选中列

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        role_name: "",
        role_state: "",
        remark: ""
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
        role_name: "",
        role_state: "",
        remark: ""
      },

      premFormVisible: false, //权限界面是否显示
      premLoading: false,
      premFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //新增界面数据
      permForm: {},
      myFormData: {},
      data1: [
        {
          name: "",
          children: [
            {
              name: ""
            }
          ]
        }
      ]
    };
  },
  methods: {
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3]);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //加载分页数据
    loadData(pageNum, pageSize) {
      this.$http({
        method: "post", //方法
        url: "cust/list", //地址
        data: {
          cst_type: 0,
          page_num: pageNum,
          page_size: pageSize
        },
        headers: {
          sign: localStorage.getItem("sign")
        }
      }).then(res => {
        this.usersData = res.data.data.result;
        this.total = res.data.data.total_count;
        let usersG = this.usersData;
        for (let i = 0; i < usersG.length; i++) {
          usersG[i].gender = change.Gender(usersG[i].gender);
          usersG[i].cst_type = change._cstType(usersG[i].cst_type);
          usersG[i].card_type = change._cardTcard_typeype(usersG[i].card_type);
        }
        this.users = usersG;
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
    getUsers() {
      let para = {
        page: this.page,
        name: this.RoleDoQuery.name
      };
      this.listLoading = true;
      //NProgress.start();
      //   getUserListPage(para).then(res => {
      //     this.total = res.data.total;
      //     this.users = res.data.users;
      //     this.addFormVisible = false;
      //     this.listLoading = false;
      //     //NProgress.done();
      //   });
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
    //显示新增角色界面
    handleAdd: function() {
      this.addFormVisible = true;
    },
    //显示权限设置界面
    handlePrem: function(index, row) {
      this.premFormVisible = true;
      this.permForm = Object.assign({}, row);
      this.$http({
        method: "post",
        url: "role/permission/list",
        data: {
          id: this.permForm.id
        },
        headers: {
          sign: localStorage.getItem("sign")
        }
      }).then(res => {
        this.premFormData = res.data.data.permission_list;
        this.myFormData = res.data.data.my_permission;
      });
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
    //权限设置
    premSubmit: function() {
      this.$refs.premForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.premLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.premForm);
            para.birth =
              !para.birth || para.birth == ""
                ? ""
                : util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
            addUser(para).then(res => {
              this.premLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["premForm"].resetFields();
              this.premVisible = false;
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
    //时间格式化
    // dateFormat: function() {
    // //   var date = row[column.property];
    //   if (date == undefined) {
    //     return "";
    //   }
    //   return moment(date).format("YYYY-MM-DD HH:mm:ss");
    // }
  },
  mounted() {
    // this.getUsers();
    this.listLoading = true;
    this.$http({
      method: "post",
      url: "role/list",
      data: {},
      headers: {
        sign: localStorage.getItem("sign")
      }
    }).then(res => {
      this.users = res.data.data.result;
      this.total = res.data.data.total_count;
      this.users = this.dateFormat(res.data.data.result);
      console.log(this.users)
      this.listLoading = false;
    });
  }
};
</script>

<style scoped>
.fr {
  text-align: right;
  margin-top: 20px;
}
.checkBoxs_name {
  width: 12%;
  display: inline-block;
  text-align: right;
}
.checkWidth {
  margin-right: 5px;
}
.el-submenu .el-menu-item {
  height: 50px;
  line-height: 50px;
  padding: 0 45px;
  min-width: 0;
}
.el-menu-item-group__title {
  padding-top: 0;
  line-height: normal;
  font-size: 14px;
  padding-left: 20px;
  color: #97a8be;
}
</style>