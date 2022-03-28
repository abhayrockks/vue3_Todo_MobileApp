<template>
  <div class="list-heading"><b> Todo List</b></div>
  <div>
    <div v-for="(item, index) in todoList" :key="index">
      <p class="items">
        <span class="list-font">{{ item }}</span>
        <span class="action-class" @click="editItem(index)"
          ><i class="glyphicon glyphicon-edit"></i
        ></span>
        <span class="action-class" @click="removeItem(index, item)"
          ><i class="glyphicon glyphicon-minus"></i
        ></span>
        <span class="action-class" @click="addToFavourite(item)"
          ><i class="glyphicon glyphicon-star"></i
        ></span>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from 'vuex';

export default {
  props: {
    todoList: Array,
  },
  setup(props, context) {
    const arrayList = ref([]);
    const store = useStore()

    function removeItem(index, item) {
      let obj = {index: index, item: item}
      context.emit("removeItemList", obj);
    }

    function editItem(index) {
      context.emit("editItemList", index);
    }

    // expose to template
    return {
      arrayList,
      removeItem,
      editItem,
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