<template>
  <base-layout page-title="Class List">
    
    <memories-list :memories="memories"></memories-list>
  </base-layout>
</template>

<script>
//import { IonButton, IonIcon } from "@ionic/vue";
import { add } from "ionicons/icons";

import MemoriesList from "../components/memories/MemoriesList.vue";

export default {
  components: {
    MemoriesList
  },
  data() {
    return { add };
  },
  computed: {
    memories() {
      return this.$store.getters.memories;
    },
  },
};
</script>