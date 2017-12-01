<template>
    <section>
        <el-form :inline="true" :model="{addUser}"  status-icon :rules="rulesPerson">
            <el-col class="toolbar" style="border-radius: 4px;">
                <strong class="title">客户核心信息</strong>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item class="rulesinput" prop="cst_name" :rules="[{required: true, message: '客户名称不能为空'}]">
                            <el-input v-model="addUser.cst_name" placeholder="客户名称" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <el-select v-model="addUser.cst_type" placeholder="客户类型" style="width: 100%;">
                            <el-option value="个人客户">个人客户</el-option>
                            <el-option value="企业客户">企业客户</el-option>
                        </el-select>
                    </el-col>  
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <el-select v-model="addUser.gender" placeholder="性别" style="width: 100%;">
                            <el-option value="未知">未知</el-option>
                            <el-option value="男">男</el-option>
                            <el-option value="女">女</el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item class="rulesinput" prop="cst_phone">
                            <el-input v-model="addUser.cst_phone" placeholder="身份识别手机号" ></el-input>
                        </el-form-item>
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
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-date-picker v-model="addUser.birthday" type="date" placeholder="出生日期" :picker-options="pickerOptions0">
                        </el-date-picker>
                        <!-- <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker> -->
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <el-select v-model="addUser.cst_sort" placeholder="客户类别" style="width: 100%;">
                            <el-option value="业主">业主</el-option>
                            <el-option value="租户">租户</el-option>
                            <el-option value="其他">其他</el-option>
                        </el-select>
                    </el-col>
                </el-row>
            <!-- </el-col>
            <el-col class="toolbar" style="border-radius: 4px;"> -->
                <strong class="title">客户基础信息</strong>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.nationality" placeholder="国籍"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <el-input v-model="addUser.nation" placeholder="民族"></el-input>
                    </el-col>  
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <el-select v-model="addUser.viptag" placeholder="VIP客户" style="width: 100%;">
                            <el-option value="是">是</el-option>
                            <el-option value="否">否</el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.contact1" placeholder="手机号码1"></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.contact2" placeholder="手机号码2"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.contact3" placeholder="手机号码3"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.residential_phones" placeholder="家庭电话"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.office_phone" placeholder="公司电话"></el-input>
                    </el-col>
                </el-row><el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <el-select v-model="addUser.resided_state" placeholder="居住业态" style="width: 100%;">
                            <el-option value="高层住宅是">高层住宅</el-option>
                            <el-option value="商业">商业</el-option>
                            <el-option value="别墅">别墅</el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.height" placeholder="身高"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.weight" placeholder="体重"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.companyNum" placeholder="公司电话"></el-input>
                    </el-col>
                </el-row>
                </el-row><el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <el-select v-model="addUser.comefrom" placeholder="来自区域" style="width: 100%;">
                            <el-option value="中国大陆">中国大陆</el-option>
                            <el-option value="港/澳">港/澳</el-option>
                            <el-option value="台湾">台湾</el-option>
                            <el-option value="海外">海外</el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.home_area" placeholder="居住区域"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.work_area" placeholder="工作区域"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.address" placeholder="详细地址"></el-input>
                    </el-col>
                </el-row>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <el-select v-model="addUser.work_type" placeholder="职业身份" style="width: 100%;">
                            <el-option value="公务员">公务员</el-option>
                            <el-option value="教师">教师</el-option>
                            <el-option value="医生">医生</el-option>
                            <el-option value="普通员工">普通员工</el-option>
                            <el-option value="高级白领">高级白领</el-option>
                            <el-option value="事业单位">事业单位</el-option>
                            <el-option value="党政军干部">党政军干部</el-option>
                            <el-option value="企事业中高层管理人员">企事业中高层管理人员</el-option>
                            <el-option value="企事业基层管理/职员/公务员">企事业基层管理/职员/公务员</el-option>
                            <el-option value="职员/公务员">职员/公务员</el-option>
                            <el-option value="私企员工">私企员工</el-option>
                            <el-option value="私企老板">私企老板</el-option>
                            <el-option value="自雇">自雇</el-option>
                            <el-option value="个体户">个体户</el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.email" placeholder="电子邮箱"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.post_code" placeholder="邮政编码"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <el-select v-model="addUser.family" placeholder="家庭结构" style="width: 100%;">
                            <el-option value="单身贵族">单身贵族</el-option>
                            <el-option value="二人世界">二人世界</el-option>
                            <el-option value="单亲家庭">单亲家庭</el-option>
                            <el-option value="二代之家">二代之家</el-option>
                            <el-option value="三代同堂">三代同堂</el-option>
                            <el-option value="未知">未知</el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <el-input v-model="addUser.children_cnt" placeholder="子女人数:"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-select v-model="addUser.edu_level" placeholder="教育程度" style="width: 100%;">
                            <el-option value="未选择">未选择</el-option>
                            <el-option value="未知">未知</el-option>
                            <el-option value="高职/技校">高职/技校</el-option>
                            <el-option value="大专">大专</el-option>
                            <el-option value="大学">大学</el-option>
                            <el-option value="研究生以上">研究生以上</el-option>
                            <el-option value="其他">其他</el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-select v-model="addUser.have_bm" placeholder="有无保姆同住" style="width: 100%;">
                            <el-option value="有">有</el-option>
                            <el-option value="无">无</el-option>
                            <el-option value="未知">未知</el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <el-select v-model="addUser.ismain_jcz" placeholder="是否为主要决策者" style="width: 100%;">
                            <el-option value="是">是</el-option>
                            <el-option value="否">否</el-option>
                            <el-option value="不确定">不确定</el-option>
                        </el-select>
                    </el-col>
                </el-row><el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <el-select v-model="addUser.pet_stag" placeholder="是否养犬" style="width: 100%;">
                            <el-option value="是">是</el-option>
                            <el-option value="否">否</el-option>
                            <el-option value="不确定">不确定</el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.hobby" placeholder="兴趣爱好:"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="addUser.fax" placeholder="传真:"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <el-input v-model="addUser.pro_pertycnt" placeholder="置业次数:"></el-input>
                    </el-col>
                </el-row>
                <div class="fr">
                    <el-button @click="goback">取消</el-button>
                    <el-button type="primary" @click="sendPersonal">提交</el-button>
                </div>
            </el-col>

        </el-form>
        <el-form :inline="true" :model="{banks}"  status-icon :rules="rulesPerson">
            <el-col class="toolbar" style="border-radius: 4px;">
                <strong class="title">银行账户</strong>
                <el-row>
                    <el-button type="primary" @click="addBank">新增银行</el-button>
                </el-row>

              <!-- 新增银行 -->
                <el-form-item v-for="(bank, index) in banks">
                    <el-row :gutter="50">
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
                <div class="fr">
                    <el-button @click="goback">取消</el-button>
                    <el-button type="primary" @click="sendBank">提交</el-button>
                </div>
            </el-col>
        </el-form>
        <el-form :inline="true" :model="{relaCusts}"  status-icon :rules="rulesPerson">
            <el-col class="toolbar" style="border-radius: 4px;">
                <strong class="title">关联客户</strong>
                <el-row>
                    <el-button type="primary" @click="addRelaCust">新增关联客户</el-button>
                </el-row>
              <!-- 新增关联客户 -->
                <el-form-item v-for="(relaCust, index) in relaCusts" >
                    <el-row :gutter="50">
                        <el-col :span="4" style="padding-bottom: 0px;">
                            <el-input v-model="relaCust.cst_name" placeholder="客户姓名"></el-input>
                        </el-col>
                        <el-col :span="3" style="padding-bottom: 0px;">
                            <el-select v-model="relaCust.gender" placeholder="性别">
                                <el-option value="未知">未知</el-option>
                                <el-option value="男">男</el-option>
                                <el-option value="女">女</el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4" style="padding-bottom: 0px;">
                            <el-select v-model="relaCust.rela_type1" placeholder="关系类型1">
                                <el-option value="家人">家人</el-option>
                                <el-option value="保姆">保姆</el-option>
                                <el-option value="租户">租户</el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4" style="padding-bottom: 0px;">
                            <el-select v-model="relaCust.rela_type2" placeholder="关系类型2">
                                <el-option value="家人">家人</el-option>
                                <el-option value="保姆">保姆</el-option>
                                <el-option value="租户">租户</el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4" style="padding-bottom: 0px;">
                            <el-input v-model="relaCust.cst_phone" placeholder="手机号码"></el-input>
                        </el-col>
                        <el-col :span="2" style="padding-bottom: 0px;">
                            <el-button @click.prevent="removeRelaCust(relaCust)">移除</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <div class="fr">
                    <el-button @click="goback">取消</el-button>
                    <el-button type="primary" @click="sendRela">提交</el-button>
                </div>
            </el-col>
        </el-form>
    </section>
</template>
<style scoped>
.fr {
  float: right;
  margin: 10px 0;
}
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
.el-date-editor.el-input {
  width: 100%;
}
</style>

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
      banks: [
        {
          cust_id: "",
          bank_name: "",
          bank_delegate: "",
          bank_account_name: "",
          bank_account_cod: ""
        }
      ],
      relaCusts: [
        {
          cust_id: "",
          cst_name: "",
          gender: "",
          rela_type1: "",
          rela_type2: "",
          cst_phone: ""
        }
      ],
      addUser: {
        cst_name: "",
        cst_type: "",
        cst_phone: "",
        gender: "",
        card_type: "",
        cer_no: "",
        birthday: "",
        age_group: "",
        cst_sort: "",
        nationality: "",
        nation: "",
        viptag: "",
        contact1: "",
        contact2: "",
        contact3: "",
        residential_phones: "",
        office_phone: "",
        resided_state: "",
        height: "",
        weight: "",
        comefrom: "",
        home_area: "",
        work_area: "",
        address: "",
        work_type: "",
        email: "",
        post_code: "",
        family: "",
        children_cnt: "",
        edu_level: "",
        have_bm: "",
        ismain_jcz: "",
        pet_stag: "",
        hobby: "",
        fax: "",
        pro_pertycnt: "",
        gender: "",
        rela_type: "",
        rela_type2: ""
        // cst_phone: "",
      },
      rulesPerson: {
        cst_phone: [{ validator: validatePhone, trigger: "blur" }]
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  methods: {
    goback() {
      this.$router.back();
    },
    sendPersonal() {
      let addUser = this.addUser;
      let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$|^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}@[0-9]{1,3}$/;
      if (addUser.cst_phone == "") {
        alert("请输入手机号码");
      } else if (!reg.test(addUser.cst_phone)) {
        alert("手机格式不正确");
      } else {
        // 新增个人客户
        this.$http({
          method: "post",
          url: "cust/person/basic/add",
          data: addUser,
          headers: {
            sign: localStorage.getItem("sign")
          }
        }).then(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    sendBank() {
      // 新增个人客户银行卡
      let banks = this.banks;
      banks.cust_id = this.$router.query(cust_id);
      this.$http({
        method: "post",
        url: "cust/person/bank/add",
        data: banks,
        headers: {
          sign: localStorage.getItem("sign")
        }
      }).then(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    sendRela() {
      // 新增个人客户关联客户
      this.$http({
        method: "post",
        url: "cust/person/relation/add",
        data: addUser,
        headers: {
          sign: localStorage.getItem("sign")
        }
      }).then(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
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
    },
    removeRelaCust(item) {
      var index = this.relaCusts.indexOf(item);
      if (index !== -1) {
        this.addUser.splice(index, 1);
      }
    },
    addRelaCust() {
      this.addUser.push({
        value: "",
        key: Date.now()
      });
    }
  }
};
</script>

