/*
 * Biostat client - a simple CRM / billing tool for academic clients
 * Copyright (C) 2013 Sarah Kreidler.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

/**
 * Service managing the study design object
 * Currently resides fully on the client side
 */
cbbApp.factory('clientService', function($http, $q, consultConstants) {
    var clientServiceInstance = {};

    /**
     *  add the client
     */
    clientServiceInstance.getAll = function() {
        //Creating a deferred object
        var deferred = $q.defer();

        //Calling Web API to fetch shopping cart items
        $http.get(consultConstants.uriClient).success(function(data){
            //Passing data to deferred's resolve function on successful completion
            deferred.resolve(data);
        }).error(function(response) {
                //Sending a friendly error message in case of failure
                deferred.reject(response);
            });

        //Returning the promise object
        return deferred.promise;
    };

    /**
     *  add the client
     */
    clientServiceInstance.getById = function(id) {
        //Creating a deferred object
        var deferred = $q.defer();

        //Calling Web API to fetch shopping cart items
        $http.get(consultConstants.uriClient + "/" + id).success(function(data){
            //Passing data to deferred's resolve function on successful completion
            deferred.resolve(data);
        }).error(function(response) {
                //Sending a friendly error message in case of failure
                deferred.reject(response);
            });

        //Returning the promise object
        return deferred.promise;
    };

    /**
     *  add the client
     */
    clientServiceInstance.add = function(client) {
        //Creating a deferred object
        var deferred = $q.defer();

        //Calling Web API to fetch shopping cart items
        $http.post(consultConstants.uriClient, angular.toJson(client)).success(function(data){
            //Passing data to deferred's resolve function on successful completion
            deferred.resolve(data);
        }).error(function(response) {
                //Sending a friendly error message in case of failure
                deferred.reject(response);
            });

        //Returning the promise object
        return deferred.promise;
    };

    /**
     *  update the client
     */
    clientServiceInstance.update = function(client) {
        //Creating a deferred object
        var deferred = $q.defer();

        var copy = {
            name: client.name,
            title: client.title,
            email: client.email,
            speedtype: client.speedtype,
            office: client.office,
            address: client.address,
            phone: client.phone,
            pager: client.pager,
            fax: client.fax,
            notes: client.notes
        };

        //Calling Web API to fetch shopping cart items
        $http.put(consultConstants.uriClient + "/" + client._id, angular.toJson(copy)).success(function(data){
            //Passing data to deferred's resolve function on successful completion
            deferred.resolve(data);
        }).error(function(response) {
                //Sending a friendly error message in case of failure
                deferred.reject(response);
            });

        //Returning the promise object
        return deferred.promise;
    };

    /**
     *  update the client
     */
    clientServiceInstance.delete = function(client) {
        //Creating a deferred object
        var deferred = $q.defer();

        //Calling Web API to fetch shopping cart items
        $http.delete(consultConstants.uriClient + "/" + client._id).success(function(data){
            //Passing data to deferred's resolve function on successful completion
            deferred.resolve(data);
        }).error(function(response) {
                //Sending a friendly error message in case of failure
                deferred.reject(response);
            });

        //Returning the promise object
        return deferred.promise;
    };

    return clientServiceInstance;

});

