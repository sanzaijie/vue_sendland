<template>
    <section class="bg">
        <el-form :model="addUser" :rules="rulesPerson" ref="addUser" class="formBG demo-form-inline">
            <el-row class="rows">
                <strong class="title">客户核心信息</strong>
                <el-col :span="6">
                    <el-form-item label="客户名称" prop="cst_name">
                        <el-input v-model="addUser.cst_name" placeholder="客户名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="客户类型" prop="cst_type">   
                       <el-input v-model="addUser.cst_type" placeholder="客户类型" disabled="disabled"></el-input>
                        <!-- <el-select v-model="addUser.cst_type" placeholder="客户类型" >
                            <el-option value="0" label="个人客户">个人客户</el-option>
                            <el-option value="1" label="企业客户">企业客户</el-option>
                        </el-select> -->
                    </el-form-item>  
                </el-col>
                <el-col :span="6">
                    <el-form-item label="性别" prop="gender">   
                        <el-select v-model="addUser.gender" placeholder="性别">
                            <el-option value="2" label="未知">未知</el-option>
                            <el-option value="0" label="男">男</el-option>
                            <el-option value="1" label="女">女</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="手机号" prop="cst_phone">
                        <el-input v-model="addUser.cst_phone" placeholder="身份识别手机号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item :span="6" label="证件类型" prop="card_type">                          
                        <el-select v-model="addUser.card_type" placeholder="证件类型">
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
                    <el-form-item :span="6" label="证件号码" prop="cer_no">
                        <el-input v-model="addUser.cer_no" placeholder="证件号码"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6"> 
                    <el-form-item :span="6" label="出生日期">
                        <el-date-picker v-model="addUser.birthday" type="date" format="yyyy/MM/dd" value-format="yyyy/MM/dd" placeholder="出生日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item :span="6" label="客户类别" prop="cst_sort">  
                        <el-select v-model="addUser.cst_sort" placeholder="客户类别">
                            <el-option value="0" label="业主">业主</el-option>
                            <el-option value="1" label="租户">租户</el-option>
                            <el-option value="2" label="其他">其他</el-option>
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
                            <el-option value="1" label="是">是</el-option>
                            <el-option value="0" label="否">否</el-option>
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
                            <el-option value="1" label="高层住宅">高层住宅</el-option>
                            <el-option value="2" label="商业">商业</el-option>
                            <el-option value="3" label="别墅">别墅</el-option>
                            <el-option value="4" label="未知">未知</el-option>
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
                            <el-option value="1" label="中国大陆"></el-option>
                            <el-option  value="2" label="港/澳"></el-option>
                            <el-option  value="3" label="台湾"></el-option>
                            <el-option  value="4" label="海外"></el-option>
                            <!-- <el-option key="1" value="1" label="中国大陆">中国大陆</el-option>
                            <el-option key="2" value="2" label="港/澳">港/澳</el-option>
                            <el-option key="3" value="3" label="台湾">台湾</el-option>
                            <el-option key="4" value="4" label="海外">海外</el-option> -->
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
                            <el-option value="108" label="公务员">公务员</el-option>
                            <el-option value="109" label="教师">教师</el-option>
                            <el-option value="110" label="医生">医生</el-option>
                            <el-option value="111" label="普通员工">普通员工</el-option>
                            <el-option value="112" label="高级白领">高级白领</el-option>
                            <el-option value="113" label="事业单位">事业单位</el-option>
                            <el-option value="101" label="党政军干部">党政军干部</el-option>
                            <el-option value="102" label="企事业中高层管理人员">企事业中高层管理人员</el-option>
                            <el-option value="103" label="企事业基层管理/职员/公务员">企事业基层管理/职员/公务员</el-option>
                            <el-option value="104" label="私企员工">私企员工</el-option>
                            <el-option value="105" label="私企老板">私企老板</el-option>
                            <el-option value="106" label="自雇">自雇</el-option>
                            <el-option value="107" label="个体户">个体户</el-option>
                            <el-option value="-1" label="未知"></el-option>
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
                            <el-option value="1" label="单身贵族">单身贵族</el-option>
                            <el-option value="2" label="二人世界">二人世界</el-option>
                            <el-option value="3" label="单亲家庭">单亲家庭</el-option>
                            <el-option value="4" label="二代之家">二代之家</el-option>
                            <el-option value="5" label="三代同堂">三代同堂</el-option>
                            <el-option value="6" label="未知">未知</el-option>
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
                            <el-option value="7" label="未选择">未选择</el-option>
                            <el-option value="6" label="未知">未知</el-option>
                            <el-option value="1" label="高职/技校">高职/技校</el-option>
                            <el-option value="2" label="大专">大专</el-option>
                            <el-option value="3" label="大学">大学</el-option>
                            <el-option value="4" label="研究生以上">研究生以上</el-option>
                            <el-option value="5" label="其他">其他</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item :span="6" label="有无保姆" prop="have_bm"> 
                        <el-select v-model="addUser.have_bm" placeholder="有无保姆同住">
                            <el-option value="1" label="有">有</el-option>
                            <el-option value="0" label="无">无</el-option>
                            <el-option value="2" label="未知">未知</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item :span="6" label="主要决策者" prop="ismain_jcz"> 
                        <el-select v-model="addUser.ismain_jcz" placeholder="是否为主要决策者">
                            <el-option value="0" label="是">是</el-option>
                            <el-option value="1" label="否">否</el-option>
                            <el-option value="2" label="不确定">不确定</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item :span="6" label="是否养犬" prop="pet_stag"> 
                        <el-select v-model="addUser.pet_stag" placeholder="是否养犬">
                            <el-option value="1" label="是">是</el-option>
                            <el-option value="0" label="否">否</el-option>
                            <el-option value="-1" label="不确定">不确定</el-option>
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
                <el-col>
                    <div class="fr">
                        <el-button @click="goback">取消</el-button>
                        <el-button type="primary" @click="send">提交</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-form>
        <hr />
        <el-form :inline="true" :model="{banks}"  status-icon :rules="rulesPerson">
            <el-col class="toolbar" style="border-radius: 4px;">
                <strong class="title">银行账户</strong>
                <el-row>
                    <el-button type="primary" @click="addBank">新增银行</el-button>
                </el-row>
            <!-- 新增银行 -->
                <el-form-item v-for="(bank, index) in banks">
                    <el-row :gutter="50">
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
        <hr />
        <el-form :inline="true" :model="{relaCusts}"  status-icon :rules="rulesPerson">
            <el-col class="toolbar" style="border-radius: 4px;">
                <strong class="title">关联客户</strong>
                <el-row>
                    <el-button type="primary" @click="addRelaCust">新增关联客户</el-button>
                </el-row>
              <!-- 新增关联客户 -->
                <el-form-item v-for="(relaCust, index) in relaCusts" >
                    <el-row :gutter="50">
                        <el-input v-model="relaCust.cust_id_rela" v-show="false"></el-input>
                        <el-col :span="4" style="padding-bottom: 0px;">
                            <el-input v-model="relaCust.cst_name" placeholder="客户姓名"></el-input>
                        </el-col>
                        <el-col :span="3" style="padding-bottom: 0px;">
                            <el-select v-model="relaCust.gender" placeholder="性别">
                                <el-option value="2" label="未知">未知</el-option>
                                <el-option value="0" label="男">男</el-option>
                                <el-option value="1" label="女">女</el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4" style="padding-bottom: 0px;">
                            <el-select v-model="relaCust.rela_type" placeholder="关系类型1">
                                <el-option value="1" label="家人">家人</el-option>
                                <el-option value="3" label="保姆">保姆</el-option>
                                <el-option value="2" label="租户">租户</el-option>
                                <el-option value="4" label="暂住">暂住</el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4" style="padding-bottom: 0px;">
                            <el-select v-model="relaCust.rela_type2" placeholder="关系类型2">
                                <el-option value="28001" label="夫妻">夫妻</el-option>
                                <el-option value="28002" label="子女">子女</el-option>
                                <el-option value="28003" label="亲戚">亲戚</el-option>
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

<script>
import * as change from "../../api/change.js";
import moment from "../../api/moment";

export default {
  data() {
    let validatePhone = (rule, value, callback) => {
      let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
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
          aid: 0,
          bank_name: "",
          bank_delegate: "",
          bank_account_name: "",
          bank_account_code: ""
        }
      ],
      relaCusts: [
        {
          cust_id_rela: "",
          cst_name: "",
          gender: "",
          rela_type: "",
          rela_type2: "",
          cst_phone: ""
        }
      ],
      addUser: {
        cust_id: "",
        cst_name: "",
        cst_type: 0,
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
        gender: ""
      },
      rulesPerson: {
        cst_name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        cst_phone: [{ required: true,validator: validatePhone, trigger: "blur" }]
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  methods: {
    // 获取个人客户银行卡详细信息
    getBanks() {
      this.$http({
        method: "post",
        url: "cust/person/bank/detail",
        data: {
          cust_id: this.$route.query.cust_id
        },
        headers: {
          sign: localStorage.getItem("sign")
        }
      }).then(res => {
        if (res.data.data) {
          this.banks = res.data.data;
        }
      });
    },
    // 获取个人客户关联客户详细信息
    getRecust() {
      this.$http({
        method: "post",
        url: "cust/person/relation/detail",
        data: {
          cust_id: this.$route.query.cust_id
        },
        headers: {
          sign: localStorage.getItem("sign")
        }
      }).then(res => {
        if (res.data.data) {
          this.relaCusts = res.data.data;
          for (let item of this.relaCusts) {
            item.gender = String(item.gender);
          }
        }
      });
    },
    goback() {
      window.opener = null;
      window.close();
    },
    send() {
      let addUser = this.addUser;
      addUser.cust_id = this.$route.query.cust_id;
      console.log(addUser.cust_id);
      //   let id = {
      //     cust_id: this.$router.query.cust_id
      //   };
      let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$|^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}@[0-9]{1,3}$/;
      addUser.gender = Number(addUser.gender);
      addUser.cst_type = 0;
      addUser.card_type = Number(addUser.card_type);
      addUser.cst_status = Number(addUser.cst_status);
      addUser.work_type = Number(addUser.work_type);
      addUser.children_cnt = Number(addUser.children_cnt);
      addUser.family = Number(addUser.family);
      addUser.edu_level = Number(addUser.edu_level);
      addUser.cst_sort = Number(addUser.cst_sort);
      addUser.viptag = Number(addUser.viptag);
      addUser.resided_state = Number(addUser.resided_state);
      addUser.comefrom = Number(addUser.comefrom);
      addUser.have_bm = Number(addUser.have_bm);
      addUser.ismain_jcz = Number(addUser.ismain_jcz);
      addUser.pet_stag = Number(addUser.pet_stag);

      if (
        addUser.birthday !== null &&
        addUser.birthday !== undefined &&
        addUser.birthday !== ""
      ) {
        addUser.birthday = moment(addUser.birthday).format("YYYY/MM/DD");
      }
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
        }).then(res => {
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
        this.relaCusts.splice(index, 1);
      }
    },
    addRelaCust() {
      this.relaCusts.push({
        value: "",
        key: Date.now()
      });
    },
    sendBank() {
      // 新增个人客户银行卡
      for (let item of this.banks) {
        if (item.aid != null && item.aid != 0 && item.aid != "") {
          item.aid = parseInt(item.aid);
          this.$http({
            // 更新银行卡
            method: "post",
            url: "cust/person/bank/update",
            data: {
              cust_id: this.$route.query.cust_id,
              bank_list: [item]
            },
            headers: {
              sign: localStorage.getItem("sign")
            }
          }).then(res => {
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
            url: "cust/person/bank/add",
            data: {
              cust_id: this.$route.query.cust_id,
              bank_list: [item]
            },
            headers: {
              sign: localStorage.getItem("sign")
            }
          }).then(res => {
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
    sendRela() {
      // 新增个人客户银行卡
      for (let item of this.relaCusts) {
        if (
          item.cust_id_rela != undefined &&
          item.cust_id_rela != 0 &&
          item.cust_id_rela != ""
        ) {
          item.gender = parseInt(item.gender);
          this.$http({
            // 更新银行卡
            method: "post",
            url: "cust/person/relation/update",
            data: {
              cust_id: this.$route.query.cust_id,
              rela_list: [item]
            },
            headers: {
              sign: localStorage.getItem("sign")
            }
          }).then(res => {
            if (res.data.error_code === 0) {
              this.$message({
                message: "关联客户更新成功!",
                type: "success"
              });
              this.getRecust();
              // banks = res.data.data.bank_list;
            } else {
              this.$message.error(res.data.error_message);
            }
          });
        } else {
          item.cust_id_rela = "";
          this.$http({
            // 新增银行卡
            method: "post",
            url: "cust/person/relation/add",
            data: {
              cust_id: this.$route.query.cust_id,
              rela_list: [item]
            },
            headers: {
              sign: localStorage.getItem("sign")
            }
          }).then(res => {
            if (res.data.error_code === 0) {
              this.$message({
                message: "关联客户新增成功!",
                type: "success"
              });
              this.getRecust();
              //   banks = res.data.data.bank_list;
            } else {
              this.$message.error(res.data.error_message);
            }
          });
        }
      }
    }
  },
  mounted() {
    // 获取个人客户详细信息
    this.$http({
      method: "post",
      url: "cust/person/basic/detail",
      data: {
        cust_id: this.$route.query.cust_id
      },
      headers: {
        sign: localStorage.getItem("sign")
      }
    }).then(res => {
      this.addUser = res.data.data;
      let usersG = this.addUser;
      usersG.gender = String(usersG.gender);
      usersG.cst_type = "个人客户";
      usersG.card_type = String(usersG.card_type);
      usersG.cst_status = String(usersG.cst_status);
      usersG.work_type = String(usersG.work_type);
      usersG.children_cnt = String(usersG.children_cnt);
      usersG.family = String(usersG.family);
      usersG.edu_level = String(usersG.edu_level);
      usersG.cst_sort = String(usersG.cst_sort);
      //   usersG.viptag = String(usersG.viptag);
      //   usersG.resided_state = String(usersG.resided_state);
      usersG.comefrom = String(usersG.comefrom);
      usersG.have_bm = String(usersG.have_bm);
      usersG.ismain_jcz = String(usersG.ismain_jcz);
      usersG.pet_stag = String(usersG.pet_stag);
      this.addUser = usersG;
    });
    // 获取个人客户银行卡详细信息
    this.$http({
      method: "post",
      url: "cust/person/bank/detail",
      data: {
        cust_id: this.$route.query.cust_id
      },
      headers: {
        sign: localStorage.getItem("sign")
      }
    }).then(res => {
      if (res.data.data) {
        this.banks = res.data.data;
      }
    });
    // 获取个人客户关联客户详细信息
    this.$http({
      method: "post",
      url: "cust/person/relation/detail",
      data: {
        cust_id: this.$route.query.cust_id
      },
      headers: {
        sign: localStorage.getItem("sign")
      }
    }).then(res => {
      if (res.data.data) {
        this.relaCusts = res.data.data;
        for (let item of this.relaCusts) {
          item.gender = String(item.gender);
        }
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
