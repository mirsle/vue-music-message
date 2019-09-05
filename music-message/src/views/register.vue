<template>
  <div class="warp">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm froms"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
         <el-button @click="Toregister" type="danger">去登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var Username = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }

      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        username: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: Username, trigger: "blur" }]
      }
    };
  },
  methods: {
    Toregister()
    {
        this.$router.push("/login")
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { checkPass, username } = this.ruleForm;
          this.$api.user
            .registry({ username: username, password: checkPass })
            .then(res => {
              if (res.data.code == 1) {
                this.$message({
                  message: res.data.message,
                  type: "success",
                  offset: 20,
                  center: true,
                  duration: 1000
                });
                setTimeout(() => {
                  this.$router.replace("/login");
                }, 1300);
              }
            })
            .catch(() => {
              this.$message.error({
                message: "注册失败",
                offset: 20,
                center: true,
                duration: 1000
              });
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" >
body,
html,
#app,
.warp {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.demo-ruleForm {
  width: 50%;
  margin: 200px auto;
}
</style>