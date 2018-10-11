import Controller from '@ember/controller';
import { inject } from '@ember/service'

export default Controller.extend({
    firebaseApp: inject(),
    actions: {
      signUp() {
        const auth = this.get('firebaseApp').auth();
        let controller = this;
        console.log(auth);
        auth.createUserWithEmailAndPassword(this.get('email'), this.get('password')).then((userResponse) => {
            console.log(userResponse);
            alert("Success!");
            controller.set('email', null);
            controller.set('password', null)

            //Create user model instance
             
        }).catch(
            (error) => {
                alert(error);
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
