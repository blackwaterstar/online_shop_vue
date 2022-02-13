<template>
  <div class="userInfo">
    <div class="content-box chearfix">
      <div class="view-box"><router-view></router-view></div>
      <div class="img-box">
        <img src="@/assets/avatar.png" alt="头像" />
      </div>
      <div class="nav-box">
        <ul class="nav-ul">
          <li class="item-info">
            <router-link to="/user/InfoPanel">我的信息</router-link>
          </li>
          <li class="item-cart">
            <a href="javascript:;" @click="toPathCart">我的购物车</a>
          </li>
          <li class="item-collction">
            <a href="javascript:;" @click="toPathCollction">我的收藏</a>
          </li>
          <li class="item-comment">
            <router-link to="/user/orderPanel">我的订单</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "UserInfo",
  components: {},
  methods: {
    toPathCart() {
      this.$router.push("/cart");
    },
    toPathCollction() {
      this.$router.push("/collection");
    },
  },
  computed: {
    ...mapState(["user"]),
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
.userInfo {
  width: 990px;
  margin: 50px auto;
  padding: 50px;
  border: 1px solid green;
  border-radius: 10px;
  /* background-image: linear-gradient(to bottom, yellowgreen 70%, greenyellow); */
}

.content-box {
  & > * {
    background-color: white;
  }

  .img-box,
  .nav-box {
    width: 240px;
    border: 1px solid mediumturquoise;
    border-radius: 5px;
  }
  .img-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 150px;

    img {
      display: block;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 1px solid mediumturquoise;
      background: chartreuse;
    }
  }
  .nav-box {
    margin-top: 20px;
    height: 290px;
    .nav-ul {
      text-align: center;
      line-height: 70px;
      a {
        color: black;
        &:hover {
          color: chartreuse;
        }
      }
    }
  }

  .view-box {
    float: right;
    width: 600px;
    min-height: 600px;
    border: 1px solid mediumturquoise;
    border-radius: 5px;
  }
}
</style>
