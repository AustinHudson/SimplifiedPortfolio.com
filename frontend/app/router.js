import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('sign-up');
  this.route('sign-in');
  this.route('users');

  this.authenticatedRoute('dashboard', function() {
    this.route('home');
    this.route('news');
    this.route('research', function() {
      this.route('profile');
      this.route('chart');
      this.route('financials');
      this.route('key-statistics');
      this.route('news');
      this.route('technicalIndicators');
    });
    this.route('portfolio', function() {
      this.route('watchlist', function() {
        this.route('list');
        this.route('grid');
      });
      this.route('current-positions', function() {
        this.route('list');
        this.route('grid');
      });
      this.route('open-position');
      this.route('close-position');
      this.route('gains-losses');
    });
  });
});

  

export default Router;
