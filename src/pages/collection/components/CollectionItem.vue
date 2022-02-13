<template>
  <div class="collection-item" @click="enterProductInfo">
    <div class="img-box">
<!--      <img v-if="productInfo" :src="require('@/assets/' + productInfo.pimg)" />-->
      <img v-if="productInfo"  :src="'http://localhost:8080/images/'+ productInfo.pimg" />
      <img v-else src="@/assets/logo.png" />
    </div>
    <div class="info-box">{{ productInfo.pname }}</div>
    <div class="price">￥{{ productInfo.price }}</div>
    <div class="delete" @click.stop="deleteCollection">
      <i class="el-icon-delete"></i>
    </div>
  </div>
</template>

<script>
import { apiDeleteCollect } from "@/api/collection";
import { apiSelectProductInfo } from "@/api/productInfo";
import { apiFindProductByPpid } from "@/api/product";
import { mapState } from "vuex";
export default {
  name: "CollectionItem",
  props: ["collection", "refreshData"],
  data() {
    return {
      productInfo: { pimg: "logo.png" },
      product: {},
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.getCollectionInfos();
    },
    getCollectionInfos() {
      apiSelectProductInfo({ ppid: this.collection.ppid }).then((res) => {
        this.productInfo = res.data;
      });
      apiFindProductByPpid({ ppid: this.collection.ppid }).then((res) => {
        this.product = res.data;
      });
    },
    enterProductInfo() {
      // this.$router.push({
      //   name: "productPanel",
      //   params: {
      //     product: this.product,
      //   },
      // });
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
    deleteCollection() {
      apiDeleteCollect({
        userId: this.user.user.userId,
        ppid: this.collection.ppid,
      }).then((res) => {
        if (res.status === 200) {
          setTimeout(() => {
            this.$message(
              {
                type: "success",
                message: "取消成功",
              },
              3000
            );
            this.refreshData();
          });
        }
      });
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style scoped lang="less">
.collection-item {
  position: relative;
  float: left;
  width: 170px;
  margin-right: 10px;
  margin-bottom: 20px;
  padding: 30px;
  border: 1px solid green;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.6);
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
    transform: translateY(-10px);
  }
  .img-box {
    width: 170px;
    height: 170px;
    border: 1px solid yellowgreen;
    img {
      width: 170px;
      height: 170px;
    }
  }
  .info-box,
  .price {
    margin: 0 auto;
    height: 25px;
    line-height: 25px;
    white-space: nowrap;
  }
  .info-box {
    width: 170px;
    font-size: 18px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .price {
    text-align: center;
    font-size: 22px;
    color: red;
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .delete {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    &:hover {
      background-color: red;
    }
  }
}
</style>
