/* eslint-env amd */

define([
  'common/modules/models',
  'common/models/model',
  'common/services/api/option-group'
], function (models) {
  'use strict';

  models.factory('OptionGroup', [
    'Model', 'api.optionGroup',
    function (Model, optionGroupAPI) {
      return Model.extend({

        /**
         * Returns the values of a sigle or multiple option groups
         *
         * @param  {String|Array} names
         *   Bases on the type of the parameter, the method will return
         *   either an array of values (string) or an object (array)
         * @param  {Boolean} [cache] parameter to cache the query or not
         * @return {Promise}
         */
        valuesOf: function (names, cache) {
          return optionGroupAPI.valuesOf(names, cache);
        }
      });
    }
  ]);
});
