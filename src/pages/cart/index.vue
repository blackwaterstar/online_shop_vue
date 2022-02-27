<template>
  <div class="cart">
    <div class="content-box clearfix">
      <div class="content-hd"><a href="javascript;">收藏的商品</a></div>
      <div class="content">
        <p><input type="checkbox" name="" v-model="isAllChecked" />全选</p>
        <p style="width: 310px">商品信息</p>
        <p style="width: 150px">单价</p>
        <p style="width: 155px">数量</p>
        <p style="width: 135px">金额</p>
        <p>操作</p>

        <CartItem
          v-for="cartItem in cartItems"
          :key="cartItem.cartId"
          :cartItem="cartItem"
          :checkCartItem="checkCartItem"
          :deleteCartItem="deleteCartItem"
        ></CartItem>
      </div>
      <div class="empty-box" v-show="cartItems.length === 0">
        <el-empty description="购物车是空的哦"></el-empty>
      </div>
    </div>
    <div class="cart-total-box" v-show="cartItemTotal">
      <ul class="cart-total">
        <li>
          <span>已选：{{ ckeckedCartItemTotal }}</span
          ><span>&nbsp;/总共{{ cartItemTotal }}</span>
        </li>
        <li>
          <el-button type="success" @click="dialogFormVisible = true">提交订单</el-button>
          <el-dialog title="收货信息" :visible.sync="dialogFormVisible" append-to-body="false">
            <el-form :model="form" :rules="rules" ref="form">
              <el-form-item label="收件人" :label-width="formLabelWidth" required="true">
                <el-input v-model="form.orderUser"></el-input>
              </el-form-item>
              <el-form-item label="地址" :label-width="formLabelWidth" required="true">
                <el-input v-model="form.orderAddr"></el-input>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth" prop="orderTel">
                <el-input v-model="form.orderTel"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleSummit">确 定</el-button>
            </div>
          </el-dialog>
        </li>
        <li>
          <span>总计：{{ totalPrice }}￥</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CartItem from "./components/CartItem";
import { apiGetUserCart, apiCancelCart } from "@/api/cart";
import { apiAddOrder } from "@/api/order";
import { mapState } from "vuex";
export default {
  name: "Cart",
  components: {
    CartItem,
  },
  data() {
    return {
      cartItems: [],
      loading: false,
      form:{
        orderUser:'',
        orderAddr:'',
        orderTel:''
      },
      formLabelWidth:'120px',
      dialogFormVisible: false,
      rules: {
        orderTel: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {min: 11, max: 11, message: '长度必须是11个数字', trigger: 'blur'}
        ],

      }
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      new Promise((resolve, reject) => {
        apiGetUserCart({ userId: this.user.user.userId })
          .then((res) => {
            this.cartItems = res.data;
            this.cartItems.forEach((cartItem) => {
              this.$set(cartItem, "checked", false);
            });
            resolve();
          })
          .then((v) => {
            return v;
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    checkCartItem(cartId) {
      this.cartItems.forEach((cartItem) => {
        if (cartItem.cartId === cartId) {
          cartItem.checked = !cartItem.checked;
        }
      });
    },
    deleteCartItem(cartId) {
      apiCancelCart({ cartId }).then((res) => {
        if (res.status) {
          setTimeout(() => {
            this.$message({
              type: "success",
              message: "取消成功",
            });
            this.initData();
          });
        }
      });

    },
    checkAllCartItem(value) {
      this.cartItems.forEach((cartItem) => {
        cartItem.checked = value;
      });
    },
    // 提交购物车内订单
    handleSummit() {
      let cancelCartItems = [];
      let ppids = [];
      let pcounts = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.checked) {
          cancelCartItems.push(cartItem.cartId);
          ppids.push(cartItem.ppid);
          pcounts.push(cartItem.pcount);
        }
      });
      // 添加订单
      apiAddOrder({
        userId: this.user.user.userId,
        orderPrice: this.totalPrice,
        orderUser:this.form.orderUser,
        orderAddr:this.form.orderAddr,
        orderTel:this.form.orderTel,
        ppids,
        pcounts,
      });
      // 取消购物车
      cancelCartItems.forEach((cartId) => {
        apiCancelCart({ cartId });
      });
      // apiDeleteListCart({ cartIds: cancelCartItems });
      setTimeout(() => {
        //this.initData();
        this.$router.push("/user/orderPanel")
        this.dialogFormVisible = false
        this.$notify({
          title: "成功",
          message: "订单提交成功，请前往付款",
          type: "success",
        });
      }, 500);

    },
  },
  computed: {
    ...mapState(["user"]),
    ckeckedCartItemTotal() {
      return this.cartItems.reduce(
        (sum, cartItem) => sum + (cartItem.checked ? 1 : 0),
        0
      );
    },
    cartItemTotal() {
      return this.cartItems.length;
    },
    totalPrice() {
      return this.cartItems.reduce(
        (sum, cartItem) =>
          sum + cartItem.price * cartItem.pcount * (cartItem.checked ? 1 : 0),
        0
      );
    },
    isAllChecked: {
      get() {
        return (
          this.ckeckedCartItemTotal === this.cartItemTotal &&
          this.cartItemTotal > 0
        );
      },
      set(value) {
        this.checkAllCartItem(value);
      },
    },
  },
};
</script>

<style scoped lang = "less">
.cart {
  width: 990px;
  margin: 0 auto;

  .content-hd {
    margin: 40px auto;
    overflow: hidden;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    & > a {
      float: left;
      display: block;
      width: 200px;
      text-align: center;
      font-size: 22px;
      line-height: 40px;
      color: rgb(160, 182, 139);
      border-bottom: 1px solid transparent;
    }
  }

  .content {
    & > p {
      float: left;
      width: 120px;
      font-size: 15px;
      line-height: 40px;
    }
  }

  .empty-box {
    clear: both;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .cart-total-box {
    width: 990px;
    height: 35px;
    position: fixed;
    bottom: 0;
    color: red;
    background-color: rgb(230, 245, 215);
    border: 1px solid rgb(114, 185, 44);
    border-radius: 10px 10px 0 0;
    .cart-total {
      width: 740px;
      margin: 5px 125px;

      & > li {
        float: right;
        line-height: 28px;
      }
      & > li:first-child {
        float: left;
      }
    }
  }
}
</style>