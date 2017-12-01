<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.cst_name" placeholder="客户姓名"></el-input>
				</el-form-item>
                <el-form-item>
					<el-input v-model="filters.cst_phone" placeholder="手机号码"></el-input>
				</el-form-item>
                <el-form-item>
					<el-select v-model="filters.cst_type" placeholder="客户类型">
                        <el-option value="个人客户">个人客户</el-option>
                        <el-option value="企业客户">企业客户</el-option>
                    </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers" >查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">更多查询</el-button>
				</el-form-item>
                <el-form-item>
					<el-button type="primary" @click="$router.push('/personal')">新增个人客户</el-button>
				</el-form-item>
                <el-form-item>
					<el-button type="primary" @click="$router.push('/enterprise')">新增企业客户</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row stripe :loading="listLoading" style="width: 100%;">
			<!-- <el-table-column type="selection" width="0">
			</el-table-column> -->
			<el-table-column type="index" label="序号" align="center" width="70">
			</el-table-column>
			<el-table-column prop="cst_name" label="客户姓名" min-width="100" align="center">
			</el-table-column>
			<el-table-column prop="gender" label="性别" width="70" align="center">
			</el-table-column>
			<el-table-column prop="cst_phone" label="手机号码" align="center">
			</el-table-column>
			<el-table-column prop="cst_type" label="客户类型" width="100" align="center">
			</el-table-column>
			<el-table-column prop="certificates" label="证件类型" width="100" align="center">
			</el-table-column>
            <el-table-column prop="cer_no" label="证件号码" min-width="100" align="center">
			</el-table-column>
			<el-table-column label="操作" width="200" align="center">
				<template slot-scope="scope">
					<el-button size="small">
                        <router-link class="routerBtn" :to="{path: `/home/custList/personaldetail?cust_id=${scope.row.cust_id}`}" target="_blank">详情</router-link>
                    </el-button>                                                          
					<el-button size="small">
                        <router-link class="routerBtn" :to="{path: `/home/custList/personaledit?cust_id=${scope.row.cust_id}`}" target="_blank">编辑</router-link>
                    </el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
			<el-pagination layout="prev, pager, next, jumper"
            @current-change="handleCurrentChange"
            :page-size="page_size"
            :total="10"
            style="float:right;">
			</el-pagination>
		</el-col>
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
import change from "../../api/change.js";
import //   getUserListPage,
//   removeUser,
//   batchRemoveUser,
//   editUser,
//   addUser
"../../api/api";

export default {
  data() {
    return {
      filters: {
        cst_name: "",
        cst_phone: "",
        cst_type: "",
        value: ""
      },
      checkList: [],
      checkNames: [
        {
          list: 1,
          name: "性别",
          checkBoxs: [
            { id: 1, name: "男" },
            { id: 2, name: "女" },
            { id: 3, name: "未知" }
          ]
        },
        {
          list: 2,
          name: "客户类型",
          checkBoxs: [
            { id: 4, name: "男" },
            { id: 5, name: "女" },
            { id: 6, name: "未知" }
          ]
        },
        {
          list: 4,
          name: "教育程度",
          checkBoxs: [
            { id: 7, name: "男" },
            { id: 8, name: "女" },
            { id: 9, name: "未知" }
          ]
        },
        {
          list: 5,
          name: "家庭结构",
          checkBoxs: [
            { id: 10, name: "男" },
            { id: 11, name: "女" },
            { id: 12, name: "未知" }
          ]
        },
        {
          list: 6,
          name: "子女人数",
          checkBoxs: [
            { id: 13, name: "男" },
            { id: 14, name: "女" },
            { id: 15, name: "未知" }
          ]
        }
      ],
      users: [],
      btn: [],
      page_num: 1,
      page_size: 20,
      page: 1,
      listLoading: true,
      sels: [], //列表选中列

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //   //编辑界面数据
      //   editForm: {
      //     id: 0,
      //     name: "",
      //     sex: -1,
      //     age: 0,
      //     birth: "",
      //     addr: ""
      //   },

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
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers() {
      let para = {
        page: this.page,
        name: this.filters.cst_name
      };
      this.listLoading = true;
      //   getUserListPage(para).then(res => {
      //     this.total = res.data.total;
      //     this.users = res.data.users;
      //     this.addFormVisible = false;
      //     this.listLoading = false;
      //   });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          let para = { id: row.id };
          removeUser(para).then(res => {
            this.listLoading = false;
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
    // handleEdit: function(index, row) {
    //   this.editFormVisible = true;
    //   this.editForm = Object.assign({}, row);
    // },
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
    // 详情
    // handleDetail: function(index, row) {
    //   this.$router.history.push("/detailpersonal");
    // },
    //编辑
    // editSubmit: function() {
    //   this.$refs.editForm.validate(valid => {
    //     if (valid) {
    //       this.$confirm("确认提交吗？", "提示", {}).then(() => {
    //         this.editLoading = true;
    //         //NProgress.start();
    //         let para = Object.assign({}, this.editForm);
    //         para.birth =
    //           !para.birth || para.birth == ""
    //             ? ""
    //             : util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
    //         editUser(para).then(res => {
    //           this.editLoading = false;
    //           //NProgress.done();
    //           this.$message({
    //             message: "提交成功",
    //             type: "success"
    //           });
    //           this.$refs["editForm"].resetFields();
    //           this.editFormVisible = false;
    //           this.getUsers();
    //         });
    //       });
    //     }
    //   });
    // },
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
    }
  },
  mounted() {
    // this.getUsers();
    // 合并请求
    // function getMsg(res1, res2) {
    //   confirm.log(res1);
    //   confirm.log(res2);
    // }
    // this.$http
    //   .all([
    //     this.$http.post("cust/list", { cst_type: 1 }),
    //     this.$http.post("cust/admin", { page_num: 1 })
    //   ])
    //   // 分发响应
    //   .then(this.$http.spread(getMsg))
    //   .catch(err => {
    //     console.log(err);
    //   });
    this.$http({
      // 客户列表
      method: "post", //方法
      url: "cust/list", //地址
      data: {
        cst_type: 1,
        page_num: 1,
        page_size: 200
      },
      headers: {
        sign: localStorage.getItem("sign")
      }
    }).then(res => {
      this.users = res.data.data;
      var usersG = this.users;
      for (var i = 0; i < usersG.length; i++) {
        if (usersG[i].gender == 2) {
          usersG[i].gender = "未知";
        } else if (usersG[i].gender == 1) {
          usersG[i].gender = "女";
        } else {
          usersG[i].gender = "男";
        }
      }
      this.users = usersG;
      this.listLoading = false;
    });
    // this.$http({
    //   // 按钮权限
    //   method: "post", //方法
    //   url: "btn/permission", //地址
    //   data: {
    //     id: "755405eacaa611e7b73e005056bd1eff"
    //   },
    //   headers: {
    //     sign: localStorage.getItem("sign")
    //   }
    // }).then(res => {
    //   console.log(res);
    //   this.btn = res.data.data.data;
    //   console.log(this.btn);
    // });
  },
  created() {}
};
</script>

<style scoped>
.routerBtn {
  text-decoration: none;
  color: #1f2d3d;
}
.el-dialog el-dialog--small {
  width: 90%;
}
.checkBoxs_name {
  width: 12%;
  display: inline-block;
  text-align: right;
}
.checkWidth {
  margin-right: 5px;
}
</style>