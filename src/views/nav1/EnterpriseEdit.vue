<template>
    <section class="bg">
        <el-form :model="addUser" :rules="rules" ref="addUser" class="formBG demo-form-inline">
                <el-row class="rows">
                    <strong class="title">客户核心信息</strong>
                    <el-col :span="6">
                        <el-form-item label="客户名称" prop="cst_name">
                            <el-input v-model="addUser.cst_name" placeholder="客户名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="客户类型" prop="addUser.cst_type">   
                            <el-select v-model="addUser.cst_type" placeholder="客户类型">
                                <el-option value="0">个人客户</el-option>
                                <el-option value="1">企业客户</el-option>
                            </el-select>
                        </el-form-item>  
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="性别" prop="addUser.gender">   
                            <el-select v-model="addUser.gender" placeholder="性别">
                                <el-option value="2">未知</el-option>
                                <el-option value="0">男</el-option>
                                <el-option value="1">女</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="手机号" prop="cst_phone">
                            <el-input v-model="addUser.cst_phone" placeholder="身份识别手机号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="证件类型" prop="addUser.card_type">                          
                            <el-select v-model="addUser.card_type" placeholder="证件类型">
                                <el-option value="0">身份证</el-option>
                                <el-option value="1">护照</el-option>
                                <el-option value="2">军官证</el-option>
                                <el-option value="3">港澳身份证</el-option>
                                <el-option value="4">台胞证</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="证件号码" prop="cer_no">
                            <el-input v-model="addUser.cer_no" placeholder="证件号码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6"> 
                        <el-form-item :span="6" label="出生日期" prop="birthday">
                            <el-date-picker v-model="addUser.birthday" type="date" placeholder="出生日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="客户类别" prop="cst_sort">  
                            <el-select v-model="addUser.cst_sort" placeholder="客户类别">
                                <el-option value="0">业主</el-option>
                                <el-option value="1">租户</el-option>
                                <el-option value="2">其他</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <hr />
                <el-row class="rows">
                    <strong class="title">客户基础信息</strong>
                    <el-col :span="6">
                        <el-form-item :span="6" label="国籍" prop="nationality"> 
                            <el-input v-model="addUser.nationality" placeholder="国籍"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="民族国籍" prop="nation">   
                            <el-input v-model="addUser.nation" placeholder="民族"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">  
                        <el-form-item :span="6" label="VIP客户国籍" prop="viptag">  
                            <el-select v-model="addUser.viptag" placeholder="VIP客户">
                                <el-option value="1">是</el-option>
                                <el-option value="0">否</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="手机号码1" prop="contact1"> 
                            <el-input v-model="addUser.contact1" placeholder="手机号码1"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="手机号码2" prop="contact2"> 
                            <el-input v-model="addUser.contact2" placeholder="手机号码2"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="手机号码3" prop="contact3"> 
                            <el-input v-model="addUser.contact3" placeholder="手机号码3"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="家庭电话" prop="residential_phones"> 
                            <el-input v-model="addUser.residential_phones" placeholder="家庭电话"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="公司电话" prop="office_phone"> 
                            <el-input v-model="addUser.office_phone" placeholder="公司电话"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="居住业态" prop="resided_state">  
                            <el-select v-model="addUser.resided_state" placeholder="居住业态">
                                <el-option value="1">高层住宅</el-option>
                                <el-option value="2">商业</el-option>
                                <el-option value="3">别墅</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="身高" prop="height">
                            <el-input v-model="addUser.height" placeholder="身高"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="体重" prop="weight">
                            <el-input v-model="addUser.weight" placeholder="体重"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="置业次数" prop="pro_pertycnt">  
                            <el-input v-model="addUser.pro_pertycnt" placeholder="置业次数:"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="来自区域" prop="comefrom">    
                            <el-select v-model="addUser.comefrom" placeholder="来自区域">
                                <el-option value="1">中国大陆</el-option>
                                <el-option value="2">港/澳</el-option>
                                <el-option value="3">台湾</el-option>
                                <el-option value="4">海外</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="居住区域" prop="home_area">  
                            <el-input v-model="addUser.home_area" placeholder="居住区域"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="工作区域" prop="work_area">  
                            <el-input v-model="addUser.work_area" placeholder="工作区域"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="详细地址" prop="address">  
                            <el-input v-model="addUser.address" placeholder="详细地址"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="职业身份" prop="work_type">   
                            <el-select v-model="addUser.work_type" placeholder="职业身份">
                                <el-option value="108">公务员</el-option>
                                <el-option value="109">教师</el-option>
                                <el-option value="110">医生</el-option>
                                <el-option value="111">普通员工</el-option>
                                <el-option value="112">高级白领</el-option>
                                <el-option value="113">事业单位</el-option>
                                <el-option value="1">党政军干部</el-option>
                                <el-option value="102">企事业中高层管理人员</el-option>
                                <el-option value="103">企事业基层管理/职员/公务员</el-option>
                                <el-option value="104">私企员工</el-option>
                                <el-option value="105">私企老板</el-option>
                                <el-option value="106">自雇</el-option>
                                <el-option value="107">个体户</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="电子邮箱" prop="email"> 
                            <el-input v-model="addUser.email" placeholder="电子邮箱"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="邮政编码" prop="post_code"> 
                            <el-input v-model="addUser.post_code" placeholder="邮政编码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="家庭结构" prop="family"> 
                            <el-select v-model="addUser.family" placeholder="家庭结构">
                                <el-option value="1">单身贵族</el-option>
                                <el-option value="2">二人世界</el-option>
                                <el-option value="3">单亲家庭</el-option>
                                <el-option value="4">二代之家</el-option>
                                <el-option value="5">三代同堂</el-option>
                                <el-option value="0">未知</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="子女人数" prop="children_cnt">   
                            <el-input v-model="addUser.children_cnt" placeholder="子女人数"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="教育程度" prop="edu_level"> 
                            <el-select v-model="addUser.edu_level" placeholder="教育程度">
                                <el-option value="0">未选择</el-option>
                                <el-option value="6">未知</el-option>
                                <el-option value="1">高职/技校</el-option>
                                <el-option value="2">大专</el-option>
                                <el-option value="3">大学</el-option>
                                <el-option value="4">研究生以上</el-option>
                                <el-option value="5">其他</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="有无保姆" prop="have_bm"> 
                            <el-select v-model="addUser.have_bm" placeholder="有无保姆同住">
                                <el-option value="1">有</el-option>
                                <el-option value="0">无</el-option>
                                <el-option value="2">未知</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="主要决策者" prop="ismain_jcz"> 
                            <el-select v-model="addUser.ismain_jcz" placeholder="是否为主要决策者">
                                <el-option value="1">是</el-option>
                                <el-option value="0">否</el-option>
                                <el-option value="2">不确定</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="是否养犬" prop="pet_stag"> 
                            <el-select v-model="addUser.pet_stag" placeholder="是否养犬">
                                <el-option value="1">是</el-option>
                                <el-option value="0">否</el-option>
                                <el-option value="2">不确定</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="兴趣爱好" prop="hobby"> 
                            <el-input v-model="addUser.hobby" placeholder="兴趣爱好"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :span="6" label="传真" prop="fax"> 
                            <el-input v-model="addUser.fax" placeholder="传真"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            <hr />
            <el-col class="toolbar">
                <strong class="title">银行账户</strong>
                <el-row>
                    <el-button type="primary" @click="addBank">新增银行</el-button>
                </el-row>

              <!-- 新增银行 -->
              <el-form-item v-for="(bank, index) in addUser.banks">
                <el-row :gutter="20">
                    <el-col :span="4" style="padding-bottom: 0px;">
                       <el-select v-model="bank.bank_delegate" placeholder="卡类型">
                        <el-option value="1">储蓄卡</el-option>
                        <el-option value="2">信用卡</el-option>
                        <el-option value="3">准贷记卡</el-option>
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
            </el-col>
            <hr />
            <el-col class="toolbar">
                <strong class="title">关联客户</strong>
                <el-row>
                    <el-button type="primary" @click="addRelaCust">新增关联客户</el-button>
                </el-row>
              <!-- 新增关联客户 -->
              <el-form-item v-for="(relaCust, index) in addUser.relaCusts" >
                <el-row :gutter="20">
                    <el-col :span="4" style="padding-bottom: 0px;">
                       <el-input v-model="relaCust.cst_name" placeholder="客户姓名"></el-input>
                    </el-col>
                    <el-col :span="4" style="padding-bottom: 0px;">
                    <el-select v-model="relaCust.gender" placeholder="性别">
                        <el-option value="2">未知</el-option>
                        <el-option value="0">男</el-option>
                        <el-option value="1">女</el-option>
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
                <el-col :span="4" style="padding-bottom: 0px;">
                <el-button @click.prevent="removeRelaCust(relaCust)">移除</el-button>
                </el-col>
                </el-row>
              </el-form-item>
            </el-col>
        </el-form>
        <hr />
        <!-- <el-form-item :span="3" push=21> -->
        <el-row class="btnRow">
			<el-button @click="goback">取消</el-button>
			<el-button type="primary" @click="send">提交</el-button>
        </el-row>
		<!-- </el-form-item> -->
    </section>
</template>

<script>
import * as change from "../../api/change.js";

export default {
  data() {
    return {
      rules: {
        cst_name: [{ required: true, message: "请输入客户姓名", trigger: "blur" }],
        cst_phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }]
      },
      addUser: {
        banks: [
          {
            bank_name: "",
            bank_delegate: "",
            bank_account_name: "",
            bank_account_cod: ""
          }
        ],
        relaCusts: [
          {
            cst_name: "",
            gender: "",
            rela_type1: "",
            rela_type2: "",
            cst_phone: ""
          }
        ],
        cust_id: "",
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
        rela_type2: "",
        bank_delegate: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    goback() {
      this.$router.back();
    },
    send() {
      let addUser = this.addUser;
      addUser.cust_id = this.$route.query.cust_id;
      console.log(addUser.cust_id);
      //   let id = {
      //     cust_id: this.$router.query.cust_id
      //   };
      let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$|^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}@[0-9]{1,3}$/;
      if (addUser.cst_phone == "") {
        alert("请输入手机号码");
      } else if (!reg.test(addUser.cst_phone)) {
        alert("手机格式不正确");
      } else {
        this.$http({
          method: "post",
          url: "cust/person/basic/update",
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
    },
    removeRelaCust(item) {
      var index = this.addUser.relaCusts.indexOf(item);
      if (index !== -1) {
        this.addUser.relaCusts.splice(index, 1);
      }
    },
    addRelaCust() {
      this.addUser.relaCusts.push({
        value: "",
        key: Date.now()
      });
    }
  }
};
</script>

<style scoped>
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
  margin: 10px 20px;
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
