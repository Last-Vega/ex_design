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

var miscList = []

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
    text: '潜在空間'
  },
  series: [
    {
      name: '動かす文献',
      data: [[0, 0]],
      // enableMouseTracking: true,
      dataLabal: [],
      type: 'scatter',
      animation: false,
      dragDrop: {
        draggableX: true,
        draggableY: true,
        liveRedraw: true
      },
      point: {
        events: {
          mouseOver() {
            // let point = this
            // let index = point.index
            tableData[0].title = ''
            tableData[0].author = ''
            tableData[0].conference = ''
            tableData[0].year = ''
          },
          mouseOut() {
            let point = this
            let index = point.index
            // console.log(chartOptions.series[0].data[index])
            if (chartOptions.series[0].data[index].x !== undefined) {
              chartOptions.series[0].data[index] = [
                chartOptions.series[0].data[index].x,
                chartOptions.series[0].data[index].y
              ]
              updateIndexList.push(index)
            }
          },
          drop: function (e) {
            // console.log(e.newPoint)
            let point = this
            let index = point.index
            // console.log(index)
            if (e.newPoint.x !== undefined) {
              chartOptions.series[0].data[index] = [e.newPoint.x, e.newPoint.y]
              miscList[index] = [e.newPoint.x, e.newPoint.y]
              console.log(miscList)
              // chartOptions.series[1].data.push([e.newPoint.x, e.newPoint.y])
              updateIndexList.push(index)
            } else {
              // miscList[index] = [0,0]
              // // chartOptions.series[1].data.push([0, 0])
              // updateIndexList.push(index)
            }
          }
        }
      }
    },
    {
      name: '動かした文献',
      data: [],
      dataLabal: [],
      type: 'scatter',
      color: 'red',
      animation: false,
      dragDrop: {
        draggableX: false,
        draggableY: false,
        liveRedraw: false
      },
      point: {
        events: {
          mouseOver() {
            let point = this
            let index = point.index
            tableData[0].title = chartOptions.series[1].dataLabal[index].title
            tableData[0].author = chartOptions.series[1].dataLabal[index].author
            tableData[0].conference =
              chartOptions.series[1].dataLabal[index].conference
            tableData[0].year = chartOptions.series[1].dataLabal[index].year
          }
        }
      }
    }
  ],
  plotOptions: {
    series: {
      states: {
        hover: {
          enabled: false
        }
      }
      // dragDrop: {
      //   draggableX: true,
      //   draggableY: true,
      //   liveRedraw: true
      // },
    }
  }
}

export { tableData, chartOptions, miscList }
