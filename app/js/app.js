/*
 * GLIMMPSE (General Linear Multivariate Model Power and Sample size)
 * Copyright (C) 2013 Regents of the University of Colorado.
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


'use strict';

/*
* Main cbb application module
 */
var cbbApp = angular.module('cbb', ['ui.bootstrap','ngGrid', 'highcharts-ng'])
    .constant('cbbConstants',{
        // debugging flag
        debug: true,

        /*** URIs for web services ***/
        //uriPower: "/power/power",
        //uriSampleSize: "/power/samplesize",
        //uriCIWidth: "/power/ciwidth",
        //uriMatrices: "/power/matrix/html",
        //uriUpload: "/file/upload",
        //uriSave: "/file/save",
        uriParticipant: "/participants",

        /*** Enum names ***/

        // view states
        stateDisabled: "disabled",
        stateBlocked: "blocked",
        stateIncomplete: "incomplete",
        stateComplete: "complete",

        // solution types
        solutionTypePower: "POWER",
        solutionTypeSampleSize: "SAMPLE_SIZE",

        // view types
        viewTypeStudyDesign: "studyDesign",
        viewTypeResults: "results",

        // input mode types
        modeGuided: "GUIDED_MODE",
        modeMatrix: "MATRIX_MODE",

        // hypothesis types
        hypothesisGrandMean: 'GRAND_MEAN',
        hypothesisMainEffect: 'MAIN_EFFECT',
        hypothesisTrend: 'TREND',
        hypothesisInteraction: 'INTERACTION',

        // trend types
        trendNone: 'NONE',
        trendChangeFromBaseline: 'CHANGE_FROM_BASELINE',
        trendAllPolynomial: 'ALL_POLYNOMIAL',
        trendLinear: 'LINEAR',
        trendQuadratic: 'QUADRATIC',
        trendCubic: 'CUBIC',

        // statistical tests
        testHotellingLawleyTrace: "HLT",
        testWilksLambda: "WL",
        testPillaiBartlettTrace: "PBT",
        testUnirep: "UNIREP",
        testUnirepBox: "UNIREPBOX",
        testUnirepGG: "UNIREPGG",
        testUnirepHF: "UNIREPHF",

        // power methods
        powerMethodUnconditional: "UNCONDITIONAL",
        powerMethodQuantile: "QUANTILE",

        // matrix names
        matrixXEssence: "design",
        matrixBeta: "beta",
        matrixBetaRandom: "betaRandom",
        matrixBetweenContrast: "betweenSubjectContrast",
        matrixBetweenContrastRandom: "betweenSubjectContrastRandom",
        matrixWithinContrast: "withinSubjectContrast",
        matrixSigmaE: "sigmaError",
        matrixSigmaY: "sigmaOutcome",
        matrixSigmaG: "sigmaGaussianRandom",
        matrixSigmaYG: "sigmaOutcomeGaussianRandom",
        matrixThetaNull: "thetaNull",

        // dimension names derived from linear model theory.
        // ensures that default matrix dimensions conform properly
        matrixDefaultN: 2,
        matrixDefaultQ: 2,
        matrixDefaultP: 1,
        matrixDefaultA: 1,
        matrixDefaultB: 1,

        // plot axis names
        xAxisTotalSampleSize: "TOTAL_SAMPLE_SIZE",
        xAxisBetaScale: "VARIABILITY SCALE FACTOR",
        xAxisSigmaScale: "REGRESSION_COEEFICIENT_SCALE_FACTOR"

    })
    .config(['$routeProvider', function($routeProvider) {
        /*
        * Main route provider for the study design tab
         */
        $routeProvider



            .when('/home',
            {templateUrl: 'partials/home.html'}
        )
            .when('/login',
            {templateUrl: 'partials/loginView.html', controller: 'participantsController' }
        )
            .when('/signUp',
            {templateUrl: 'partials/signUpView.html', controller: 'participantsController' }
        )
            .when('/home',
            {templateUrl: 'partials/home.html'}
        )
            .when('/facebook',
            {templateUrl: 'partials/facebookView.html', controller: 'solutionTypeController' }
        )
            .when('/youtube',
            {templateUrl: 'partials/youtubeView.html', controller: 'nominalPowerController' }
        )
            .when('/text',
            {templateUrl: 'partials/textView.html', controller: 'contactInfoController' }
        )
            .when('/tutorial',
            {templateUrl: 'partials/tutorialView.html', controller: 'predictorsController' }
        )
            .when('/aboutUs',
            {templateUrl: 'partials/aboutUsView.html', controller: 'covariatesController' }
        )

            // contact us screens
            .when('/feedback',
            {templateUrl: 'partials/feedbackView.html', controller: 'feedbackController' }

        )

            .when('/contactInfo',
            {templateUrl: 'partials/contactInfoView.html', controller: 'contactInfoController' }

        )




            .when('/spanish/login',
            {templateUrl: 'partials/spanish/loginView.html', controller: 'participantsSpanishController' }
        )
            .when('/spanish/signUp',
            {templateUrl: 'partials/spanish/signUpView.html', controller: 'participantsSpanishController' }
        )
            .when('/spanish/home',
            {templateUrl: 'partials/spanish/home.html'}
        )
            .when('/spanish/facebook',
            {templateUrl: 'partials/spanish/facebookView.html', controller: 'solutionTypeController' }
        )
            .when('/spanish/youtube',
            {templateUrl: 'partials/spanish/youtubeView.html', controller: 'nominalPowerController' }
        )
            .when('/spanish/text',
            {templateUrl: 'partials/spanish/textView.html', controller: 'contactInfoSpanishController' }
        )
            .when('/spanish/tutorial',
            {templateUrl: 'partials/spanish/tutorialView.html', controller: 'predictorsController' }
        )
            .when('/spanish/aboutUs',
            {templateUrl: 'partials/spanish/aboutUsView.html', controller: 'covariatesController' }
        )

            // contact us screens
            .when('/spanish/feedback',
            {templateUrl: 'partials/spanish/feedbackView.html', controller: 'feedbackController' }

        )

            .when('/spanish/contactInfo',
            {templateUrl: 'partials/spanish/contactInfoView.html', controller: 'contactInfoController' }

        )

            .otherwise({ redirectTo: '/' });
    }]);



