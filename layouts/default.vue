<template>
  <div>
    <site-navigation />
    <div class="wrapper">
      <nuxt />
    </div>
    <site-footer />
  </div>
</template>
<script>
  import SiteNavigation from './partials/navigation.vue'
  import SiteFooter from './partials/footer.vue'
  export default {
    components: { SiteFooter, SiteNavigation }
  }
</script>
