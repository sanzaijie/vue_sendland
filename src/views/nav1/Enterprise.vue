<template>
    <section>
        <el-form :inline="true" :model="filters">
            <el-col class="toolbar" style="border-radius: 4px;">
                <strong class="title">客户核心信息</strong>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="filters.name" placeholder="公司名称"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <el-select v-model="filters.value" placeholder="客户类型" style="width: 100%;">
                            <el-option value="个人客户">个人客户</el-option>
                            <el-option value="企业客户">企业客户</el-option>
                        </el-select>
                    </el-col>  
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="filters.name" placeholder="法人代表"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="filters.name" placeholder="资金类别"></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="filters.name" placeholder="公司类别"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="filters.name" placeholder="所属行业"></el-input>
                    </el-col> 
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="filters.name" placeholder="营业执照"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="filters.name" placeholder="主营业务"></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="50"> 
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <el-select v-model="filters.value2" placeholder="证件类型" style="width: 100%;">
                            <el-option value="身份证">身份证</el-option>
                            <el-option value="护照">护照</el-option>
                            <el-option value="军官证">军官证</el-option>
                            <el-option value="港澳身份证">港澳身份证</el-option>
                            <el-option value="台胞证">台胞证</el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="filters.name" placeholder="证件号码"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="filters.name" placeholder="传真"></el-input>
                    </el-col>
                </el-row>
            </el-col>
            <el-col class="toolbar" style="border-radius: 4px;">
                <strong class="title">联系人</strong>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="filters.name" placeholder="联系人姓名"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">   
                        <el-input v-model="filters.name" placeholder="身份识别手机号"></el-input>
                    </el-col>  
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="filters.name" placeholder="手机号码1"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="filters.name" placeholder="手机号码2"></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="filters.name" placeholder="手机号码3"></el-input>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 0px;">
                        <el-input v-model="filters.name" placeholder="电子邮箱"></el-input>
                    </el-col>
                </el-row>
            </el-col>
            <el-col class="toolbar" style="border-radius: 4px;">
                <strong class="title">银行账户</strong>
                <el-row>
                    <el-button type="primary" @click="toshow">新增银行</el-button>
                </el-row>
                <el-row v-bind:is="which_to_show"></el-row>
            </el-col>
        </el-form>
        <el-col :span="3" push="21">
			<el-button @cilck="goBack">取消</el-button>
			<el-button type="primary">提交</el-button>
		</el-col>
    </section>
</template>
<script>
export default {
  data() {
    return {
      filters: {
        name: "",
        value: "",
        value2: ""
      },
      which_to_show: "addNewBank"
    };
  },
  methods: {
    goBack() {
        this.$router.go(-1)
    },
    toshow: function() {
      //切换组件显示
      var arr = "addNewBank";
      var index = arr.indexOf(this.which_to_show);
      if (index < 3) {
        this.which_to_show = arr[index + 1];
      } else {
        this.which_to_show = arr[0];
      }
      //   this.which_to_show = arr[index +1]
      //   if (index < 3) {
      //     this.which_to_show = arr[index++];
      //   } else {
      //     this.which_to_show = arr[0];
      //   }
    }
  },
  components: {
    addNewBank: {
      template: `
            <el-row :gutter="10">
                <el-col :span="2" style="padding-bottom: 0px;">
                    <span>1</span>
                </el-col>
                <el-col :span="5" style="padding-bottom: 0px;">
                    <el-input placeholder="所属类型"></el-input>
                </el-col>
                <el-col :span="5" style="padding-bottom: 0px;">
                    <el-input placeholder="开户银行"></el-input>
                </el-col>
                <el-col :span="5" style="padding-bottom: 0px;">
                    <el-input placeholder="银行户名"></el-input>
                </el-col>
                <el-col :span="5" style="padding-bottom: 0px;">
                    <el-input placeholder="银行账户"></el-input>
                </el-col>
            </el-row>`
    }
  }
};
</script>

<style scoped>
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