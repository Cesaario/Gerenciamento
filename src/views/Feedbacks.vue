<template>
    <v-container>
        <h1>FEEDBACKS</h1>
        <v-card v-for="feedback in feedbacks" :key="feedback.id" width=600 class='ma-2'>
            <v-layout v-if='feedback.avaliacao=="na"' align-center justify-space-between row fill-height>
                <v-btn color='success' @click.stop.prevent='comentarioPositivo(feedback.id)'>Positivo</v-btn>
                    <p class="text-xs-center body-1 ma-2">"{{feedback.comentario}}", {{feedback.autor}}</p>
                <v-btn color='error' @click.stop.prevent='comentarioNegativo(feedback.id)'>Negativo</v-btn>
            </v-layout>
        </v-card>
        <AdicionarComentario @atualizar='lerBanco'></AdicionarComentario>
    </v-container>
</template>

<script>
    import { db, auth } from '@/firebase'
    import AdicionarComentario from '@/components/AdicionarComentario'
    export default{
        components: {
            AdicionarComentario
        },
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
            comentarioPositivo(id){
                db.collection('feedbacks').doc(id).update({
                    avaliacao: 'positiva'
                });
                this.lerBanco();
            },
            comentarioNegativo(id){
                db.collection('feedbacks').doc(id).update({
                    avaliacao: 'negativa'
                });
                this.lerBanco();
            },
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