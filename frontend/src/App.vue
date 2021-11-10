<template>
  <div>
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
            確定
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
  </div>
</template>

<script>
/* eslint-disable */
  import Highcharts from 'highcharts'
  import More from 'highcharts/highcharts-more'
  import draggablePoints from 'highcharts/modules/draggable-points'
  import noData from 'highcharts/modules/no-data-to-display'
  import ref50 from './assets/ref50.json'

  More(Highcharts)
  draggablePoints(Highcharts)
  var tableData = [
    {
      title: '',
      author: '',
      conference: '',
      year: ''
    }
  ]

  var updateIndexList = []

  const chartOptions = {
    tooltip: {
      valueDecimals: 9
    },
    xAxis: {
        min: -1,
        max: 1,
        gridLineWidth: 1,
        tickPixelInterval: 25
    },
    yAxis: {
        min: -1,
        max: 1,
        tickPixelInterval: 50
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        floating: true,
        backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
        borderWidth: 1
    },
    title: {
      text: 'Latent Space'
    },
    series: [
      {
        name: 'latent representation',
        data: [[0,0]],
        dataLabal: [],
        type: 'scatter',
        point: {
        events: {
          mouseOver() {
            let point = this
            let index = point.index
            tableData[0].title = chartOptions.series[0].dataLabal[index][0]
            tableData[0].author = chartOptions.series[0].dataLabal[index][1]
            tableData[0].conference =
              chartOptions.series[0].dataLabal[index][2]
            tableData[0].year = chartOptions.series[0].dataLabal[index][3]
          },
          mouseOut() {
            let point = this
            let index = point.index
            console.log(chartOptions.series[0].data[index])
            if (chartOptions.series[0].data[index].x !== undefined) {
              chartOptions.series[0].data[index] = [
                chartOptions.series[0].data[index].x,
                chartOptions.series[0].data[index].y
              ]
              updateIndexList.push(index)
            }
          },
          drop: function(e) {
            console.log(e.newPoint)
            let point = this
            let index = point.index
            console.log(index)
            if (e.newPoint.x !== undefined) {
              chartOptions.series[0].data[index] = [e.newPoint.x, e.newPoint.y]
              updateIndexList.push(index)
            }
            console.log(updateIndexList)
            console.log(chartOptions.series[0].data[index])
          }
        }
      }
    }
  ],
    plotOptions: {
      series: {
        dragDrop: {
          draggableX: true,
          draggableY: true,
          liveRedraw: true
        }
      }
    }
  }

  export default {
    name: 'App',
    components: {
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
      }
    },
    methods: {
      addZero () {
        // this.options.series[0].data[bibInfoIndex] = []
        this.options.series[0].data.push([0,0])
        this.bibInfoIndex += 1
        // this.displayBibInfo()
      },
      displayBibInfo () {
        // console.log(this.bibInfo.keys[this.bibInfoIndex])
        return this.bibInfo.keys[this.bibInfoIndex]
      }
    },
    created () {
      this.options.series[0].dataLabal = ref50.keys
    }
  }
</script>