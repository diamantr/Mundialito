﻿'use strict';
angular.module('mundialitoApp').controller('GamesCtrl', ['$scope','$log','GamesManager','games','teams','stadiums','Alert',function ($scope,$log, GamesManager, games, teams, stadiums, Alert) {
    $scope.newGame = null;
    $scope.gamesFilter = "All";
    $scope.games = games;
    $scope.teams = teams;
    $scope.stadiums = stadiums;

    $scope.addNewGame = function () {
        $('.selectpicker').selectpicker('refresh');
        $scope.newGame = GamesManager.getEmptyGameObject();
    };

    $scope.saveNewGame = function() {
        GamesManager.addGame($scope.newGame).then(function(data) {
            Alert.new('success', 'Game was added successfully', 2000);
            $scope.newGame = GamesManager.getEmptyGameObject();
            $scope.games.push(data);
        });
    };

    $scope.isPendingUpdate = function() {
        return function( item ) {
            return item.IsPendingUpdate;
        };
    };

    $scope.updateGame = function(game) {
        if  ((angular.isDefined(game.Stadium.Games)) && (game.Stadium.Games != null)) {
            delete game.Stadium.Games;
        }
        game.update().success(function(data) {
            Alert.new('success', 'Game was updated successfully', 2000);
            GamesManager.setGame(data);
        })
    };
}]);