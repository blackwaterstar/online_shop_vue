<template>
  <div class="register">
    <p class="hd-title">秋风网注册</p>
    <!-- <div class="summit">
      <form action="">
        <div class="form-box">
          <input
            type="text"
            placeholder="请输入用户名"
            v-model="form.userName"
          />
          <input type="text" placeholder="请输入密码" v-model="form.password" />
          <div class="check-box">
            <input
              type="checkbox"
              v-model="form.registerCheck"
            />已阅读并同意以下协议秋风平台服务协议、隐私权政策、法律声明、支付宝及客户端服务协议
            <br />
          </div>
          <div class="msg">
            <span>{{ form.msg }}</span>
            <button type="summit" @click="onSummit(form.userName)">提交</button>
          </div>
        
      </form>
    </div> -->
    <div class="form-box">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId"></el-input> </el-form-item
        ><el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input> </el-form-item
        ><el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="form.password"
          ></el-input> </el-form-item
        ><el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="form.checkPass"></el-input>
        </el-form-item>
        <el-form-item prop="registerCheck">
          <el-checkbox v-model="form.registerCheck"
            >已阅读并同意以下协议秋风平台服务协议、隐私权政策、法律声明、支付宝及客户端服务协议</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSummit('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  apiRegister,
  apiCheckUser
} from "@/api/user";
export default {
  name: "Register",
  data() {
    var validateUserId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户ID"));
      } else if (this.form.userId.trim().length < 6) {
        callback(new Error("用户ID需要多于6个字符"));
      } else {
        apiCheckUser({ userId: this.form.userId }).then((res) => {
          if (!res.data) {
            callback(new Error("该ID已经被注册"));
          } else {
        callback();
        }
        });
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (this.form.password.trim().length < 6) {
        callback(new Error("密码长度需要多于6个字符"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateType = (rule, value, callback) => {
      if (!this.form.registerCheck) {
        callback(new Error("请阅读以下协议"));
      } else {
        callback();
      }
    };
    return {
      form: {
        userId: "",
        username: "",
        password: "",
        checkPass: "",
        registerCheck: false,
      },
      rules: {
        userId: [{ validator: validateUserId, trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        registerCheck: [{ validator: validateType, trigger: "change" }],
      },
    };
  },
  methods: {
    onSummit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          apiRegister({
            userId: this.form.userId,
            username: this.form.username,
            password: this.form.password,
          }).then((res) => {
            if (res.data) {
              this.form.msg = "";
              this.$notify({
                title: "成功",
                message: "恭喜加入秋风网",
                type: "success",
              });
              this.$router.push("/home/homePanel");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang="less">
.register {
  background-image: url("../assets/register.png");
  width: 100%;
  height: 100%;
  background-size: 100%, 100%;
  position: fixed;
  /* 开启BFC */
  overflow: hidden;
}
.hd-title {
  margin-top: 30px;
  width: 100%;
  text-align: center;
  position: absolute;
  line-height: 60px;
  color: yellowgreen;
  font-size: 50px;
}
.form-box {
  width: 400px;
  height: 300px;
  margin: 90px auto;
  padding: 100px;
  & > input {
    display: block;
    width: 100%;
    margin-top: 40px;
    line-height: 40px;
    border: 1px solid #ccc;
    border-radius: 8px;
    text-align: center;
  }
}
// input[type="checkbox"] {
//   display: inline;
//   width: 20px;
//   margin: 0;
// }
// .msg {
//   margin: 0px auto;
//   width: 250px;
//   min-width: 250px;
//   margin-top: 40px;
//   & > button {
//     width: 100%;
//     height: 40px;
//     color: #fff;
//     background-color: rgb(25, 170, 25);
//     border: 1px solid rgb(25, 170, 25);
//     border-radius: 8px;
//   }
//   & > span {
//     display: block;
//     color: red;
//   }
// }
</style>