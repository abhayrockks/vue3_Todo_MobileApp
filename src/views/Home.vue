<template>
  <div class="route-heading" @click="routeTo">Favourites</div>
  <div class="input-box">
    <input @keypress.enter="addItem" v-model="todoItem" />
  </div>
  <div class="list-container">
    <TodoList
      :todoList="todoList"
      @removeItemList="removeItemList"
      @editItemList="editItemList"
      @completeItemList="completeItemList"
    />
    <hr>
    <CompletedList
      :completedList="completedList"
      @removeCompleteItemList="removeCompleteItemList"
    />
  </div>
</template>

<script>
import TodoList from "../components/ToDo_List.vue";
import CompletedList from "../components/Completed_List.vue";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  components: {
    TodoList,
    CompletedList
  },
  setup() {
    const router = useRouter();
    const todoItem = ref("");
    const todoList = ref([]);
    const completedList = ref([]);
    const editFlag = ref("");
    const store = useStore();

    onMounted(() => {
      todoList.value = store.state.totalList;
      completedList.value = store.state.completedList;
    });

    function addItem() {
      if (todoItem.value && editFlag.value === "") {
        todoList.value.push(todoItem.value);
      } else if (editFlag.value >= 0 && editFlag.value !== "") {
        const favourites = store.state.favourites;
        const index = favourites.indexOf(todoList.value[editFlag.value]);
        todoList.value[editFlag.value] = todoItem.value;
        if (index >= 0) {
         favourites[index] = todoItem.value;
         store.dispatch("updateFavourites", favourites); 
        }
      } else {
        return;
      }
      store.dispatch("addToTotal", todoList.value);
      todoItem.value = "";
      editFlag.value = "";
    }

    function removeItemList(obj) {
      todoList.value.splice(obj.index, 1);
      store.dispatch("addToTotal", todoList.value);
      const favourites = store.state.favourites;
      const filterdfavourites = favourites.filter((el) => el !== obj.item);
      store.dispatch("updateFavourites", filterdfavourites);
    }

    function editItemList(param) {
      editFlag.value = param;
      todoItem.value = todoList.value[param];
    }

    function routeTo() {
      router.push("/Favourite");
    }

    function completeItemList(obj) {
      todoList.value.splice(obj.index, 1);
      store.dispatch("addToTotal", todoList.value);
      completedList.value.push(obj.item);
      store.dispatch("addTocomplete", completedList.value);
    }

    function removeCompleteItemList(obj) {
      completedList.value.splice(obj.index, 1);
      store.dispatch("addTocomplete", completedList.value);
      const favourites = store.state.favourites;
      const filterdfavourites = favourites.filter((el) => el !== obj.item);
      store.dispatch("updateFavourites", filterdfavourites);
    }

    watch(todoItem, (value) => {
      if (!value) {
        editFlag.value = ""
      }
    })

    // expose to template
    return {
      todoItem,
      todoList,
      completedList,
      addItem,
      routeTo,
      removeItemList,
      editItemList,
      completeItemList,
      removeCompleteItemList
    };
  },
};
</script>

<style scoped>
.route-heading {
  font-size: 20px;
  float: right;
  margin-right: 10px;
  cursor: pointer;
}
.list-container {
  margin-top: 50px;
}
.input-box {
  margin-top: 60px;
  margin-left: 5px;
}
</style>