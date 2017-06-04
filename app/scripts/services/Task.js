(function() {
  function Task($firebaseArray) {
    var Task = {};

    var ref = firebase.database().ref().child("tasks");
    var tasks = $firebaseArray(ref);

    // local functions
    var getIndex = function(id) {
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].$id == id) {
          return i;
        }
      }
    };

    var moveOtherElement = function(index, direction) {
      var myRank = tasks[index].rank;
      var myContent = tasks[index].content;
      for (var i = 0; i < tasks.length; i++) {
        if ((tasks[i].rank == myRank) && (tasks[i].content != myContent)) {
          direction == 'up' ? tasks[i].rank++ : tasks[i].rank--;
          tasks.$save(i);
          break;
        }
      }
    };


    // global functions
    Task.getTasks = function() {
      return tasks;
    };

    Task.addTask = function(item) {
      tasks.$add({
        'content': item,
        'rank': tasks.length,
        'created_at': firebase.database.ServerValue.TIMESTAMP
      });
    };

    Task.deleteTask = function(id) {
      var index = getIndex(id);
      tasks.$remove(index);
    };

    Task.minusIndex = function(id) {
      var index = getIndex(id);
      tasks[index].rank--;
      tasks.$save(index);
      moveOtherElement(index, 'up');
    };

    Task.plusIndex = function(id) {
      var index = getIndex(id);
      tasks[index].rank++;
      tasks.$save(index);
      moveOtherElement(index, 'down');
    };

    Task.getAge = function(id) {
      console.log('in Task');
      var index = getIndex(id),
          now = Date.now(),
          then = tasks[index].created_at,
          ageRange = 604800000, // seven days
          currentAge = now - then;

      console.log(currentAge);

      if (currentAge > ageRange) {
        console.log(true);
        return true;
      } else {
        return false;
      }
    };

    return Task;
  }

  angular
    .module('blocitoff')
    .factory('Task', ['$firebaseArray', Task]);
})();
