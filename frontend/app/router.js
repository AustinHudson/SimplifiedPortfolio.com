import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('sign-up');
  this.route('sign-in');
  // this.authenticatedRoute('dashboard');
  this.route('users');

  this.authenticatedRoute('dashboard', function() {
    this.route('home');
    this.route('news');
    this.route('research', function() {
      this.route('profile');
      this.route('chart');
      this.route('financials');
      this.route('technicalIndicators');
      this.route('key-statistics');
    });
  });
});

export default Router;
