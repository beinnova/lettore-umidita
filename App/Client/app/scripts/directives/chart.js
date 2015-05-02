/**
 * Created by Giorgio Cerruti
 * WebSite: http://beinnova.it
 * Email: info@beinnova.it
 * Date: 02/05/15.
 */

angular.module("chart.directive", [])
    .directive("chart", GaugeDirective);


function GaugeDirective(){

    return {
        restricted: "EA"
        , replace: true
        , template:  '<div style="width:100%;height:300px"></div>'
        , scope: {
            data: "="


        }


        ,link: function(scope, elem, attr){

            var _i = 0,
                _data = new Array(),
                _prev = 0,
                db = new Array();

            _data.push({
                data: [[0,100],[100,500]],
                lines: {
                    fill: true
                }
            })

           //var chart =  Morris.Area({
           //     element: attr.id,
           //     data: [],
           //     xkey: 'period',
           //     ykeys: ['umidity'],
           //     labels: ['Umidità'],
           //     pointSize: 2,
           //     hideHover: 'auto',
           //     resize: true
           // });



                var plot = $.plot(elem, _data, {
                    grid: {
                        borderWidth: 1,
                        minBorderMargin: 20,
                        labelMargin: 10,
                        backgroundColor: {
                            colors: ["#fff", "#e4f4f4"]
                        },
                        margin: {
                            top: 8,
                            bottom: 20,
                            left: 20
                        }
                        //markings: function(axes) {
                        //    var markings = [];
                        //    var xaxis = axes.xaxis;
                        //    for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
                        //        markings.push({
                        //            xaxis: {
                        //                from: x,
                        //                to: x + xaxis.tickSize
                        //            },
                        //            color: "rgba(232, 232, 255, 0.2)"
                        //        });
                        //    }
                        //    return markings;
                        //}
                    },
                    xaxis: {
                        tickFormatter: function() {
                            return "";
                        }
                    },
                    yaxis: {
                        min: 0,
                        max: 1000
                    },
                    legend: {
                        show: true
                    }
                });

            function getRandomData() {
                var maximum = 700;
                var data = [];
                if (data.length) {
                    data = data.slice(1);
                }

                while (data.length < maximum) {
                    var previous = data.length ? data[data.length - 1] : 50;
                    var y = previous + Math.random() * 10 - 5;
                    data.push(y < 0 ? 0 : y > 100 ? 100 : y);
                }

                // zip the generated y values with the x values

                var res = [];
                for (var i = 0; i < data.length; ++i) {
                    res.push([i, data[i]])
                }

                console.log(res);
                  return res;

            }


            //setInterval(function updateRandom() {
            //    _data[0].data = getRandomData();
            //    plot.setData(_data);
            //    plot.draw();
            //}, 3000);



            scope.$watch("data", function(value){

                if(value){
                    ++_i;
                    db.push([_prev, value]);
                    _prev = value;
                    //console.log(db);
                    _data[0].data = db;
                    plot.setData(_data);
                    plot.draw();

                }



               // ++_i;
               // var date = new Date().getHours() + ":" + new Date().getMinutes() + ":" + znew Date().getSeconds();
               //
               // console.log(date)
               // _data.push({
               //     period: date.toString() +'Q'+ _i.toString(),
               //     umidity: value
               // })
               //chart.setData(_data )

            })
        }
    }
}