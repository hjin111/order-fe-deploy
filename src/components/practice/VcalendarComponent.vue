<template>
    <div class="pa-5">
      <v-row>
        <v-col cols="12" md="6" class="mb-4">
          <v-row>
            <v-col cols="6">
              <v-menu
                ref="dateMenu"
                v-model="dateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="start"
                    label="Start Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="start"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="dateMenu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.dateMenu.save(start)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="type"
                :items="typeOptions"
                item-text="text"
                item-value="value"
                label="Type"
              ></v-select>
            </v-col>
          </v-row>
          <v-sheet height="500">
            <v-calendar
              ref="calendar"
              v-model="start"
              :type="type"
              :attributes="calendarAttributes"
            ></v-calendar>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dateMenu: false,
        start: new Date().toISOString().substr(0, 10),
        type: 'month',
        typeOptions: [
          { text: 'Day', value: 'day' },
          { text: 'Week', value: 'week' },
          { text: 'Month', value: 'month' },
        ],
        calendarAttributes: [],
      };
    },
    watch: {
      start() {
        // Ensure the selected date is visible in the calendar
        this.$refs.calendar.checkVisible();
      }
    }
  }
  </script>
  
  <style scoped>
  .v-date-picker-header {
    background-color: #f5f5f5;
  }
  .v-date-picker-title {
    background-color: #f5f5f5;
    color: black;
  }
  </style>
  