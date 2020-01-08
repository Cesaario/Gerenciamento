<template>
    <v-dialog max-width="600px" v-model='dialogo'>
        <v-btn slot='activator'>Adicionar Feedback</v-btn>
        <v-card>
            <v-card-title>
                <h2>Adicionar novo feedback</h2>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field label='Nome' v-model='nome' prepend-icon="person"> </v-text-field>
                    <v-textarea label='Comentario' v-model='comentario' prepend-icon='edit'></v-textarea>
                    <v-btn class='success' @click.stop.prevent='enviar'>Adicionar feedback</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import { db, auth } from '@/firebase'
    export default {
        data(){
            return{
                nome: '',
                comentario: '',
                dialogo: false,
            }
        },
        methods: {
            enviar(){
                const user = auth.currentUser;
                const feedback = {
                    autor: this.nome,
                    comentario: this.comentario,
                    avaliacao: 'na',
                    usuario: user.uid
                }
                db.collection('feedbacks').add(feedback).then(() => {
                    this.$emit('atualizar');
                    this.dialogo = false;
                    this.nome = '';
                    this.comentario = '';
                });
            }
        }
    }
</script>