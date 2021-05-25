<template>
  <ion-page>
    <div class="w-full h-full flex justify-center p-5 items-center">
      <div class="bg-white h-4/5 overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <a href="/" class="flex flex-row items-center">
            <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </a>
          <img :src="article.img" class="mt-5"/>
          <p class="text-center font-bold text-xl mt-5">
            Article : {{ article.name }}
          </p>
          <ion-card-content>
            <p>{{ article.description }}</p>
            <br>
            <div>
              <p>Pourcentage de réduction: {{ promotion.percentageReduction }}%</p>
              <strong> CODE: {{ promotion.code }}</strong>
              <br>
              <ion-button v-if="promotion.expireAt" expand="block" fill="solid" :style="badgeBackground" size="large"
                          class="likeBtn">{{ date }}
              </ion-button>
            </div>
          </ion-card-content>
        </div>
      </div>
    </div>
  </ion-page>
</template>

<script>
import {IonPage, IonCardContent} from '@ionic/vue';
import {useRoute} from 'vue-router';
import moment from 'moment';

export default {
  name: "OfferDetails",
  data() {
    return {
      article: {},
      promotion: {},
      date: '',
      badgeColor: 'green'
    }
  },
  components: {IonPage, IonCardContent},
  methods: {
    // Get id from url
    getPromoId() {
      const route = useRoute();
      const {promo_id} = route.params;
      return promo_id;
    },

    async getArticle() {
      const id = this.getPromoId();

      try {

        const res = await this.$http(`/promotions/${id}`);
        this.promotion = res.data.data[0];
        this.article = this.promotion.article;
      } catch (err) {
        await this.$router.replace('/login');
      }

      this.getCountdown();

    },

    getCountdown() {
      const now = moment();
      const promoEndDatetime = moment(this.promotion.expireAt);
      const time = promoEndDatetime.diff(now, 'seconds');

      const hours = ~~(time / 3600);

      let minutes = ~~(time / 60);

      // Check if minutes should be removed because of hours
      minutes = (minutes >= 60) ? (minutes - (60 * hours)) : minutes;

      const seconds = time % 60;

      if (hours !== 0 && minutes !== 0 && seconds !== 0) {
        this.date = `${hours}:${minutes}:${seconds}`;
      } else {
        this.date = `00:00:00`;
      }

      if (hours <= 0 && minutes <= 60) {
        this.badgeColor = 'red';
      }
      if (hours <= 0 && minutes <= 0) {
        this.date = "Expirée"
      }

    },
  },

  computed: {
    badgeBackground: function () {
      return '--background: ' + this.badgeColor;
    }
  },
  mounted() {
    this.getArticle();
    if (!localStorage.getItem('token')) {
      this.$router.replace('/login')
    }
  }
}
</script>
