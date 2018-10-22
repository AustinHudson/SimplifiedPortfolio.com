import Component from '@ember/component';


export default Component.extend({

    actions: {
        signOut() {
            this.sendAction('signOutAction');
        }
    }
   

});
