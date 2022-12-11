<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <SaveResultMatch />
  </div>
</template>

<script>
import SaveResultMatch from 'components/SaveResultMatch'

export default {
  name: 'SaveResult',
  components: { SaveResultMatch },
  data () {
    return {
      trueValue: true,
      falseValue: false
    }
  },
  props: {
    product_data: {
      type: Object,
      default () {
        return {
          NewsClubNewsCardStatus: String
        }
      }
    }
  },
  setup () {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px
</style>
