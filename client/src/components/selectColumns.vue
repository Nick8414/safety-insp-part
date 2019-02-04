<template>
    <v-dialog v-if="user && $route.name == 'MainTable'" v-model="dialog" scrollable max-width="300px">
      <v-btn slot="activator" small dark color="primary" > <v-icon>visibility</v-icon></v-btn>
      <v-card>
        <v-card-title>Select Columns</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
        <v-list>
          <v-list-tile v-for="(item, i) in headersTable" :key="i" @click="">
            <v-list-tile-title>
               <v-checkbox
                :label="$t(item.label)"
                v-model="item.status"
               ></v-checkbox>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click.native="saveColumnSettings">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>

export default {
  data() {
    return {
       dialog: false,
    }
  },
  computed: {
    headersTable() {
      return this.$store.getters.user.headersTable;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    saveColumnSettings() {
      this.dialog = false;
      this.user;
      this.$store.dispatch("saveUserColumns", this.user.headersTable);
    }
  }
  
}
  
</script>
