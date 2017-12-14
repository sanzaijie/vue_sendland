<template>
    <section>
        <el-form :inline="true" :model="addUser"  status-icon :rules="rulesPerson">
            <el-col class="toolbar" style="border-radius: 4px;">
                <strong class="title">客户核心信息</strong>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="客户名称" class="rulesinput" prop="cst_name" :rules="[{required: true, message: '客户名称不能为空'}]">
                            <el-input v-model="addUser.cst_name" placeholder="客户名称（必填）" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="客户类型" class="rulesinput" prop="cst_type">
                            <el-input v-model="addUser.cst_type" placeholder="个人客户" disabled="disabled"></el-input>
                            <!-- <el-select v-model="addUser.cst_type" placeholder="客户类型" style="width: 100%;">
                                <el-option value="0" label="个人客户">个人客户</el-option>
                                <el-option value="1" label="企业客户">企业客户</el-option>
                            </el-select> -->
                        </el-form-item> 
                    </el-col>  
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="性别" class="rulesinput">                        
                            <el-select v-model="addUser.gender" placeholder="性别" style="width: 100%;">
                                <el-option value="2" label="未知">未知</el-option>
                                <el-option value="0" label="男">男</el-option>
                                <el-option value="1" label="女">女</el-option>
                            </el-select>
                        </el-form-item>                         
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="身份识别手机号" class="rulesinput" prop="cst_phone">
                            <el-input v-model="addUser.cst_phone" placeholder="身份识别手机号（必填）" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="证件类型" class="rulesinput">                        
                            <el-select v-model="addUser.card_type" placeholder="证件类型" style="width: 100%;">
                                <el-option value="-1" label="未知">未知</el-option>
                                <el-option value="0" label="身份证">身份证</el-option>
                                <el-option value="1" label="护照">护照</el-option>
                                <el-option value="2" label="军官证">军官证</el-option>
                                <el-option value="3" label="港澳身份证">港澳身份证</el-option>
                                <el-option value="4" label="台胞证">台胞证</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="证件号码" class="rulesinput">   
                            <el-input v-model="addUser.cer_no" placeholder="证件号码"></el-input>
                        </el-form-item>
                    </el-col> 
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="出生日期" class="rulesinput"> 
                            <el-date-picker v-model="addUser.birthday" type="date" placeholder="出生日期" :picker-options="pickerOptions0">
                            </el-date-picker>
                        </el-form-item>
                        <!-- <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker> -->
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <el-form-item label="客户类别" class="rulesinput"> 
                            <el-select v-model="addUser.cst_sort" placeholder="客户类别" style="width: 100%;">
                                <el-option value="0" label="业主">业主</el-option>
                                <el-option value="1" label="租户">租户</el-option>
                                <el-option value="2" label="其他">其他</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            <!-- </el-col>
            <el-col class="toolbar" style="border-radius: 4px;"> -->
                <strong class="title">客户基础信息</strong>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="国籍" class="rulesinput">
                            <el-input v-model="addUser.nationality" placeholder="国籍"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="民族" class="rulesinput">   
                            <el-input v-model="addUser.nation" placeholder="民族"></el-input>
                        </el-form-item>
                    </el-col>  
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="VIP客户" class="rulesinput"> 
                            <el-select v-model="addUser.viptag" placeholder="VIP客户" style="width: 100%;">
                                <el-option value="1" label="是">是</el-option>
                                <el-option value="0" label="否">否</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="手机号码1" class="rulesinput">
                            <el-input v-model="addUser.contact1" placeholder="手机号码1"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="手机号码2" class="rulesinput">
                            <el-input v-model="addUser.contact2" placeholder="手机号码2"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="手机号码3" class="rulesinput">
                            <el-input v-model="addUser.contact3" placeholder="手机号码3"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="家庭电话" class="rulesinput">
                            <el-input v-model="addUser.residential_phones" placeholder="家庭电话"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="公司电话" class="rulesinput">
                            <el-input v-model="addUser.office_phone" placeholder="公司电话"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row><el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="居住业态" class="rulesinput">   
                            <el-select v-model="addUser.resided_state" placeholder="居住业态" style="width: 100%;">
                                <el-option value="1" label="高层住宅">高层住宅</el-option>
                                <el-option value="2" label="商业">商业</el-option>
                                <el-option value="3" label="别墅">别墅</el-option>
                                <el-option value="4" label="未知">未知</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="身高" class="rulesinput">
                            <el-input v-model="addUser.height" placeholder="身高"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="体重" class="rulesinput">
                            <el-input v-model="addUser.weight" placeholder="体重"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="公司电话" class="rulesinput">
                            <el-input v-model="addUser.companyNum" placeholder="公司电话"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                </el-row><el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="来自区域" class="rulesinput">   
                            <el-select v-model="addUser.comefrom" placeholder="来自区域" style="width: 100%;">
                                <el-option value="1" label="中国大陆">中国大陆</el-option>
                                <el-option value="2" label="港/澳">港/澳</el-option>
                                <el-option value="3" label="台湾">台湾</el-option>
                                <el-option value="4" label="海外">海外</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="居住区域" class="rulesinput">
                            <el-input v-model="addUser.home_area" placeholder="居住区域"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="工作区域" class="rulesinput">
                            <el-input v-model="addUser.work_area" placeholder="工作区域"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="详细地址" class="rulesinput">
                            <el-input v-model="addUser.address" placeholder="详细地址"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="职业身份" class="rulesinput">   
                            <el-select v-model="addUser.work_type" placeholder="职业身份" style="width: 100%;">
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
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="电子邮箱" class="rulesinput">
                            <el-input v-model="addUser.email" placeholder="电子邮箱"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="邮政编码" class="rulesinput">
                            <el-input v-model="addUser.post_code" placeholder="邮政编码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="家庭结构" class="rulesinput">  
                            <el-select v-model="addUser.family" placeholder="家庭结构" style="width: 100%;">
                                <el-option value="1" label="单身贵族">单身贵族</el-option>
                                <el-option value="2" label="二人世界">二人世界</el-option>
                                <el-option value="3" label="单亲家庭">单亲家庭</el-option>
                                <el-option value="4" label="二代之家">二代之家</el-option>
                                <el-option value="5" label="三代同堂">三代同堂</el-option>
                                <el-option value="6" label="未知">未知</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="子女人数" class="rulesinput">  
                            <el-input v-model="addUser.children_cnt" placeholder="子女人数"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="教育程度" class="rulesinput">
                            <el-select v-model="addUser.edu_level" placeholder="教育程度" style="width: 100%;">
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
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="有无保姆同住" class="rulesinput">
                            <el-select v-model="addUser.have_bm" placeholder="有无保姆同住" style="width: 100%;">
                                <el-option value="1" label="有">有</el-option>
                                <el-option value="0" label="无">无</el-option>
                                <el-option value="2" label="未知">未知</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="是否为主要决策者" class="rulesinput">  
                            <el-select v-model="addUser.ismain_jcz" placeholder="是否为主要决策者" style="width: 100%;">
                                <el-option value="0" label="是">是</el-option>
                                <el-option value="1" label="否">否</el-option>
                                <el-option value="2" label="不确定">不确定</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row><el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="是否养犬" class="rulesinput">   
                            <el-select v-model="addUser.pet_stag" placeholder="是否养犬" style="width: 100%;">
                                <el-option value="1" label="是">是</el-option>
                                <el-option value="0" label="否">否</el-option>
                                <el-option value="-1" label="不确定">不确定</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="兴趣爱好" class="rulesinput">
                            <el-input v-model="addUser.hobby" placeholder="兴趣爱好"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="传真" class="rulesinput">
                            <el-input v-model="addUser.fax" placeholder="传真"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-form-item label="置业次数" class="rulesinput">   
                            <el-input v-model="addUser.pro_pertycnt" placeholder="置业次数"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="fr">
                    <el-button @click="goback">取消</el-button>
                    <el-button type="primary" @click="sendPersonal">提交</el-button>
                </div>
            </el-col>

        </el-form>
        <!-- <el-form :inline="true" :model="{banks}"  status-icon :rules="rulesPerson">
            <el-col class="toolbar" style="border-radius: 4px;">
                <strong class="title">银行账户</strong>
                <el-row>
                    <el-button type="primary" @click="addBank">新增银行</el-button>
                </el-row>
                <el-form-item label="" v-for="(bank, index) in banks">
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
                    <el-button type="primary" @click="sendBank(banks)">提交</el-button>
                </div>
            </el-col>
        </el-form>
        <el-form :inline="true" :model="{relaCusts}"  status-icon :rules="rulesPerson">
            <el-col class="toolbar" style="border-radius: 4px;">
                <strong class="title">关联客户</strong>
                <el-row>
                    <el-button type="primary" @click="addRelaCust">新增关联客户</el-button>
                </el-row>
                <el-form-item label="" v-for="(relaCust, index) in relaCusts" >
                    <el-row :gutter="50">
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
                            <el-select v-model="relaCust.rela_type1" placeholder="关系类型1">
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
        </el-form> -->
    </section>
</template>

<script>
import * as change from "../../api/change.js";
import moment from "../../api/moment";
export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      var reg =
        11 &&
        /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$|^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}@[0-9]{1,3}$/;
      if (value === "") {
        callback(new Error("请输入手机号码!"));
      } else if (!reg.test(value)) {
        callback(new Error("手机号码格式不正确!"));
      } else {
        callback();
      }
    };

    return {
      //   banks: [
      //     {
      //       bank_name: "",
      //       bank_delegate: "",
      //       bank_account_name: "",
      //       bank_account_cod: ""
      //     }
      //   ],
      //   relaCusts: [
      //     {
      //       cust_id: "",
      //       cst_name: "",
      //       gender: "",
      //       rela_type1: "",
      //       rela_type2: "",
      //       cst_phone: ""
      //     }
      //   ],
      addUser: {
        cst_name: "",
        cst_type: "",
        cst_phone: "",
        gender: "2",
        card_type: "-1",
        cer_no: "",
        birthday: "",
        age_group: "",
        cst_sort: "2",
        nationality: "中国",
        nation: "汉族",
        viptag: "0",
        contact1: "",
        contact2: "",
        contact3: "",
        residential_phones: "",
        office_phone: "",
        resided_state: "4",
        height: "",
        weight: "",
        comefrom: "1",
        home_area: "",
        work_area: "",
        address: "",
        work_type: "",
        email: "",
        post_code: "",
        family: "6",
        children_cnt: "",
        edu_level: "7",
        have_bm: "2",
        ismain_jcz: "2",
        pet_stag: "-1",
        hobby: "",
        fax: "",
        pro_pertycnt: ""
        // cst_phone: "",
      },
      rulesPerson: {
        cst_phone: [
          { required: true, validator: validatePhone, trigger: "blur" }
        ]
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
            if (res.data.error_code === 0) {
              this.$message({
                message: "个人客户新增成功!",
                type: "success"
              });
              this.goback();
            } else {
              this.$message.error(res.data.error_message);
            }
          },
          err => {
            console.log(err);
          }
        );
      }
    }
    // sendBank(banks) {
    //   // 新增个人客户银行卡
    //   console.log(this.banks);
    //   this.$http({
    //     method: "post",
    //     url: "cust/person/bank/add",
    //     data: [
    //       {
    //         cust_id: this.$router.query(cust_id),
    //         bank_list: this.banks
    //       }
    //     ],
    //     headers: {
    //       sign: localStorage.getItem("sign")
    //     }
    //   }).then(
    //     res => {
    //       console.log(res);
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    // },
    // sendRela() {
    //   // 新增个人客户关联客户
    //   this.$http({
    //     method: "post",
    //     url: "cust/person/relation/add",
    //     data: addUser,
    //     headers: {
    //       sign: localStorage.getItem("sign")
    //     }
    //   }).then(
    //     res => {
    //       console.log(res);
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    // },
    // removeBank(item) {
    //   var index = this.banks.indexOf(item);
    //   if (index !== -1) {
    //     this.banks.splice(index, 1);
    //   }
    // },
    // addBank() {
    //   this.banks.push({
    //     value: "",
    //     key: Date.now()
    //   });
    // },
    // removeRelaCust(item) {
    //   var index = this.relaCusts.indexOf(item);
    //   if (index !== -1) {
    //     this.addUser.splice(index, 1);
    //   }
    // },
    // addRelaCust() {
    //   this.addUser.push({
    //     value: "",
    //     key: Date.now()
    //   });
    // }
  }
};
</script>

<style scoped>
.fr {
  float: right;
  margin: 10px 0;
}
/* .rulesinput {
  width: 100%;
} */
.rulesinput .el-input {
  width: 115%;
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