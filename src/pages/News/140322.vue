<template>
  <div class="q-pa-md">
    <q-layout>
      <q-page-container>
        <div class="col-6">
          <q-img src="~src/assets/image/imgTitle/title_1.png" :fit="mode" spinner-color="red" :ratio="16/9" no-native-menu>
            <div class="absolute-top text-center">
              {{ $store.state.NewsClubNewsCard[0].NewsClubNewsCardTitleNews }}
            </div>
          </q-img>
        </div>
        <q-page>
          В минувшее воскресенье ФК "Север" провел гостевой товарищеский матч против ФК "Динамо" Санкт-Петербург.<br>
          Матч закончился победой хозяев со счетом 4-2.<br>
          За "Север" голы забили: 33'-Миронов, 76'-Гагиев (пен).<br><br>
          Фото: vk.com/dynamo_spb <br>
          <q-btn color="primary" to="/NewsClub">Вернуться</q-btn>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIndex'
})
</script>
<style>
</style>
