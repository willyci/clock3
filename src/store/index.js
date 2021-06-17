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
            classes: [
                { id: 1, classID: '154', ClassTitle: 'Med class 154', date: 'Mon May 24, 2021', timeIn: '9:00 AM', timeOut: '10:00AM' },
                { id: 2, classID: '534', ClassTitle: 'History class 534', date: 'Mon May 24, 2021', timeIn: '11:00 AM', timeOut: '12:00PM' },
                { id: 3, classID: '134', ClassTitle: 'Physics class 134', date: 'Mon May 24, 2021', timeIn: '2:00 PM', timeOut: '3:00PM' },
                { id: 4, classID: '341', ClassTitle: 'Math class 341', date: 'Mon May 24, 2021', timeIn: '4:00 PM', timeOut: '5:00PM' }
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