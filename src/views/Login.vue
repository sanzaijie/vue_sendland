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
      <el-checkbox v-model="checked" class="remember" @click="rmPwd">记住密码</el-checkbox>
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
              data: self.ruleForm2,
              timeout: 1000,
              headers: {
                //'Accept': 'application/json, text/plain, */*',
                //'Content-Type': 'application/json, text/plain, */*'
                //charset=utf-8
                'Content-Type': 'application/json'
              }
            })
            .then(
            res => {
              self.sign = res.data.data.sign;
              self.logining = false;
              let { error_code } = res;
              if (res.error_code == 30004) {
                alert(res.error_message);
              } else {
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
                self.$router.push({ path: "/custList" });
              }
            },
            err => {
              console.log(err);
              source.cancel("Operation canceled by the user.");
            }
            );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    rmPwd() {
      this.checked = !this.checked;
      localStorage.setItem(
        ruleForm2.oper_pwd,
        JSON.stringify(ruleForm2.oper_pwd)
      );
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
  border: 1px solid #eaeaea; //   box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
  .fr {
    float: right;
    margin-top: -5px;
  }
}
</style>