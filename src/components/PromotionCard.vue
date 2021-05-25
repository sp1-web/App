<template>
  <li class="col-span-1 bg-white rounded-lg shadow flex flex-row w-full">
    <div class="flex items-center justify-between p-6 space-x-6 w-11/12">
      <div class="flex-1 truncate">
        <div class="flex items-center space-x-3">
          <h3 class="text-gray-900 text-sm font-medium truncate">{{ promotion.name }}</h3>
          <span v-if="promotion.expireAt"
                :class="`flex-shrink-0 inline-block px-2 py-0.5 text-${badgeColor}-800 text-xs font-medium bg-${badgeColor}-100 rounded-full`">{{
              date
            }}</span>
        </div>
        <p class="mt-1 text-gray-500 text-sm truncate">{{ promotion.description }}</p>
      </div>
    </div>
    <div class="float-right flex justify-around items-center border-l flex-col w-9">
      <svg @click="openDetails" class="h-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none"
           viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
      </svg>
      <svg @click="deletePromotion" class="h-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none"
           viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
      </svg>
    </div>
  </li>
</template>

<script>
import moment from 'moment';

export default {
  name: "Promotion-card",
  data() {
    return {
      date: '',
      badgeColor: 'green',
    }
  },
  props: ['promotion'],

  methods: {

    openDetails() {
      return this.$router.push(`/${this.promotion.id}`);
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
      this.date = `${hours}:${minutes}:${seconds}`;
      if (hours <= 0 && minutes <= 60) {
        this.badgeColor = 'red';
      }
      if (hours <= 0 && minutes <= 0) {
        this.date = "Expirée"
      }
    },
    deletePromotion() {
      this.$emit('delete', this.promotion.userPromotionId)
    }
  },
  computed: {
    badgeBackground: function () {
      return '--background: ' + this.badgeColor;
    }
  },
  mounted() {
    this.getCountdown();
    setInterval(() => {
      this.getCountdown();
    }, 1000);
  }

}
</script>