<template>
<div v-if="completedList && completedList.length">
  <div class="list-heading"><b> Completed List</b></div>
  <div>
    <div v-for="(item, index) in completedList" :key="index">
      <p class="items">
        <span class="list-font">{{ item }}</span>
        <span class="action-class" @click="removeItem(index, item)"
          ><i class="glyphicon glyphicon-minus"></i
        ></span>
        <span v-if="favourites.includes(item)" class="action-class" @click="removeFromFavourite(item)"
          ><i class="glyphicon glyphicon-star"></i
        ></span>
        <span v-else class="action-class" @click="addToFavourite(item)"
          ><i class="glyphicon glyphicon-star-empty"></i
        ></span>
      </p>
    </div>
  </div>
</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from 'vuex';

export default {
  props: {
    completedList: Array,
  },
  setup(props, context) {
    const store = useStore()

    function removeItem(index, item) {
      let obj = {index: index, item: item}
      context.emit("removeCompleteItemList", obj);
    }

    // expose to template
    return {
      removeItem,
      favourites: computed(() => store.state.favourites),
      removeFromFavourite: (payload) => store.dispatch('removeFromFavourite', payload),
      addToFavourite: (payload) => store.dispatch('addToFavourite', payload)
    };
  },
};
</script>

<style scoped>
.list-font {
  font-size: 30px;
}
.action-class {
  margin-left: 20px;
  cursor: pointer;
}
.list-heading {
  font-size: 50px;
}
.items {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>