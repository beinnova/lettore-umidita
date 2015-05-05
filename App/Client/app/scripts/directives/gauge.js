/**
 * Created by Giorgio Cerruti
 * WebSite: http://beinnova.it
 * Email: info@beinnova.it
 * Date: 02/05/15.
 */


angular.module("gauge.directive", [])
.directive("gauge", GaugeDirective);


function GaugeDirective(){

    return {
        restricted: "EA"
        , replace: true
        , template:  '<div></div>'
        , scope: {
            value: "="
            , min: "="
            , max: "="
            , elemId: "=id"

        }


        ,link: function(scope, elem, attr){

            var _title = attr.title
                , _min = scope.min
                ,_max = scope.max
                , elId = attr.id
                , _value  = scope.value;


            var _gauge = new JustGage({
                id: elId,
                value: _value || 0,
                min: _min || 0,
                max: _max || 0,
                title: _title,
                label: "mV",
                levelColors: [
                    '#D32F2F'
                    ,'#FF5722'
                    , '#FFEB3B'
                    ,'#4CAF50'
                ]
            });

            scope.$watch("value", function(value){

                if(value){
                    if(value > _max) value = _max;
                    console.log(value);
                    _gauge.refresh(value);
                }

            })
        }
    }
}