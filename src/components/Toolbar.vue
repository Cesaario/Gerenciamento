<template>
    <div v-if='this.$route.name != "login"'>
        <v-toolbar flat app>
            <v-toolbar-title class='ml-5 headline grey--text'>Gerenciamento</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn to='feedbacks' flat>Feedbacks</v-btn>
                <v-btn to='positivos' flat>Positivos</v-btn>
                <v-btn to='negativos' flat>Negativos</v-btn>
                <v-btn to='resolvidos' flat>Resolvidos</v-btn>
                <v-btn to='estatisticas' flat>Estatisticas</v-btn>
                <v-btn flat @click.stop.prevent='logout()'>Logout</v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </div>
</template>

<script>
import {auth} from '@/firebase'
export default{
    methods: {
        logout(){
            this.$router.push('/');
            auth.signOut();
        }
    }
}
</script>