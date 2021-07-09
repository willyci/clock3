<template>
  <base-layout page-title="Student Attendance" page-default-back-link="classList">
    <ion-grid>
      <ion-row>
        <ion-col size="12" style="text-align: center">
          <!--<h4>Student Attendance</h4>-->
          <h2 style="margin:0px;font-weight:bold;">{{ ClassTitle }} ({{ classID }})</h2>
          <h4 style="margin:0px;">{{ currentDate }}</h4>
          <h4 style="margin:0px;">{{classStartTime}} - {{classEndTime}}</h4>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          
        </ion-col>
      </ion-row>

    </ion-grid>

    <ion-grid>
      <ion-row v-if="InOutFlag"><ion-col size="12" style="text-align: center">
          <h1 style="font-weight:bold;">Time IN</h1>
          <h1 style="border: solid 1px #dfdfdf;border-radius: 10px;">{{ currentTime }}</h1>
        </ion-col></ion-row>
      <ion-row v-if="!InOutFlag"><ion-col size="12" style="text-align: center">
           <h1 style="font-weight:bold;">Time OUT</h1>
          <h1 style="border: solid 1px #dfdfdf;border-radius: 10px;">{{ currentTime }}</h1>
        </ion-col></ion-row>
      <ion-row><ion-col size="12" style="text-align: center">
          <ion-button expand="block" @click="onSubmit">
            <ion-icon slot="start" :icon="paperPlaneOutline"></ion-icon>
            Submit
          </ion-button>
        </ion-col></ion-row>
    </ion-grid>
  </base-layout>
</template>

<script>
import { IonButton, toastController } from "@ionic/vue";
import { logOutOutline, logInOutline, paperPlaneOutline  } from "ionicons/icons";

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
      classEndTime: "",
      InOutFlag: true,
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
      let time = new Date();
      var hours = time.getHours();
      var minutes = time.getMinutes();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      time =
        hours +
        ":" +
        minutes +
        " " +
        ampm;
      console.log("current time is "+ time.toString());
      this.currentTime = time;
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
      this.userName = this.$store.getters.getUserName;
      console.log("username = "+JSON.stringify(this.$store.getters.getUserName));
      
      this.InOutFlag = (this.$store.getters.cuClass(
        this.$route.params.id
      ).timeInOut.length % 2 == 0 )  ? true : false;

    },

    updateTime(){
      setInterval(() => {
        this.getCurrentTime();
      }, 60000)
    },
    
    // on submit button click,
    // add time, student id, class id
    // push to server
    // add to local storage
    // on successful call openToastSuccessful
    // on faile call openToastFailed
    onSubmit(){
      this.$store.getters.cuClass(
        this.$route.params.id
      ).timeInOut.push(this.currentTime);
      
      console.log(this.$store.getters.cuClass(
        this.$route.params.id
      ).timeInOut);

      this.openToastSuccessful();
    },

    async openToastSuccessful() {
      const toast = await toastController
        .create({
          message: 'Submit Successful.',
          position: 'top',
          duration: 1000,
          color: 'success'
        })
      toast.present();
      toast.onDidDismiss().then(()=>{
        this.$router.go(-1);
      })
    },
    

    async openToastFailed() {
      const toast = await toastController
        .create({
          message: 'Failed submit, server error, please try again.',
          position: 'top',
          duration: 1000,
          color: 'danger'
        })
      toast.present();
    },
  },
  mounted: function () {
    //update table display onload
    this.gotit = this.msg;
    let today = new Date();
    this.currentDate = today.toDateString();
    this.getCurrentTime();
    this.classID = this.$route.params.id;
    console.log("today is = " + this.currentDate);
    this.getClassTitle();
    this.updateTime();
  },
};
</script>

<style scoped>

</style>