namespace app.Controllers {
  export class DetailsController {
    public item: app.i.IWish;

    public remove() {
      this.WishService.remove(this.item._id).then(() => {
        this.$state.go('Home');
      });
    }


    constructor(
      private $stateParams: ng.ui.IStateParamsService,
      private $state: ng.ui.IStateService,
      private WishService: app.Services.WishService
    ) {
      this.item = WishService.getOne($stateParams['id']);
    }
  }

  angular.module('app').controller('DetailsController', DetailsController);
}
