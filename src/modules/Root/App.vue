<template>
  <q-layout view="hhh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>Выгрузка заказов на доставку с 01.09.2019</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" overlay bordered>
      <q-list bordered separator>
        <div v-for="(m, url) in config.modules" :key="url">
          <q-item clickable v-ripple v-if="!m.hidden" @click="rout(`/${url}`)">
            <q-item-section>{{m.name}}</q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div id="MainContent"></div>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "ExampleVueRoot",
  el: "#root",
  data: {
    left: false,
    config: undefined
  },
  methods: {
    rout(url, state) {
      this.$emit("rout", {
        url,
        state
      });

      this.left = false;
    }
  }
};
</script>



