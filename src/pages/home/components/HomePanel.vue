<template>
  <div class="content-box clearfix">
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="(img, index) in imgArr" :key="index">
        <img :src="require('@/assets/' + img + '.png')" alt="" />
      </el-carousel-item>
    </el-carousel>
    <div class="products-box" v-for="product in products" :key="product.pid">
      <ProductItem :product="product"></ProductItem>
    </div>
  </div>
</template>

<script>
import ProductItem from "@/components/ProductItem";
import { apiListProduct } from "@/api/product";
// import { apiSelectListProductInfo } from "@/api/productInfo";
export default {
  name: "HomePanel",
  components: {
    ProductItem,
  },
  data() {
    return {
      products: [{ productInfos: [] }],
      imgArr: ["jxj", "jkl", "iphone10", "acar", "dongfeng"],
    };
  },
  mounted() {
    this.initData();
    //   let imgList = document.querySelector(".img-list").children;
    //   let pointList = document.querySelector(".point-list").children;
    //   for (let i = 0; i < pointList.length; i++) {
    //     pointList[i].addEventListener("click", () => {
    //       for (let j = 0; j < pointList.length; j++) {
    //         if (pointList[j].classList.contains("active")) {
    //           pointList[j].classList.remove("active");
    //           imgList[j].classList.remove("active");
    //         }
    //       }
    //       pointList[i].classList.add("active");
    //       imgList[i].classList.add("active");
    //     });
    //   }
  },
  methods: {
    initData() {
      apiListProduct().then((res) => {
        this.products = res.data;
        // this.products.forEach((product) => {
        //   apiSelectListProductInfo({ pid: product.pid }).then((res) => {
        //     product.productInfos = res.data;
        //   });
        // });
      });
    },
  },
};
</script>

<style scoped>
/* .clearfix::after,
.clearfix::before {
  content: "";
  display: table;
  clear: both;
}
.content-box {
  display: flex;
  justify-content: space-around;
  min-width: 1100px;
}
.left-nav-item-control {
  width: 300px;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  border-bottom: 1px solid rgba(0, 0, 0, 0.6);
}
.left-nav-item {
  display: flex;
  justify-content: space-between;
  width: 400px;
}
.left-nav-item-title {
  width: 80px;
  font-size: 22px;
  text-align: center;
  line-height: 80px;
  color: white;
  background-color: rgb(0, 0, 0);
}
.left-nav-item-content {
  line-height: 40px;
  margin: 0 5px;
}
.left-nav-item-content > a {
  color: darkslategray;
}
.img-box {
  position: relative;
}
.img-list {
  width: 590px;
  height: 420px;
}
.img-list > li {
  position: absolute;
}
.img-list > li img {
  width: 590px;
  height: 420px;
}
.img-list li.active {
  z-index: 1;
}
.point-list {
  position: absolute;
  z-index: 2;
  bottom: 10px;
}
.point-list > a {
  float: left;
  width: 10px;
  height: 10px;
  margin: 0 4px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  background-clip: content-box;
  border: 2px solid transparent;
}
.point-list a.active,
.point-list a:hover {
  background-color: white;
  border: 2px solid rgba(0, 0, 0, 0.6);
} */

.el-carousel__item img {
  width: 500px;
  height: 400px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
