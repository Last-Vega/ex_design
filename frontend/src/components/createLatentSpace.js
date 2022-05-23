import Highcharts from 'highcharts'
import More from 'highcharts/highcharts-more'
import draggablePoints from 'highcharts/modules/draggable-points'
// import bibInfoIndex from '@/components/displayLatentInfo'

More(Highcharts)
draggablePoints(Highcharts)
var tableData = {
  title: '',
  author: '',
  conference: '',
  year: ''
}

var miscList = []

var reMovedObj = {}

function makeTable (title, authors, conference, year) {
  return `<table>
  <tr>
    <th>Title</th><td>${title}</td>
  </tr>
  <tr>
    <th>Authors</th><td>${authors}</td>
  </tr>
  <tr>
    <th>Conference</th><td>${conference}</td>
  </tr>
  <tr>
    <th>Year</th><td>${year}</td>
  </tr>
  </table>`
}

const chartOptions = {
  tooltip: {
    valueDecimals: 9,
    useHTML: true,
    formatter: function () {
      if (this.series.userOptions.name === 'Moved Documents') {
        const index = this.series.data.indexOf(this.point)
        const title = chartOptions.series[1].dataLabal[index][0].title
        const authors = chartOptions.series[1].dataLabal[index][0].author
        const conference = chartOptions.series[1].dataLabal[index][0].conference
        const year = chartOptions.series[1].dataLabal[index][0].year
        const kye = makeTable(title, authors, conference, year)
        return kye
      } else {
        return 'Please move this dot to any position you like.'
      }
    }
  },
  xAxis: {
    min: -1,
    max: 1,
    gridLineWidth: 3,
    labels: {
      style: {
        fontSize: '14px'
      }
    },
    tickPixelInterval: 25
  },
  yAxis: {
    min: -1,
    max: 1,
    gridLineWidth: 3,
    labels: {
      style: {
        fontSize: '14px'
      }
    },
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
      name: 'Operating Documents',
      data: [[0, 0]],
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
          mouseOver () {
            tableData.title = ''
            tableData.author = ''
            tableData.conference = ''
            tableData.year = ''
          },
          drop: function (e) {
            const point = this
            const index = point.index
            console.log(index)
            if (e.newPoint.x !== undefined) {
              chartOptions.series[0].data[index] = [e.newPoint.x, e.newPoint.y]
              miscList[index] = [e.newPoint.x, e.newPoint.y]
              // console.log(miscList)
            }
          }
        }
      }
    },
    {
      name: 'Moved Documents',
      data: [],
      dataLabal: [],
      type: 'scatter',
      color: 'red',
      animation: false,
      dragDrop: {
        draggableX: true,
        draggableY: true,
        liveRedraw: true
      },
      point: {
        events: {
          mouseOver () {
            const point = this
            const index = point.index
            tableData.title =
              chartOptions.series[1].dataLabal[index][0].title
            tableData.author =
              chartOptions.series[1].dataLabal[index][0].author
            tableData.conference =
              chartOptions.series[1].dataLabal[index][0].conference
            tableData.year = chartOptions.series[1].dataLabal[index][0].year
          },
          drop: function (e) {
            const point = this
            const index = point.index
            if (e.newPoint.x !== undefined) {
              // console.log(e.newPoint.x)
              chartOptions.series[1].data[index] = [e.newPoint.x, e.newPoint.y]
              reMovedObj[index] = [e.newPoint.x, e.newPoint.y]
            }
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
    }
  }
}

export { tableData, chartOptions, miscList, reMovedObj }
