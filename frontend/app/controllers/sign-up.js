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
                followed_stocks: [],
                positions: [],
                closed_positions: [],
                
            });
            console.log(newUser);
            newUser.save();

            controller.transitionToRoute('sign-in');


        }).catch(
            (e) => {
                alert(e.error);
                controller.set('email', null);
                controller.set('password', null);
            }
        );
      }
    }
});
