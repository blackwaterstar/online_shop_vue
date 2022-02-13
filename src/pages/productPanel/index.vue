<template>
  <div class="productInfo">
    <div class="product-info-box chearfix">
      <div class="content-box chearfix">
        <div class="img-box">
<!--          <img :src="require('@/assets/' + productInfos[0].pimg)" />-->
<!--          <img :src="require('@/assets/' + this.productInfos[this.radio].pimg)" />-->
              <img :src="'http://localhost:8080/images/'+ this.productInfos[this.radio].pimg">
        </div>
        <div class="info-box">
          <div class="product-name">
            <h2>{{ product.pname }}</h2>
          </div>
          <div class="product-price">
            <h2>￥{{ productBottomPrice }} - {{ productTopPrice }}</h2>
          </div>
          <div class="product-tag">
            标签：
            <el-tag type="success" effect="plain">
              {{ tag }}
            </el-tag>
          </div>
          <div class="product-salesAndRemain">
            <p>销量：{{ allProductSale }}</p>
            <p>|</p>
            <p>剩余：{{ allProductRemain }}</p>
          </div>
          <div
            class="product-type-box"
            v-for="(productInfo, index) in productInfos"
            :key="index"
          >
            <el-radio
              v-model="radio"
              :label="index"
              :disabled="productInfo.pnumber == 0"
              border
              >{{ productInfo.pname }}（剩余：{{
                productInfo.pnumber
              }}）</el-radio
            >
          </div>
          <div>
            数量：<br />
            <el-input-number
              v-model="pcount"
              controls-position="right"
              :min="1"
            ></el-input-number>
          </div>
          <div>
            总价：<br />
            {{ totalPrice }}
          </div>
          <div class="summit-btn-box">
            <el-button
              class="summit-btn"
              type="danger"
              @click="addOrder"
              round
              :disabled="productInfos.length == 0"
              >立即购买</el-button
            >
            <el-button
              class="summit-btn"
              type="danger"
              @click="addCart"
              round
              :disabled="productInfos.length == 0"
              >加入购物车</el-button
            >
            <el-button
              class="summit-btn"
              type="warning"
              @click="addCollection"
              round
              :disabled="productInfos.length == 0"
              >收藏</el-button
            >
          </div>
        </div>
      </div>
      <div class="comment-box chearfix">
        <div
          class="comment-for"
          v-for="comment in comments.slice((current-1)*size, current*size)"
          :key="comment.comment.commentId"
        >
          <CommentItem :comment="comment"></CommentItem>
        </div>
<!--        <el-pagination-->
<!--          class="page"-->

<!--          background-->
<!--          @size-change="handleSizeChange"-->
<!--          @current-change="currentChange"-->
<!--          :current-page="current"-->
<!--          :page-sizes="[1,5,10]"-->
<!--          :page-size="size"-->
<!--          layout="total, prev, pager, next, jumper"-->
<!--          :total="totalComments"-->
<!--        >-->
<!--        </el-pagination>-->
        <div class="block">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="current"
                :page-sizes="[5, 10, 50, 100]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalComments">
        </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentItem from "./components/CommentItem";
import { apiAddCart } from "@/api/cart";
import { apiSelectType } from "@/api/type";
import {
  apiSelectListProductInfo,
  // apiSalesProduct
} from "@/api/productInfo";
import { apiAddCollection } from "@/api/collection";
import { apiSelectCommentById } from "@/api/comment";
import { apiAddOrder } from "@/api/order";
// import { apiSalesProduct } from "@/api/productInfo";
import { mapState } from "vuex";
export default {
  name: "ProductInfo",
 // props: ["product"],
  components: {
    CommentItem,
  },
  data() {
    return {
      // 物品信息
      tag: "无",
      product: JSON.parse(this.$route.query.product),
      pcount: 1,
      productInfos: [{ pname: "", pimg: "logo.png" }],
     // allProductSales: 0,
      radio: 0,
      //评论页面信息
     // comments: [],
      comments: [{comment:{}, pname:'',}],
      //一页多少条
      size: 5,
      //当前页
      current: 1,
      totalComments:''
    };
  },
  created() {
    this.getType();
    apiSelectListProductInfo({ pid: this.product.pid }).then((res) => {
      this.productInfos = res.data;
      this.productInfos.forEach((productInfo) => {
        apiSelectCommentById({ ppid: productInfo.ppid })
                .then((res) => {
                  if (res.status === 200) {
                    //this.comments = [...this.comments, ...res.data];
                    this.comments = res.data;
                    this.totalComments=this.comments.length;
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
      });
    });
  },
  // mounted() {
  //   this.initData();
  // },
  methods: {
    // initData() {
    //   this.getType();
    //   this.getProductInfos();
    //   // setTimeout(() => {
    //   //   this.getComments();
    //   // }, 3000);
    // },
    // 页面总数
    getTotalComment() {

    },
    //获取类型
    getType() {
      apiSelectType({ id: this.product.tid }).then((res) => {
        this.tag = res.data.name;
      });
    },

    //获取物品信息
    getProductInfos() {
      apiSelectListProductInfo({ pid: this.product.pid }).then((res) => {
        this.productInfos = res.data;
       this.getComments();
        // apiSalesProduct({ pid: this.product.pid }).then((res) => {
        //   this.allProductSales = res.data;
        // });
      });
    },
    //获取评论
    getComments() {
      this.comments = [];
      this.productInfos.forEach((productInfo) => {
        apiSelectCommentById({ ppid: productInfo.ppid })
          .then((res) => {
            if (res.status === 200) {
              //this.comments = [...this.comments, ...res.data];
              this.comments = res.data;
            }
          })
          .catch((e) => {
            console.log(e);
          });
      });
    },
    handleSizeChange(current) {
      this.size = current;
      this.getComments();
      this.current = 1;

    },
    //页面更替
    handleCurrentChange(current) {
      this.current = current;
      this.getComments();
    },
    // 添加订单
    addOrder() {
      this.$confirm("确认提交订单", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
        center: true,
      }).then(() => {
        // 添加订单
        apiAddOrder({
          userId: this.user.user.userId,
          orderPrice: this.totalPrice,
          ppids: [this.productInfos[this.radio].ppid],
          pcounts: [this.pcount],
        });
        this.$message({
          type: "success",
          message: "成功!",
        });
      });
    },
    addCart() {
      this.$confirm("确认加入购物车", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
        center: true,
      }).then(() => {
        // 加入购物车
        apiAddCart({
          userId: this.user.user.userId,
          pid: this.productInfos[this.radio].ppid,
          pcount: this.pcount,
        }).then((res) => {
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: "加入购物车成功!",
            });
          }
        });
      });
    },
    addCollection() {
      // 添加收藏
      apiAddCollection({
        userId: this.user.user.userId,
        ppid: this.productInfos[this.radio].ppid,
      }).then((res) => {
        if (res.data === 0) {
          this.$message({
            type: "info",
            message: "您已收藏该物品",
          });
        } else {
          this.$message({
            type: "success",
            message: "收藏成功",
          });
        }
      });
    },
  },
  computed: {   //计算属性
    ...mapState(["user"]),
    // 剩余物品
    allProductSale() {
      return this.productInfos.reduce((sum, productInfo) => {
        return sum + productInfo.allsalenumber;
      }, 0);
    },
    // 剩余物品
    allProductRemain() {
      return this.productInfos.reduce((sum, productInfo) => {
        return sum + productInfo.pnumber;
      }, 0);
    },
    // 价格排序
    productPriceSorted() {
      let sortByPrice = this.productInfos || [];
      return sortByPrice.sort((a, b) => {
        a.price - b.price;
      });
    },
    // 最低价格
    productBottomPrice() {
      if (this.productPriceSorted.length > 0)
        return this.productPriceSorted[0].price;
      return 0;
    },
    // 最高价格
    productTopPrice() {
      if (this.productPriceSorted.length > 0)
        return this.productPriceSorted[this.productInfos.length - 1].price;
      return 0;
    },
    // 总价格
    totalPrice() {
      return this.pcount * this.productInfos[this.radio].price;
    },
  },
};
</script>

<style scoped lang="less">
.chearfix::after,
.chearfix::before {
  content: "";
  display: table;
  clear: both;
}
.productInfo {
  width: 990px;
  margin: 0 auto;
}
.product-info-box {
  width: 890px;
  margin: 0 auto;
  margin-top: 50px;
}
.img-box {
  float: left;
  border: 1px solid black;
  img {
    width: 400px;
    height: 400px;
  }
}
.info-box {
  width: 400px;
  float: right;
  border: 1px solid yellowgreen;
  border-radius: 10px;
}
.info-box > * {
  margin: 20px;
}
.product-name {
  display: flex;
  justify-content: space-between;
}
.product-price {
  color: red;
}
.product-salesAndRemain {
  display: flex;
  justify-content: space-around;
}
.product-salesAndRemain {
  width: cal(100%-40px);
  color: gray;
}
.content-item-td-btn {
  width: 20px;
  height: 20px;
  background-color: rgb(178, 236, 127);
  border: none;
}
.summit-btn {
  font-size: 18px;
  margin-bottom: 20px;
}
.comment-box {
  width: 890px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid yellowgreen;
  border-radius: 10px;
}
/* .comment-add-box {
  padding: 20px;
  border: 1px solid salmon;
}
.comment-testarea {
  margin-bottom: 20px;
  padding: 10px;
  width: 780px;
  height: 80px;
  resize: none;
} */
</style>