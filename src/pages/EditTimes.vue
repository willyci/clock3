<template>
    <base-layout 
        page-title="Edit Times"
        page-default-back-link="studentList"
    >
        <ion-grid>
      <ion-row>
        <ion-col size="12" style="text-align: center">
          <!--<h4>Faculty Acceptance</h4>-->
          <div><ion-img src="../../assets/default-avatar.png" style="width:100px;margin: auto;"></ion-img></div>
          <h2 style="margin:0px;font-weight:bold;">{{student.firstName}} {{student.lastName}}</h2>
        </ion-col>
      </ion-row>
    </ion-grid>
    <!--------->
    <ion-grid>
        <ion-row>
            <ion-col size='3' style="margin-left:25px;">IN</ion-col>
            <ion-col size='5' style="margin-left:25px;">OUT</ion-col>
        </ion-row>
    </ion-grid> 
    <!--------->

    <ion-grid>
        <div v-for="(times, index) in student.clockHistory" :key="times.clockId">
            <ion-row v-if="times.studentClockInDateTime != null && times.studentClockInDateTime != undefined && times.studentClockInDateTime != ''">
                
                <ion-col size="4"><span style="color:gray;padding-left: 15px;">{{changeTimeTo12(times.studentClockInDateTime)}}</span></ion-col>
                <ion-col size="4"><span style="color:gray;padding-left: 15px;">{{changeTimeTo12(times.studentClockOutDateTime)}}</span></ion-col>
                <ion-col size="4"><ion-button  @click="editSelectedTime(index)" style="height:24px;--background:#54595f;">
                    <ion-icon  slot="icon-only" :icon="createOutline"></ion-icon></ion-button></ion-col>
            </ion-row>
            <ion-row v-if="times.instructorClockInDateTime != null && times.instructorClockInDateTime != undefined && times.instructorClockInDateTime != ''">
                <!--<ion-col size="4"><span>{{changeTimeTo12(times.instructorClockInDateTime)}}</span></ion-col>
                <ion-col size="4"><span>{{changeTimeTo12(times.instructorClockOutDateTime)}}</span></ion-col>-->
                <ion-col size="4"><ion-datetime display-format="h:mm A" picker-format="h:mm A" 
                    v-model="times.instructorClockInDateTime"
                    v-bind:value="times.instructorClockInDateTime"
                    @IonChange="times.instructorClockInDateTime=$event.target.value"
                    ></ion-datetime></ion-col>
                <ion-col size="4"><ion-datetime display-format="h:mm A" picker-format="h:mm A" 
                    v-model="times.instructorClockOutDateTime"
                    v-bind:value="times.instructorClockOutDateTime"
                    @IonChange="times.instructorClockOutDateTime=$event.target.value"
                    ></ion-datetime></ion-col>
                <ion-col size="4"><ion-button  @click="removeSelectedTime(index)" style="height:24px;--background:#54595f;">
                    <ion-icon  slot="icon-only" :icon="closeCircleOutline"></ion-icon></ion-button></ion-col>
            </ion-row>
            <hr style="border-width: 1px;"/>
        </div>
    </ion-grid>
    <!--
    <ion-grid>
        <ion-row>
            <ion-col size="8">
                <ion-col size="5" v-for="(studentClockInDateTime) in student.clockHistory" :key="time.studentID">
                    <span style="display: inline-block;min-width:100px; height:40px;">{{time}} </span>
                </ion-col>
            </ion-col>
            <ion-col size="3">
            <ion-col size="12" v-for="(studentClockOutDateTime, index) in student.clockHistory" :key="time.studentID" >
                <ion-button  @click="removeSelectedTime(index)" style="height:24px;--background:#54595f;" v-if="index%2 === 0 ">
                 <ion-icon  slot="icon-only" :icon="closeCircleOutline"></ion-icon></ion-button>
            </ion-col>
            </ion-col>
        </ion-row>
    </ion-grid> 
    -->

    <!--------->
    <!--<ion-list>
        <ion-item> 
                <ion-col size="10">
                    <ion-row style="align-content: flex-start;" v-if="student.isPresent">
                        <ion-col size="12" v-for="(time, index) in student.timeInOut" :key="time.studentID">
                            <div><span v-if="index%2 === 0 " style="display: inline-block;min-width:40px;">IN</span>
                                <span v-if="index%2 != 0 " style="display: inline-block;min-width:40px;">OUT</span>
                                <span style="display: inline-block;min-width:100px;">{{time}} </span>
                                
                            </div>
                        
                        </ion-col>
                        <ion-button  @click="removeSelectedTime(index)" style="height:24px;">
                                    <ion-icon  slot="icon-only" :icon="closeCircleOutline"></ion-icon>
                                    </ion-button>
                        <ion-col size="12">
                        <ion-button  @click="addNewTime(student)" style="width:120px;"><ion-icon  slot="start" :icon="addCircleOutline"></ion-icon>Add</ion-button>
                        </ion-col>
                        <ion-datetime display-format="h:mm A" minute-values="0,10,20,30,40,50" :value="time" id="tt"></ion-datetime>
                    </ion-row>
                </ion-col>

        </ion-item> 
    </ion-list>-->
    <!--------->
    <ion-grid>
        <ion-row>
            <ion-col size="12">
                <ion-button  @click="addNewTime(student)" style="--background:#54595f;padding:0 90px;" expand="full">
                    <ion-icon  slot="start" :icon="addCircleOutline"></ion-icon>Add Time</ion-button>
            </ion-col>
        </ion-row>
    </ion-grid> 
    <!--------->
    <ion-grid>
    <ion-row>
      <ion-col size="12">
          <ion-button expand="block" @click="onSubmit" style="--background:#ff796a;">
      <ion-icon slot="start" :icon="createOutline"></ion-icon>
      Update
    </ion-button>
      </ion-col></ion-row>
</ion-grid> 
    <ion-row>
        <h2 style="color:red;" v-if="errorCount>0">{{errorCount}} server error(s) Found on submit.</h2>
    </ion-row>
    </base-layout>
</template>
<script>
import {  toastController } from '@ionic/vue';
import { createOutline, closeCircleOutline, addCircleOutline  } from "ionicons/icons";

export default {
    props:{
        studentID:{
            type:String,
            required:true,
        },
        classID:{
            type:String,
            required:true,
        },
    },
    components:{
        //IonList, IonItem, 
    },
    data() {
        return {
            students:[],
            student:{},     // updated  clockHistory, compare this two, build submit actions
            studentOrig: {}, // original clockHistory
            submitActionList: [], // array of object for submit action
            classes:[],
            cuInsClass:{},
            timeInOut:[],
            userName: '',
            createOutline,
            closeCircleOutline,
            addCircleOutline,
            semester: '',
            courseNumber: '',
            courseSection: '',
            labSection: '',
            studentId: '',
            errorCount: 0,
        }
    },
    methods:{
        updateTime(event){
            console.log(event);
        },
        search(nameKey, myArray){
            for (var i=0; i < myArray.length; i++) {
                if (myArray[i].studentID === nameKey) {
                    return myArray[i];
                }
            }
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

        getStudents(){
            
            this.students = this.$store.getters.getStudentList;  
            console.log("all students = "+JSON.stringify(this.students));   
            this.student = this.$store.getters.cuStudentList(this.$route.params.sid);
            //this.studentOrig = this.$store.getters.cuStudentList(this.$route.params.sid);
            this.studentOrig = JSON.parse(JSON.stringify(this.student));
            console.log("current student = "+JSON.stringify(this.student));
            this.cuInsClass = this.$store.getters.cuInsClass(this.$route.params.cid);

            /*this.classID  = this.$store.getters.cuClass(this.$route.params.id).classID;   
            this.ClassTitle = this.$store.getters.cuClass(this.$route.params.id).ClassTitle;
            this.classStartTime = this.$store.getters.cuClass(
                this.$route.params.id
            ).classStartTime;
            this.classEndTime = this.$store.getters.cuClass(
                this.$route.params.id
            ).classEndTime;
            */
        },

        // remove selected time, update list
        removeSelectedTime(index){
            // pick selected time
            console.log(index);
            console.log("current student = "+JSON.stringify(this.student));
            var clockHistory = {};
            clockHistory = {
                "clockId": this.student.clockHistory[index].clockId,
                "studentClockInDateTime": this.student.clockHistory[index].studentClockInDateTime,
                "studentClockOutDateTime": this.student.clockHistory[index].studentClockOutDateTime
            };
            this.student.clockHistory[index] = clockHistory;
        },
        // add time to end of list, update list
        addNewTime(){
            // new time add to array, 
            // bring up time picket
            console.log(this.student);
            console.log("current student = "+JSON.stringify(this.student));
            let newTime =  new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit', hour:'2-digit', minute:'2-digit' }).replace(', ','T').replace(' h ',':');
            
            var clockHistory = {};
            clockHistory = {
                clockId:"",
                "instructorClockInDateTime":newTime,
                "instructorClockOutDateTime":newTime
            };
            this.student.clockHistory.push(clockHistory);
            console.log("current student with added time = "+JSON.stringify(this.student));

        },
        editSelectedTime(index) {
            console.log("current student = "+JSON.stringify(this.student));
            var clockHistory = {};
            let newTime =  new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit', hour:'2-digit', minute:'2-digit' }).replace(', ','T').replace(' h ',':');
            clockHistory = {
                "clockId": this.student.clockHistory[index].clockId,
                "studentClockInDateTime": this.student.clockHistory[index].studentClockInDateTime,
                "studentClockOutDateTime": this.student.clockHistory[index].studentClockOutDateTime,
                "instructorClockInDateTime":newTime,
                "instructorClockOutDateTime":newTime
            };

            this.student.clockHistory[index] = clockHistory;
        },

        onSubmit(){
            // this.openToastSuccessful();
            // compare student and studentOrig
            // build list of items need to commit
            // set absent or not
            console.log("new student = "+JSON.stringify(this.student)); 
            console.log("old student = "+JSON.stringify(this.studentOrig)); 

            
            for(var i = 0; i < this.student.clockHistory.length; i++){
                if( this.student.clockHistory[i].instructorClockInDateTime != undefined && (
                    this.student.clockHistory[i].instructorClockInDateTime.length > 4 ||
                    this.student.clockHistory[i].instructorClockOutDateTime.length > 4 ) ) {
                        console.log(i+" instructorClock is not empty");
                        if(this.student.clockHistory[i].clockId != undefined && this.student.clockHistory[i].clockId == ""){
                            console.log(i+" instructorClock is new");
                            this.submitNewTime(i)
                        } else {
                            console.log(i+" instructorClock is not empty 2");
                            if( this.student.clockHistory[i].instructorClockInDateTime != undefined && (
                                this.student.clockHistory[i].instructorClockInDateTime != this.studentOrig.clockHistory[i].instructorClockInDateTime ||
                                this.student.clockHistory[i].instructorClockOutDateTime != this.studentOrig.clockHistory[i].instructorClockOutDateTime )
                            ){
                                console.log(i+" instructorClock is updated");
                                this.submitUpdateTime(i)
                            }
                        }
                    }
                else if ( this.student.clockHistory[i].instructorClockInDateTime != undefined && (
                          this.student.clockHistory[i].instructorClockInDateTime.length < 4 &&
                          this.student.clockHistory[i].instructorClockOutDateTime.length < 4 && 
                          this.student.clockHistory[i].clockId != "" ) ){
                          console.log(i+" instructorClock is deleted");
                          this.submitDelTime(i)

                } else {
                    console.log(i+" do nothing.");
                }
            }

            // set absent flag
            if(this.hasClock()) {
                this.submitDelAbsent();
            } else {
                this.submitAddAbsent();
            }


        },

        // Add new instructor clock hours record for a student in instructor’s class.
        submitNewTime(index){
            // post /cafeweb/api/instructor/studentClockTime
            var myToken = this.$store.getters.getToken;
            console.log("token is "+myToken);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 
                           'Authorization': 'Bearer '+ this.$store.getters.getToken}
            };
            fetch('https://qa2-web.scansoftware.com/cafeweb/api/instructor/studentClockTime?'+            
                "semester=" + this.cuInsClass.semester + 
                "&courseNumber=" + this.cuInsClass.courseNumber +
                "&courseSection=" + this.cuInsClass.courseSection +
                "&labSection=" + this.cuInsClass.labSection +
                "&date=" + this.getTodayDay() +
                "&studentId=" + this.student.studentId +
                "&colckIn=" + this.student.clockHistory[index].instructorClockInDateTime +
                "&clockOut=" +  this.student.clockHistory[index].instructorClockOutDateTime
                , requestOptions)
                .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    this.errorCount++;
                    return Promise.reject(error);
                    
                }
                //console.log("ins classes = " + JSON.stringify(data.classes));
                console.log("added new time "+index);
                })
                .catch(error => {
                this.errorMessage = error;
                console.error('There was an error!', error);
                this.errorCount++;
                });
        },

        // Update instructor clock hours for an existing clock hour record
        submitUpdateTime(index){
            // put  /cafeweb/api/instructor/studentClockTime
            var myToken = this.$store.getters.getToken;
            console.log("token is "+myToken);
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 
                           'Authorization': 'Bearer '+ this.$store.getters.getToken}
            };
            fetch('https://qa2-web.scansoftware.com/cafeweb/api/instructor/studentClockTime?'+            
                "semester=" + this.cuInsClass.semester + 
                "&courseNumber=" + this.cuInsClass.courseNumber +
                "&courseSection=" + this.cuInsClass.courseSection +
                "&labSection=" + this.cuInsClass.labSection +
                "&date=" + this.getTodayDay() +
                "&studentId=" + this.student.studentId +
                "&clockId=" + this.student.clockHistory[index].clockId +
                "&colckIn=" + this.student.clockHistory[index].instructorClockInDateTime +
                "&clockOut=" +  this.student.clockHistory[index].instructorClockOutDateTime
                , requestOptions)
                .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    this.errorCount++;
                    return Promise.reject(error);
                }
                //console.log("ins classes = " + JSON.stringify(data.classes));
                    console.log("updated old time"+index);
                })
                .catch(error => {
                    this.errorMessage = error;
                    console.error('There was an error!', error);
                    this.errorCount++;
                });
        },

        // Delete clock hours records. Record can only be deleted if student clock hours do not exist.
        // No student time
        // has inst time only
        submitDelTime(index){
            //  DELETE  /cafeweb/api/instructor/studentClockTime
            var myToken = this.$store.getters.getToken;
            console.log("token is "+myToken);
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 
                           'Authorization': 'Bearer '+ this.$store.getters.getToken}
            };
            fetch('https://qa2-web.scansoftware.com/cafeweb/api/instructor/studentClockTime?'+            
                "semester=" + this.cuInsClass.semester + 
                "&courseNumber=" + this.cuInsClass.courseNumber +
                "&courseSection=" + this.cuInsClass.courseSection +
                "&labSection=" + this.cuInsClass.labSection +
                "&date=" + this.getTodayDay() +
                "&studentId=" + this.student.studentId +
                "&clockId=" + this.student.clockHistory[index].clockId 
                , requestOptions)
                .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    this.errorCount++;
                    return Promise.reject(error);
                }
                //console.log("ins classes = " + JSON.stringify(data.classes));
                    console.log("updated old time"+index);
                })
                .catch(error => {
                    this.errorMessage = error;
                    console.error('There was an error!', error);
                    this.errorCount++;
                });
        },

        // Absent flag is stored in clock hour record with no instructor or student clock in/out hours.
        // add absent flag to "Y"
        submitAddAbsent(){
            // POST  /cafeweb/api/instructor/studentAbsent
            var myToken = this.$store.getters.getToken;
            console.log("token is "+myToken);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 
                           'Authorization': 'Bearer '+ this.$store.getters.getToken}
            };
            fetch('https://qa2-web.scansoftware.com/cafeweb/api/instructor/studentAbsent?'+            
                "semester=" + this.cuInsClass.semester + 
                "&courseNumber=" + this.cuInsClass.courseNumber +
                "&courseSection=" + this.cuInsClass.courseSection +
                "&labSection=" + this.cuInsClass.labSection +
                "&date=" + this.getTodayDay() +
                "&studentId=" + this.student.studentId
                , requestOptions)
                .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    this.errorCount++;
                    return Promise.reject(error);
                }
                //console.log("ins classes = " + JSON.stringify(data.classes));
                    console.log("mark absent Y");
                })
                .catch(error => {
                    this.errorMessage = error;
                    console.error('There was an error!', error);
                    this.errorCount++;
                });
        },

        // Absent flag is stored in clock hour record with no instructor or student clock in/out hours.
        // remove absent flag to "N"
        submitDelAbsent() {
            // DELETE  /cafeweb/api/instructor/studentAbsent
            var myToken = this.$store.getters.getToken;
            console.log("token is "+myToken);
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 
                           'Authorization': 'Bearer '+ this.$store.getters.getToken}
            };
            fetch('https://qa2-web.scansoftware.com/cafeweb/api/instructor/studentAbsent?'+            
                "semester=" + this.cuInsClass.semester + 
                "&courseNumber=" + this.cuInsClass.courseNumber +
                "&courseSection=" + this.cuInsClass.courseSection +
                "&labSection=" + this.cuInsClass.labSection +
                "&date=" + this.getTodayDay() +
                "&studentId=" + this.student.studentId + 
                "&clockId=" + this.student.clockHistory[0].clockId
                , requestOptions)
                .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    this.errorCount++;
                    return Promise.reject(error);
                }
                //console.log("ins classes = " + JSON.stringify(data.classes));
                    console.log("mark absent N");
                })
                .catch(error => {
                    this.errorMessage = error;
                    console.error('There was an error!', error);
                    this.errorCount++;
                });
        },

        hasClock(){
            if(this.student.clockHistory.length > 1 ) {
                // has studnet clock
                if(
                    this.student.clockHistory[0].clockId != undefined && 
                    this.student.clockHistory[0].clockId != "" && 
                    this.student.clockHistory[0].studentClockInDateTime.length > 4
                ) {
                    return true;
                } 
                // has instructor clock no clock id
                else if (
                    this.student.clockHistory[0].clockId != undefined && 
                    this.student.clockHistory[0].clockId == "" && 
                    this.student.clockHistory[0].instructorClockInDateTime != undefined && 
                    this.student.clockHistory[0].instructorClockInDateTime.length > 4
                ) {
                    return true;
                }               
                else {return false;}
            }
             else {return false;}
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
      this.getStudents();
      console.log("classID = "+this.$route.params.cid);
      console.log("studentID = "+this.$route.params.sid);
  }
    
}
</script>