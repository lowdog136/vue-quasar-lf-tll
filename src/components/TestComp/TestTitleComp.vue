<template>
  <div class="q-pa-md row items-start q-gutter-md">
      <h4>{{ greetingMessage }}</h4>
  </div>
</template>

<script>
export default {
  name: 'TestTitleComp',
  props: {
    greetingMessage: String
  },
  setup (props) {
    console.log(props.greetingMessage)
  }
}
</script>

<style scoped>

</style>
