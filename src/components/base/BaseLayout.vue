<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" v-if="pageDefaultBackLink == 'classList'">
          <ion-back-button
            :default-href="pageDefaultBackLink"
          ></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="start" v-if="pageDefaultBackLink == 'login'">
          <ion-button id="changeText" @click="() => router.push('/login')">
            <ion-icon slot="start" :icon="lockClosedOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ pageTitle }}</ion-title>
        <ion-buttons slot="end">
          <slot name="actions-end"></slot>
        </ion-buttons>
        <ion-buttons slot="end" v-if="pageDefaultBackLink == 'login'">
          <ion-button id="changeText" @click="reload()">
            <ion-icon slot="end" :icon="refreshOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot />
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons
} from "@ionic/vue";
import { IonIcon } from "@ionic/vue";
import {
  lockClosedOutline,
  refreshOutline,
} from "ionicons/icons";
import { useRouter } from "vue-router";

export default {
  props: ["pageTitle", "pageDefaultBackLink"],
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonIcon,
  },
  data() {
    return {
      lockClosedOutline,
      refreshOutline,
    };
  },    
  setup() {
    const router = useRouter();
    return { router };
  },
  methods:{
    reload() {
      this.$parent.getClass();
    }
  },
};
</script>