<template>
  <div class="content-item">
    <ul>
      <li class="content-item-td" style="width: 38px">
        <div>
          <input
            type="checkbox"
            name=""
            :checked="cartItem.checked"
            @change="handleCheck(cartItem.cartId)"
          />
        </div>
      </li>
      <li class="content-item-td">
        <div class="img-box">
<!--          <img v-if="productInfo" :src="require('@/assets/' + productInfo.pimg)" />-->
          <img v-if="productInfo"  :src="'http://localhost:8080/images/'+ productInfo.pimg" />

          <img v-else src="@/assets/logo.png" />
        </div>
      </li>
      <li class="content-item-td" style="width: 220px">
        <div>{{ cartItem.pname }}</div>
      </li>
      <li class="content-item-td item-price">
        <div>￥{{ cartItem.price }}</div>
      </li>
      <li class="content-item-td">
        <div>
          <el-input-number
            class="number-box"
            v-model="cartItem.pcount"
            controls-position="right"
            :min="1"
          ></el-input-number>
        </div>
      </li>
      <li class="content-item-td item-price">
        <div style="text-align: center">￥{{ itemPrice }}</div>
      </li>
      <li class="content-item-td">
        <div>
          <a href="javascript:;" @click="handleDelete(cartItem.cartId)">删除</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { apiSelectProductInfo } from "@/api/productInfo";
export default {
  name: "CartItem",
  props: ["cartItem", "checkCartItem", "deleteCartItem"],
  data() {
    return {
      productInfo: "",
    };
  },
  created() {
    this.initData();
  },

  methods: {
    initData() {
      this.getCartInfos();
    },
    getCartInfos() {
      apiSelectProductInfo({ ppid: this.cartItem.ppid }).then((res) => {
        this.productInfo = res.data;
      });
    },
    handleCheck(cartId) {
      this.checkCartItem(cartId);
    },
    handleDelete(cartId) {
      if (confirm("确认删除？")) this.deleteCartItem(cartId);
    },
  },
  computed: {
    itemPrice() {
      return this.cartItem.price * this.cartItem.pcount;
    },
  },
};
</script>

<style scoped lang="less">
.content-item {
  float: left;
  padding-top: 20px;
  margin: 20px 0;
  width: 100%;
  height: 130px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  .content-item-td {
    float: left;
    width: 120px;
    height: 100px;
    margin-left: 12px;
    word-break: break-all;
    .number-box {
      width: 100px;
      border-color: yellowgreen;
    }.img-box {
       width: 120px;
       height: 120px;
       border: 1px solid yellowgreen;
       img {
         width: 120px;
         height: 120px;
       }
     }
  }
  .item-price {
    color: red;
  }
  & > div {
    float: left;
  }
  & a {
    display: block;
    width: 20px;
    margin: 0 auto;
    color: rgb(76, 143, 10);
    &:hover {
      color: red;
      text-decoration: underline;
    }
  }
}
</style>