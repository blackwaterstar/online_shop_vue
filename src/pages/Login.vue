<template>
  <div class="login">
    <div class="summit">
      <el-form ref="loginForm" :model="loginForm" :rules="rules" action="">
        <div class="form-box" @keyup.enter="handleLogin">
          <el-form-item label="用户名" prop="username">
            <el-input
              type="text"
              ref="username"
              placeholder="请输入用户名"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              ref="password"
              placeholder="请输入密码"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <div class="check-box">
            <input type="checkbox" v-model="loginForm.rememberCheck" />记住我
          </div>
          <el-form-item>
            <el-button class="loginButton" type="primary" @click="handleLogin"
              >登录</el-button
            >
            <el-button class="resetButton" @click="resetForm">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { apiCheckUser } from "@/api/user";
const Base64 = require('js-base64').Base64
export default {
  name: "Login",

  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 0) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 0) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        rememberCheck: false,
      },

      rules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
    };
  },

  mounted() {
    // 在页面加载时从cookie获取登录信息
    let account = this.getCookie("account")
    let password = Base64.decode(this.getCookie("password"))
    // 如果存在赋值给表单，并且将记住密码勾选
    if(account){
      this.loginForm.username = account
      this.loginForm.password = password
      this.loginForm.rememberCheck = true
    }
    // if (this.loginForm.username === "") {
    //   this.$refs.username.focus();
    // } else if (this.loginForm.password === "") {
    //   this.$refs.password.focus();
    // }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: "/home/homePanel",
              });
              if (this.loginForm.rememberCheck) {
                this.setCookie("account",this.loginForm.username,7)
                // base64加密密码
                let passWord = Base64.encode( this.loginForm.password)
                this.setCookie("password",passWord,7)
              }else{
                this.setCookie("account","")
                this.setCookie("password","")
              }
            })
            .catch(() => {
              this.$message("用户ID或者密码错误");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取cookie
    getCookie: function (key) {
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + '=')
        if (start !== -1) {
          start = start + key.length + 1
          var end = document.cookie.indexOf(';', start)
          if (end === -1) end = document.cookie.length
          return unescape(document.cookie.substring(start, end))
        }
      }
      return ''
    },
    // 保存cookie
    setCookie: function (cName, value, expiredays) {
      var exdate = new Date()
      exdate.setDate(exdate.getDate() + expiredays)
      document.cookie = cName + '=' + decodeURIComponent(value) +
              ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
    },

    resetForm() {
      this.$refs.loginForm.resetFields();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  background-image: url("../assets/login.png");
  background-size: 100%, 100%;
  position: fixed;
  overflow: hidden;
}
.summit {
  width: 400px;
  height: 350px;
  margin: 100px auto;
  background-color: rgb(247, 255, 247);
  border: 1px solid #ccc;
  border-radius: 16px;
  box-shadow: 10px 10px 10px rgb(211, 214, 209);
  .form-box {
    margin: 0px auto;
    margin-top: 50px;
    width: 300px;
    .loginButton,
    .resetButton {
      margin: 10px 25px;
      width: 100px;
    }
    .loginButton {
      background-color: rgb(25, 170, 25);
      &:hover,
      &:visited {
        background-color: rgb(25, 170, 25);
      }
    }
  }
}
</style>