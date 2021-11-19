<template>
  <v-app>
    <Dialog />
    <section class="charts">
      <highcharts :options="options" ref="chart"></highcharts>
    </section>
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col cols="12" sm="5">
          <v-simple-table>
            <template v-slot:default>
              <caption>
                動かす文献
              </caption>
              <thead>
                <tr>
                  <th class="text-left">Title</th>
                  <th class="text-left">Authors</th>
                  <th class="text-left">Conference</th>
                  <th class="text-left">Year</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ displayBibInfo()[0] }}</td>
                  <td>{{ displayBibInfo()[1] }}</td>
                  <td>{{ displayBibInfo()[2] }}</td>
                  <td>{{ displayBibInfo()[3] }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-btn
            v-if="bibInfoIndex < 49"
            id="add"
            depressed
            elevation="2"
            outlined
            v-on:click="addZero"
          >
            次の文献を動かす
          </v-btn>
        </v-col>
        <v-col cols="12" sm="2"> </v-col>
        <v-col cols="12" sm="5">
          <v-simple-table>
            <template v-slot:default>
              <caption>
                マウスがホバーした文献
              </caption>
              <thead>
                <tr>
                  <th class="text-left">Title</th>
                  <th class="text-left">Authors</th>
                  <th class="text-left">Conference</th>
                  <th class="text-left">Year</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ items[0].title }}</td>
                  <td>{{ items[0].author }}</td>
                  <td>{{ items[0].conference }}</td>
                  <td>{{ items[0].year }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import {
  tableData,
  chartOptions,
  miscList
} from '@/components/createLatentSpace'
import ref50 from '@/assets/ref50.json'
import { db } from '../plugins/firebase'
import Dialog from '@/components/dialog'

export default {
  name: 'DisplayLatentSpace',
  components: {
    // Instraction
    Dialog
  },
  data() {
    return {
      options: chartOptions,
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Authors', value: 'author' },
        { text: 'Conference', value: 'conference' },
        { text: 'Year', value: 'year' }
      ],
      items: tableData,
      bibInfo: ref50,
      bibInfoIndex: 0,
      userID: this.$store.state.loginState.id,
      misc: miscList
    }
  },
  methods: {
    addZero() {
      this.options.series[0].data.splice(-1, 1)
      this.options.series[0].data.push([0, 0])
      const moved = this.misc[0]
      console.log(moved)
      console.log(moved[0])
      db.collection('logs').add({
        ind: this.bibInfoIndex,
        x: moved[0],
        y: moved[1],
        userID: this.userID
      })
      this.options.series[1].data.push(moved)
      this.bibInfoIndex += 1
    },
    displayBibInfo() {
      return this.bibInfo.keys[this.bibInfoIndex]
    }
  },
  created() {
    this.options.series[0].dataLabal = ref50.keys
    this.options.series[1].dataLabal = ref50.keys
  }
}
</script>
