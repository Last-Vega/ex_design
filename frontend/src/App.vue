<template>
  <div>
    <section class="charts">
      <highcharts :options="options" ref="chart"></highcharts>
    </section>
  </div>
</template>

<script>
  /* eslint-disable */
  import Highcharts from 'highcharts'
  import More from 'highcharts/highcharts-more'
  import draggablePoints from 'highcharts/modules/draggable-points'

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
    yAxis: {
      title: {
        text: null
      },
      // tickInterval: 0.5
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
    }
  }
</script>