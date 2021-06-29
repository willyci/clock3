<template>
  <base-layout page-title="" page-default-back-link="/">
    <ion-grid>
      <ion-row>
        <ion-col size="12" style="text-align: center">
          <h3>Student Attendance</h3>
          <h1>{{ ClassTitle }} ({{ classID }})</h1>
          <h1>{{ currentDate }}</h1>
          <h2>({{classStartTime}} - {{classEndTime}})</h2>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          
        </ion-col>
      </ion-row>

    </ion-grid>

    <ion-grid>
      <ion-row
        ><ion-col size="12" style="text-align: center">
          <h1>I am Here</h1>
          <ion-button expand="block">
            <ion-icon slot="start" :icon="logInOutline"></ion-icon>
            {{ currentTime }}
          </ion-button>
        </ion-col></ion-row
      >
      <ion-row
        ><ion-col size="12" style="text-align: center">
           <h1>I am Leaving</h1>
          <ion-button expand="block">
            <ion-icon slot="start" :icon="logOutOutline"></ion-icon>
            {{ currentTime }}
          </ion-button>
        </ion-col></ion-row
      >
      <ion-row
        ><ion-col size="12" style="text-align: center">
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
      classStartTime: "",
      classEndTime: ""
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
      this.classStartTime = this.$store.getters.cuClass(
        this.$route.params.id
      ).classStartTime;
      this.classEndTime = this.$store.getters.cuClass(
        this.$route.params.id
      ).classEndTime;
      this.userName = this.$store.getters.username;
    },
  },
  mounted: function () {
    //update table display onload
    this.gotit = this.msg;
    let today = new Date();
    this.currentDate = today.toDateString();
    this.currentTime = this.getCurrentTime();
    this.classID = this.$route.params.id;
    console.log("today is = " + this.currentDate);
    this.getClassTitle();
  },
};
</script>