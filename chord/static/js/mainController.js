angular.module('app', []);

angular.module('app').config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

angular.module('app').controller('mainCntrl', ['$scope',
function ($scope) {

  $scope.master = {};

  $scope.selected_location = 'Toronto_ON';
  $scope.locations = ["Toronto_ON", "Montreal_QC", "Vancouver_BC", "Waterloo_ON", "New-York_NY", "Boston_MA", "Washington_DC",
               "Seattle_WA", "San-Francisco_CA", "Austin_TX", "San-Jose_CA", "Raleigh_NC", "Portland_OR",
               "Atlanta_GA", "San-Diego_CA", "Denver_CO", "Minneapolis_MN", "Saint-Louis_MO"];


  $scope.filters = {

  };
  $scope.hasFilters = false;

  $scope.tooltip = {};

  // FORMATS USED IN TOOLTIP TEMPLATE IN HTML
  $scope.pFormat = d3.format(".1%");  // PERCENT FORMAT
  $scope.qFormat = d3.format(",.0f"); // COMMAS FOR LARGE NUMBERS

  $scope.updateTooltip = function (data) {
    $scope.tooltip = data;
    $scope.$apply();
  }

  $scope.addFilter = function (name) {
    $scope.hasFilters = true;
    $scope.filters[name] = {
      name: name,
      hide: true
    };
    $scope.$apply();
  };

  $scope.filterStuff = function() {
    $scope.addFilter('kotlin');
    $scope.addFilter('haskell');
    $scope.addFilter('gae');
    $scope.addFilter('objective-c');
    $scope.addFilter('dart');
    $scope.addFilter('f#');
    $scope.addFilter('raspberry pi');
    $scope.addFilter('windows phone');
    $scope.addFilter('elm');
    $scope.addFilter('mahout');
    $scope.addFilter('shark');
    $scope.addFilter('c#');
    $scope.addFilter('smalltalk');
    $scope.addFilter('elixir');
    $scope.addFilter('visual basic');
    $scope.addFilter('rust');
    $scope.addFilter('pl/sql');
    $scope.addFilter('d3.js');
    $scope.addFilter('spss');
    $scope.addFilter('arrays');
    $scope.addFilter('sql server');
    $scope.addFilter('regex');
$scope.addFilter('string');
$scope.addFilter('fortran');
$scope.addFilter('delphi');
$scope.addFilter('lua');
$scope.addFilter('coffeescript');
$scope.addFilter('d3');
$scope.addFilter('clojure');
$scope.addFilter('oozie');
$scope.addFilter('coldfusion');
$scope.addFilter('groovy');
$scope.addFilter('zookeeper');
$scope.addFilter('erlang');
$scope.addFilter('salesforce');
$scope.addFilter('cordova');
$scope.addFilter('abap');
$scope.addFilter('drupal');
$scope.addFilter('sharepoint');
$scope.addFilter('lamp');
$scope.addFilter('flume');
$scope.addFilter('tableau');
$scope.addFilter('typescript');
$scope.addFilter('vba');
$scope.addFilter('sas');
$scope.addFilter('bash');
$scope.addFilter('powershell');
$scope.addFilter('elasticsearch');
$scope.addFilter('wordpress');
$scope.addFilter('pig');
$scope.addFilter('redis');
$scope.addFilter('django');
$scope.addFilter('postgresql');
$scope.addFilter('matlab');
$scope.addFilter('swift');
$scope.addFilter('perl');
$scope.addFilter('excel');
$scope.addFilter('php');
$scope.addFilter('hive');
$scope.addFilter('azure');
$scope.addFilter('mapreduce');
$scope.addFilter('scala');
$scope.addFilter('r');
$scope.addFilter('asp.net');
$scope.addFilter('cassandra');
$scope.addFilter('rails');
$scope.addFilter('spark');
$scope.addFilter('mongodb');
$scope.addFilter('node.js');
$scope.addFilter('react');
$scope.addFilter('ruby');
$scope.addFilter('hadoop');
  };

  $scope.update = function () {
    var data = $scope.master[$scope.selected_location];

    if (data && $scope.hasFilters) {
      $scope.drawChords(data.filter(function (d) {
        var fl = $scope.filters;
        var v1 = d.skill1, v2 = d.skill2;

        if ((fl[v1] && fl[v1].hide) || (fl[v2] && fl[v2].hide)) {
          return false;
        }
        return true;
      }));
    } else if (data) {
      $scope.drawChords(data);
    }
  };

  // IMPORT THE CSV DATA
  d3.csv('/static/data/skills.csv', function (err, data) {

    data.forEach(function (d) {
      d.flow1 = +d.postings;
      d.flow2 = +d.postings;

      if (!$scope.master[d.location]) {
        $scope.master[d.location] = [];
      }
      $scope.master[d.location].push(d);
    })
    $scope.update();
  });

  $scope.$watch('selected_location', $scope.update);
  $scope.$watch('filters', $scope.update, true);

}]);
