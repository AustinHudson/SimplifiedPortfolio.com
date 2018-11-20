import GoogleChartsService from 'ember-google-charts/services/google-charts';

export default GoogleChartsService.extend({

  defaultOptions: {
    backgroundColor: '#0B0C10',
    annotations: {
      alwaysOutside: true,
    },
    chartArea:{width:'90%',height:'90%'},
    legend: {
        textStyle: {
            color: "white"
        },
        alignment: 'center'
    },
    pieHole: '0.5',
    colors: ['#001f3f','#2ECC40', '#0074D9', '#7FDBFF', '#3D9970', '#39CCCC']
  },

});