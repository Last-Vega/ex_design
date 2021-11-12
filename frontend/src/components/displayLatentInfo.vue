<template>
  <v-app>
    <div class="text-center">
      <v-dialog v-model="dialog" width="1000">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
            タスク説明
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            表示される文献を，各々の文献管理の基準に基づいて好きな位置に配置してもらいます
          </v-card-title>

          <v-card-text>
            <ol>
              <li>
                一つ目の文献が座標平面上の(0,0)の位置にプロットされています．その文献の情報は画面左下の表「動かす文献」から確認できます．その情報をもとに，適当な位置を決めて動かしてください．プロットされた点はドラッグ層さえ動かすことができます．
              </li>
              <li>
                位置が確定したら，画面左下の「次の文献を動かす」ボタンを押してください．
              </li>
              <li>
                新たな文献が座標平面上の(0,0)の位置にプロットされます．画面左下の表「動かす文献」を確認しながら文献を適当な位置に配置してください
              </li>
              <li>
                これまでに動かした文献は，プロットされた各点をホバーすることで画面右下の表「マウスがホバーした文献」から確認することができます．
              </li>
            </ol>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
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
            v-if="bibInfoIndex % 10 == 9"
            id="add"
            depressed
            elevation="2"
            outlined
            color="red lighten-2"
            v-on:click="register"
          >
            この内容で登録する
          </v-btn>
          <v-btn
            v-else-if="bibInfoIndex < 49"
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
import { tableData, chartOptions } from '@/components/createLatentSpace'
import ref50 from '@/assets/ref50.json'
import {db} from '../plugins/firebase'

export default {
  name: 'DisplayLatentSpace',
  components: {
    // Instraction
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
      // console.log(this.options.series[0].data[this.bibInfoIndex].color)
      // console.log(this.options.series[0].data.color)
      // console.log(this.options.series[0].color)
      // this.options.series[0].data[this.bibInfoIndex].color = 'green'
      this.options.series[0].data.push([0, 0])
      this.bibInfoIndex += 1
    },
    displayBibInfo() {
      return this.bibInfo.keys[this.bibInfoIndex]
    },
    register() {
      console.log(db)
      this.options.series[0].data.forEach(element => {
        db.collection('logs').add({
          x: element[0],
          y: element[1]
        })
      })
    }
  },
  created() {
    this.options.series[0].dataLabal = ref50.keys
    // this.options.series[1].dataLabal = ref50.keys
  }
}
</script>
