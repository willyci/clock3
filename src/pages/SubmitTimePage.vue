<template>
  <base-layout
    page-title="Student Attendance"
    page-default-back-link="/"
  >
        <ion-grid>
            <ion-row>
                <ion-col size="12">
                    <h1>class id : {{classID}} {{ClassTitle}}.</h1>  
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col size="12">
                    <h1>{{currentDate}}</h1>  
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col size="12">
                    <h2>(9:00AM - 10:00AM)</h2>
                </ion-col>
            </ion-row>
        </ion-grid>
    
    
        
        <!--<ion-item disabled="true">-->
        <ion-item>    
            <ion-label>Time In</ion-label>    
            <ion-datetime display-format="h:mm A" minute-values="0,10,20,30,40,50" value="1990-02-19T09:00"></ion-datetime>
        </ion-item>
        <ion-item>      
            <ion-label>Time Out</ion-label>    
            <ion-datetime display-format="h:mm A" minute-values="0,10,20,30,40,50" value="1990-02-19T10:00"></ion-datetime>
        </ion-item>
        <ion-grid>
            <ion-row>
            <ion-col size="12">
                <ion-button expand="full">Submit</ion-button>
                </ion-col>
            </ion-row>
        </ion-grid>
  </base-layout>
</template>

<script>

export default {
  name: 'SubmitTime',
  props: ['cuClass','classProp','msg'],
  components: {
  },
  data() {
    return {
      currentDate: '',
      classID : this.$route.params.id,
      gotit:'',
      ClassTitle:'',
      userName:''
    };
  },
    computed:{
        
    },

  methods:{
        getTodayDate(){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            return today;
        },
        getClassTitle(){
            this.ClassTitle = this.$store.getters.cuClass(this.$route.params.id).ClassTitle;
            this.userName = this.$store.getters.username;
        }
    },
    mounted: function () {
      //update table display onload
      this.gotit = this.msg;
      this.currentDate =this.getTodayDate();//  mm + '/' + dd + '/' + yyyy;   
      this.classID = this.$route.params.id;
      console.log("today is = "+this.currentDate);
      this.getClassTitle();
    },
};
</script>