<template>
  <div>
    <section class="charts">
      <highcharts :options="options" ref="chart"></highcharts>
    </section>
    <v-btn  
      id="add"
      depressed
      elevation="2"
      outlined
      v-on:click="addZero"
    >
    Add data
    </v-btn>
  </div>
</template>

<script>
  /* eslint-disable */
  import Highcharts from 'highcharts'
  import More from 'highcharts/highcharts-more'
  import draggablePoints from 'highcharts/modules/draggable-points'
  import noData from 'highcharts/modules/no-data-to-display'

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
    // chart: {
    //   spacingRight: 500
    // },
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
        data: [],
        dataLabal: [],
        type: 'scatter',
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

  // document.getElementById('add').addEventListener('click', () => {
  //   chartOptions.series.addPoint([0,0]); // Return random integer between 1 and 10.
  // });

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
        items: tableData
      }
    },
    methods: {
      addZero () {
        console.log(this.options.series)
        this.options.series[0].data.push([0,0])
      }
    }
  }
</script>