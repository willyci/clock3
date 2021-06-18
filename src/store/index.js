import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            memories: [{
                    id: 'm1',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Mighty_Mountains_with_Snow.jpg/640px-Mighty_Mountains_with_Snow.jpg',
                    title: 'A trip into the mountains',
                    description: 'It was a really nice trip!',
                },
                {
                    id: 'm2',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/A_surfer_surfing_on_the_ocean_%28Unsplash%29.jpg/640px-A_surfer_surfing_on_the_ocean_%28Unsplash%29.jpg',
                    title: 'Surfing the sea side',
                    description: 'Feeling the cool breeze',
                },
                {
                    id: 'm3',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Indian_-_Food.jpg/640px-Indian_-_Food.jpg',
                    title: 'Good eating',
                    description: 'Really tasty!',
                },
            ],
            classes: [{
                    "id": 1,
                    "classID": "154",
                    "ClassTitle": "Med class 154",
                    "date": "Fri Jun 18, 2021",
                    "studentTimeCheckIn": "2021-06-18T09:05",
                    "studentTimeCheckOut": "2021-06-18T10:00",
                    "classStartTime": "09:00AM",
                    "classEndTime": "10:00AM",
                    "students": [{
                            "studentID": "001",
                            "studentFirstName": "John",
                            "studentLastName": "Smith",
                            "studentTimeCheckIn": "1990-02-19T09:00",
                            "studentTimeCheckOut": "2021-06-18T10:01",
                            "isPresent": true
                        },
                        {
                            "studentID": "002",
                            "studentFirstName": "Jen",
                            "studentLastName": "Adrianne",
                            "studentTimeCheckIn": "2021-06-18T08:55",
                            "studentTimeCheckOut": "2021-06-18T10:03",
                            "isPresent": true
                        },
                        {
                            "studentID": "003",
                            "studentFirstName": "Halicki",
                            "studentLastName": "Kennedy",
                            "studentTimeCheckIn": "09:00AM",
                            "studentTimeCheckOut": "10:10AM",
                            "isPresent": true
                        },
                        {
                            "studentID": "004",
                            "studentFirstName": "Estwick",
                            "studentLastName": "Cathy",
                            "studentTimeCheckIn": "",
                            "studentTimeCheckOut": "",
                            "isPresent": false
                        },
                        {
                            "studentID": "005",
                            "studentFirstName": "John2",
                            "studentLastName": "Smith2",
                            "studentTimeCheckIn": "09:05AM",
                            "studentTimeCheckOut": "10:01AM",
                            "isPresent": true
                        },
                        {
                            "studentID": "006",
                            "studentFirstName": "Jen2",
                            "studentLastName": "Adrianne2",
                            "studentTimeCheckIn": "08:55AM",
                            "studentTimeCheckOut": "10:03AM",
                            "isPresent": true
                        },
                        {
                            "studentID": "007",
                            "studentFirstName": "Halicki2",
                            "studentLastName": "Kennedy2",
                            "studentTimeCheckIn": "09:00AM",
                            "studentTimeCheckOut": "10:10AM",
                            "isPresent": true
                        },
                        {
                            "studentID": "008",
                            "studentFirstName": "Estwick2",
                            "studentLastName": "Cathy2",
                            "studentTimeCheckIn": "",
                            "studentTimeCheckOut": "",
                            "isPresent": false
                        }
                    ]
                },
                {

                    "id": 2,
                    "classID": "534",
                    "ClassTitle": "History class 534",
                    "date": "Fri Jun 18, 2021",
                    "studentTimeCheckIn": "11:05AM",
                    "studentTimeCheckOut": "12:00AM",
                    "classStartTime": "11:00AM",
                    "classEndTime": "12:00PM",
                    "students": [{
                            "studentID": "001",
                            "studentFirstName": "John2",
                            "studentLastName": "Smith2",
                            "studentTimeCheckIn": "09:05AM",
                            "studentTimeCheckOut": "10:01AM",
                            "isPresent": true
                        },
                        {
                            "studentID": "002",
                            "studentFirstName": "Jen2",
                            "studentLastName": "Adrianne2",
                            "studentTimeCheckIn": "08:55AM",
                            "studentTimeCheckOut": "10:03AM",
                            "isPresent": true
                        },
                        {
                            "studentID": "003",
                            "studentFirstName": "Halicki2",
                            "studentLastName": "Kennedy2",
                            "studentTimeCheckIn": "09:00AM",
                            "studentTimeCheckOut": "10:10AM",
                            "isPresent": true
                        },
                        {
                            "studentID": "004",
                            "studentFirstName": "Estwick2",
                            "studentLastName": "Cathy2",
                            "studentTimeCheckIn": "",
                            "studentTimeCheckOut": "",
                            "isPresent": false
                        },
                        {
                            "studentID": "005",
                            "studentFirstName": "John2",
                            "studentLastName": "Smith2",
                            "studentTimeCheckIn": "09:05AM",
                            "studentTimeCheckOut": "10:01AM",
                            "isPresent": true
                        },
                        {
                            "studentID": "006",
                            "studentFirstName": "Jen2",
                            "studentLastName": "Adrianne2",
                            "studentTimeCheckIn": "08:55AM",
                            "studentTimeCheckOut": "10:03AM",
                            "isPresent": true
                        },
                        {
                            "studentID": "007",
                            "studentFirstName": "Halicki2",
                            "studentLastName": "Kennedy2",
                            "studentTimeCheckIn": "09:00AM",
                            "studentTimeCheckOut": "10:10AM",
                            "isPresent": true
                        },
                        {
                            "studentID": "008",
                            "studentFirstName": "Estwick2",
                            "studentLastName": "Cathy2",
                            "studentTimeCheckIn": "",
                            "studentTimeCheckOut": "",
                            "isPresent": false
                        }
                    ]
                },
                {

                    "id": 3,
                    "classID": "134",
                    "ClassTitle": "Physics class 134",
                    "date": "Fri Jun 18, 2021",
                    "studentTimeCheckIn": "2:00PM",
                    "studentTimeCheckOut": "3:00PM",
                    "classStartTime": "02:00PM",
                    "classEndTime": "03:00PM",
                    "students": [{
                            "studentID": "001",
                            "studentFirstName": "John3",
                            "studentLastName": "Smith3",
                            "studentTimeCheckIn": "09:05AM",
                            "studentTimeCheckOut": "10:01AM",
                            "isPresent": true
                        },
                        {
                            "studentID": "002",
                            "studentFirstName": "Jen3",
                            "studentLastName": "Adrianne3",
                            "studentTimeCheckIn": "08:55AM",
                            "studentTimeCheckOut": "10:03AM",
                            "isPresent": true
                        },
                        {
                            "studentID": "003",
                            "studentFirstName": "Halicki3",
                            "studentLastName": "Kennedy3",
                            "studentTimeCheckIn": "09:00AM",
                            "studentTimeCheckOut": "10:10AM",
                            "isPresent": true
                        },
                        {
                            "studentID": "004",
                            "studentFirstName": "Estwick3",
                            "studentLastName": "Cathy3",
                            "studentTimeCheckIn": "",
                            "studentTimeCheckOut": "",
                            "isPresent": false
                        },
                        {
                            "studentID": "005",
                            "studentFirstName": "John2",
                            "studentLastName": "Smith2",
                            "studentTimeCheckIn": "09:05AM",
                            "studentTimeCheckOut": "10:01AM",
                            "isPresent": true
                        },
                        {
                            "studentID": "006",
                            "studentFirstName": "Jen2",
                            "studentLastName": "Adrianne2",
                            "studentTimeCheckIn": "08:55AM",
                            "studentTimeCheckOut": "10:03AM",
                            "isPresent": true
                        },
                        {
                            "studentID": "007",
                            "studentFirstName": "Halicki2",
                            "studentLastName": "Kennedy2",
                            "studentTimeCheckIn": "09:00AM",
                            "studentTimeCheckOut": "10:10AM",
                            "isPresent": true
                        },
                        {
                            "studentID": "008",
                            "studentFirstName": "Estwick2",
                            "studentLastName": "Cathy2",
                            "studentTimeCheckIn": "",
                            "studentTimeCheckOut": "",
                            "isPresent": false
                        }
                    ]
                },
                {

                    "id": 4,
                    "classID": "341",
                    "ClassTitle": "Math class 341",
                    "date": "Fri Jun 18, 2021",
                    "studentTimeCheckIn": "04:00PM",
                    "studentTimeCheckOut": "05:00PM",
                    "classStartTime": "04:00PM",
                    "classEndTime": "05:00PM",
                    "students": [{
                            "studentID": "001",
                            "studentFirstName": "John4",
                            "studentLastName": "Smith4",
                            "studentTimeCheckIn": "09:05AM",
                            "studentTimeCheckOut": "10:01AM",
                            "isPresent": true
                        },
                        {
                            "studentID": "002",
                            "studentFirstName": "Jen4",
                            "studentLastName": "Adrianne4",
                            "studentTimeCheckIn": "08:55AM",
                            "studentTimeCheckOut": "10:03AM",
                            "isPresent": true
                        },
                        {
                            "studentID": "003",
                            "studentFirstName": "Halicki4",
                            "studentLastName": "Kennedy4",
                            "studentTimeCheckIn": "09:00AM",
                            "studentTimeCheckOut": "10:10AM",
                            "isPresent": true
                        },
                        {
                            "studentID": "004",
                            "studentFirstName": "Estwick4",
                            "studentLastName": "Cathy4",
                            "studentTimeCheckIn": "",
                            "studentTimeCheckOut": "",
                            "isPresent": false
                        },
                        {
                            "studentID": "005",
                            "studentFirstName": "John2",
                            "studentLastName": "Smith2",
                            "studentTimeCheckIn": "09:05AM",
                            "studentTimeCheckOut": "10:01AM",
                            "isPresent": true
                        },
                        {
                            "studentID": "006",
                            "studentFirstName": "Jen2",
                            "studentLastName": "Adrianne2",
                            "studentTimeCheckIn": "08:55AM",
                            "studentTimeCheckOut": "10:03AM",
                            "isPresent": true
                        },
                        {
                            "studentID": "007",
                            "studentFirstName": "Halicki2",
                            "studentLastName": "Kennedy2",
                            "studentTimeCheckIn": "09:00AM",
                            "studentTimeCheckOut": "10:10AM",
                            "isPresent": true
                        },
                        {
                            "studentID": "008",
                            "studentFirstName": "Estwick2",
                            "studentLastName": "Cathy2",
                            "studentTimeCheckIn": "",
                            "studentTimeCheckOut": "",
                            "isPresent": false
                        }
                    ]
                }
            ],
            userName: 'qwer',
            userRole: '',
            userID: ''
        };
    },
    mutations: {
        addMemory(state, memoryData) {
            const newMemory = {
                id: new Date().toISOString(),
                title: memoryData.title,
                image: memoryData.imageUrl,
                description: memoryData.description
            };

            state.memories.unshift(newMemory);
        },
        addUserName(state, userName) {
            state.userName = userName;
        }
    },
    actions: {
        addMemory(context, memoryData) {
            context.commit('addMemory', memoryData);
        },
        addUserName(context, userName) {
            context.commit('addUserName', userName);
        }

    },
    getters: {
        memories(state) {
            return state.memories;
        },
        memory(state) {
            return (memoryId) => {
                return state.memories.find((memory) => memory.id === memoryId);
            };
        },
        userID(state) {
            return state.userID;
        },
        userName(state) {
            return state.userName;
        },
        userRole(state) {
            return state.userRole;
        },
        classes(state) {
            return state.classes;
        },
        cuClass(state) {
            return (classID) => {
                return state.classes.find((cuClass) => cuClass.classID === classID)
            }
        }
    },
});

export default store;