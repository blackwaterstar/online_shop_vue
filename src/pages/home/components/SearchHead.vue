<template>
  <div class="SearchHead">
    <div class="theme">
      <span>网上书城</span>
    </div>
    <div
      :class="searchBoxArr"
      @mouseover="searchBoxOpen"
      @mouseout="searchBoxClose"
    >
      <div class="search-key">
        <input
          type="text"
          placeholder="请输入搜索关键词..."
          v-model="searchKey"
          @keyup.enter="searchProducts"
        />
      </div>
      <div class="search-btn">
        <a href="javascript:;" @click.prevent="searchProducts"
          ><i class="el-icon-search"></i
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchHead",
  data() {
    return {
      searchKey: "",
      searchBoxArr: ["search-box"],
    };
  },
  methods: {
    searchProducts() {
      if (!this.searchKeyTrim) {
        alert("输入结果不能为空！");
      } else {
        if (this.$route.path !== "/home/searchPanel") {
          this.$router.replace({
            name: "searchPanel",
            params: { searchKey: this.searchKeyTrim },
          });
        } else {
          this.$nextTick(() => {
            this.$bus.$emit("searchData", this.searchKeyTrim);
          });
        }
      }
    },
    searchBoxOpen() {
      this.searchBoxArr.push("active");
    },
    searchBoxClose() {
      this.searchBoxArr.pop("active");
    },
  },
  computed: {
    searchKeyTrim() {
      return this.searchKey.trim();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.SearchHead {
  padding: 50px 0 0;
  width: auto;
  min-width: 990px;
  height: 100px;
}
.clearfix::after,
.clearfix::before {
  content: "";
  display: table;
  clear: both;
}
.theme {
  float: left;
  margin-left: 40px;
  line-height: 60px;
  color: rgb(123, 207, 123);
  font-size: 40px;
}
.search-box {
  width: 60px;
  height: 60px;
  float: right;
  margin-right: 30px;
  background-color: seagreen;
  border-radius: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  transition: 0.5s;
}
.search-box.active {
  width: 400px;
}
.search-key {
  flex-shrink: 1;
  flex-grow: 1;
}
.search-key > input {
  width: calc(100% - 40px);
  padding: 0 20px;
  font-size: 18px;
  color: white;
  background: none;
  border: none;
  outline: none;
}
.search-key > input:focus {
  border: none;
  outline: none;
}
.search-key > input::-webkit-input-placeholder {
  color: lightgray;
}
.search-btn > a {
  width: 60px;
  height: 60px;
  right: 0;
  background-color: seagreen;
  border-radius: 100%;
  flex-shrink: 0;
  flex-grow: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>