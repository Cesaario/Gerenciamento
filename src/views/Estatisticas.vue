<template>
    <v-container>
        <v-layout row wrap justify-center>
            <v-flex xs4 offsetxs-3>
                <v-card class="text-xs-center ma-2">
                    <Grafico :chart-data='data1' :options='options1'></Grafico>
                </v-card>
            </v-flex>
            <v-flex  xs4 offsetxs-3>
                <v-card class="text-xs-center ma-2">
                    <Grafico :chart-data='data2' :options='options2'></Grafico>
                </v-card>
            </v-flex>
            <v-flex  xs4 offsetxs-3>
                <v-card class="text-xs-center ma-2">
                    <Grafico :chart-data='data3' :options='options3'></Grafico>
                </v-card>
            </v-flex>
            <v-flex  xs4 offsetxs-3>
                <v-card class="text-xs-center ma-2">
                    <h5 class='headline pa-3'>Número de feedbacks: {{feedbacks.length}}</h5>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import { db, auth } from '@/firebase'
import Grafico from '@/components/Grafico'
export default{
    components: {
        Grafico
    },
    data(){
        return{
            feedbacks: [],
            positivas: 0,
            negativas: 0,
            resolvidas: 0,
            data1: {},
            data2: {},
            data3: {},
            options1: {
                title: {
                    display: true,
                    text: 'Feedbacks totais'
                }
            },
            options2: {
                title: {
                    display: true,
                    text: 'Histórico Negativos/Positivos'
                }
            },
            options3: {
                title: {
                    display: true,
                    text: 'Feedbacks Resolvidos/Negativos'
                }
            },
        }
    },
    async mounted(){
        auth.onAuthStateChanged(async user => {
            if(user){
                await this.lerBanco();
                this.contarFeedbacks();
                this.gerarGraficos();
            }else{
                this.$router.replace('/');
            }
        });
    },
    methods: {
        async lerBanco(){
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
            let snapshot = await db.collection("feedbacks").where("usuario", "==", userUid).get();
            snapshot.forEach(doc => {
                this.feedbacks.push({
                    ...doc.data(),
                    id: doc.id
                });
            });
        },
        gerarGraficos(){
            this.data1 = {
                labels: ['Positivos', 'Negativos', 'Resolvidos'],
                datasets: [
                    {
                        backgroundColor: ['#1B5E20', '#B71C1C', '#0D47A1'],
                        data: [this.positivas, this.negativas, this.resolvidas]
                    }
                ]
            };
            this.data2 = {
                labels: ['Histórico Positivos', 'Histórico Negativos'],
                datasets: [
                    {
                        backgroundColor: ['#1B5E20', '#B71C1C'],
                        data: [this.positivas, this.negativas + this.resolvidas]
                    }
                ]
            };
            this.data3 = {
                labels: ['Negativos', 'Resolvidos'],
                datasets: [
                    {
                        backgroundColor: ['#B71C1C', '#0D47A1'],
                        data: [this.negativas, this.resolvidas]
                    }
                ]
            };
        },
        contarFeedbacks(){
            for(let i = 0; i < this.feedbacks.length; i++){
                const feedback = this.feedbacks[i];
                if(feedback.avaliacao == 'positiva'){
                    this.positivas += 1;
                }else if (feedback.avaliacao == 'negativa'){
                    this.negativas += 1;
                }else if (feedback.avaliacao == 'resolvida'){
                    this.resolvidas += 1;
                }
            }
        }
    }
}
</script>