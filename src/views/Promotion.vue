<template>
  <ion-page>
    <div class="w-full pt-3 px-3">
      <svg @click="logout" id="logout" class="h-10 float-left" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
           stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
      </svg>
      <svg @click="changeStatusDisplayScanner" id="qrcodeScanner" class="h-10 float-right" xmlns="http://www.w3.org/2000/svg" fill="none"
           viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
      </svg>
    </div>
    <div class="flex justify-start h-full flex-col">
      <div
          :class="`h-60 bg-white overflow-hidden shadow rounded-lg mx-5 ${displayScanner ? 'absolute' : 'hidden'} z-50`" id="StreamBarcodeReader">
        <div class="h-full sm:p-6">
          <StreamBarcodeReader
              @decode="onDecode"
              @error="onError"
          ></StreamBarcodeReader>
        </div>
      </div>
      <ul class="z-0 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4 z-0 overflow-auto">
        <promotion-card v-for="promo in promotions" :key="promo.id" :promotion="promo" @delete="deletePromotion"/>
      </ul>
    </div>
    <WarningNotification @click="displayWarningNotification=false" v-if="displayWarningNotification" class="absolute top-4 m-3 w-11/12"
                         title="Réduction déjà scannée"/>
    <ErrorNotification @click="displayErrorNotification=false" v-if="displayErrorNotification" class="absolute top-4 m-3 w-11/12"
                       title="Le Qrcode n'est pas valide"/>
    <SuccessNotification @click="displaySuccessNotification=false" v-if="displaySuccessNotification" class="absolute top-4 m-3 w-11/12" title="Réduction supprimée"/>
  </ion-page>
</template>

<script>

import {IonPage} from '@ionic/vue';
import PromotionCard from "@/components/PromotionCard";
import StreamBarcodeReader from "../components/StreamBarcodeReader";
import WarningNotification from "@/components/WarningNotification";
import ErrorNotification from "@/components/ErrorNotification";
import SuccessNotification from "@/components/SuccessNotification";

export default {
  name: 'Tab1',
  data() {
    return {
      displayScanner: false,
      displayWarningNotification: false,
      displayErrorNotification: false,
      displaySuccessNotification: false,
      promotions: [],
    }
  },
  components: {IonPage, PromotionCard, StreamBarcodeReader, WarningNotification, ErrorNotification, SuccessNotification},
  methods: {
    changeStatusDisplayScanner() {
      this.displayScanner = !this.displayScanner;
    },
    async getPromotions() {
      try {
        const res = await this.$http('/me/promotions');
        // On fait un map pour gérer les deux types de promotions possibles
        res.data.data.map(promo => {
          let current = promo.promotion;
          current.userPromotionId = promo.id;
          current.used = promo.used;
          this.promotions.push(current);
        });
      } catch (err) {
        await this.$router.replace('/login');
      }
    },
    onDecode(result) {
      const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/;
      if (this.displayScanner) {
        this.displayScanner = false;
        if(!result.match(regex)){
          this.displayScanner = false;
          this.timingDisplayErrorNotification()
          return
        }
        this.$http.post('/qrcodes/scan', {
          token: result,
        }).then((res) => {
          res.data.data.promotions.map(async (promotion) => {
            if (!this.promotions.find(x => x.id === promotion.id)) {
              this.promotions = [];
              await this.getPromotions();
            } else {
              this.timingDisplayWarningNotification();
            }
          })
        }).catch(() => {
          this.timingDisplayErrorNotification()
        });
      }
    },
    onError(err) {
      console.log(err)
    },
    timingDisplayErrorNotification() {
      this.displayErrorNotification = true;
      setTimeout(() => {
        this.displayErrorNotification = false;
      }, 4000);
    },
    timingDisplaySuccessNotification() {
      this.displaySuccessNotification = true;
      setTimeout(() => {
        this.displaySuccessNotification = false;
      }, 4000);
    },
    timingDisplayWarningNotification() {
      this.displayWarningNotification = true;
      setTimeout(() => {
        this.displayWarningNotification = false;
      }, 4000);
    },
    logout() {
      localStorage.clear();
      this.$router.replace('/login')
    },
    deletePromotion(id) {
      this.promotions.find(promotion => {
        if (promotion.userPromotionId === id) {
          this.promotions.splice(this.promotions.indexOf(promotion), 1);
          this.$http.delete(`/me/promotions/${id}`).then(() => {
            this.timingDisplaySuccessNotification()
          })
              .catch(err => {
                console.log(err);
              });
        }
      });
    }
  },
  mounted() {
    if (!localStorage.getItem('token')) {
      this.$router.replace('/login')
    }
    this.getPromotions();
  }
}
</script>
