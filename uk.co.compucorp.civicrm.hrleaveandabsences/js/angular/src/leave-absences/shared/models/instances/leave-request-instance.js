define([
  'leave-absences/shared/modules/models-instances',
  'common/services/api/option-group',
  'common/models/instances/instance'
], function (instances) {
  'use strict';

  instances.factory('LeaveRequestInstance', [
    'ModelInstance',
    'LeaveRequestAPI',
    'api.optionGroup',
    function (ModelInstance, LeaveRequestAPI, OptionGroup) {

      /**
       * Get ID of an option value
       *
       * @param {string} name - name of the option value
       * @return {Promise} Resolved with {Object} Specific leave request
       */
      function getOptionIDByName(name) {
        return OptionGroup.valuesOf('hrleaveandabsences_leave_request_status')
          .then(function (data) {
            return data.find(function (statusObj) {
              return statusObj.name === name;
            })
          })
      }

      return ModelInstance.extend({

        /**
         * Cancel a leave request
         */
        cancel: function () {
          return getOptionIDByName('cancelled')
            .then(function (cancelledStatusId) {
              return this.update({
                'status_id': cancelledStatusId.value
              });
            }.bind(this))
            .then(function (data) {
              if (data.is_error === 1) {
                return data;
              }
              this.status_id = data.values[0].status_id;
            }.bind(this));
        },

        /**
         * Update a leave request
         *
         * @return {Promise} Resolved with {Object} Updated Leave request
         */
        update: function () {
          return LeaveRequestAPI.update(this.attributes());
        },

        /**
         * Create a new leave request
         *
         * @return {Promise} Resolved with {Object} Created Leave request with
         *  newly created id for this instance
         */
        create: function (attributes) {
          return LeaveRequestAPI.create(this.attributes())
            .then(function(result){
              this.attributes = _.assign({}, this.attributes(), result);
            }.bind(this));
        },

        /**
         * Validate leave request instance attributes.
         *
         * @return {Promise} empty array if no error found otherwise an object
         *  with is_error set and array of errors
         */
        isValid: function () {
          return LeaveRequestAPI.isValid(this.attributes());
        }
      });
    }
  ]);
});
