<template>
  <v-app>
    <Loading :flag="isShow" />
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
                Operating Document
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
            Move Next Document
          </v-btn>
        </v-col>
        <v-col cols="12" sm="2"> </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import {
  chartOptions,
  miscList,
  reMovedObj
} from '@/components/createLatentSpace'
import ito50 from '@/assets/ito50shuffled3.json'
import matsu50 from '@/assets/matsubara50shuffled3.json'
import mori50 from '@/assets/morishima50shuffled3.json'
import kim50 from '@/assets/kim50shuffled.json'
import waka50 from '@/assets/wakaba50shuffled.json'
import suzu50 from '@/assets/suzuki50shuffled.json'
import hira50 from '@/assets/hira50shuffled.json'
import ono50 from '@/assets/ono50shuffled.json'
import kato50 from '@/assets/kato50shuffled.json'
import yu50 from '@/assets/yu50shuffled.json'
import tutorial50 from '@/assets/ito50.json'
import { db } from '../plugins/firebase'
import Dialog from '@/components/taskInstraction'
import Loading from '@/components/Loading'

export default {
  name: 'DisplayLatentSpace',
  components: {
    Dialog,
    Loading
  },
  data () {
    return {
      options: chartOptions,
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Authors', value: 'author' },
        { text: 'Conference', value: 'conference' },
        { text: 'Year', value: 'year' }
      ],
      bibInfo: '',
      bibInfoIndex: 0,
      uID: -1,
      misc: miscList,
      collectionName: '',
      collectionMovedName: '',
      reMovedObj: reMovedObj,
      isShow: false
    }
  },
  methods: {
    async addZero () {
      this.isShow = true
      const now = new Date()
      if (Object.keys(reMovedObj).leångth !== 0) {
        for (const index in reMovedObj) {
          const id = parseInt(index, 10)
          const querySnapshot = await db.collection(this.collectionName).where('ind', '==', id).get()
          let queryID = ''
          querySnapshot.forEach((postDoc) => {
            queryID = postDoc.id
          })
          await db.collection(this.collectionName).doc(queryID).update({
            ind: parseInt(index, 10),
            x: reMovedObj[index][0],
            y: reMovedObj[index][1],
            userID: this.uID,
            createdAt: now,
            title: this.bibInfo.key[index][0].title,
            whichBibInfo: parseInt(this.bibInfoIndex, 10)
          })
          delete reMovedObj[index]
        }
      }
      if (this.bibInfoIndex === this.options.series[1].dataLabal.length - 1) {
        this.options.series[0].data.splice(-1, 1)
        const moved = this.misc[0]
        await db.collection(this.collectionName).add({
          ind: parseInt(this.bibInfoIndex, 10),
          x: moved[0],
          y: moved[1],
          userID: this.uID,
          title: this.bibInfo.key[this.bibInfoIndex][0].title,
          createdAt: now
        })
        this.options.series[1].data.push(moved)
        alert('実験は終了です．')
      } else {
        this.options.series[0].data.splice(-1, 1)
        this.options.series[0].data.push([0, 0])
        const moved = this.misc[0]
        await db.collection(this.collectionName).add({
          ind: parseInt(this.bibInfoIndex, 10),
          x: moved[0],
          y: moved[1],
          userID: this.uID,
          title: this.bibInfo.key[this.bibInfoIndex][0].title,
          createdAt: now
        })
        this.bibInfoIndex += 1
      }
      this.makeScatter()
      this.isShow = false
    },
    displayBibInfo () {
      return this.bibInfo.key[this.bibInfoIndex][0]
    },
    async makeScatter () {
      let nowBibInfoIndex = 0
      const moved = []
      const querySnapshot = await db.collection(this.collectionName).orderBy('ind', 'asc').get()
      querySnapshot.forEach((postDoc) => {
        console.log(postDoc.data().ind, postDoc.data().title)
        moved.push([postDoc.data().x, postDoc.data().y])
        nowBibInfoIndex += 1
      })
      this.options.series[1].data = moved
      this.bibInfoIndex = nowBibInfoIndex
    }
    // async getBibInfoIndex () {
    //   const nowBibInfoIndex = 0
    //   const querySnapshot = await db.collection(this.collectionName).orderBy('ind', 'asc').get()
    //   console.log(querySnapshot)
    //   // querySnapshot.forEach((postDoc) => {
    //   //   nowBibInfoIndex = postDoc.data().ind
    //   // })

    //   return nowBibInfoIndex
    // }
  },
  created () {
    if (this.$route.path === '/mori') {
      this.options.series[0].dataLabal = mori50.key
      this.options.series[1].dataLabal = mori50.key
      this.bibInfo = mori50
      this.uID = 0
      this.collectionName = 'MorishimaLog3'
      this.collectionMovedName = 'MorishimaMovedLog3'
    } else if (this.$route.path === '/matsu') {
      this.options.series[0].dataLabal = matsu50.key
      this.options.series[1].dataLabal = matsu50.key
      this.bibInfo = matsu50
      this.uID = 1
      this.collectionName = 'MatsubaraLog3'
      this.collectionMovedName = 'MatsubaraMovedLog3'
    } else if (this.$route.path === '/ito') {
      this.options.series[0].dataLabal = ito50.key
      this.options.series[1].dataLabal = ito50.key
      this.bibInfo = ito50
      this.uID = 2
      this.collectionName = 'ItoLog3'
      this.collectionMovedName = 'ItoMovedLog3'
    } else if (this.$route.path === '/tutorial') {
      this.options.series[0].dataLabal = tutorial50.key
      this.options.series[1].dataLabal = tutorial50.key
      this.bibInfo = tutorial50
      this.uID = 3
      this.collectionName = 'tutorialLog'
      this.collectionMovedName = 'tutorialMovedLog'
      // this.bibInfoIndex = this.getBibInfoIndex()
      // console.log(this.bibInfoIndex)
    } else if (this.$route.path === '/kim') {
      this.options.series[0].dataLabal = kim50.key
      this.options.series[1].dataLabal = kim50.key
      this.bibInfo = kim50
      this.uID = 4
      this.collectionName = 'KimLog'
      this.collectionMovedName = 'KimMovedLog'
    } else if (this.$route.path === '/suzu') {
      this.options.series[0].dataLabal = suzu50.key
      this.options.series[1].dataLabal = suzu50.key
      this.bibInfo = suzu50
      this.uID = 5
      this.collectionName = 'SuzuLog'
      this.collectionMovedName = 'SuzuMovedLog'
    } else if (this.$route.path === '/waka') {
      this.options.series[0].dataLabal = waka50.key
      this.options.series[1].dataLabal = waka50.key
      this.bibInfo = waka50
      this.uID = 6
      this.collectionName = 'WakaLog'
      this.collectionMovedName = 'WakaMovedLog'
    } else if (this.$route.path === '/hira') {
      this.options.series[0].dataLabal = hira50.key
      this.options.series[1].dataLabal = hira50.key
      this.bibInfo = hira50
      this.uID = 7
      this.collectionName = 'HiraLog'
      this.collectionMovedName = 'HiraMovedLog'
    } else if (this.$route.path === '/ono') {
      this.options.series[0].dataLabal = ono50.key
      this.options.series[1].dataLabal = ono50.key
      this.bibInfo = ono50
      this.uID = 8
      this.collectionName = 'OnoLog'
      this.collectionMovedName = 'OnoMovedLog'
    } else if (this.$route.path === '/kato') {
      this.options.series[0].dataLabal = kato50.key
      this.options.series[1].dataLabal = kato50.key
      this.bibInfo = kato50
      this.uID = 9
      this.collectionName = 'KatoLog'
      this.collectionMovedName = 'KatoMovedLog'
    } else if (this.$route.path === '/yu') {
      this.options.series[0].dataLabal = yu50.key
      this.options.series[1].dataLabal = yu50.key
      this.bibInfo = yu50
      this.uID = 10
      this.collectionName = 'YuLog'
      this.collectionMovedName = 'YuMovedLog'
    }
    this.makeScatter()
  }
}
</script>
