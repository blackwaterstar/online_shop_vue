<template>
  <div class="searchPanel">
    <div class="products-box" v-for="product in products" :key="product.id">
      <ProductItem :product="product"></ProductItem>
    </div>
  </div>
</template>

<script>
import ProductItem from "@/components/ProductItem";
import { apiSearchProduct } from "@/api/product";

export default {
  name: "SearchPanel",
  components: {
    ProductItem,
  },
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.initData(this.$route.params.searchKey);
    this.$bus.$on("searchData", this.refreshData);
  },
  methods: {
    initData(searchKey) {
      return new Promise((resolve, reject) => {
        apiSearchProduct({ pname: searchKey })
          .then((response) => {
            this.products = response.data;
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    refreshData(data) {
      this.initData(data);
    },
  },
  beforeDestroy() {
    this.$bus.$off("searchData");
  },
};
</script>

<style scoped>
.searchPanel {
  width: 990px;
  margin: 0 auto;
}
</style>