<template>
  <router-view />
</template>

<script>
import { LocalNotifications } from "@capacitor/local-notifications";
import { onMounted } from "vue";
export default {
  setup() {
    onMounted(async () => {
      await LocalNotifications.requestPermissions();

      LocalNotifications.schedule({
        notifications: [
          {
            title: "Title",
            body: "Body",
            id: 1,
            schedule: { at: new Date(Date.now() + 1000 * 5) },
            actionTypeId: "",
            extra: null,
          },
        ],
      });
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
