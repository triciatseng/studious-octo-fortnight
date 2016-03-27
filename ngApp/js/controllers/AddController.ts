namespace app.Controllers{
  export class AddController{
    public item: app.i.IWish;

    public create(){
      this.WishService.create(this.item).then((res) => {
        this.$state.go('Home');
      });
    }

    constructor(private WishService: app.Services.WishService, private $state: ng.ui.IStateService){}
  }
  angular.module('app').controller('AddController', AddController);
}
