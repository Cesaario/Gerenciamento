<template>
    <v-container>
        <h1>POSITIVOS</h1>
        <v-card v-for="(feedback,i) in feedbacks" :key="i" width=600 class='ma-2'>
            <v-layout v-if='feedback.avaliacao=="positiva"' align-center justify-space-between column fill-height>
                    <p class="text-xs-center body-1 ma-2">"{{feedback.comentario}}", {{feedback.autor}}</p>
            </v-layout>
        </v-card>
    </v-container>
</template>


<script>    
    import { db, auth } from '@/firebase'
    export default{
        data(){
            return{
                feedbacks: []
            }
        },
        mounted(){
            auth.onAuthStateChanged(user => {
                if(user){
                    this.lerBanco();
                }else{
                    this.$router.replace('/');
                }
            });
        },
        methods: {
            lerBanco(){
                this.feedbacks = [];
                /*db.collection('feedbacks').onSnapshot(red => {
                    const changes = red.docChanges();
                    changes.forEach(change => {
                        this.feedbacks.push({
                            ...change.doc.data(),
                            id: change.doc.id
                        })
                    })
                });*/
                const userUid = auth.currentUser.uid;
                db.collection("feedbacks").where("usuario", "==", userUid).get().then(snapshot => {
                    snapshot.forEach(doc => {
                        this.feedbacks.push({
                            ...doc.data(),
                            id: doc.id
                        });
                    });
                });
            }
        }
    }
</script>