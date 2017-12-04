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
                <!-- <el-form-item>
					<el-select v-model="filters.cst_type" placeholder="客户类型">
                        <el-option value="个人客户">个人客户</el-option>
                        <el-option value="企业客户">企业客户</el-option>
                    </el-select>
				</el-form-item> -->
				<el-form-item v-for="item in listId" v-if="item.name==='查询'">
					<el-button type="primary" v-on:click="getUsers" >查询</el-button>
				</el-form-item>
				<el-form-item v-for="item in listId" v-if="item.name==='更多查询'">
					<el-button type="primary" @click="handleAdd">更多查询</el-button>
				</el-form-item>
                <!-- <el-form-item v-for="item in listId" v-if="item.name==='新增个人客户'">
					<el-button type="primary" @click="$router.push('/personal')">新增个人客户</el-button>
				</el-form-item> -->
                <el-form-item v-for="item in listId" v-if="item.name==='新增'">
					<el-button type="primary" @click="$router.push('/encust_list/enterprise')">新增企业客户</el-button>
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
					<el-button size="small" v-for="item in listId" v-if="item.name==='详细'">
                        <router-link class="routerBtn" :to="{path: `/home/encust_list/enterprisedetail?cust_id=${scope.row.cust_id}`}" target="_blank">详情</router-link>
                    </el-button>                                                          
					<el-button size="small" v-for="item in listId" v-if="item.name==='编辑'">
                        <router-link class="routerBtn" :to="{path: `/home/encust_list/enterpriseedit?cust_id=${scope.row.cust_id}`}" target="_blank">编辑</router-link>
                    </el-button>
					<el-button type="danger" size="small" @click.native.prevent="deleteRow(scope.$index, users)" v-for="item in listId" v-if="item.name==='删除'">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
			<el-pagination layout="prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :total="total"
            style="float:right;">
			</el-pagination>
		</el-col>
		<!--更多查询界面-->
		<el-dialog title="更多查询" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="{checkList}" label-width="80px" ref="addForm">
                <el-col style="margin-bottom:10px;">
                    <el-checkbox-group v-model="checkList.type" style="margin-bottom:10px;" v-for="(name, index) in addForm" :key="name.remark" :value="name.remark">
                        <span class="checkBoxs_name">{{name.remark + "："}}</span>
                        <el-checkbox :label="valueName.name" class="checkWidth" v-for="valueName in name.value" :key="valueName.name" :name="valueName.type"></el-checkbox>
                        <hr>
                    </el-checkbox-group>
                </el-col>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click="getUsers(checkList)" :loading="addLoading">查询</el-button>
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
      listId: [], // 按钮权限ID
      filters: {
        cst_name: "",
        cst_phone: "",
        cst_type: "",
        value: ""
      },
      checkList: {
        type: []
        //   gender: [],
        //   cst_sort: [],
        //   edu_level: [],
        //   family: [],
        //   children_cnt: [],
        //   work_type: [],
        //   cst_status: []
      },
      usersData: [],
      users: [],
      btn: [],
      page_num: 1,
      pageSize: 20,
      page: 1,
      currentPage: 1,
      total: 1000,
      listLoading: true,
      sels: [], //列表选中列
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      addFormVisible: false, //更多查询界面是否显示
      addLoading: false,
      //更多查询界面数据
      addForm: []
    };
  },
  beforeCreate() {
    // 实例创建前获取按钮权限
    this.$http({
      method: "post",
      url: "btn/permission",
      data: {
        id: localStorage.getItem("企业客户列表")
      },
      headers: {
        sign: localStorage.getItem("sign")
      }
    }).then(res => {
      //   console.log(res);
      this.listId = res.data.data;
      //   console.log(this.listId);
    });
  },
  methods: {
    //加载分页数据
    loadData(pageNum, pageSize) {
      this.$http({
        method: "post", //方法
        url: "cust/list", //地址
        data: {
          cst_type: 1,
          page_num: pageNum,
          page_size: pageSize
        },
        headers: {
          sign: localStorage.getItem("sign")
        }
      }).then(response => {
        //this.users = res.data.data;
        let usersG = response.data.data;
        for (let i = 0; i < usersG.length; i++) {
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
    getUsers(checkList) {
      //   let self = this;
      this.addFormVisible = false;
      this.$http({
        // 客户列表
        method: "post", //方法
        url: "cust/list", //地址
        data: {
          cst_type: 1,
          checkList: {}
        },
        headers: {
          sign: localStorage.getItem("sign")
        }
      }).then(res => {
        this.users = res.data.data;
        let usersG = this.users;
        for (let i = 0; i < usersG.length; i++) {
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
      //   let para = {
      //     page: this.page,
      //     name: this.filters.cst_name
      //   };
      //   this.listLoading = true;
      //   //   getUserListPage(para).then(res => {
      //   //     this.total = res.data.total;
      //   //     this.users = res.data.users;
      //   //     this.addFormVisible = false;
      //   //     this.listLoading = false;
      //   //   });
    },
    handleAdd: function() {
      let self = this;
      self
        .$http({
          method: "post",
          url: "cust/filter",
          headers: {
            sign: localStorage.getItem("sign")
          }
        })
        .then(res => {
          self.addForm = res.data.data;
        });
      //   console.log(self.addForm);
      this.addFormVisible = true;
    },
    //删除
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
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
    selsChange: function(sels) {
      this.sels = sels;
    }
  },
  mounted() {
    // this.$http({
    //   method: "post",
    //   url: "btn/permission",
    //   data
    // });
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
        page_size: 20
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