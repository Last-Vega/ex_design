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
      name: 'latent representation',
      data: [[0, 0]],
      dataLabal: [],
      type: 'scatter',
      animation: false,
      //   color: 'red',
      dragDrop: {
        draggableX: true,
        draggableY: true,
        liveRedraw: true
      },
      point: {
        events: {
          mouseOver() {
            let point = this
            let index = point.index
            tableData[0].title = chartOptions.series[0].dataLabal[index][0]
            tableData[0].author = chartOptions.series[0].dataLabal[index][1]
            tableData[0].conference = chartOptions.series[0].dataLabal[index][2]
            tableData[0].year = chartOptions.series[0].dataLabal[index][3]
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
              // chartOptions.series[1].data.push([e.newPoint.x, e.newPoint.y])
              updateIndexList.push(index)
            }
          }
        }
      }
    }
    // {
    //   name: '動かした文献',
    //   data: [],
    //   dataLabal: [],
    //   type: 'scatter',
    //   color: 'red',
    //   animation: false,
    //   dragDrop: {
    //     draggableX: false,
    //     draggableY: false,
    //     liveRedraw: false
    //   },
    //   point: {
    //     events: {
    //       mouseOver() {
    //         let point = this
    //         let index = point.index
    //         tableData[0].title = chartOptions.series[0].dataLabal[index][0]
    //         tableData[0].author = chartOptions.series[0].dataLabal[index][1]
    //         tableData[0].conference = chartOptions.series[0].dataLabal[index][2]
    //         tableData[0].year = chartOptions.series[0].dataLabal[index][3]
    //       },
    //       mouseOut() {
    //         let point = this
    //         let index = point.index
    //         //   console.log(chartOptions.series[0].data[index])
    //         if (chartOptions.series[0].data[index].x !== undefined) {
    //           chartOptions.series[0].data[index] = [
    //             chartOptions.series[0].data[index].x,
    //             chartOptions.series[0].data[index].y
    //           ]
    //           updateIndexList.push(index)
    //         }
    //       },
    //       drop: function (e) {
    //         //   console.log(e.newPoint)
    //         let point = this
    //         let index = point.index
    //         console.log(index)
    //         if (e.newPoint.x !== undefined) {
    //           chartOptions.series[0].data[index] = [e.newPoint.x, e.newPoint.y]
    //           updateIndexList.push(index)
    //         }
    //         console.log(updateIndexList)
    //         console.log(chartOptions.series[0].data[index])
    //       }
    //     }
    //   }
    // }
  ]
  //   plotOptions: {
  //     series: {
  //       dragDrop: {
  //         draggableX: true,
  //         draggableY: true,
  //         liveRedraw: true
  //       },
  //     }
  //   }
}

export { tableData, chartOptions }
