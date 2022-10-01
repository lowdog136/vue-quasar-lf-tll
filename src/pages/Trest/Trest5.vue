<template>
  <div>
    <q-splitter
      v-model="splitterModel"
      style="height: 450px"
    >

      <template v-slot:before>
        <div class="q-pa-md">
          <q-date
            v-model="date"
            :events="events"
            event-color="orange"
          />
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="date"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="2022/10/02">
            <div class="text-h4 q-mb-md">2019/02/01</div>
            <p> Кофемашину моет %userName</p>
          </q-tab-panel>

          <q-tab-panel name="2022/10/05">
            <div class="text-h4 q-mb-md">2019/02/05</div>
            <p> Кофемашину моет %userName</p>
          </q-tab-panel>

          <q-tab-panel name="2022/10/06">
            <div class="text-h4 q-mb-md">2019/02/06</div>
            <p> Кофемашину моет %userName</p>
          </q-tab-panel>
          <q-tab-panel name="2022/10/12">
            <div class="text-h4 q-mb-md">2019/02/06</div>
            <p> Кофемашину моет %userName</p>
          </q-tab-panel>
          <q-tab-panel name="2022/11/16">
            <div class="text-h4 q-mb-md">2019/02/06</div>
            <p> Кофемашину моет %userName</p>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      splitterModel: ref(50),
      date: ref('2022/10/01'),
      events: ['2022/10/02', '2022/10/05', '2022/10/06', '2022/10/12', '2022/11/16']
    }
  }
}
</script>
