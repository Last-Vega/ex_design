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
                  <td>{{ displayBibInfo().title }}</td>
                  <td>{{ displayBibInfo().author }}</td>
                  <td>{{ displayBibInfo().conference }}</td>
                  <td>{{ displayBibInfo().year }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-btn
            v-if="bibInfoIndex < 50"
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
import ito50 from '@/assets/ito50.json'
import matsu50 from '@/assets/matsubara50.json'
import mori50 from '@/assets/morishima50.json'
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
      bibInfo: '',
      bibInfoIndex: 0,
      uID: -1,
      misc: miscList,
      collectionName: ''
    }
  },
  methods: {
    addZero() {
      if (this.bibInfoIndex === 49) {
        this.options.series[0].data.splice(-1, 1)
        const moved = this.misc[0]
        console.log(moved)
        console.log(this.userID)
        db.collection(this.collectionName).add({
          ind: this.bibInfoIndex,
          x: moved[0],
          y: moved[1],
          userID: this.uID
        })
        this.options.series[1].data.push(moved)
        alert('実験は終了です．')
      } else {
        this.options.series[0].data.splice(-1, 1)
        this.options.series[0].data.push([0, 0])
        const moved = this.misc[0]
        console.log(moved)
        console.log(this.userID)
        db.collection(this.collectionName).add({
          ind: this.bibInfoIndex,
          x: moved[0],
          y: moved[1],
          userID: this.uID
        })
        this.options.series[1].data.push(moved)
        this.bibInfoIndex += 1
      }
    },
    displayBibInfo() {
      return this.bibInfo.key[this.bibInfoIndex][0]
    }
  },
  created() {
    // this.options.series[0].dataLabal = ito50.key
    // this.options.series[1].dataLabal = ito50.key
    if (this.$route.path === '/mori') {
      this.options.series[0].dataLabal = mori50.key
      this.options.series[1].dataLabal = mori50.key
      this.bibInfo = mori50
      this.uID = 0
      this.collectionName = 'MorishimaLog'
    } else if (this.$route.path === '/matsu') {
      this.options.series[0].dataLabal = matsu50.key
      this.options.series[1].dataLabal = matsu50.key
      this.bibInfo = matsu50
      this.uID = 1
      this.collectionName = 'MatsubaraLog'
    } else if (this.$route.path === '/ito') {
      this.options.series[0].dataLabal = ito50.key
      this.options.series[1].dataLabal = ito50.key
      this.bibInfo = ito50
      this.uID = 2
      this.collectionName = 'ItoLog'
    }
  }
}
</script>
