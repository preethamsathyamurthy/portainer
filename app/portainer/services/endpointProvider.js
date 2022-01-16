import _ from 'lodash-es';

/* 
initialize

currentEndpoint
endpoint

endpointID,
setEndpointID


setOfflineModeFromStatus
setOfflineMode
offlineMode

endpoints
setEndpoints


clean

*/

angular.module('portainer.app').factory(
  'EndpointProvider',
  /* @ngInject */
  function EndpointProviderFactory(LocalStorage) {
    'use strict';
    var service = {};
    var endpoint = {};

    service.initialize = function () {
      var endpointID = LocalStorage.getEndpointID();

      if (endpointID) {
        endpoint.ID = endpointID;
      }
    };

    service.clean = function () {
      LocalStorage.cleanEndpointData();
      endpoint = {};
    };

    service.endpoint = function () {
      return endpoint;
    };

    service.endpointID = function () {
      if (endpoint.ID === undefined) {
        endpoint.ID = LocalStorage.getEndpointID();
      }

      return endpoint.ID;
    };

    service.setEndpointID = function (id) {
      endpoint.ID = id;
      LocalStorage.storeEndpointID(id);
    };

    service.endpoints = function () {
      return LocalStorage.getEndpoints();
    };

    service.setEndpoints = function (data) {
      LocalStorage.storeEndpoints(data);
    };

    service.currentEndpoint = function () {
      var endpointId = endpoint.ID;
      var endpoints = LocalStorage.getEndpoints();
      return _.find(endpoints, function (item) {
        return item.Id === endpointId;
      });
    };

    return service;
  }
);
