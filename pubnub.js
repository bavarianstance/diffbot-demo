angular.module('PubNubAngularApp', ["pubnub.angular.service"])
.controller('MyTextCtrl', function($rootScope, $scope, Pubnub) {
  $scope.messages  = [];
  $scope.channel   = 'diffbot-channel';
  if (!$rootScope.initialized) {
    Pubnub.init({
      publishKey: 'pub-c-82d8faf9-8a93-4b06-ad8b-fbd5f794a399',
      subscribeKey: 'sub-c-80a44e3c-7824-11e9-81d5-56c3556875f9',
      ssl:true
    });
    $rootScope.initialized = true;
  }
  var msgCallback = function(payload) {
    $scope.$apply(function() {
      $scope.messages.unshift(payload);
    });
  };
  $scope.publish = function() {
    Pubnub.publish({
      channel: $scope.channel,
      message: {url:$scope.toSend}
    });
    $scope.toSend = "";
  };
  Pubnub.subscribe({ channels: [$scope.channel] });
  Pubnub.addListener({ message: msgCallback });
});