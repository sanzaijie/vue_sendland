<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="UserDoQuery">
				<el-form-item>
					<el-input v-model="UserDoQuery.name" placeholder="用户姓名"></el-input>
				</el-form-item>
                <el-form-item>
					<el-input v-model="UserDoQuery.oper_id" placeholder="登陆账号"></el-input>
				</el-form-item>
                <el-form-item>
					<el-select v-model="UserDoQuery.status" placeholder="账号状态">
                        <el-option value="有效">有效</el-option>
                        <el-option value="无效">无效</el-option>
                    </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsersByQuery">查询</el-button>
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
			<el-table-column prop="name" label="用户姓名" width="200" align="center">
			</el-table-column>
			<el-table-column prop="oper_id" label="登陆账号" width="200" align="center">
			</el-table-column>
			<!-- <el-table-column prop="department" label="所在部门" width="100" align="center">
			</el-table-column>
			<el-table-column prop="position" label="职位" width="100" align="center">
			</el-table-column> -->
      <el-table-column prop="status" label="账号状态" width="200" align="center">
			</el-table-column>
			<el-table-column label="操作" min-width="150" align="center">
				<template slot-scope="scope">
					<el-button size="small" @click="handlePerm(scope.$index, scope.row)">权限设置</el-button>                    
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
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
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="登陆账号" prop="oper_id">
					<el-input v-model="editForm.oper_id" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="用户姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="重置密码" prop="oper_pwd">
					<el-input type="password" v-model="editForm.oper_pwd" auto-complete="off"></el-input>
				</el-form-item>
				<!-- <el-form-item label="所在部门">
					<el-input v-model="editForm.department" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="职位">
					<el-input v-model="editForm.position" auto-complete="off"></el-input>
				</el-form-item> -->
         <el-form-item label="状态">
					          <el-radio v-model="editForm.status" label="有效">有效</el-radio>
                    <el-radio v-model="editForm.status" label="无效">无效</el-radio>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editUserSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

        <!--新增界面-->
		<el-dialog title="新增用户" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="登陆账号" prop="oper_id">
					<el-input v-model="addForm.oper_id" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="用户姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="登录密码" prop="oper_pwd">
					<el-input type="password" v-model="addForm.oper_pwd" auto-complete="off"></el-input>
				</el-form-item>
				<!-- <el-form-item label="所在部门">
					<el-input v-model="addForm.department" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="职位">
					<el-input v-model="addForm.position" auto-complete="off"></el-input>
				</el-form-item> -->
         <el-form-item label="状态">
					   <el-radio v-model="addForm.status"  label="有效">有效</el-radio>
             <el-radio v-model="addForm.status"  label="无效">无效</el-radio>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addUserSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
		
        <!--用户权限界面-->
		<el-dialog title="用户权限" v-model="permFormVisible" :close-on-click-modal="false">
			<el-form :model="permForm" label-width="80px" ref="permForm">
				<!-- <el-row> -->
                <el-checkbox-group v-model="permForm.checkList" style="margin-bottom:10px;" v-for="checkName in checkNames" :key="checkName.id" :value="checkName.id" :label="checkName.label">
                    <el-col :span="6">
                        <el-checkbox :label="checkName.id" name="permForm.checkList" class="checkWidth">{{checkName.name}}</el-checkbox>
                    </el-col>
                </el-checkbox-group>
                <!-- </el-row>		 -->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="permFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="permSubmit" :loading="permLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
import util from "../../common/js/util";
//import NProgress from 'nprogress'
// import {
//   getUserListPage,
//   removeUser,
//   batchRemoveUser,
//   editUser,
//   addUser
// } from "../../api/api";

export default {
  data() {
  var validatePassword = (rule, value, callback) => {
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
         if (!reg.test(value)) {
          callback(new Error("密码格式不正确(长度6-16位,密码组合必须包含英文字母、数字，区分大小写"));
        } else {
          callback();
        }
      };

    return {
      UserDoQuery: {
        name: null,
        oper_id: null,
        status: null,
        page_num: 1,
        page_size: 20
      },
      findQuery:{},
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
        name: [{ required: true, message: "请输入用户姓名", trigger: "blur" }],
        oper_id: [{ required: true, message: "请输入登录账号", trigger: "blur" }],
        oper_pwd: [{validator: validatePassword, trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        id: "",
        oper_id: "",
        name: "",
        oper_pwd: "",
        status: "有效"
      },
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        oper_id: [{ required: true, message: "请输入登陆账号", trigger: "blur" }],
        name: [{ required: true, message: "请输入用户姓名", trigger: "blur" }],
        oper_pwd: [{validator: validatePassword, trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
        oper_id: "",
        name: "",
        oper_pwd: "",
        state: "有效"
      },
      permFormVisible: false, //权限界面是否显示
      permLoading:false,
      //   editFormRules: {
      //     name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      //   },
      //权限界面数据
      permForm: {
        id: "",
        checkList:[],
        role_ids: ""
      },
      checkNames: [
        // {
        //   id: 1,
        //   name: "root",
        // },
        // {
        //   id: 2,
        //   name: "admin",
        // },
        // {
        //   id: 4,
        //   name: "系统管理员",
        // },
        // {
        //   id: 5,
        //   name: "集团管理员",
        // },
        // {
        //   id: 6,
        //   name: "测试人员",
        // }
      ]
    };
  },
  methods: {
    handleSizeChange: function(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUsers(this.currentPage, this.pageSize);
    },
    //获取用户列表
    getUsers(pageNum, pageSize) {
      this.$http({
      // 字典列表
      method: "post", //方法
      url: "user/list", //地址
      data: {
        page_num: pageNum,
        page_size: pageSize
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
    getUsersByQuery() {
      this.$http({
      // 字典列表
      method: "post", //方法
      url: "user/list", //地址
      data: this.UserDoQuery,
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
      }).then(() => {
          this.$http({
                method: "post",
                url: "user/delete",
                data: { id: row.id },
                headers: {
                  sign: localStorage.getItem("sign")
                }
              }).then(res => {
                if(res.data.error_code === 0){
                this.$message({
                    message: "删除成功！",
                    type: "success"
                  });
                  this.getUsers(1, 20);
              }else{
                this.$message.error(res.data.error_message);
              }
              });

          // this.listLoading = true;
          // let para = { id: row.id };
          // removeUser(para).then(res => {
          //   this.listLoading = false;
          //   this.$message({
          //     message: "删除成功",
          //     type: "success"
          //   });
          //   this.getUsers();
          // });
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
      // this.addForm = {
      //   oper_id: "",
      //   oper_name: "",
      //   oper_pwd: "",
      //   department: "",
      //   position: "",
      //   state: "1"
      // };
    },
    // 显示权限界面
    handlePerm: function(index, row) {
      this.permForm={
        id: "",
        checkList:[],
        role_ids: ""
      };
      let self = this;
      self
        .$http({
          method: "post",
          url: "user/permission/list",
          data: { id: row.id },
          headers: {
            sign: localStorage.getItem("sign")
          }
        })
        .then(res => {
          self.checkNames = res.data.data.role_list;
          let retChenkList = res.data.data.my_role;
          var i=0;
          for(let item of retChenkList){
              this.permForm.checkList[i]= item.id;
              i+=1;
           }

        });
      this.permForm.id = row.id;
      this.permFormVisible = true;
    
    },
    //提交权限设置
    permSubmit: function() {
     this.$confirm("确认提交吗？", "提示", {}).then(() => {
       var roleIds="";
       for(let item of this.permForm.checkList){
         roleIds +=","+item;
       }
       if(roleIds!=""){
        roleIds=roleIds.substring(1,roleIds.length);
       }
       this.permForm.role_ids=roleIds;
       this.$http({
                method: "post",
                url: "user/permission",
                data: this.permForm,
                headers: {
                  sign: localStorage.getItem("sign")
                }
              }).then(res => {
                   this.permLoading = false;
                  //NProgress.done();
                  if(res.data.error_code === 0){
                    this.$message({
                        message: "授权成功!",
                        type: "success"
                      });
                      this.$refs["permForm"].resetFields();
                      this.permFormVisible = false;
                      this.getUsers(1, 20);
                  }else{
                    this.$message.error(res.data.error_message);
                      this.permFormVisible = true;
                  }
              });
      });
    },
    //编辑
    editUserSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            //this.editLoading = true;
              this.$http({
                method: "post",
                url: "user/save-update",
                data: this.editForm,
                headers: {
                  sign: localStorage.getItem("sign")
                }
              }).then(res => {
              this.editLoading = false;
              //NProgress.done();
              if(res.data.error_code === 0){
                this.$message({
                    message: res.data.error_message,
                    type: "success"
                  });
                  this.$refs["editForm"].resetFields();
                  this.editFormVisible = false;
                  this.getUsers(1, 20);
              }else{
                this.$message.error(res.data.error_message);
                  this.editFormVisible = true;
              }
              
            });

          });
        }
      });
    },
    //新增
    addUserSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
      this.$http({
                method: "post",
                url: "user/save-update",
                data: this.addForm,
                headers: {
                  sign: localStorage.getItem("sign")
                }
              }).then(res => {
              this.addLoading = false;
              //NProgress.done();
              if(res.data.error_code === 0){
                this.$message({
                    message: res.data.error_message,
                    type: "success"
                  });
                  this.$refs["addForm"].resetFields();
                  this.addFormVisible = false;
                  this.getUsers(1, 20);
              }else{
                this.$message.error(res.data.error_message);
                  this.addFormVisible = true;
              }
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
              this.permForm.resetFields();
              this.permFormVisible = false;
              this.getUsers();
            });
          });
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
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