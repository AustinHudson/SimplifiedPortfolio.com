import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';
import { inject } from '@ember/service'

export default ToriiFirebaseAdapter.extend({
  firebase: inject()
});