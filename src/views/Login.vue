<template>
    <div class="bgLogo">
        <el-form :model="ruleForm2" ref="ruleForm2" :rules="rules2" label-position="left" class="demo-ruleForm login-container">
            <h3 class="title">实地客户主数据系统</h3>
            <el-form-item prop="oper_id">
                <el-input type="text" v-model="ruleForm2.oper_id" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="oper_pwd">
                <el-input type="password" v-model="ruleForm2.oper_pwd" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <!-- <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox> -->
            <span @click="rmPwd" class="remember">
                <el-checkbox v-model="checked" class="rm-box">记住密码</el-checkbox>
            </span>
            <el-button type="text" @click="forget" class="fr">忘记密码</el-button>
            <el-form-item class="wid">
                <el-button type="primary" class="wid" @click.native.prevent="handleSubmit2(ruleForm2)" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      data: [],
      logining: false,
      sign: "",
      msg: [],
      ruleForm2: {
        oper_id: "",
        oper_pwd: ""
      },
      rules2: {
        oper_id: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ],
        oper_pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ]
      },
      checked: false
    };
  },
  created: function() {
    var user = sessionStorage.getItem("user");
    user =
      user !== null && user !== undefined
        ? JSON.parse(user)
        : {
            oper_id: "",
            oper_pwd: ""
          };
    this._data.ruleForm2.oper_id = user.oper_id;
    this._data.ruleForm2.oper_pwd = user.oper_pwd;
  },
  methods: {
    forget() {
      this.$alert("请与系统管理员联系，找回密码。", "忘记密码", {
        confirmButtonText: "确定"
      });
    },
    // 登陆
    handleSubmit2(ruleForm2) {
      var self = this;
      self.$refs.ruleForm2.validate(valid => {
        if (valid) {
          self.logining = true;
          self
            .$http({
              method: "post",
              url: "login",
              data: self.ruleForm2
            })
            .then(
              res => {
                //   let { error_code } = res;
                if (
                  res.code == "ECONNABORTED" &&
                  res.message.indexOf("timeout") != -1
                ) {
                  this.$message.error("网络异常,请求超时");
                  self.logining = false;
                  return false;
                }
                if (
                  res.data.error_code == 0 &&
                  res.data.error_code != undefined
                ) {
                  self.sign = res.data.data.sign;
                  self.logining = false;
                  var has_permission =
                    res.data.data.permission_list !== undefined && //
                    res.data.data.permission_list !== null && //
                    res.data.data.permission_list.length > 0;
                  if (!has_permission) {
                    self.$message.error({
                      message: "您没有权限登录系统,请联系管理员",
                      type: "warning"
                    });
                    return false;
                  }
                  self.$message({
                    message: "登陆成功!",
                    type: "success"
                  });
                  localStorage.setItem(
                    "userPwd",
                    JSON.stringify(ruleForm2.oper_pwd)
                  );
                  localStorage.setItem(
                    "userName",
                    JSON.stringify(ruleForm2.oper_id)
                  );
                  localStorage.setItem("sign", JSON.stringify(self.sign));
                  localStorage.setItem(
                    "listId",
                    JSON.stringify(res.data.data.permission_list)
                  );

                  self.$router.push({ path: "/echarts" });
                } else {
                  self.logining = false;
                  self.$message.error(res.data.error_message);
                }
              },
              err => {
                self.$message.error(res.data.error_message);
              }
            );
        } else {
          self.$message.error(res.data.error_message);
        }
      });
    },
    rmPwd() {
      this.checked = !this.checked;
      // localStorage.setItem(
      //   ruleForm2.oper_pwd,
      //   JSON.stringify(ruleForm2.oper_pwd)
      // );
      if (this.checked) {
        sessionStorage.setItem("user", JSON.stringify(this._data.ruleForm2));
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.wid {
  width: 100%;
}
.bgLogo {
  height: 100%;
  width: 100%;
  background: url(../assets/loginbg.png) no-repeat;
  background-size: 100% 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: auto;
}
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 145px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  //   box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
  .remember .rm-box {
    color: #1d90e6;
  }
  .fr {
    float: right;
    margin-top: -5px;
  }
}
</style>