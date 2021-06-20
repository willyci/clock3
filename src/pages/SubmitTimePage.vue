<template>
  <base-layout page-title="Student Attendance" page-default-back-link="/">
    <ion-grid>
      <ion-row>
        <ion-col size="12">
          <h1>class id : {{ classID }} {{ ClassTitle }}.</h1>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <h1>{{ currentDate }}</h1>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <h2>(9:00AM - 10:00AM)</h2>
        </ion-col>
      </ion-row>
    </ion-grid>

    <h2>.{{ userName }}</h2>
    <h2>Current Time {{ currentTime }}</h2>

    <ion-grid>
      <ion-row
        ><ion-col size="12">
          <ion-button expand="block">
            <ion-icon slot="start" :icon="logInOutline"></ion-icon>
            Check Time In
          </ion-button>
        </ion-col></ion-row
      >
      <ion-row
        ><ion-col size="12">
          <ion-button expand="block">
            <ion-icon slot="start" :icon="logOutOutline"></ion-icon>
            Check Time Out
          </ion-button>
        </ion-col></ion-row
      >
      <ion-row
        ><ion-col size="12">
          <ion-button expand="block">
            <ion-icon slot="start" :icon="paperPlaneOutline"></ion-icon>
            Submit
          </ion-button>
        </ion-col></ion-row
      >
    </ion-grid>
  </base-layout>
</template>

<script>
import { IonButton } from "@ionic/vue";
import { logOutOutline, logInOutline, paperPlaneOutline } from "ionicons/icons";
export default {
  name: "SubmitTime",
  props: ["cuClass", "classProp", "msg"],
  components: { IonButton },
  data() {
    return {
      currentDate: "",
      currentTime: "",
      classID: this.$route.params.id,
      gotit: "",
      ClassTitle: "",
      userName: "",
      logOutOutline,
      logInOutline,
      paperPlaneOutline,
    };
  },
  computed: {},

  methods: {
    getTodayDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today =
        mm +
        "/" +
        dd +
        "/" +
        yyyy +
        String(today.getHours()).padStart(2, "0") +
        String(today.getMinutes()).padStart(2, "0");

      //this.currentTime = String(today.getHours()).padStart(2, '0') + ":" + String(today.getMinutes()).padStart(2, '0');
      return today;
    },
    getCurrentTime() {
      var today = new Date();
      today =
        String(today.getHours()).padStart(2, "0") +
        ":" +
        String(today.getMinutes()).padStart(2, "0");
      return today;
    },

    getClassTitle() {
      this.ClassTitle = this.$store.getters.cuClass(
        this.$route.params.id
      ).ClassTitle;
      this.userName = this.$store.getters.username;
    },
  },
  mounted: function () {
    //update table display onload
    this.gotit = this.msg;
    this.currentDate = this.getTodayDate(); //  mm + '/' + dd + '/' + yyyy;
    this.currentTime = this.getCurrentTime();
    this.classID = this.$route.params.id;
    console.log("today is = " + this.currentDate);
    this.getClassTitle();
  },
};
</script>