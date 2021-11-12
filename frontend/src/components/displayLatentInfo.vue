<template>
  <v-app>
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
          <v-btn id="add" depressed elevation="2" outlined v-on:click="addZero">
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
    <!-- <instraction /> -->
  </v-app>
</template>

<script>
import { tableData, chartOptions } from '@/components/createLatentSpace'
import ref50 from '@/assets/ref50.json'
export default {
  name: 'DisplayLatentSpace',
  components: {
    // instraction
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
      dialog: false
    }
  },
  methods: {
    addZero() {
      // this.options.series[0].data[bibInfoIndex] = []
      this.options.series[0].data.push([0, 0])
      this.bibInfoIndex += 1
      // this.displayBibInfo()
    },
    displayBibInfo() {
      // console.log(this.bibInfo.keys[this.bibInfoIndex])
      return this.bibInfo.keys[this.bibInfoIndex]
    }
  },
  created() {
    this.options.series[0].dataLabal = ref50.keys
  }
}
</script>
