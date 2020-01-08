<template>
    <v-container fill-height>
        <v-layout align-center justify-center row fill-height>
            <v-card width='400'>
                <v-card-title class="justify-center headline">Login</v-card-title>
                <v-card-actions>
                    <v-layout>
                        <v-flex text-xs-center>
                            <v-form ref='login' data-vv-scope='login'>
                                <v-text-field v-model='emailLogin' prepend-icon='email' label="E-mail" v-validate="'required|email'" data-vv-name="emailLogin" outlined></v-text-field>
                                <v-text-field v-model='senhaLogin' prepend-icon='vpn_key' label="Senha" type='password' v-validate="'required'" data-vv-name="passLogin" outlined></v-text-field>
                                <v-btn color='primary' @click='login'>Login</v-btn>
                            </v-form>
                            <br>
                            <v-dialog v-model='dialogoCriarConta' width='500'>
                                <template v-slot:activator='{on}'>
                                    <v-btn color='primary' v-on='on'>Criar Conta</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title class='headline justify-center'>Criar Conta</v-card-title>
                                    <v-card-actions>
                                        <v-layout>
                                            <v-flex text-xs-center>
                                                <v-form ref='signup' data-vv-scope='signup'>
                                                    <v-text-field prepend-icon='email' label="E-mail" v-model='email' v-validate="'required|email'" data-vv-name="email" :error-messages="errors.collect('email')" outlined required></v-text-field>
                                                    <v-text-field prepend-icon='vpn_key' type='password' label="Senha" v-model='senha' v-validate="'required|min:6'" ref='password' data-vv-name="pass" :error-messages="errors.collect('pass')" outlined required></v-text-field>
                                                    <v-text-field prepend-icon='vpn_key' type='password' label="Confirmar Senha" v-model='confirmarSenha' v-validate="'required|confirmed:password|min:6'" data-vv-name="pass" :error-messages="errors.collect('pass')" outlined required></v-text-field>
                                                    <v-btn color='primary' v-on='on' @click='validar'>Criar Conta</v-btn>
                                                </v-form>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-flex>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-layout>
        <v-snackbar v-model='snackbarErroLogin' top>
            <span color='white'>{{mensagemErro}}</span>
            <v-btn flat color='red' @click='snackbarErroLogin = false'>OK</v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
import {auth} from '@/firebase'
export default { 
    $_veeValidate: {
        validator: 'new'
    },
    data(){
        return{
            dialogoCriarConta: false,
            emailLogin: '',
            senhaLogin: '',
            email: '',
            senha: '',
            confirmarSenha: '',
            on: false,
            snackbarErroLogin: false,
            mensagemErro: ''
        }
    },
    methods: {
        validar() {
            this.$validator.validateAll('signup').then(result => {
                auth.createUserWithEmailAndPassword(this.email, this.senha).then(cred => {
                    console.log(cred);
                    this.dialogoCriarConta = false;
                    this.email = '';
                    this.senha = '';
                });
            })
        },
        login(){
            this.$validator.validateAll('login').then(result => {
                auth.signInWithEmailAndPassword(this.emailLogin, this.senhaLogin).then(cred => {
                    this.$router.push('/feedbacks');
                    console.log(cred);
                }).catch(e => {
                    console.log(e.code);
                    switch(e.code){
                        case 'auth/invalid-email':
                            this.mensagemErro = "E-mail inválido"
                            break;
                        case 'auth/wrong-password':
                            this.mensagemErro = "Senha incorreta"
                            break;
                        case 'auth/user-not-found':
                            this.mensagemErro = "Usuário não encontrado"
                            break;
                    }
                    this.email = '';
                    this.senha = '';
                    this.snackbarErroLogin = true;
                });
            });
        }
    }
};
</script>

<style>
</style>