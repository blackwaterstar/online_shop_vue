<template>
  <div class="product-item" @click="enterProductInfo">
    <div class="img-box" v-if="productInfos[0]">
      <img
        v-if="productInfos[0].pimg"
        :src="'http://localhost:8080/images/'+ productInfos[0].pimg"
      />
      <img v-else :src="require('@/assets/logo.png')" />
    </div>
    <div class="info-box">{{ product.pname }}</div>
    <div class="price">￥{{ productBottomPrice }}-{{ productTopPrice }}</div>
  </div>
</template>

<script>
import { apiSelectListProductInfo } from "@/api/productInfo";
export default {
  name: "ProductItem",
  props: ["product", "subProductPcount", "addProductPcount"],
  data() {
    return {
      productInfos: [],
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
        this.getProductInfos();
    },
    getProductInfos() {
      if(this.product.pid){
      apiSelectListProductInfo({ pid: this.product.pid }).then((res) => {
        this.productInfos = res.data;//不明报错，但不影响运行
      });}
    },
    enterProductInfo() {
      let parObj = JSON.stringify(this.product)
      this.$router.push({
        name: "productPanel",
        // params: {
        //   product: this.product,
        // },
        query: {
          'product': parObj
        }
      });
    },

  },
  computed: {
    productPriceSorted() {
      let sortByPrice = this.productInfos || [];
      return sortByPrice.sort((a, b) => {
        a.price - b.price;
      });
    },
    productBottomPrice() {
      if (this.productPriceSorted.length > 0)
        return this.productPriceSorted[0].price;
      return 0;
    },
    productTopPrice() {
      if (this.productPriceSorted.length > 0)
        return this.productPriceSorted[this.productInfos.length - 1].price;
      return 0;
    },
  },
};
</script>

<style scoped lang="less">
.product-item {
  float: left;
  width: 290px;
  height: 350px;
  margin-right: 38px;
  margin-bottom: 30px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.6);
  // transition-duration: 2s;
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
    transform: translateY(-10px);
  }
  .img-box {
    float: left;
    width: 290px;
    height: 290px;
    border-bottom: 1px solid rgba(255, 0, 0, 0.4);
    img {
      width: 290px;
      height: 290px;
    }
  }
  .info-box {
    float: left;
    width: 290px;
    padding: 0 10px;
    font-size: 18px;
  }
  .price {
    float: right;
    text-align: right;
    width: 270px;
    padding: 0 10px;
    font-size: 22px;
    color: #ff0000;
  }
  .info-box,
  .price {
    margin: 0 auto;
    height: 25px;
    line-height: 25px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
