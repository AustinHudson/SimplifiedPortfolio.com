import FragmentArrayTransform from 'ember-data-model-fragments/transforms/fragment-array';
import { isNone } from 'ember-utils';

export default FragmentArrayTransform.extend({
  deserialize(serialized) {
    if (isNone(serialized)) {
      return this._super([]);
    }

    return this._super(serialized);
  }
});