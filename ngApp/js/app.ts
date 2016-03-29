'use strict';
namespace app {
  angular.module('app', ['ui.router', 'ngResource', 'ui.bootstrap'])
    .config((
    $stateProvider: ng.ui.IStateProvider,
    $locationProvider: ng.ILocationProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider) => {

    $stateProvider.state('Home', {
      url: '/',
      templateUrl: '/templates/home.html',
      controller: app.Controllers.HomeController,
      controllerAs: 'vm'
    }).state('Add', {
      url: '/+',
      templateUrl: '/templates/add.html',
      controller: 'AddController',
      controllerAs: 'vm'
    }).state('Details',{
      url:'/details/:id',
      templateUrl: '/templates/details.html',
      controller: 'DetailsController',
      controllerAs: 'vm'
    }).state('Update',{
      url:'/update/:id',
      templateUrl: '/templates/update.html',
      controller: 'UpdateController',
      controllerAs: 'vm'
    });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  });
}
