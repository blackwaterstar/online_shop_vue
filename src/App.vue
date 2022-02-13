<template>
  <div id="app">
    <div class="header">
      <span class="hd-item">亲，欢迎来到书城！</span>
      <router-link v-if="!$store.state.user" class="hd-item" to="/login"
      >请登录&nbsp;<i class="el-icon-user"></i
      ></router-link>
      <router-link v-if="!$store.state.user" class="hd-item" to="/register"
      >注册</router-link
      >
      <div v-else class="hd-item user-box">
        <a href="javascript:;"
        >欢迎你&nbsp;{{ $store.state.user.user.username }}</a
        >
        <div class="menu-cl-panel">
          <div>
            <router-link to="/user/infoPanel">个人信息</router-link>
          </div>
          <div><a href="javascript:;" @click="logout">退出登录</a></div>
        </div>
      </div>

      <ul class="hd-menu">
        <li class="menu-item">
          <router-link to="/home/homePanel"
          >首页&nbsp;<i class="el-icon-goods"></i
          ></router-link>
        </li>
        <li class="menu-item">
          <router-link to="/cart"
          >购物车&nbsp;<i class="el-icon-shopping-cart-2"></i
          ></router-link>
        </li>
        <li class="menu-item">
          <router-link to="/collection"
          >收藏夹&nbsp;<i class="el-icon-collection"></i
          ></router-link>
        </li>
      </ul>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "App",
    components: {},
    methods: {
      logout() {
        this.$store.dispatch("logout");
        this.$router.push("/login");
      },
    },
  };
</script>

<style>
  .header {
    width: auto;
    min-width: 1200px;
    height: 50px;
    position: relative;
    background-color: green;
    color: ivory;
    font-size: 22px;
    box-shadow: 0px 0px 3px #0d6b29;
    line-height: 50px;
  }
  .user-box:hover .menu-cl-panel {
    display: block;
  }
  .menu-cl-panel {
    display: none;
    position: absolute;
    margin-top: -2px;
    background-color: white;
    border: 1px solid green;
    border-radius: 0 0 5px 5px;
  }
  .menu-cl-panel > div {
    margin: 5px 10px;
  }
  .menu-cl-panel > div > a {
    color: seagreen;
  }
  .hd-menu {
    position: absolute;
    right: 0;
    top: 0;
  }
  .hd-menu > li {
    float: left;
    position: relative;
    margin: 0 30px;
  }
  .hd-item {
    float: left;
    margin: 0 30px;
  }
  * {
    margin: 0;
    padding: 0;
  }
  li,
  ol,
  ul {
    list-style: none;
  }
  a {
    text-decoration: none;
    white-space: nowrap;
    color: ivory;
    font-size: 18px;
  }
  a:hover {
    color: greenyellow;
  }
</style>
