namespace app,.Controllers{
  export class DetailsController{

    constructor(private WishService: app.Services.WishService, private $state: ng.ui.IStateService){}
  }
  angular.module('app').controller('DetailsController',DetailsController);
}
