<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col>
			<el-col :span="2">
				<div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
			</el-col>
            <el-col :span="8">
                <h1 style="margin: 0">实地客户主数据中心系统</h1>
            </el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">
                        <img src="../assets/menu-icon2.png" />
                        {{sysUserName}}
                    </span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="handleEdit">修改密码</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
                <el-menu
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#303133"
                active-text-color="#409EFF"
                unique-opened
                v-if="!collapsed">
                    <el-menu-item index="0">
                        <router-link to="echarts" class="link">
                            <!-- <i class="el-icon-upload"></i> -->
                            Dashboard
                            <!-- <span slot="title">Dashboard</span> -->
                        </router-link>
                    </el-menu-item>
                    <el-submenu index="1" v-for="item in navbars" v-if="item.name === '客户管理'">
                        <template slot="title" style="color:#fff;">
                            <!-- <i class="el-icon-star-on"></i> -->
                            <span>客户管理</span>
                        </template>
                        <el-menu-item index="1-1" v-for="item1 in item.sub" v-if="item1.name === '个人客户列表'">
                            <router-link :to="{name: item1.name}" class="link">个人客户列表</router-link>
                        </el-menu-item>
                        <el-menu-item index="1-2" v-for="item1 in item.sub" v-if="item1.name === '企业客户列表'">
                            <router-link :to="{name: item1.name}" class="link">企业客户列表</router-link>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2" v-for="item in navbars" v-if="item.name === '监控管理'">
                        <template slot="title">
                            <!-- <i class="el-icon-menu"></i> -->
                            <span slot="title">监控管理</span>
                        </template>
                        <el-menu-item index="2-1" v-for="item1 in item.sub" v-if="item1.name === '系统监控'">
                            <router-link :to="{name: item1.name}" class="link">系统监控</router-link>
                        </el-menu-item>
                        <el-menu-item index="2-2" v-for="item1 in item.sub" v-if="item1.name === '客户日志'">
                            <router-link :to="{name: item1.name}" class="link">客户日志</router-link>
                        </el-menu-item>
                        <el-menu-item index="2-3" v-for="item1 in item.sub" v-if="item1.name === '接口日志'">
                            <router-link :to="{name: item1.name}" class="link">接口日志</router-link>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="3" v-for="item in navbars" v-if="item.name === '系统管理'">
                        <template slot="title">
                            <!-- <i class="el-icon-setting"></i> -->
                            <span slot="title">系统管理</span>
                        </template>
                        <el-menu-item index="3-1" v-for="item1 in item.sub" v-if="item1.name === '角色管理'">
                            <router-link :to="{name: item1.name}" class="link">角色管理</router-link>
                        </el-menu-item>
                        <el-menu-item index="3-2" v-for="item1 in item.sub" v-if="item1.name === '用户管理'">
                            <router-link :to="{name: item1.name}" class="link">用户管理</router-link>
                        </el-menu-item>
                        <el-menu-item index="3-3" v-for="item1 in item.sub" v-if="item1.name === '字典管理'">
                            <router-link :to="{name: item1.name}" class="link">字典管理</router-link>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
                <!-- <el-menu
                :default-openeds="[index]"
                class="el-menu-vertical-demo overf" 
                @open="handleopen" 
                @close="handleclose" 
                @select="handleselect"
                router 
                v-if="!collapsed">
                    <template v-for="(item,index) in navbars" v-if="!item.hidden">
                        <el-submenu :index="index + ''" v-if="item.name">
                            <template slot="title">{{item.name}}</template>
                                <router-link v-for="subs in item.sub" :key="subs.id" :name="subs.name"
                                :to="{name: subs.name}" tag="li"
                                :index="subs.id"
                                class="routerLink el-menu-item is-active">
                                    <a class="link">{{subs.name}}</a>
                                </router-link>
                        </el-submenu>
                    </template>
				</el-menu> -->
				<!--导航菜单-折叠后-->
                <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in navbars" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="$router.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
								<router-link :to="{name: subs.name}" 
                                tag="li" 
                                v-for="subs in item.sub" 
                                v-if="!subs.hidden" 
                                :key="subs.id" 
                                class="el-menu-item" style="padding-left: 40px;">{{subs.name}}</router-link>
                                <!-- :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)" -->
                            </ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<!-- <strong class="title">{{$route.name}}</strong> -->
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
        <!-- <transition mode="out-in"> -->
    <!--修改密码界面-->
		<el-dialog title="修改密码" v-model="editFormVisible" :close-on-click-modal="false" fullscreen="true">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="原密码" prop="old_pwd">
					<el-input v-model="editForm.old_pwd" type="password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="new_pwd">
					<el-input v-model="editForm.new_pwd" type="password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="重复密码" prop="confirm_pwd">
					<el-input type="password" v-model="editForm.confirm_pwd" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click="editUserSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
<!-- </transition> -->
	</el-row>
</template>

<script>
export default {
  data() {
    var validatePassword = (rule, value, callback) => {
      if (this.editForm.new_pwd === this.editForm.confirm_pwd) {
        callback();
      } else {
        callback(new Error("两次输入得新密码不一致"));
      }
    };

    return {
      sysName: "实地地产集团",
      collapsed: false,
      sysUserName: "",
      sysUserAvatar: "",
      navbars: [],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      editFormVisible: false,
      editLoading: false,
      editForm: {
        old_pwd: "",
        new_pwd: "",
        confirm_pwd: ""
      },
      editFormRules: {
        old_pwd: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
            message: "密码格式不正确(长度6-16位,密码组合必须包含英文字母、数字，区分大小写)"
          }
        ],
        new_pwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
            message: "密码格式不正确(长度6-16位,密码组合必须包含英文字母、数字，区分大小写)"
          }
        ],
        confirm_pwd: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
            message: "密码格式不正确(长度6-16位,密码组合必须包含英文字母、数字，区分大小写)"
          },
          { validator: validatePassword, trigger: "blur" }
        ]
      }
    };
  },
  beforeCreate() {
    this.$http({
      method: "post", //方法
      url: "login", //地址
      data: {
        oper_id: JSON.parse(localStorage.getItem("userName")),
        oper_pwd: JSON.parse(localStorage.getItem("userPwd"))
      },
      headers: {
        sign: localStorage.getItem("sign")
      }
    }).then(
      res => {
        this.navbars = res.data.data.permission_list;
      },
      err => {
        console.log(err);
      }
    );
  },
  methods: {
    editUserSubmit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$http({
            method: "post",
            url: "password/update",
            data: this.editForm,
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
                message: res.data.error_message,
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getUsers(1, 20);
            } else {
              this.$message.error(res.data.error_message);
              this.editFormVisible = true;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleEdit: function() {
      this.editFormVisible = true;
    },
    onSubmit() {
      console.log("submit!");
    },
    handleopen() {
      //console.log('handleopen');
    },
    handleclose() {
      //console.log('handleclose');
    },
    handleselect: function(a, b) {},
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          localStorage.removeItem("oper_id");
          _this.$router.push("/login");
        })
        .catch(() => {});
    },
    //折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    }
  },
  created() {
    this.sysUserName = JSON.parse(localStorage.getItem("userName"));
    // 获取导航栏ID
    this.listId = JSON.parse(localStorage.getItem("listId"));
    // console.log(this.listId);
    let listId = this.listId;
    for (var i in listId) {
      for (var j in listId[i].sub) {
        // console.log(listId[i].sub[j].name + ":" + listId[i].sub[j].id);
        localStorage.setItem(listId[i].sub[j].name, listId[i].sub[j].id);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "~scss_vars";
.overf {
  overflow: auto;
}
.link {
  text-decoration: none;
  display: block;
  width: 100%;
  color: #48576a;
}
// .router-link-active {
//   color: #fff;
// }
.el-submenu .is-active {
  background-color: #20a0ff;
}
.el-submenu__title {
  color: red;
}
.container {
  position: absolute;
  background-color: #ffffff;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: $color-primary;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          //   width: 15px;
          //   height: 16px;
          //   border-radius: 20px;
          margin: 28px 0px 0px 10px;
          float: right;
        }
      }
    }
    .logo {
      //width:230px;
      height: 60px;
      font-size: 28px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-width {
      width: 230px;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    // background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 230px;
      // position: absolute;
      // top: 0px;
      // bottom: 0px;
      .el-menu {
        height: 100%;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .content-container {
      // background: #f1f2f7;
      flex: 1;
      // position: absolute;
      // right: 0px;
      // top: 0px;
      // bottom: 0px;
      // left: 230px;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        //margin-bottom: 15px;
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: left;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>