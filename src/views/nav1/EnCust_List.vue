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
                    <el-button type="primary" @click="getSelect(filters)">查询</el-button>
                </el-form-item>
                <el-form-item v-for="item in listId" v-if="item.name==='更多查询'">
                    <el-button type="primary" @click="handleAdd">更多查询</el-button>
                </el-form-item>
                <!-- <el-form-item v-for="item in listId" v-if="item.name==='新增个人客户'">
					<el-button type="primary" @click="$router.push('/personal')">新增个人客户</el-button>
				</el-form-item> -->
                <el-form-item v-for="item in listId" v-if="item.name==='新增'">
                    <el-button type="primary" @click="$router.push('/encustlist/enterprise')">新增企业客户</el-button>
                </el-form-item>
                <el-form-item v-for="item in listId" v-if="item.name==='导出'">
                    <el-button type="primary" @click="export2Excel">导出</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="usersData" highlight-current-row stripe v-loading="listLoading" style="width: 100%;">
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
            <el-table-column prop="card_type" label="证件类型" width="100" align="center">
            </el-table-column>
            <el-table-column prop="cer_no" label="证件号码" min-width="100" align="center">
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button size="small" v-for="item in listId" v-if="item.name==='详细'">
                        <router-link class="routerBtn" :to="{path: `/home/encustlist/enterprisedetail?cust_id=${scope.row.cust_id}`}" target="_blank">详情</router-link>
                    </el-button>
                    <el-button size="small" v-for="item in listId" v-if="item.name==='编辑'">
                        <router-link class="routerBtn" :to="{path: `/home/encustlist/enterpriseedit?cust_id=${scope.row.cust_id}`}" target="_blank">编辑</router-link>
                    </el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)" v-for="item in listId" v-if="item.name==='删除'">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
            <el-pagination layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
        <!--更多查询界面-->
        <el-dialog title="更多查询" v-model="addFormVisible" :close-on-click-modal="true">
            <el-form :model="{checkList}" label-width="80px" ref="addForm">
                <el-col style="margin-bottom:10px;">
                    <el-checkbox-group v-model="checkList" style="margin-bottom:10px;" v-for="(name, index) in addForm" :key="name.remark">
                        <span class="checkBoxs_name">{{name.remark + "："}}</span>
                        <el-checkbox :label="valueName.type + ':' + valueName.code" class="checkWidth" v-for="valueName in name.value" :key="valueName.code">{{valueName.name}}</el-checkbox>
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
import * as change from "../../api/change.js";

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
        cst_name: null,
        cst_phone: null,
        cst_type: 1,
        value: ""
      },
      queryParams: {
        cst_type: 1,
        cst_name: null,
        cst_phone: null
      },
      checkList: [
        // type: []
        //   gender: [],
        //   cst_sort: [],
        //   edu_level: [],
        //   family: [],
        //   children_cnt: [],
        //   work_type: [],
        //   cst_status: []
      ],
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
      if (res.code == "ECONNABORTED" && res.message.indexOf("timeout") != -1) {
        this.$message.error("网络异常,请求超时");
        return false;
      }
      //   console.log(res);
      this.listId = res.data.data;
      //   console.log(this.listId);
    });
  },
  methods: {
    // 导出列表
    export2Excel() {
      // const form = this.getSearchForm(); // 要发送到后台的数据
      this.$http({
        // 用axios发送post请求
        method: "post",
        url: "cust/export", // 请求地址
        data: this.queryParams,
        headers: {
          sign: localStorage.getItem("sign")
        },
        responseType: "blob" // 表明返回服务器返回的数据类型
      }).then(res => {
        if (
          res.code == "ECONNABORTED" &&
          res.message.indexOf("timeout") != -1
        ) {
          this.$message.error("网络异常,请求超时");
          return false;
        }
        // 处理返回的文件流
        const content = res.data;
        const elink = document.createElement("a"); // 创建a标签
        elink.download = "客户列表.xls"; // 文件名
        elink.style.display = "none";
        const blob = new Blob([content]);
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click(); // 触发点击a标签事件
        document.body.removeChild(elink);
      });
    },
    //加载分页数据
    loadData(pageNum, pageSize) {
      this.queryParams.page_num = pageNum;
      this.queryParams.page_size = pageSize;
      this.listLoading = true;
      this.$http({
        method: "post", //方法
        url: "cust/list", //地址
        data: this.queryParams,
        // data: {
        //   cst_type: 1,
        //   page_num: pageNum,
        //   page_size: pageSize
        // },
        headers: {
          sign: localStorage.getItem("sign")
        }
      }).then(res => {
        if (
          res.code == "ECONNABORTED" &&
          res.message.indexOf("timeout") != -1
        ) {
          this.$message.error("网络异常,请求超时");
          return false;
        }
        this.usersData = res.data.data.result;
        this.total = res.data.data.total_count;
        let usersG = this.usersData;
        for (let i = 0; i < usersG.length; i++) {
          usersG[i].gender = change.Gender(usersG[i].gender);
          usersG[i].cst_type = change._cstType(usersG[i].cst_type);
          usersG[i].card_type = change._cardTcard_typeype(usersG[i].card_type);
        }
        this.usersData = usersG;
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
    // 获取查询客用户列表
    getSelect(filters) {
      this.listLoading = true;
      this.queryParams.cst_name = filters.cst_name;
      this.queryParams.cst_phone = filters.cst_phone;

      this.$http({
        method: "post",
        url: "cust/list",
        data: this.queryParams,
        headers: {
          sign: localStorage.getItem("sign")
        }
      }).then(res => {
        if (
          res.code == "ECONNABORTED" &&
          res.message.indexOf("timeout") != -1
        ) {
          this.$message.error("网络异常,请求超时");
          return false;
        }
        this.usersData = res.data.data.result;
        this.total = res.data.data.total_count;
        let usersG = this.usersData;
        for (let i = 0; i < usersG.length; i++) {
          usersG[i].gender = change.Gender(usersG[i].gender);
          usersG[i].cst_type = change._cstType(usersG[i].cst_type);
          usersG[i].card_type = change._cardTcard_typeype(usersG[i].card_type);
        }
        this.usersData = usersG;
        this.listLoading = false;
      });
    },
    //获取更多查询用户列表
    getUsers(checkList) {
      var json = {};

      var json = {};
      for (var i = 0; i < this.checkList.length; i++) {
        var item = this.checkList[i].split(":");
        if (hasKey(json, item[0])) {
          json[item[0]] = item[1];
        } else {
          var key = eval("json." + item[0]);
          key = json[item[0]] + "," + item[1];
          json[item[0]] = key;
        }
      }
      for (var key in json) {
        var valueArrs = [];
        if (json[key].toString().indexOf(",") > 0) {
          var strArrs = json[key].toString().split(",");
          for (var i = 0; i < strArrs.length; i++) {
            valueArrs.push(parseInt(strArrs[i]));
          }
        } else {
          valueArrs.push(parseInt(json[key]));
        }
        this.queryParams[key] = valueArrs;
      }
      function hasKey(json, key) {
        var hasKey = eval("json." + key);
        if (hasKey !== undefined && hasKey !== null) {
          return false;
        }
        return true;
      }
      this.queryParams.cst_name = this.filters.cst_name;
      this.queryParams.cst_phone = this.filters.cst_phone;
      this.addFormVisible = false;
      this.listLoading = true;

      this.$http({
        // 客户列表
        method: "post", //方法
        url: "cust/list", //地址
        data: this.queryParams,
        headers: {
          sign: localStorage.getItem("sign")
        }
      }).then(res => {
        if (
          res.code == "ECONNABORTED" &&
          res.message.indexOf("timeout") != -1
        ) {
          this.$message.error("网络异常,请求超时");
          return false;
        }
        if (res.data.error_code == 0 && res.data.error_code != undefined) {
          this.usersData = res.data.data.result;
          this.total = res.data.data.total_count;
          let usersG = this.usersData;
          for (let i = 0; i < usersG.length; i++) {
            usersG[i].gender = change.Gender(usersG[i].gender);
            usersG[i].cst_type = change._cstType(usersG[i].cst_type);
            usersG[i].card_type = change._cardTcard_typeype(
              usersG[i].card_type
            );
          }
          this.usersData = usersG;
          this.listLoading = false;
          //   this.filters = {};
          this.checkList = [];
        } else {
          this.$message.error(res.data.error_message);
          this.listLoading = false;
        }
      });
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
          if (
            res.code == "ECONNABORTED" &&
            res.message.indexOf("timeout") != -1
          ) {
            this.$message.error("网络异常,请求超时");
            return false;
          }
          self.addForm = res.data.data;
        });
      //   console.log(self.addForm);
      this.addFormVisible = true;
    },
    // 删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$http({
            method: "post",
            url: "cust/delete",
            data: { cust_id: row.cust_id },
            headers: {
              sign: localStorage.getItem("sign")
            }
          }).then(res => {
            if (
              res.code == "ECONNABORTED" &&
              res.message.indexOf("timeout") != -1
            ) {
              this.$message.error("网络异常,请求超时");
              return false;
            }
            if (res.data.error_code === 0) {
              this.$message({
                message: "删除成功！",
                type: "success"
              });
              this.loadData();
            } else {
              this.$message.error(res.data.error_message);
            }
          });
        })
        .catch(() => {});
    },
    selsChange: function(sels) {
      this.sels = sels;
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style scoped>
.fontc {
  color: #ffffff;
  text-decoration: none;
}
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