<template>
    <base-layout 
        page-title="Faculty Acceptance"
        page-default-back-link="classList"
    >
        <ion-grid>
      <ion-row>
        <ion-col size="12" style="text-align: center">
          <!--<h4>Faculty Acceptance</h4>-->
          <h2 style="margin:0px;font-weight:bold;">{{ ClassTitle }} ({{ classID }})</h2>
          <h4 style="margin:0px;">{{ currentDate }}</h4>
          <h4 style="margin:0px;">{{classStartTime}} - {{classEndTime}}</h4>
        </ion-col>
      </ion-row>

    </ion-grid>



    <ion-list>
        <ion-item 
            v-for="student in studentList" 
            :key="student.studentID"
            ><ion-grid>
            <ion-row ion-no-padding>
                <ion-col size="2"><div><ion-img
            src="../../assets/default-avatar.png"
            
          ></ion-img></div></ion-col>
                <ion-col size="10">
                    <div><span style="font-weight:bold;">{{student.firstName}} {{student.lastName}} </span></div>
                    <ion-row style="align-content: flex-start;" 
                    @click="router.push(`/editTimes/${classID}/${student.studentId}`)"
                     v-for="time in student.clockHistory" :key="time.studentID"
                    >
                            <ion-col size="4" v-if="student.clockHistory.length > 0">
                                <div>{{this.changeTimeTo12(time.studentClockInDateTime)}}</div>
                            </ion-col>
                            <ion-col size="4" v-if="student.clockHistory.length > 0">
                                <div>{{this.changeTimeTo12(time.studentClockOutDateTime)}}</div>
                            </ion-col>
                        
                    </ion-row>
                    <ion-row style="align-content: flex-start;" v-if="student.clockHistory.isAbsent == 'Y'"
                    @click="router.push(`/editTimes/${classID}/${student.studentID}`)"
                    >
                        <ion-col size="12"><span style="color:red;">Absent</span></ion-col>
                    </ion-row>
                </ion-col>
            </ion-row>    
        </ion-grid>
             
        </ion-item> 
    </ion-list>

    <ion-grid>
    <ion-row>
      <ion-col size="12">
          <ion-button expand="block" @click="onSubmit"  style="--background:#ff796a;">
      <ion-icon slot="start" :icon="paperPlaneOutline"></ion-icon>
      Accept
    </ion-button>
      </ion-col></ion-row>
</ion-grid> 
    </base-layout>
</template>
<script>
import { IonList, IonItem, toastController } from '@ionic/vue';
import {
  paperPlaneOutline,
  refreshOutline,
} from "ionicons/icons";
import { useRouter } from "vue-router";
export default {

    components:{
        IonList, IonItem, 
    },
    
  setup() {
    const router = useRouter();
    return { router };
  },
    data() {
        return {
            classes:[],
            students:[],
            studentList: [],
            currentDate : '',
            msg:'hi',
            userName: '',
            userRole:'',
            userID:'',
            classID:'',
            ClassTitle:'',
            refreshOutline,
            paperPlaneOutline,            
            classStartTime: "",
            classEndTime: "",
        }
    },
    methods:{
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
            getTodayDay(){
                var today = new Date();
                var yyyy = today.getFullYear().toString();
                var mm = today.getMonth()+1;
                if(mm<10) { mm = "0" + mm.toString();}
                var dd = today.getDate();
                if(dd<10) { dd = "0" + dd.toString();}
                today.getDate();
                return yyyy+mm+dd;
            },

        getStudents(){
            /*this.students = this.$store.getters.cuClass(this.$route.params.id).students;  
            console.log(this.students);   
            this.classID  = this.$store.getters.cuClass(this.$route.params.id).classID;   
            this.ClassTitle = this.$store.getters.cuClass(this.$route.params.id).ClassTitle;
            this.classStartTime = this.$store.getters.cuClass(
                this.$route.params.id
            ).classStartTime;
            this.classEndTime = this.$store.getters.cuClass(
                this.$route.params.id
            ).classEndTime;
            */
            //var token = this.$store.getters.getToken;
            //console.log("class info = "+JSON.stringify(this.$store.getters.cuInsClass(this.$route.params.id)));

            const requestOptions = {
                method: "GET",
                headers: { 'Content-Type': 'application/json', 
                           'Authorization': 'Bearer '+ this.$store.getters.getToken,                  
                         }
            };

            var url = "https://qa2-web.scansoftware.com/cafeweb/api/instructor/classClockTimes?"+ 
                        "date=" + this.getTodayDay() +
                        "&semester=" + this.$store.getters.cuInsClass(this.$route.params.id).semester +                
                        "&courseNumber=" + this.$route.params.id + 
                        "&courseSection=" + this.$store.getters.cuInsClass(this.$route.params.id).courseSection + 
                        "&labSection=" + this.$store.getters.cuInsClass(this.$route.params.id).labSection
            fetch(url, requestOptions)
                .then(async response => {
                    const data = await response.json();
                    // check for error response
                    if (!response.ok) {
                        this.openToastFailed();
                    } else {
                        //this.openToastSuccessful();
                        console.log("studnet list = "+JSON.stringify(data));
                        console.log("class info = "+JSON.stringify(this.$store.getters.cuInsClass(this.$route.params.id)));

                        this.ClassTitle = this.$store.getters.cuInsClass(this.$route.params.id).title;
                        this.classID = this.$store.getters.cuInsClass(this.$route.params.id).courseNumber;
                        this.classStartTime = this.changeTimeTo12(this.$store.getters.cuInsClass(this.$route.params.id).startDateTime);
                        this.classEndTime = this.changeTimeTo12(this.$store.getters.cuInsClass(this.$route.params.id).endDateTime);
                        this.studentList = data.students;
                    }
                })
                .catch(error => {
                this.errorMessage = error;
                console.error('There was an error!', error);
                this.openToastFailed();
                }); 
        },

        onSubmit(){
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
                message: 'Failed get student list, server error, please try again.',
                position: 'top',
                duration: 1000,
                color: 'danger'
                })
            toast.present();
            },
              // change to 12hr AMPM
            changeTimeTo12(time) {
                if( time == null || time == undefined || time == "") {return "";}
                else {
                    var hh = time.split('T')[1].split(":")[0];
                    var mm = time.split('T')[1].split(":")[1];
                    var AMPM = " AM";
                    if (hh[0]=="0") {AMPM = " AM"; hh=hh[1];}
                    else if (hh <= 11) {AMPM = " AM";}
                    else if (hh == 12) {AMPM = " PM";}    
                    else if (hh > 12) {AMPM = " PM"; hh -=12;}

                    //console.log(hh+":"+mm+AMPM);
                    return hh+":"+mm+AMPM;
                }
            },
    },
    mounted: function () {
      //update table display onload
      this.getStudents();
      let today = new Date();
      this.currentDate = today.toDateString();
  }
    
}
</script>
<style>
ion-toggle {
  --background: red;
  --background-checked: green;
}
</style>