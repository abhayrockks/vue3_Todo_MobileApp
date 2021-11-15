<template>
<div class="route-heading" @click="routeTo">Favourites</div>
  <div class="input-box"><input @keypress.enter="addItem" v-model="todoItem" /></div>
  <div class="list-container"><TodoList :todoList="todoList" @removeItemList="removeItemList" @editItemList="editItemList"/></div>
</template>

<script>
import TodoList from "../components/ToDo_List.vue";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
  components: {
    TodoList,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const todoItem = ref("");
    const todoList = ref([]);
    const editFlag = ref("")
    const store = useStore()

    onMounted(() => {
      todoList.value = store.state.totalList
    })

    function addItem() {
      if (todoItem.value && editFlag.value === "") {
        todoList.value.push(todoItem.value)
      } else if (editFlag.value >= 0) {
        todoList.value[editFlag.value] = todoItem.value
      }
      store.dispatch('addToTotal', todoList.value)
      todoItem.value = ""
      editFlag.value = ""
    }

    function removeItemList(obj) {
      todoList.value.splice(obj.index, 1)
      store.dispatch('addToTotal', todoList.value)
      const favourites = store.state.favourites
      const filterdfavourites = favourites.filter(el => el !== obj.item)
      store.dispatch('updateFavourites', filterdfavourites)
    }

    function editItemList(param) {
      editFlag.value = param
      todoItem.value = todoList.value[param]
    }

    function routeTo() {
      router.push('/Favourite')
    }

    // expose to template
    return {
      todoItem,
      todoList,
      addItem,
      removeItemList,
      editItemList,
      route,
      router,
      routeTo
    };
  },
};
</script>

<style scoped>
.route-heading {
  font-size: 20px;
  float: right;
  margin-right: 80px;
  cursor: pointer;
}
.list-container {
  margin-top: 50px;
}
.input-box {
  margin-top: 60px;
  margin-left: 165px;
}
</style>