<template>
  <div class="home">
    <SearchHead></SearchHead>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchHead from "./components/SearchHead";
export default {
  name: "Home",
  components: {
    SearchHead,
  },
};
</script>

<style scoped>
.home {
  width: 990px;
  margin: 0 auto;
}
</style>
