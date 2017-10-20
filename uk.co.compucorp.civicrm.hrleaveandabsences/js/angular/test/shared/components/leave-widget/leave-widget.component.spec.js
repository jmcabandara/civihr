/* eslint-env amd, jasmine */

define([
  'common/lodash',
  'leave-absences/shared/components/leave-widget/leave-widget.component',
  'mocks/apis/absence-period-api-mock',
  'mocks/apis/absence-type-api-mock'
], function (_) {
  describe('LeaveWidget', function () {
    var $componentController, $provide, $rootScope, $scope, AbsencePeriod,
      AbsenceType, ctrl, OptionGroup;

    beforeEach(module('common.mocks', 'leave-absences.components.leave-widget',
    'leave-absences.mocks', function (_$provide_) {
      $provide = _$provide_;
    }));

    beforeEach(inject(function (AbsencePeriodAPIMock,
    AbsenceTypeAPIMock, OptionGroupAPIMock) {
      $provide.value('AbsencePeriodAPI', AbsencePeriodAPIMock);
      $provide.value('AbsenceTypeAPI', AbsenceTypeAPIMock);
      $provide.value('OptionGroup', OptionGroupAPIMock);
    }));

    beforeEach(inject(function (_$componentController_, $q, _$rootScope_,
    _AbsencePeriod_, _AbsenceType_, _OptionGroup_) {
      $componentController = _$componentController_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      AbsencePeriod = _AbsencePeriod_;
      AbsenceType = _AbsenceType_;
      OptionGroup = _OptionGroup_;

      spyOn($scope, '$on').and.callThrough();
      spyOn(AbsencePeriod, 'all').and.callThrough();
      spyOn(AbsenceType, 'all').and.callThrough();
      spyOn(OptionGroup, 'valuesOf').and.callThrough();
    }));

    beforeEach(function () {
      ctrl = $componentController('leaveWidget', {
        $scope: $scope
      });
    });

    it('should be defined', function () {
      expect(ctrl).toBeDefined();
    });

    describe('on init', function () {
      it('sets loading child components to false', function () {
        expect(ctrl.loading.childComponents).toBe(false);
      });

      it('sets loading component to true', function () {
        expect(ctrl.loading.component).toBe(true);
      });

      it('sets absence types equal to an empty array', function () {
        expect(ctrl.absenceTypes).toEqual([]);
      });

      it('sets current absence period to null', function () {
        expect(ctrl.currentAbsencePeriod).toBe(null);
      });

      it('sets sickness absence types equal to an empty array', function () {
        expect(ctrl.sicknessAbsenceTypes).toEqual([]);
      });

      it('sets leave request statuses equal to an empty array', function () {
        expect(ctrl.leaveRequestStatuses).toEqual([]);
      });

      it('watches for child components loading and ready events', function () {
        expect($scope.$on).toHaveBeenCalledWith(
          'LeaveWidget::childIsLoading', jasmine.any(Function));
        expect($scope.$on).toHaveBeenCalledWith(
          'LeaveWidget::childIsReady', jasmine.any(Function));
      });

      describe('child components', function () {
        describe('when child components are loading', function () {
          beforeEach(function () {
            $rootScope.$broadcast('LeaveWidget::childIsLoading');
            $rootScope.$broadcast('LeaveWidget::childIsLoading');
            $rootScope.$broadcast('LeaveWidget::childIsLoading');
          });

          it('sets loading child components to true', function () {
            expect(ctrl.loading.childComponents).toBe(true);
          });

          describe('when a few child components are ready', function () {
            beforeEach(function () {
              $rootScope.$broadcast('LeaveWidget::childIsReady');
              $rootScope.$broadcast('LeaveWidget::childIsReady');
            });

            it('keeps loading child components set to true', function () {
              expect(ctrl.loading.childComponents).toBe(true);
            });

            describe('when all child components are ready', function () {
              beforeEach(function () {
                $rootScope.$broadcast('LeaveWidget::childIsReady');
              });

              it('sets loading child components to false', function () {
                expect(ctrl.loading.childComponents).toBe(false);
              });
            });
          });
        });
      });

      describe('absence types', function () {
        beforeEach(function () {
          $rootScope.$digest();
        });

        it('loads all absence types', function () {
          expect(AbsenceType.all).toHaveBeenCalled();
        });

        describe('after loading all absence types', function () {
          var expectedTypes;
          var expectedSicknessTypes;

          beforeEach(function () {
            AbsenceType.all().then(function (types) {
              expectedTypes = types;
              expectedSicknessTypes = types.filter(function (type) {
                return +type.is_sick;
              });
            });
            $rootScope.$digest();
          });

          it('stores all absence types', function () {
            expect(ctrl.absenceTypes).toEqual(expectedTypes);
          });

          it('stores all sickness absence types', function () {
            expect(ctrl.sicknessAbsenceTypes).toEqual(expectedSicknessTypes);
          });
        });
      });

      describe('current absence period', function () {
        beforeEach(function () { $rootScope.$digest(); });

        it('loads the absence periods', function () {
          expect(AbsencePeriod.all).toHaveBeenCalled();
        });

        describe('after loading all the absence periods', function () {
          var expectedPeriod;

          beforeEach(function () {
            AbsencePeriod.all().then(function (periods) {
              expectedPeriod = _.find(periods, function (period) {
                return period.current;
              });
            });

            $rootScope.$digest();
          });

          it('stores the current one', function () {
            expect(ctrl.currentAbsencePeriod).toEqual(expectedPeriod);
          });
        });
      });

      describe('leave request statuses', function () {
        it('loads the leave requests statuses', function () {
          expect(OptionGroup.valuesOf)
            .toHaveBeenCalledWith('hrleaveandabsences_leave_request_status');
        });

        describe('after loadinv leave request statuses', function () {
          var expectedStatuses;
          var allowedLeaveStatuses = ['approved', 'admin_approved',
            'awaiting_approval', 'more_information_required'];

          beforeEach(function () {
            OptionGroup.valuesOf('hrleaveandabsences_leave_request_status')
              .then(function (statuses) {
                expectedStatuses = statuses.filter(function (status) {
                  return _.includes(allowedLeaveStatuses, status.name);
                });
              });
            $rootScope.$digest();
          });

          it('sotres the leave request statuses', function () {
            expect(ctrl.leaveRequestStatuses).toEqual(expectedStatuses);
          });
        });
      });

      describe('after init', function () {
        beforeEach(function () { $rootScope.$digest(); });

        it('sets loading component to false', function () {
          expect(ctrl.loading.component).toBe(false);
        });
      });
    });
  });
});
