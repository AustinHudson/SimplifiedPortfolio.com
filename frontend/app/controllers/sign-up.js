import Controller from '@ember/controller';
import { inject } from '@ember/service'

export default Controller.extend({
    firebaseApp: inject(),
    actions: {
      signUp() {
        const auth = this.get('firebaseApp').auth();
        let controller = this;
        auth.createUserWithEmailAndPassword(this.get('email'), this.get('password')).then((userResponse) => {
            controller.set('email', null);
            controller.set('password', null);

            console.log(userResponse);
            let newUser = this.store.createRecord('user', {
                id: userResponse.uid,
                name: 'Testing name',
                followed_stocks: ['aapl', 'msft', 'van']
            });
            console.log(newUser);
            newUser.save();

            controller.transitionToRoute('sign-in');

            //Create user model instance


        }).catch(
            (e) => {
                alert(e.error);
                controller.set('email', null);
                controller.set('password', null);
            }
        );
        // auth.createUserWithEmailAndPassword({
        //   email: this.get('email') || '',
        //   password: this.get('password') || '',
        // }, (error, data) => {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     controller.set('email', null);
        //     controller.set('password', null);
        //   }
        // });
      }
    }
});
