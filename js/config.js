export function config($stateProvider) {
  const main = {
    url: '/',
    templateUrl: '../template/main.html',
    controller: 'MainCtrl'
  }
  $stateProvider.state('app',main);
}
  
config.$inject = ['$stateProvider'];