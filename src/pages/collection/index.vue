<template>
  <div class="collection">
    <div class="collection-box">
      <div class="hd-nav">
        <a href="javascript;">收藏的宝贝</a>
      </div>
      <div class="empty-box" v-show="collections.length === 0">
        <el-empty description="收藏夹是空的哦"></el-empty>
      </div>
      <div
        class="collections-box"
        v-for="collection in collections"
        :key="collection.id"
      >
        <CollectionItem :collection="collection" :refreshData="refreshData"></CollectionItem>
      </div>
    </div>
  </div>
</template>

<script>
import CollectionItem from "./components/CollectionItem";
import { apiListCollect } from "@/api/collection";

export default {
  name: "Collection",
  components: {
    CollectionItem,
  },
  data() {
    return {
      collections: [],
    };
  },
  mounted: function () {
    this.getCollections();
  },
  methods: {
    getCollections() {
      return new Promise((resolve, reject) => {
        apiListCollect({ userId: this.$store.state.user.user.userId })
          .then((response) => {
            this.collections = response.data;
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    refreshData() {
      this.getCollections();
    },
  },
};
</script>

<style scoped>
.collection-box {
  width: 990px;
  margin: 20px auto;
}
.hd-nav {
  margin: 40px auto;
  overflow: hidden;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
}
.hd-nav > a {
  float: left;
  display: block;
  width: 200px;
  text-align: center;
  font-size: 22px;
  line-height: 40px;
  color: rgb(160, 182, 139);
  border-bottom: 1px solid transparent;
}
.hd-nav > a:hover {
  color: #a1c739;
  border-bottom: 1px solid rgba(255, 0, 0, 0.8);
}
</style>
