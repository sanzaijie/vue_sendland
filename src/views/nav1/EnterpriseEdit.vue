<template>
    <section class="bg">
        <el-form :model="{addUser}" :rules="rules" ref="addUser" class="formBG demo-form-inline">
            <el-row class="rows">
                <strong class="title">客户核心信息</strong>
                    <el-col :span="6">
                        <el-form-item label="公司名称" prop="cst_name">
                            <el-input v-model="addUser.cst_name" placeholder="公司名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="客户类型" prop="cst_type">   
                          <el-input v-model="addUser.cst_type" placeholder="客户类型" disabled="disabled"></el-input>
                            <!-- <el-select v-model="addUser.cst_type" placeholder="客户类型">
                                <el-option value="0" label="个人客户">个人客户</el-option>
                                <el-option value="1" label="企业客户">企业客户</el-option>
                            </el-select> -->
                        </el-form-item>  
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="法人代表">   
                            <el-input v-model="addUser.corporation" placeholder="法人代表"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="资金类别">
                            <el-input v-model="addUser.func_type" placeholder="资金类别"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="公司类别">                          
                            <el-input v-model="addUser.enter_nature" placeholder="公司类别"></el-input>         
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="所属行业">
                            <el-input v-model="addUser.by_sector" placeholder="所属行业"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6"> 
                        <el-form-item :span="6" label="营业执照" prop="birthday">
                            <el-input v-model="addUser.lic_no" placeholder="营业执照"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6"> 
                        <el-form-item :span="6" label="主营业务" prop="birthday">
                            <el-input v-model="addUser.orientation" placeholder="主营业务"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="证件类型">                          
                            <el-select v-model="addUser.cer_type" placeholder="证件类型">
                                <el-option value="-1" label="未知">未知</el-option>
                                <el-option value="0" label="身份证">身份证</el-option>
                                <el-option value="1" label="护照">护照</el-option>
                                <el-option value="2" label="军官证">军官证</el-option>
                                <el-option value="3" label="港澳身份证">港澳身份证</el-option>
                                <el-option value="4" label="台胞证">台胞证</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6"> 
                        <el-form-item :span="6" label="证件号码">
                            <el-input v-model="addUser.cer_no" placeholder="证件号码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6"> 
                        <el-form-item :span="6" label="传真">
                            <el-input v-model="addUser.fax" placeholder="传真"></el-input>
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row class="rows">
                <strong class="title">联系人</strong>
                <el-col :span="6">
                    <el-form-item label="联系人姓名" prop="cst_name">
                        <el-input v-model="addUser.link_man" placeholder="联系人姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="身份识别手机号" prop="cst_phone">
                        <el-input v-model="addUser.cst_phone" placeholder="身份识别手机号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="手机号码1">
                        <el-input v-model="addUser.contact1" placeholder="手机号码1"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="手机号码2">
                        <el-input v-model="addUser.contact2" placeholder="手机号码2"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="手机号码3">
                        <el-input v-model="addUser.contact3" placeholder="手机号码3"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item :span="6" label="电子邮箱">
                        <el-input v-model="addUser.email" placeholder="电子邮箱"></el-input>
                    </el-form-item>
                </el-col>
                <el-col>
                    <div class="fr">
                        <el-button @click="goback">取消</el-button>
                        <el-button type="primary" @click="send">提交</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-form>
        <hr />
        <el-form :model="{banks}" :rules="rules" ref="banks">        
            <el-col class="toolbar">
                <strong class="title">银行账户</strong>
                <el-row>
                    <el-button type="primary" @click="addBank">新增银行</el-button>
                </el-row>

              <!-- 新增银行 -->
                <el-form-item v-for="(bank, index) in banks">
                    <el-row :gutter="20">
                        <el-input v-model="bank.aid" v-show="false"></el-input>
                        <el-col :span="4" style="padding-bottom: 0px;">
                            <el-select v-model="bank.bank_delegate" placeholder="卡类型">
                                <el-option value="1" label="储蓄卡">储蓄卡</el-option>
                                <el-option value="2" label="信用卡">信用卡</el-option>
                                <el-option value="3" label="准贷记卡">准贷记卡</el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="6" style="padding-bottom: 0px;">
                            <el-input v-model="bank.bank_name" placeholder="开户行"></el-input>
                        </el-col>
                        <el-col :span="4" style="padding-bottom: 0px;">
                            <el-input v-model="bank.bank_account_name" placeholder="开户姓名"></el-input>
                        </el-col>
                        <el-col :span="6" style="padding-bottom: 0px;">
                            <el-input v-model="bank.bank_account_code" placeholder="银行账号"></el-input>
                        </el-col>
                        <el-col :span="4" style="padding-bottom: 0px;">
                            <el-button @click.prevent="removeBank(bank)">移除</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <div class="fr">
                    <el-button @click="goback">取消</el-button>
                    <el-button type="primary" @click="sendBank">提交</el-button>
                </div>
            </el-col>
        </el-form>
        <!-- <hr />
        <el-form :model="{addUser}" :rules="rules" ref="addUser" class="formBG demo-form-inline">                
            <el-row class="rows">
                <strong class="title">联系人</strong>
                <el-col :span="6">
                    <el-form-item label="联系人姓名" prop="cst_name">
                        <el-input v-model="addUser.link_man" placeholder="联系人姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="身份识别手机号" prop="cst_phone">
                        <el-input v-model="addUser.cst_phone" placeholder="身份识别手机号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="手机号码1">
                        <el-input v-model="addUser.contact1" placeholder="手机号码1"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="手机号码2">
                        <el-input v-model="addUser.contact2" placeholder="手机号码2"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="手机号码3">
                        <el-input v-model="addUser.contact3" placeholder="手机号码3"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item :span="6" label="电子邮箱">
                        <el-input v-model="addUser.email" placeholder="电子邮箱"></el-input>
                    </el-form-item>
                </el-col>
                <div class="fr">
                    <el-button @click="goback">取消</el-button>
                    <el-button type="primary" @click="send">提交</el-button>
                </div>
            </el-row>
        </el-form> -->
    </section>
</template>

<script>
import * as change from "../../api/change.js";

export default {
  data() {
    return {
      rules: {
        cst_name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        cst_phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }]
      },
      banks: [
        {
          aid: 0,
          bank_name: "",
          bank_delegate: "",
          bank_account_name: "",
          bank_account_code: ""
        }
      ],
      addUser: {
        cst_name: "",
        cst_type: "", // 客户类型(0个人、1公司)
        corporation: "",
        func_type: "",
        enter_nature: "",
        by_sector: "",
        lic_no: "",
        orientation: "",
        cer_type: "", // 证件类型(0 身份证,1 护照,2 军官证,3 港澳身份证,4 台胞证)
        cer_no: "",
        fax: "",
        link_man: "",
        cst_phone: null,
        contact1: null,
        contact2: null,
        contact3: null,
        email: ""
      }
    };
  },
  methods: {
    // 获取企业客户银行卡详细信息
    getBanks() {
      this.$http({
        method: "post",
        url: "cust/company/bank/detail",
        data: {
          cust_id: this.$route.query.cust_id
        },
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
        if (res.data.data) {
          this.banks = res.data.data;
        }
      });
    },
    goback() {
      this.$router.back();
    },
    send() {
      let addUser = this.addUser;
      addUser.cst_type = 1;
      addUser.cust_id = this.$route.query.cust_id;
      let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$|^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}@[0-9]{1,3}$/;
      if (addUser.cst_phone == "") {
        alert("请输入手机号码");
      } else if (!reg.test(addUser.cst_phone)) {
        alert("手机格式不正确");
      } else {
        this.$http({
          method: "post",
          url: "cust/company/basic/update",
          data: addUser,
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
              message: "更新成功!",
              type: "success"
            });
            setTimeout("window.opener = null;window.close();", 2000);
          } else {
            this.$message.error(res.data.error_message);
          }
        });
      }
    },
    sendBank() {
      // 新增个人客户银行卡
      for (let item of this.banks) {
        if (item.aid != null && item.aid != 0 && item.aid != "") {
          item.aid = parseInt(item.aid);
          this.$http({
            // 更新银行卡
            method: "post",
            url: "cust/company/bank/update",
            data: {
              cust_id: this.$route.query.cust_id,
              bank_list: [item]
            },
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
                message: "银行卡更新成功!",
                type: "success"
              });
              this.getBanks();
              // banks = res.data.data.bank_list;
            } else {
              this.$message.error(res.data.error_message);
            }
          });
        } else {
          item.aid = null;
          this.$http({
            // 新增银行卡
            method: "post",
            url: "cust/company/bank/add",
            data: {
              cust_id: this.$route.query.cust_id,
              bank_list: [item]
            },
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
                message: "银行卡更新成功!",
                type: "success"
              });
              this.getBanks();
              //   banks = res.data.data.bank_list;
            } else {
              this.$message.error(res.data.error_message);
            }
          });
        }
      }
    },
    removeBank(item) {
      var index = this.banks.indexOf(item);
      if (index !== -1) {
        this.banks.splice(index, 1);
      }
    },
    addBank() {
      this.banks.push({
        value: "",
        key: Date.now()
      });
    }
    // removeRelaCust(item) {
    //   var index = this.addUser.relaCusts.indexOf(item);
    //   if (index !== -1) {
    //     this.addUser.relaCusts.splice(index, 1);
    //   }
    // },
    // addRelaCust() {
    //   this.addUser.relaCusts.push({
    //     value: "",
    //     key: Date.now()
    //   });
    // }
  },
  mounted() {
    // 获取企业客户基本信息
    this.$http({
      method: "post",
      url: "cust/company/basic/detail",
      data: {
        cust_id: this.$route.query.cust_id
      },
      headers: {
        sign: localStorage.getItem("sign")
      }
    }).then(res => {
      if (res.code == "ECONNABORTED" && res.message.indexOf("timeout") != -1) {
        this.$message.error("网络异常,请求超时");
        return false;
      }
      this.addUser = res.data.data;
      let usersG = this.addUser;
      usersG.cst_type = "企业客户";
      usersG.card_type = String(usersG.card_type);
      this.addUser = usersG;
    });
    // 获取企业客户银行卡详细信息
    this.$http({
      method: "post",
      url: "cust/company/bank/detail",
      data: {
        cust_id: this.$route.query.cust_id
      },
      headers: {
        sign: localStorage.getItem("sign")
      }
    }).then(res => {
      if (res.code == "ECONNABORTED" && res.message.indexOf("timeout") != -1) {
        this.$message.error("网络异常,请求超时");
        return false;
      }
      if (res.data.data) {
        this.banks = res.data.data;
      }
    });
  }
};
</script>

<style scoped>
.fr {
  /* float: right; */
  margin: 10px 0;
  width: 100%;
  text-align: right;
}
.btnRow {
  margin: 10px;
  text-align: right;
}
hr {
  margin: 0;
}
.el-form-item {
  width: 88%;
}
.el-form-item > label {
  width: 30%;
}
.rows {
  padding: 20px;
  background-color: #f2f2f2;
  /* border-radius: 5px; */
  /* margin: 15px; */
}
.bg {
  background: #ffffff;
  height: 100%;
}
.title {
  display: block;
  /* margin: 10px 20px; */
  border-left: 4px solid #0a8ddf;
  padding-left: 5px;
}
.toolbar {
  background: #f2f2f2;
  padding: 10px 30px 15px 20px;
  margin: 0;
}
.toolbar .title {
  display: block;
  margin: 15px 0px;
  border-left: 4px solid #0a8ddf;
  padding-left: 5px;
}
.toolbar .el-row {
  margin-bottom: 15px;
}
/* .el-row {
  margin-bottom: 15px;
} */
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-date-editor.el-input {
  width: 100%;
}
.el-select {
  width: 100%;
}
</style>
