
console.log( 'js sourced' );
var myApp=angular.module( 'myApp', [] );

//set controller
myApp.controller( 'heroesController', ['$scope', '$http', function( $scope, $http ){

  var displayHeroes = function(){
    console.log( 'inside displayHeroes function' );
    $http({
        method: 'GET',
        url: ('/getHero'),
    }).then(function ( response ) {
              $scope.heroArray = response.data;
              console.log( 'in displayHeroes call, $scope.heroArray: '+ $scope.heroArray );
            });
          };//end displayHeroes
  //don't forget to call displayHeroes
  displayHeroes();

//make empty array to put hero list in
var heroArray=[];
//--------------------------------------------------------------------------
//add hero function
  $scope.addHero = function(){
    //creates object to hold all the properties of the hero
    var heroAdded = {
      'alias': $scope.aliasModel,
      'first_name': $scope.first_name_model,
      'last_name': $scope.last_name_model,
      'city': $scope.cityModel,
      'power_name': $scope.power_name_model
    };
    console.log( 'heroAdded:  ' + heroAdded.alias + heroAdded.power_name );
  $http({
          method: 'POST',
          url: ('/addHero'),
          data: heroAdded
        });
        //end of http post call
        $scope.alias='';
        $scope.first_name='';
        $scope.last_name='';
        $scope.city='';
        $scope.power_name='';
        displayHeroes();
      };//end of addHero Function
//--------------------------------------------------------------------------

$scope.removeRow = function( index  ){
  console.log( 'inside remove row' );
  var deletedHero = $scope.heroArray[index];
  var heroId = {id: deletedHero._id};
    console.log( 'inside remove, deletedHero: '+ deletedHero.alias );
    // var deletedHeroId = deletedHero._id;
    console.log( 'inside remove, deletedHeroId: ' + heroId._id);
  $http({
    method: 'POST',
    url: '/henryStrikesAgain',
    data: heroId
  }).then(displayHeroes());
  $scope.heroArray.splice( index, 1 );
};
// henryStrikesAgain
}]);//end of herosController
