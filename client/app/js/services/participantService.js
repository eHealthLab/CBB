/*
 * Biostat Consultant - a simple CRM / billing tool for academic consultants
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
cbbApp.factory('participantService', function($http, $q, cbbConstants) {
    var participantServiceInstance = {};

    /**
     *  add the participant
     */
    participantServiceInstance.add = function(participant) {
        //Creating a deferred object
        var deferred = $q.defer();
        window.alert("inside service");
        //Calling Web API to fetch shopping cart items
        $http.post('/', angular.toJson(participant)).success(function(data){
             window.alert("success");
            //Passing data to deferred's resolve function on successful completion
            deferred.resolve(data);
        }).error(function(response) {
                window.alert("failure");
                //Sending a friendly error message in case of failure
                deferred.reject(response);
            });

        //Returning the promise object
        return deferred.promise;
    };

    /**
     *  add more functions as appropriate
     */

    return participantServiceInstance;

})

