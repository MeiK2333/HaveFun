<template>
  <v-main class="grey lighten-2">
    <v-container class="py-8 px-6" fluid>
      <v-card>
        <v-subheader>{{ cards[0] }}</v-subheader>

        <v-list two-line>
          <template v-for="n in 6">
            <v-list-item :key="n">
              <v-list-item-avatar color="grey darken-1"> </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Message {{ n }}</v-list-item-title>

                <v-list-item-subtitle>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Nihil repellendus distinctio similique
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider v-if="n !== 6" :key="`divider-${n}`" inset></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-container>
  </v-main>
</template>


<script>
export default {
  data: () => ({
    cards: ["updated at 2020-10-12 08:00:00", "12"],
    drawer: null,
    links: [
      ["mdi-inbox-arrow-down", "Inbox"],
      ["mdi-send", "Send"],
      ["mdi-delete", "Trash"],
      ["mdi-alert-octagon", "Spam"],
    ],
  }),
};
</script>