<template>
  <div class="advertisement-add-container">
    <advertisement-form />
  </div>
</template>

<script>
import AdvertisementForm from './form.vue';

export default {
  name: 'AdvertisementAdd',
  components: {
    AdvertisementForm,
  },
};
</script>

<style lang="scss" scoped>
  .advertisement-add-container {
    padding: 20px;
    background-color: $appMainBg;

    @media screen and (max-width: $dividingLine) {
      padding: px2rem(10);
    }
  }
</style>