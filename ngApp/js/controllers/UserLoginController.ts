namespace app.Controllers{
  export class UserLoginController{
    public user = {};
    public status: {_id: string, name: string, email: string};

    public login() {
      this.UserService.login(this.user).then(() => {
        this.$state.go('Home');
      });
    }

    public logout() {
      this.UserService.logout();
      this.$state.go('Login');
    }

    constructor(private UserService: app.Services.UserService, private $state:ng.ui.IStateService){
      this.status = UserService.status;
    }
  }
  angular.module('app').controller('UserLoginController', UserLoginController);
}
