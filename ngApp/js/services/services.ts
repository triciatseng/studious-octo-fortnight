namespace app.Services {
  interface IWishResource extends ng.resource.IResource<IWishResource>, app.i.IWish{}
  interface IWishClass extends ng.resource.IResourceClass<IWishResource> {}

  export class WishService {
    private WishResource: IWishClass;

    public getAll(){
      return this.WishResource.query();
    }

    public create(item:app.i.IWish){
      return this.WishResource.save(item).$promise;
    }

    constructor(private $resource: ng.resource.IResourceService){
      this.WishResource = <IWishClass>$resource('api/v1/wishlist/:id');
    }
  }
  angular.module('app').service('WishService', WishService);
}
