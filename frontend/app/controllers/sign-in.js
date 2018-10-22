import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        signIn(provider) {
          let controller = this;
          this.get('session').open('firebase', {
            provider: provider,
            email: this.get('email') || '',
            password: this.get('password') || '',
          }).then(() => {
            controller.set('email', null);
            controller.set('password', null);
            controller.transitionToRoute('dashboard.home');
          }, (error) => {
            console.log(error);
          });
        }
      } 
});
