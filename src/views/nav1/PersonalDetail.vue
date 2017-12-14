<template>
    <section class="bg">
        <el-col :span="1" class="close">
			<el-button type="danger" size="small" @click="close">告辞</el-button>
		</el-col>
        <!-- tab分页 -->
        <el-col>
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                <el-tab-pane label="客户资料" name="first">
                    <el-collapse accordion v-model="activeName">
                        <el-collapse-item title="客户核心信息、基础信息" name="1">
                            <el-form :inline="true" :model="{detailUser}" ref="detailUser">
                                <el-col class="toolbar">
                                    <strong class="title">客户核心信息</strong>
                                    <el-row :gutter="50">
                                        <el-col :span="6" style="padding-bottom: 0px;">
                                            <label>客户姓名:</label>
                                            <span>{{detailUser.cst_name}}</span>
                                        </el-col>
                                        <el-col :span="6" style="padding-bottom: 0px;">   
                                            <label>客户类型:</label>
                                            <span>{{detailUser.cst_type}}</span>
                                        </el-col>  
                                        <el-col :span="6" style="padding-bottom: 0px;">   
                                            <label>性别:</label>
                                            <span>{{detailUser.gender}}</span>
                                        </el-col>
                                        <el-col :span="6" style="padding-bottom: 0px;">
                                            <label>客户姓名:</label>
                                            <span>{{detailUser.cst_phone}}</span>
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
                                            <label>出生日期:</label>
                                            <span>{{detailUser.birthday}}</span>
                                        </el-col>
                                        <el-col :span="6" style="padding-bottom: 0px;">   
                                            <label>客户类别:</label>
                                            <span>{{detailUser.cst_sort}}</span>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col class="toolbar">
                                    <strong class="title">客户基础信息</strong>
                                    <el-row :gutter="50">
                                        <el-col :span="6" style="padding-bottom: 0px;">
                                            <label>国籍:</label>
                                            <span>{{detailUser.nationality}}</span>
                                        </el-col>
                                        <el-col :span="6" style="padding-bottom: 0px;">   
                                            <label>民族:</label>
                                            <span>{{detailUser.nation}}</span>
                                        </el-col>  
                                        <el-col :span="6" style="padding-bottom: 0px;">   
                                            <label>VIP客户:</label>
                                            <span>{{detailUser.viptag}}</span>
                                        </el-col>
                                        <el-col :span="6" style="padding-bottom: 0px;">
                                            <label>手机号码1:</label>
                                            <span>{{detailUser.contact1}}</span>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="50">
                                        <el-col :span="6" style="padding-bottom: 0px;">
                                            <label>手机号码2:</label>
                                            <span>{{detailUser.contact2}}</span>
                                        </el-col>
                                        <el-col :span="6" style="padding-bottom: 0px;">
                                            <label>手机号码3:</label>
                                            <span>{{detailUser.contact3}}</span>
                                        </el-col>
                                        <el-col :span="6" style="padding-bottom: 0px;">
                                            <label>家庭电话:</label>
                                            <span>{{detailUser.residential_phones}}</span>
                                        </el-col>
                                        <el-col :span="6" style="padding-bottom: 0px;">
                                            <label>公司电话:</label>
                                            <span>{{detailUser.office_phone}}</span>
                                        </el-col>
                                    </el-row><el-row :gutter="50">
                                        <el-col :span="6" style="padding-bottom: 0px;">   
                                            <label>居住状态:</label>
                                            <span>{{detailUser.resided_state}}</span>
                                        </el-col>
                                        <el-col :span="6" style="padding-bottom: 0px;">
                                            <label>身高:</label>
                                            <span>{{detailUser.height}}</span>
                                        </el-col>
                                        <el-col :span="6" style="padding-bottom: 0px;">
                                            <label>体重:</label>
                                            <span>{{detailUser.weight}}</span>
                                        </el-col>
                                        <el-col :span="6" style="padding-bottom: 0px;">
                                            <label>来自区域:</label>
                                            <span>{{detailUser.comefrom}}</span>
                                        </el-col>
                                    </el-row>
                                    </el-row><el-row :gutter="50">
                                        <el-col :span="6" style="padding-bottom: 0px;">   
                                            <label>居住区域:</label>
                                            <span>{{detailUser.home_area}}</span>
                                        </el-col>
                                        <el-col :span="6" style="padding-bottom: 0px;">
                                            <label>工作区域:</label>
                                            <span>{{detailUser.work_area}}</span>
                                        </el-col>
                                        <el-col :span="6" style="padding-bottom: 0px;">
                                            <label>详细地址:</label>
                                            <span>{{detailUser.address}}</span>
                                        </el-col>
                                        <el-col :span="6" style="padding-bottom: 0px;">
                                            <label>职业身份:</label>
                                            <span>{{detailUser.work_type}}</span>
                                        </el-col>
                                    </el-row>
                                    </el-row>
                                    <el-row :gutter="50">
                                        <el-col :span="6" style="padding-bottom: 0px;">   
                                            <label>电子邮箱:</label>
                                            <span>{{detailUser.email}}</span>
                                        </el-col>
                                        <el-col :span="6" style="padding-bottom: 0px;">
                                            <label>邮政编码:</label>
                                            <span>{{detailUser.post_code}}</span>
                                        </el-col>
                                        <el-col :span="6" style="padding-bottom: 0px;">
                                            <label>家庭结构:</label>
                                            <span>{{detailUser.family}}</span>
                                        </el-col>
                                        <el-col :span="6" style="padding-bottom: 0px;">   
                                            <label>子女人数:</label>
                                            <span>{{detailUser.children_cnt}}</span>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="50">
                                        <el-col :span="6" style="padding-bottom: 0px;">   
                                            <label>教育程度:</label>
                                            <span>{{detailUser.edu_level}}</span>
                                        </el-col>
                                        <el-col :span="6" style="padding-bottom: 0px;">
                                            <label>有无保姆同住:</label>
                                            <span>{{detailUser.have_bm}}</span>
                                        </el-col>
                                        <el-col :span="6" style="padding-bottom: 0px;">
                                            <label>是否为主要决策者:</label>
                                            <span>{{detailUser.ismain_jcz}}</span>
                                        </el-col>
                                        <el-col :span="6" style="padding-bottom: 0px;">   
                                            <label>是否养犬:</label>
                                            <span>{{detailUser.pet_stag}}</span>
                                        </el-col>
                                    </el-row><el-row :gutter="50">
                                        <el-col :span="6" style="padding-bottom: 0px;">   
                                            <label>兴趣爱好:</label>
                                            <span>{{detailUser.hobby}}</span>
                                        </el-col>
                                        <el-col :span="6" style="padding-bottom: 0px;">
                                            <label>传真:</label>
                                            <span>{{detailUser.fax}}</span>
                                        </el-col>
                                        <el-col :span="6" style="padding-bottom: 0px;">
                                            <label>置业次数:</label>
                                            <span>{{detailUser.pro_pertycnt}}</span>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-form>
                        </el-collapse-item>
                    </el-collapse>

                    <el-collapse accordion @change="getbank">
                        <el-collapse-item title="银行账户">
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
                        </el-collapse-item>
                    </el-collapse>
                    
                    <el-collapse accordion @change="getproject">
                        <el-collapse-item title="所属项目">
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
                        </el-collapse-item>
                    </el-collapse>
                        
                    <el-collapse accordion @change="getrelation">
                        <el-collapse-item title="关联客户">                   
                            <el-col class="toolbar">
                                <strong class="title">关联客户</strong>
                                <el-row>
                                    <el-table :data="relationData" style="width: 100%">
                                        <el-table-column type="index" label="序号" width="80px"></el-table-column>
                                        <el-table-column prop="cst_name" label="姓名" width="180"></el-table-column>
                                        <el-table-column prop="gender" label="性别" width="180"></el-table-column>
                                        <el-table-column prop="cst_phone" label="手机号码"> </el-table-column>
                                        <el-table-column prop="rela_type" label="客户关系"> </el-table-column>
                                        <el-table-column prop="rela_type2" label="客户二级关系"> </el-table-column>
                                        <el-table-column  label="操作"> </el-table-column>
                                    </el-table>
                                </el-row>
                            </el-col>
                        </el-collapse-item>
                    </el-collapse>    
                    
                    <el-collapse accordion @change="getNeed">
                        <el-collapse-item title="客户需求信息" >

                        <el-tabs v-model="activeName3" type="border-card" @tab-click="handleClickNeed">
                            <el-tab-pane 
                            :label="item.pj_name" 
                            :name="item.proj_id" 
                            v-for="(item, index) in projectData" 
                            :key="item.proj_id">
                                <el-form :inline="true" :model="{needUser}" ref="needUser">        
                                    <el-col class="toolbar">
                                        <strong class="title">客户需求信息</strong>
                                        <el-row :gutter="50">
                                            <el-col :span="6" style="padding-bottom: 0px;">
                                                <label>需求业态:</label>
                                                <span>{{needUser.demand}}</span>
                                            </el-col>
                                            <el-col :span="6" style="padding-bottom: 0px;">   
                                                <label>需求楼层:</label>
                                                <span>{{needUser.louceng}}</span>
                                            </el-col>  
                                            <el-col :span="6" style="padding-bottom: 0px;">   
                                                <label>需求户型:</label>
                                                <span>{{needUser.house_type}}</span>
                                            </el-col>
                                            <el-col :span="6" style="padding-bottom: 0px;">
                                                <label>需求套数:</label>
                                                <span>{{needUser.xqts}}</span>
                                            </el-col>
                                        </el-row>
                                        <el-row :gutter="50">
                                            <el-col :span="6" style="padding-bottom: 0px;">   
                                                <label>购房预算:</label>
                                                <span>{{needUser.gfys}}</span>
                                            </el-col>
                                            <el-col :span="6" style="padding-bottom: 0px;">
                                                <label>购房用途:</label>
                                                <span>{{needUser.gfyt}}</span>
                                            </el-col> 
                                            <el-col :span="6" style="padding-bottom: 0px;">
                                                <label>需求面积:</label>
                                                <span>{{needUser.area}}</span>
                                            </el-col>
                                            <el-col :span="6" style="padding-bottom: 0px;">   
                                                <label>关注景观:</label>
                                                <span>{{needUser.gzjg}}</span>
                                            </el-col>
                                        </el-row>
                                        <el-row :gutter="50">
                                            <el-col :span="6" style="padding-bottom: 0px;">   
                                                <label>意向房间:</label>
                                                <span>{{needUser.intention}}</span>
                                            </el-col>
                                            <el-col :span="6" style="padding-bottom: 0px;">
                                                <label>意向分期:</label>
                                                <span>{{needUser.stages}}</span>
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
                            </el-tab-pane>
                        </el-tabs>


                            
                        </el-collapse-item>
                    </el-collapse>        
                </el-tab-pane>

                <!-- 变更记录 -->
                <el-tab-pane label="变更记录" name="second">
                    <!--工具条-->
                    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                        <el-form :inline="true" :model="filters">
                            <el-form-item>
                                <el-input v-model="filters.change_user" placeholder="操作人"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-date-picker v-model="filters.begin_time" type="date" placeholder="开始日期">
                                </el-date-picker>    
                                <el-date-picker v-model="filters.end_time" type="date" placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="filters.fromsys" placeholder="请选择">
                                    <el-option value="全部">全部</el-option>                                
                                    <el-option value="拓客系统app" label="拓客系统app">拓客系统app</el-option>
                                    <el-option value="移动案场app" label="移动案场app">移动案场app</el-option>
                                    <el-option value="销售系统" label="销售系统">销售系统</el-option>
                                    <el-option value="物业信息管理平台" label="物业信息管理平台">物业信息管理平台</el-option>
                                    <el-option value="客户主数据中心" label="客户主数据中心">客户主数据中心</el-option>
                                    <el-option value="贝壳树微信号" label="贝壳树微信号">贝壳树微信号</el-option>
                                    <el-option value="微信客服系统" label="微信客服系统">微信客服系统</el-option>
                                    <el-option value="客户服务管理系统" label="客户服务管理系统">客户服务管理系统</el-option>
                                    <el-option value="物业客户服务管理系统" label="物业客户服务管理系统">物业客户服务管理系统</el-option>
                                    <el-option value="普及E家app" label="普及E家app">普及E家app</el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="getChange(filters)">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <!--列表-->
                    <el-table :data="changeUser" highlight-current-row style="width: 100%;">
                        <!-- <el-table-column type="selection" width="0">
                        </el-table-column> -->
                        <el-table-column type="index" label="序号" align="center" width="70">
                        </el-table-column>
                        <el-table-column prop="change_type" label="操作类型" width="100" align="center">
                        </el-table-column>
                        <el-table-column prop="change_column" label="操作内容" width="100" align="center">
                        </el-table-column>
                        <el-table-column prop="before_value" label="操作前内容" align="center">
                        </el-table-column>
                        <el-table-column prop="after_value" label="操作后内容" align="center">
                        </el-table-column>
                        <el-table-column prop="change_user" label="操作人" width="100" align="center">
                        </el-table-column>
                        <el-table-column prop="changetime" label="操作时间" min-width="100" align="center">
                        </el-table-column>
                        <el-table-column prop="from_sys" label="操作系统" min-width="150" align="center">
                        </el-table-column>
                    </el-table>
                    <!--工具条-->
                    <el-col :span="24" class="toolbar">
                        <!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
                        <el-pagination layout="total, prev, pager, next, jumper"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        :total="total"
                        style="float:right;">
                        </el-pagination>
                    </el-col>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </section>
</template>
<script>
import * as change from "../../api/change.js";
import moment from "../../api/moment";
// model: {
//   type: [String, Object];
// }
export default {
  data() {
    return {
      filters: {
        cust_id: this.$route.query.cust_id,
        change_user: null,
        begin_time: null,
        end_time: null,
        fromsys: null
      },
      detailUser: [],
      bankData: [],
      projectData: [],
      relationData: [],
      page_num: 1,
      pageSize: 20,
      page: 1,
      currentPage: 1,
      total: 1,
      needUser: [],
      changeUser: [
        {
          change_type: "", // 操作类型
          change_column: "", // 操作内容
          before_value: "", // 操作前内容
          after_value: "", // 操作后内容
          change_user: "", // 操作人
          changetime: "", // 操作时间(格式为 yyyy/MM/dd)
          from_sys: "" // 操作系统
        }
      ],
      followUser: [],
      activeName: "1",
      activeName2: "first",
      activeName3: ""
    };
  },
  methods: {
    handleClick(tab, event) {
      // 获取变更记录
      this.$http({
        method: "post",
        url: "cust/change",
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
        this.changeUser = res.data.data;
        console.log(this.changeUser);
      });
    },
    // 个人需求信息项目名称
    handleClickNeed(tab, event) {
      this.$http({
        method: "post",
        url: "cust/person/project/detail",
        data: {
          cust_id: this.$route.query.cust_id
        },
        headers: {
          sign: localStorage.getItem("sign")
        }
      })
        .then(res => {
          if (
            res.code == "ECONNABORTED" &&
            res.message.indexOf("timeout") != -1
          ) {
            this.$message.error("网络异常,请求超时");
            return false;
          }
          this.projectData = res.data.data;
        })
        .then(res => {
          if (
            res.code == "ECONNABORTED" &&
            res.message.indexOf("timeout") != -1
          ) {
            this.$message.error("网络异常,请求超时");
            return false;
          }
          this.$http({
            method: "post",
            url: "cust/person/need/detail",
            data: {
              cust_id: this.$route.query.cust_id,
              proj_id: tab.name
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
              this.needUser = res.data.data;
              var intenID = this.needUser.intention_id;
              if (intenID != "") {
                // 查看个人客户跟进信息
                this.$http({
                  method: "post",
                  url: "cust/person/follow/detail",
                  data: {
                    cust_id: this.$route.query.cust_id,
                    intention_id: intenID
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
                  //   console.log(res);
                  this.followUser = res.data.data;
                });
              }
            }
          });
        });
    },
    close() {
      this.$confirm("确定要关闭此页面嘛？", "关闭", {
        type: "warning",
        center: true
      }).then(() => {
        window.opener = null;
        window.close();
      });
    },
    // 查看个人客户详情
    getjiben() {
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
        if (
          res.code == "ECONNABORTED" &&
          res.message.indexOf("timeout") != -1
        ) {
          this.$message.error("网络异常,请求超时");
          return false;
        }
        //   console.log(res);
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
    },
    // 查看个人客户银行卡
    getbank() {
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
        if (
          res.code == "ECONNABORTED" &&
          res.message.indexOf("timeout") != -1
        ) {
          this.$message.error("网络异常,请求超时");
          return false;
        }
        //   console.log(res);
        this.bankData = res.data.data;
      });
    },
    // 查看个人客户所属项目
    getproject() {
      this.$http({
        method: "post",
        url: "cust/person/project/detail",
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
        //   console.log(res);
        this.projectData = res.data.data;
      });
    },
    // 查看个人客户关联客户
    getrelation() {
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
        if (
          res.code == "ECONNABORTED" &&
          res.message.indexOf("timeout") != -1
        ) {
          this.$message.error("网络异常,请求超时");
          return false;
        }
        //   console.log(res);
        this.relationData = res.data.data;
      });
    },
    getNeed() {
      // 查看个人客户需求信息
      this.$http({
        method: "post",
        url: "cust/person/project/detail",
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
        //   console.log(res);
        this.projectData = res.data.data;
      });
    },
    // 获取变更记录
    getChange(tab) {
      if (this.filters.begin_time != "") {
        this.filters.begin_time = moment(this.filters.begin_time).format(
          "YYYY/MM/DD"
        );
        this.filters.end_time = moment(this.filters.end_time).format(
          "YYYY/MM/DD"
        );
      }
      this.$http({
        method: "post",
        url: "cust/change",
        data: this.filters,
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
        this.changeUser = res.data.data;
        console.log(this.changeUser);
      });
    },
    //加载分页数据
    loadData(pageNum, pageSize) {
      this.$http({
        method: "post", //方法
        url: "cust/list", //地址
        data: {
          cst_type: 0,
          page_num: pageNum,
          page_size: pageSize
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
        this.usersData = res.data.data.result;
        this.total = res.data.data.total_count;
        let usersG = this.usersData;
        for (let i = 0; i < usersG.length; i++) {
          usersG[i].gender = change.Gender(usersG[i].gender);
          usersG[i].cst_type = change._cstType(usersG[i].cst_type);
          usersG[i].card_type = change._cardTcard_typeype(usersG[i].card_type);
        }
        this.users = usersG;
        this.listLoading = false;
      });
    },
    handleSizeChange: function(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.loadData(this.currentPage, this.pageSize);
      //this.page = val;
      //this.getUsers();
    }
  },
  mounted() {
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
      if (res.code == "ECONNABORTED" && res.message.indexOf("timeout") != -1) {
        this.$message.error("网络异常,请求超时");
        return false;
      }
      //   console.log(res);
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
  },
  created() {}
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
  padding: 10px 20px;
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
/* .el-date-editor.el-input {
  width: 100%;
} */
.el-date-editor.el-input {
  width: 193px;
}
</style>
