namespace app.Controllers{
  export class UpdateController{
    public item: app.i.IWish;

    public update() {
    this.WishService.update(this.item).then((res) => {
      this.$state.go('Details', { id: this.item._id });
    });
  }

    constructor(  private WishService: app.Services.WishService,
      private $state: ng.ui.IStateService,
      private $stateParams: ng.ui.IStateParamsService){
        this.item = WishService.getOne( $stateParams['id'] );
      }
  }
  angular.module('app').controller('UpdateController', UpdateController);
}
