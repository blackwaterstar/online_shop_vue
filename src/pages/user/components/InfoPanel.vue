<template>
  <div class="info-panel">
    <div class="content-box chearfix">
      <el-descriptions title="用户信息" direction="vertical" border :column="1">
        <template slot="extra">
          <el-switch v-model="isEdit" active-text="编辑"> </el-switch>
        </template>
        <el-descriptions-item
          ><template slot="label">
            <i class="el-icon-user"></i>
            用户名 </template
          ><span class="item-span" v-if="!isEdit">{{ user.user.username }}</span
          ><el-input
            v-if="isEdit"
            v-model="user.user.username"
            placeholder="请输入内容"
          ></el-input
        ></el-descriptions-item>
        <el-descriptions-item label="手机号"
          ><span class="item-span" v-if="!isEdit">{{
            user.user.telephone || "无"
          }}</span
          ><el-input
            v-if="isEdit"
            v-model="user.user.telephone"
            placeholder="请输入内容"
          ></el-input
        ></el-descriptions-item>

        <el-descriptions-item label="邮箱"
          ><span class="item-span" v-if="!isEdit">{{
            user.user.email || "无"
          }}</span
          ><el-input
            v-if="isEdit"
            v-model="user.user.email"
            placeholder="请输入内容"
          ></el-input
        ></el-descriptions-item>
        <el-descriptions-item label="地址"
          ><span class="item-span" v-if="!isEdit">{{
            user.user.address || "无"
          }}</span
          ><el-input
            v-if="isEdit"
            v-model="user.user.address"
            placeholder="请输入内容"
          ></el-input
        ></el-descriptions-item>
        <el-descriptions-item label="详细地址"
          ><span class="item-span" v-if="!isEdit">{{
            user.user.detailAddress || "无"
          }}</span
          ><el-input
            v-if="isEdit"
            v-model="user.user.detailAddress"
            placeholder="请输入内容"
          ></el-input
        ></el-descriptions-item>
        <el-descriptions-item label="账户余额"
          ><span class="item-span"
            >{{ user.userAmount }}￥</span
          ></el-descriptions-item
        >
      </el-descriptions>

      <div class="edit-box">
        <el-button type="success" @click="openRechargePanel">充值</el-button>
        <el-button type="primary" @click="saveData">保存</el-button>
      </div>
      <div class="code-box" v-show="isRecharge">
        <div class="recharge-box">
          <el-button
            class="danger-btn"
            type="danger"
            @click="closeRechargePanel"
            circle
            >×</el-button
          >
          <img src="@/assets/code.png" alt="这是二维码" />
          <el-input-number
            class="number-box"
            v-model="money"
            controls-position="right"
            :min="0"
          ></el-input-number>
          <el-button type="success" @click="walletToUp">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import { resultCheck } from "@/utils/result";
import { apiModifyInfo } from "@/api/user";
import { apiTopUp } from "@/api/wallet";

export default {
  name: "InfoPanel",
  data() {
    return {
      //是否在编辑中
      isEdit: false,
      // 是否充值
      isRecharge: false,
      // 充值金额
      money: 0,
    };
  },
  methods: {
    //保存用户信息
    saveData() {
      this.$confirm("确认保存修改后的数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 保存数据
        apiModifyInfo(this.user.user).then((res) => {
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
          } else {
            this.$message({
              type: "danger",
              message: "修改失败",
            });
          }
        });
      });
    },
    //打开充值界面
    openRechargePanel() {
      this.isRecharge = true;
    },
    closeRechargePanel() {
      this.isRecharge = false;
      this.money = 0;
    },
    //充值
    walletToUp() {
      apiTopUp({ userId: this.user.user.userId, money: this.money }).then(
        (res) => {
          if (res.status === 200) {
            this.$store.dispatch("walletUp", this.money);
            this.closeRechargePanel();
            this.$message({
              type: "success",
              message: "充值成功！",
            });
          } else {
            this.$message({
              type: "danger",
              message: "充值失败！",
            });
          }
        }
      );
    },
  },
  computed: {
    //引入vuex中的user
    ...mapState(["user"]),
  },
};
</script>

<style lang="less" scoped>
.chearfix::after,
.chearfix::before {
  content: "";
  display: table;
  clear: both;
}
.info-panel {
  width: 100%;
  height: 100%;
  .content-box {
    margin: 50px;
    padding-bottom: 50px;
    .item-span {
      line-height: 40px;
    }
    .edit-box {
      margin-top: 20px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .code-box {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      .recharge-box {
        padding: 20px;
        position: fixed;
        top: 50%;
        left: 50%;
        height: 350px;
        background-color: white;
        border-radius: 10px;
        transform: translate(-50%, -50%);
        * {
          display: block;
          margin-top: 5px;
        }
        .danger-btn {
          position: absolute;
          top: 0;
          right: 10px;
          width: 40px;
          height: 40px;
        }
        img {
          margin: 10 auto;
          margin-top: 50px;
          width: 200px;
          height: 200px;
        }
      }
    }
  }
}
</style>
