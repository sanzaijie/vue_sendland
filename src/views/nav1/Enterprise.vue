<template>
    <section>
        <el-form :inline="true" :model="addUser" status-icon :rules="rulesEnter">
            <el-col class="toolbar" style="border-radius: 4px;">
                <strong class="title">客户核心信息</strong>
                <el-row :gutter="50">
                     <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item class="rulesinput" prop="cst_name" :rules="[{required: true, message: '公司名称不能为空'}]">
                            <el-input v-model="addUser.cst_name" placeholder="公司名称" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.fax" placeholder="传真"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.corporation" placeholder="法人代表"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.func_type" placeholder="资金类别"></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.enter_nature" placeholder="公司类别"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.by_sector" placeholder="所属行业"></el-input>
                    </el-col> 
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.lic_no" placeholder="营业执照"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.orientation" placeholder="主营业务"></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="50"> 
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <el-select v-model="addUser.card_type" placeholder="证件类型" style="width: 100%;">
                            <el-option value="身份证">身份证</el-option>
                            <el-option value="护照">护照</el-option>
                            <el-option value="军官证">军官证</el-option>
                            <el-option value="港澳身份证">港澳身份证</el-option>
                            <el-option value="台胞证">台胞证</el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.cer_no" placeholder="证件号码"></el-input>
                    </el-col>
                </el-row>
            </el-col>

            <el-col class="toolbar" style="border-radius: 4px;">
                <strong class="title">银行账户</strong>
                <el-row>
                    <el-button type="primary" @click="addBank">新增银行</el-button>
                </el-row>

              <!-- 新增银行 -->
              <el-form-item v-for="(bank, index) in addUser.banks">
                <el-row :gutter="50">
                    <el-col :span="4" style="padding-bottom: 0px;">
                       <el-select v-model="bank.bank_delegate" placeholder="卡类型">
                        <el-option value="储蓄卡">储蓄卡</el-option>
                        <el-option value="信用卡">信用卡</el-option>
                        <el-option value="准贷记卡">准贷记卡</el-option>
                    </el-select>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                       <el-input v-model="bank.bank_name" placeholder="开户行"></el-input>
                    </el-col>
                    <el-col :span="5" style="padding-bottom: 0px;">
                       <el-input v-model="bank.bank_account_name" placeholder="开户姓名"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                       <el-input v-model="bank.bank_account_code" placeholder="银行账号"></el-input>
                    </el-col>
                <el-col :span="2" style="padding-bottom: 0px;">
                <el-button @click.prevent="removeBank(bank)">移除</el-button>
                </el-col>
                </el-row>
              </el-form-item>
            </el-col>

            <el-col class="toolbar" style="border-radius: 4px;">
                <strong class="title">联系人</strong>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.link_man" placeholder="联系人姓名"></el-input>
                        </el-col>
                        <el-col :span="6" style="padding-bottom: 0px;">
                            <el-form-item prop="cst_phone" class="rulesinput">   
                                <el-input v-model="addUser.cst_phone" placeholder="身份识别手机号"></el-input>
                            </el-form-item>
                        </el-col>  
                        <el-col :span="6" style="padding-bottom: 0px;">
                            <el-input v-model="addUser.contact1" placeholder="手机号码1"></el-input>
                        </el-col>
                        <el-col :span="6" style="padding-bottom: 0px;">
                            <el-input v-model="addUser.contact2" placeholder="手机号码2"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="50">
                        <el-col :span="6" style="padding-bottom: 0px;">
                            <el-input v-model="addUser.contact3" placeholder="手机号码3"></el-input>
                        </el-col>
                        <el-col :span="6" style="padding-bottom: 0px;">
                            <el-input v-model="addUser.email" placeholder="电子邮箱"></el-input>
                        </el-col>
                    </el-row>
                </el-col>
              </el-form-item>
            </el-col>   
        </el-form>
        <el-col :span="3">
			<el-button @click="goBack1">取消</el-button>
			<el-button type="primary">提交</el-button>
		</el-col>
    </section>
</template>
<script>
export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (value === "") {
        callback(new Error("请输入手机号码!"));
      } else if (!reg.test(value)) {
        callback(new Error("手机号码格式不正确!"));
      } else {
        callback();
      }
    };
    return {
      addUser: {
        banks: [
          {
            bank_name: "",
            bank_delegate: "",
            bank_account_name: "",
            bank_account_cod: ""
          }
        ],
        cst_name: "",
        cst_type: "",
        cst_phone: "",
        corporation: "",
        func_type: "",
        enter_nature: "",
        by_sector: "",
        lic_no: "",
        orientation: "",
        card_type: "",
        cer_no: "",
        link_man: "",
        contact1: "",
        contact2: "",
        contact3: "",
        email: "",
        fax: ""
      },
      rulesEnter: {
        cst_phone: [{ validator: validatePhone, trigger: "blur" }]
      }
    };
  },
  methods: {
    goBack1() {
      this.$router.back();
    },
    send() {
      let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$|^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}@[0-9]{1,3}$/;
      if (addUser.cst_phone == "") {
        alert("请输入手机号码");
      } else if (!reg.test(addUser.cst_phone)) {
        alert("手机格式不正确");
      }
    },
    removeBank(item) {
      var index = this.addUser.banks.indexOf(item);
      if (index !== -1) {
        this.addUser.banks.splice(index, 1);
      }
    },
    addBank() {
      this.addUser.banks.push({
        value: "",
        key: Date.now()
      });
    }
  }
};
</script>

<style scoped>
.rulesinput {
  width: 100%;
}
.rulesinput .el-input {
  width: 125%;
}
.title {
  display: block;
  margin-bottom: 10px;
  border-left: 4px solid #0a8ddf;
  padding-left: 5px;
}
.toolbar {
  background: #f2f2f2;
  padding: 10px 30px 15px 30px;
  margin: 10px 0px;
}
.el-row {
  margin-bottom: 15px;
}
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
</style>