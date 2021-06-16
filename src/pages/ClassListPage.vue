<template>
    <base-layout page-title="Class Schedule">    
    <h1>Today</h1>
    <h2>{{currentDate}}</h2>
    <ion-list>
        <ion-item 
            v-for="cuClass in classes" 
            :key="cuClass.id"
            :router-link="`/submitTime/${cuClass.classID}`"
            >
            {{cuClass.ClassTitle}} - start at {{cuClass.timeIn}}
            <!--<ion-button @click="router.push('/submitTime'+cuClass.classID, cuClass)">NEXT</ion-button>-->
   
            <ion-icon :icon="chevronForward" size="small" slot="end"></ion-icon></ion-item>
    </ion-list>
    </base-layout>
</template>
<script>
import { IonList, IonItem, IonIcon } from '@ionic/vue';
import { chevronForward } from 'ionicons/icons';

export default {

    components:{
        IonList, IonItem, IonIcon,
    },
    data() {
        return {
            classes:[],
            currentDate : '',
            chevronForward,
            msg:'hi'
        }
    },
    methods:{
        getTodayDate(){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            var hours = today.getHours();
            var minutes = today.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            today = mm + '/' + dd + '/' + yyyy + ' -- ' + hours + ':' + minutes + ' ' + ampm;



            
            return today;
        },

        getClass(){
            fetch("https://flexcode.org/classes.json")
            .then(response => response.json())
            .then(data => (this.classes = data));
        }
    },
    mounted: function () {
      //update table display onload
      this.getClass();
      this.currentDate =this.getTodayDate();
      console.log("today is = "+this.currentDate);
  }
    
}
</script>
