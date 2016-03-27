namespace app.Controllers {
  export class HomeController {
    public wishlist: Array<app.i.IWish>;

    constructor(private WishService: app.Services.WishService) {
      this.wishlist = WishService.getAll();
    }
  }

  angular.module('app').controller('HomeController', HomeController);
}
