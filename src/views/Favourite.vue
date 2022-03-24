<template>
<div class="route-heading" @click="routeTo">Home</div>
  <div class="list-heading"><b>Favourites</b></div>
  <div>
    <div v-for="(item, index) in favourites" :key="index">
      <p class="items">{{ item }}</p>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
      const router = useRouter()
      const store = useStore()

      function routeTo() {
      router.push('/')
    }
    // expose to template
    return {
      routeTo,
      favourites: computed(() => store.state.favourites),
    };
  },
};
</script>

<style scoped>
.list-heading {
  font-size: 50px;
}
.items {
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.route-heading {
  margin-top: 20px;
  font-size: 20px;
  float: right;
  margin-right: 10px;
  cursor: pointer;
}
</style>