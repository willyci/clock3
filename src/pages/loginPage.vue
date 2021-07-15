<template>
<base-layout page-title="" page-default-back-link="/">
  <ion-grid>
    <ion-row>
      <ion-col size="12" style="text-align: center">
        <h1>
          Student Attendance
        </h1>
        
          <ion-img
            src="../../assets/campus.cafe.logo.png"
            style="padding: 40px 10px"
          ></ion-img>
        <!--
        <ion-item>
          <ion-label>Select School</ion-label>
          <ion-select interface="action-sheet"
          :value="selectedOption"
          @ionChange="school= $event.target.value"
          >
            <ion-select-option value="qa2">QA2</ion-select-option>
            <ion-select-option value="qa3" selected>QA3</ion-select-option>
            <ion-select-option value="school">school</ion-select-option>
            <ion-select-option value="college">college</ion-select-option>
          </ion-select>
        </ion-item>
        -->
        <ion-item>
          <!--<ion-input placeholder="Email" v-model="userInfo.username">joeey.fergusonn</ion-input>-->
          <ion-input placeholder="Email" v-model="userInfo.username"></ion-input>
        </ion-item>
        <ion-item>
          <!--<ion-input placeholder="Password" type="password" v-model="userInfo.password">660090023</ion-input>-->
          <ion-input placeholder="Password" type="password" v-model="userInfo.password"></ion-input>
        </ion-item>
        
      </ion-col>
    </ion-row>
  </ion-grid>
  <ion-row
    ><ion-col size="12">
      <!--<ion-button expand="block" @click="() => router.push('/classList')">-->
        <ion-button expand="block" @click="loginSubmit()" style="--background:#ff796a;">
        <ion-icon slot="start" :icon="lockOpenOutline"></ion-icon>
        Login
      </ion-button>
    </ion-col></ion-row
  >
</base-layout>
</template>
<script>
import { IonInput, IonItem} from "@ionic/vue";
import { lockOpenOutline, timeOutline, alarmOutline } from "ionicons/icons";

import { useRouter } from "vue-router";
import { IonImg } from "@ionic/vue";

//import { Storage } from '@ionic/storage';

export default {
  name: "login",
  components: { IonInput, IonItem, IonImg },
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      lockOpenOutline,
      timeOutline,
      alarmOutline,
      img: "../../assets/campus.cafe.logo.png",
      schools:[],
      school:'',
      userInfo: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    // check for saved token from local storage
    // check saved school server name
    // both must not null
    // if got token ping server,  
    //    if working, move to next page     
    //    not working, stay
    // no token stay
    loadToken(){
    },

    createStorage() {
    },
    // get list of schools
    // build select dropdown
    // should get from a fixed server without anything.
    getSchools(){
      
    },
    
    loginSubmit(){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 
                  'Authorization': 'Bearer token'},
        //body: JSON.stringify({"username":this.userInfo.username,"password":this.userInfo.password})          
        body: JSON.stringify({"username":"joeey.fergusonn","password":"660090023"})
        //body: JSON.stringify({"username":"cmingus","password":"cmingus"})
      };
      fetch('https://qa2-web.scansoftware.com/cafeweb/api/authenticate/token', requestOptions)
        .then(async response => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          //console.log(data.token);
          this.$store.commit("addToken",data.token);
          //this.$store.commit("addSchool",this.school);
          console.log("saved to state "+this.$store.getters.getToken);
          //console.log('school = ' + this.$store.getters.getSchool);
          this.$router.push('/classList');
          //this.postId = data.id;
          //this.getClasses();
        })
        .catch(error => {
          this.errorMessage = error;
          console.error('There was an error!', error);
        });
    },



    getClasses(){
      let myToken = this.$store.getters.getToken;

      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 
                  'Authorization': 'Bearer '+myToken}
      };
      fetch('https://qa2-web.scansoftware.com/cafeweb/api/student/classes', requestOptions)
      //fetch('https://qa2-web.scansoftware.com/cafeweb/api/authenticate/whoAmI', requestOptions)
        .then(async response => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          console.log(data);
          //this.postId = data.id;
        })
        .catch(error => {
          this.errorMessage = error;
          console.error('There was an error!', error);
        });
    },



  },
  mounted: function () {
    this.loadToken();
    console.log('login page mounted');
  },
};
</script>