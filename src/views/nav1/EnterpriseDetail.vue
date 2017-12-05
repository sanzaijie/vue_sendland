<template>
    <section class="bg">
        <el-col :span="1" class="close">
			<el-button type="danger" size="small" @click="close">告辞</el-button>
		</el-col>
        <el-form :inline="true" :model="{detailUser}">
            <el-col class="toolbar">
                <strong class="title">客户核心信息</strong>
                <el-row :gutter="50">
                    <el-col :span="24">
                        <label>客户ID：</label>
                        <span>{{detailUser.cust_id}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <label>公司名称:</label>
                        <span>{{detailUser.cst_name}}</span>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <label>传真:</label>
                        <span>{{detailUser.fax}}</span>
                    </el-col>  
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <label>法人代表:</label>
                        <span>{{detailUser.corporation}}</span>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <label>资金类别:</label>
                        <span>{{detailUser.func_type}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <label>公司类别:</label>
                        <span>{{detailUser.enter_nature}}</span>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <label>所属行业:</label>
                        <span>{{detailUser.by_sector}}</span>
                    </el-col> 
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <label>营业执照:</label>
                        <span>{{detailUser.lic_no}}</span>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <label>主营业务:</label>
                        <span>{{detailUser.orientation}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <label>证件类型:</label>
                        <span>{{detailUser.card_type}}</span>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <label>证件号码:</label>
                        <span>{{detailUser.cer_no}}</span>
                    </el-col> 
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <label>客户类型:</label>
                        <span>{{detailUser.cst_type}}</span>
                    </el-col>
                </el-row>
            </el-col>
            <el-col class="toolbar">
                <strong class="title">银行账户</strong>
                <el-row>
                    <el-table :data="bankData" style="width: 100%">
                        <el-table-column type="index" label="序号" width="80px"></el-table-column>
                        <el-table-column prop="bank_delegate" label="所属类型" width="180"></el-table-column>
                        <el-table-column prop="bank_name" label="开户银行" width="180"></el-table-column>
                        <el-table-column prop="bank_account_name" label="银行户名"> </el-table-column>
                        <el-table-column prop="bank_account_code" label="银行账户"> </el-table-column>
                    </el-table>
                </el-row>
            </el-col>
            <el-col class="toolbar">
                <strong class="title">联系人</strong>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <label>联系人姓名:</label>
                        <span>{{detailUser.link_man}}</span>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <label>身份识别手机号:</label>
                        <span>{{detailUser.cst_phone}}</span>
                    </el-col>  
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <label>手机号码1:</label>
                        <span>{{detailUser.contact1}}</span>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <label>手机号码2:</label>
                        <span>{{detailUser.contact2}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <label>手机号码3:</label>
                        <span>{{detailUser.contact3}}</span>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <label>电子邮箱:</label>
                        <span>{{detailUser.email}}</span>
                    </el-col>
                </el-row>
            </el-col>
            <el-col class="toolbar">
                <strong class="title">所属项目</strong>
                <el-row>
                    <el-table :data="projectData" style="width: 100%">
                        <el-table-column type="index" label="序号" width="80px"></el-table-column>
                        <el-table-column prop="pj_name" label="项目名称" width="180"></el-table-column>
                        <el-table-column prop="ban_name" label="楼栋" width="180"></el-table-column>
                        <el-table-column prop="house_name" label="入住房间号"> </el-table-column>
                        <el-table-column prop="join_status" label="客户状态"> </el-table-column>
                        <el-table-column prop="modifytime" label="交易时间"> </el-table-column>
                    </el-table>
                </el-row>
            </el-col>
        </el-form>
        <el-form :inline="true" :model="{needUser}">
            <el-col class="toolbar" v-for="needUser1 in needUser">
                <strong class="title">客户需求信息</strong>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <label>需求业态:</label>
                        <span>{{needUser1.pj_name}}</span>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <label>需求楼层:</label>
                        <span>{{needUser1.louceng}}</span>
                    </el-col>  
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <label>需求户型:</label>
                        <span>{{needUser1.house_type}}</span>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <label>需求套数:</label>
                        <span>{{needUser1.xqts}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <label>购房预算:</label>
                        <span>{{needUser1.gfys}}</span>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <label>购房用途:</label>
                        <span>{{needUser1.gfyt}}</span>
                    </el-col> 
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <label>需求面积:</label>
                        <span>{{needUser1.area}}</span>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <label>关注景观:</label>
                        <span>{{needUser1.gzjg}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <label>意向房间:</label>
                        <span>{{needUser1.intention}}</span>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <label>意向分期:</label>
                        <span>{{needUser1.stages}}</span>
                    </el-col> 
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <label>关注期数:</label>
                        <span>{{needUser.gzqs}}</span>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <label>客户分级:</label>
                        <span>{{needUser.cst_level}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <label>最关注方面:</label>
                        <span>{{needUser.favorite}}</span>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <label>最关注因素:</label>
                        <span>{{needUser.favorite_bc}}</span>
                    </el-col> 
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <label>来访次数:</label>
                        <span>{{needUser.visiting_times}}</span>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <label>认知媒体大类:</label>
                        <span>{{needUser.media_big}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <label>认知媒体子类:</label>
                        <span>{{needUser.media_small}}</span>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <label>来源渠道:</label>
                        <span>{{needUser.cognitive_approach}}</span>
                    </el-col> 
                </el-row>
                <el-row>
                    <el-table :data="followUser" style="width: 100%">
                        <el-table-column type="index" label="序号" width="80px"></el-table-column>
                        <el-table-column prop="intention_level" label="意向等级" width="100"></el-table-column>
                        <el-table-column prop="key_behaviors" label="关键行为"> </el-table-column>
                        <el-table-column prop="contact_content" label="沟通内容"> </el-table-column>
                        <el-table-column prop="next_content" label="跟进详情"> </el-table-column>
                        <el-table-column prop="contact_mode" label="跟进方式"> </el-table-column>
                        <el-table-column prop="contact_person" label="跟进人"> </el-table-column>
                        <el-table-column prop="createtime" label="跟进日期"> </el-table-column>
                    </el-table>
                </el-row>
            </el-col>
        </el-form>
    </section>
</template>

<script>
import * as change from "../../api/change.js";

model: {
  type: [String, Object];
}
export default {
  data() {
    return {
      detailUser: [],
      bankData: [],
      projectData: [],
      relationData: [],
      needUser: [],
      followUser: [],
      intention_id: "",
      proj_id: ""
    };
  },
  methods: {
    close() {
      this.$confirm("确定要关闭此页面嘛？", "关闭", {
        type: "warning",
        center: true
      }).then(() => {
        window.opener = null;
        window.close();
      });
    }
  },
  created() {
    // 查看企业客户详情
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
      this.detailUser = res.data.data;
      let usersG = this.detailUser;
      usersG.gender = change.Gender(usersG.gender);
      usersG.cst_type = change._cstType(usersG.cst_type);
      usersG.card_type = change._cardTcard_typeype(usersG.card_type);
      usersG.cst_status = change._cstStatus(usersG.cst_status);
      usersG.work_type = change._workType(usersG.work_type);
      usersG.children_cnt = change._childrenCnt(usersG.children_cnt);
      usersG.family = change._family(usersG.family);
      usersG.edu_level = change._eduLevel(usersG.edu_level);
      usersG.cst_sort = change._cstSort(usersG.cst_sort);
      usersG.viptag = change._viptag(usersG.viptag);
      usersG.resided_state = change._residedState(usersG.resided_state);
      usersG.comefrom = change._comefrom(usersG.comefrom);
      usersG.have_bm = change._haveBm(usersG.have_bm);
      usersG.ismain_jcz = change._ismainJcz(usersG.ismain_jcz);
      usersG.pet_stag = change._petStag(usersG.pet_stag);
      this.detailUser = usersG;
    });
    // 查看企业客户银行卡
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
      //   console.log(res);
      this.bankData = res.data.data;
    });
    // 查看企业客户所属项目
    this.$http({
      method: "post",
      url: "cust/company/project/detail",
      data: {
        cust_id: this.$route.query.cust_id
      },
      headers: {
        sign: localStorage.getItem("sign")
      }
    }).then(res => {
      //   console.log(res);
      this.projectData = res.data.data;
    });
    // 查看企业客户需求信息
    this.$http({
      method: "post",
      url: "cust/company/need/detail",
      data: {
        cust_id: this.$route.query.cust_id
      },
      headers: {
        sign: localStorage.getItem("sign")
      }
    })
      .then(res => {
        this.needUser = res.data.data;
        for (let item of this.needUser) {
          this.intention_id = item.intention_id;
          this.proj_id = item.proj_id;
        }
      })
      .then(res => {
        // 查看企业客户跟进信息
        this.$http({
          method: "post",
          url: "cust/company/follow/detail",
          data: {
            cust_id: this.$route.query.cust_id,
            intention_id: this.intention_id,
            proj_id: this.proj_id
          },
          headers: {
            sign: localStorage.getItem("sign")
          }
        }).promise.then(res => {
          //   console.log(res);
          this.followUser = res.data.data;
        });
      });
  }
};
</script>
<style scoped>
.close {
  margin-top: 10px;
  float: right;
}
.bg {
  background: #ffffff;
  height: 100%;
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
.toolbar label {
  /* width: 41%; */
  display: inline-block;
  color: #9c9c9c;
  /* text-align: right; */
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
