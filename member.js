function skillsMember() {
  return {
    restrict: 'E',
    templateUrl: 'templates/directives/skills-member.html',
    scope: {
      member: '='
    }
  };
}