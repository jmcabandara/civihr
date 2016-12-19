define(function () {
  var mockData = {
    allData: {
      "is_error": 0,
      "version": 3,
      "count": 6,
      "values": [
        {
          "id": "17",
          "type_id": "1",
          "contact_id": "202",
          "status_id": "1",
          "from_date": "2016-02-01",
          "from_date_type": "1",
          "to_date": "2016-02-03",
          "to_date_type": "1"
        },
        {
          "id": "18",
          "type_id": "1",
          "contact_id": "202",
          "status_id": "1",
          "from_date": "2016-08-17",
          "from_date_type": "1",
          "to_date": "2016-08-25",
          "to_date_type": "1"
        },
        {
          "id": "19",
          "type_id": "1",
          "contact_id": "202",
          "status_id": "6",
          "from_date": "2016-01-30",
          "from_date_type": "1",
          "to_date": "2016-02-01",
          "to_date_type": "1"
        },
        {
          "id": "20",
          "type_id": "1",
          "contact_id": "202",
          "status_id": "3",
          "from_date": "2016-11-23",
          "from_date_type": "1",
          "to_date": "2016-11-28",
          "to_date_type": "1"
        },
        {
          "id": "21",
          "type_id": "3",
          "contact_id": "202",
          "status_id": "5",
          "from_date": "2016-06-03",
          "from_date_type": "1",
          "to_date": "2016-06-13",
          "to_date_type": "1"
        },
        {
          "id": "22",
          "type_id": "2",
          "contact_id": "202",
          "status_id": "4",
          "from_date": "2016-01-01",
          "from_date_type": "1",
          "to_date": "2016-01-01",
          "to_date_type": "1"
        }
      ]
    },
    singleDataSuccess: {
      "is_error": 0,
      "version": 3,
      "count": 1,
      "values": [
        {
          "id": "17",
          "type_id": "1",
          "contact_id": "202",
          "status_id": "1",
          "from_date": "2016-02-01",
          "from_date_type": "1",
          "to_date": "2016-02-03",
          "to_date_type": "1"
        }
      ]
    },
    singleDataError: {
      "is_error": 1,
      "error_message": jasmine.any(String)
    },
    balanceChangeByAbsenceTypeData: {
      "is_error": 0,
      "version": 3,
      "count": 3,
      "values": {
        "1": -21,
        "2": -1,
        "3": -11
      }
    }
  };
  return {
    all: function () {
      return mockData.allData;
    },
    singleDataSuccess: function () {
      return mockData.singleDataSuccess;
    },
    singleDataError: function () {
      return mockData.singleDataError;
    },
    balanceChangeByAbsenceType: function () {
      return mockData.balanceChangeByAbsenceTypeData;
    }
  }
});