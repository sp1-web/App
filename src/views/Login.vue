<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div
          class="h-full w-full bg-gradient-to-b from-green-400 to-blue-500 px-4">
        <div
            class="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end relative top-5"
            v-if="isRegisterSuccess" id="successRegister">
          <div
              class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div class="p-4">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <!-- Heroicon name: outline/check-circle -->
                  <svg class="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div class="ml-3 w-0 flex-1 pt-0.5">
                  <p class="text-sm font-medium text-gray-900">Compte créé avec succès</p>
                </div>
                <div class="ml-4 flex-shrink-0 flex">
                  <button @click="isRegisterSuccess = false"
                          class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span class="sr-only">Close</span>
                    <!-- Heroicon name: solid/x -->
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         aria-hidden="true">
                      <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rounded-md bg-red-50 p-4 w-full relative top-5" v-if="errorLogin" id="errorRegister">
          <div class="flex">
            <div class="flex-shrink-0">
              <!-- Heroicon name: solid/x-circle -->
              <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                   fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800" v-if="isLogin">
                Veuillez vérifier vos identifiants
              </h3>
              <h3 class="text-sm font-medium text-red-800" v-if="!isLogin">
                Les mots de passe ne sont pas identiques ou le compte existe déjà
              </h3>
            </div>
          </div>
        </div>
        <div class="flex justify-center items-center flex-col w-full h-full px-10">
          <p v-if="isLogin" class="mb-5 font-bold text-4xl text-white">S'identifier</p>
          <p v-if="!isLogin" class="mb-5 font-bold text-4xl text-white">S'inscrire</p>
          <div class="w-full">
            <label for="email" class="block text-sm font-medium text-gray-700"></label>
            <div class="mt-1">
              <input type="email" name="email" id="email"
                     class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                     v-model="email" placeholder="Adresse mail">
            </div>
          </div>
          <div v-if="!isLogin" class="w-full">
            <label for="fistname" class="block text-sm font-medium text-gray-700"></label>
            <div class="mt-1">
              <input type="text" name="fistname" id="fistname"
                     class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                     v-model="firstname" placeholder="Prénom">
            </div>
          </div>
          <div class="w-full">
            <label for="password" class="block text-sm font-medium text-gray-700"></label>
            <div class="mt-1">
              <input type="password" name="password" id="password"
                     class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                     v-model="password" placeholder="Mot de passe">
            </div>
          </div>
          <div v-if="!isLogin" class="w-full">
            <label for="password_confirm" class="block text-sm font-medium text-gray-700"></label>
            <div class="mt-1">
              <input type="password" name="password_confirm" id="password_confirm"
                     class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                     v-model="passwordConfirm" placeholder="Confirmation du mot de passe">
            </div>
          </div>
          <button v-if="isLogin"
                  @click="login"
                  class="mt-5 w-full px-2.5 py-1.5 border border-transparent text-l font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Se connecter
          </button>
          <button v-if="!isLogin"
                  class="mt-5 w-full px-2.5 py-1.5 border border-transparent text-l font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  @click="register">
            Créer le compte
          </button>
          <p id="register" class="font-bold whitespace-nowrap text-sm text-white mt-5" v-if="isLogin" @click="isLogin = !isLogin">Vous
            n'avez pas de compte ?
            S'inscrire</p>
          <p id="login" class="font-bold whitespace-nowrap text-sm text-white mt-5" v-if="!isLogin" @click="isLogin = !isLogin">
            Vous
            avez un compte ? S'identifier</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage} from '@ionic/vue';
import axios from 'axios';

export default {
  name: 'qrcode',
  components: {
    IonPage,
  },
  data() {
    return {
      isLogin: true,
      email: '',
      password: '',
      passwordConfirm: '',
      firstname: '',
      errorLogin: false,
      isRegisterSuccess: false,
    }
  },

  methods: {
    login() {
      axios.post('http://localhost:3000/login', {
        email: this.email,
        password: btoa(this.password)
      })
          .then(res => {
            localStorage.setItem('token', res.data.data.jwt.token);
            this.email = '';
            this.password = '';
            this.passwordConfirm = '';
            this.$router.replace('/');
          })
          .catch(() => {
            this.password = '';
            this.errorLogin = true;
          });
    },

    register() {
      if (this.password === this.passwordConfirm) {
        axios.post('http://localhost:3000/register', {
          email: this.email,
          firstname: this.firstname,
          password: btoa(this.password),
          passwordConfirm: btoa(this.passwordConfirm),
        })
            .then(() => {
              this.isLogin = !this.isLogin;
              this.errorLogin = false;
              this.isRegisterSuccess = true;
            })
            .catch(() => {
              this.password = '';
              this.passwordConfirm = '';
              this.errorLogin = true;
            });
      } else {
        this.errorLogin = true;
      }
    }
  }
}
</script>