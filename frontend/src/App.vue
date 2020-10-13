<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title></v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
    </v-navigation-drawer>

      <image-view />
      <text-view />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import ImageView from "./components/ImageView.vue";
import TextView from "./components/TextView.vue";

export default Vue.extend({
  name: "App",

  components: {
    ImageView,
    TextView,
  },

  data: () => ({
    drawer: null,
  }),
});
</script>
