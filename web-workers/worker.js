self.addEventListener('message', function(e) {
  var data = e.data;
  switch (data.command) {
    case 'getCounts':
      var counts = getCounts(data.parameter);
      self.postMessage(counts);
      break;
  }
});
function getCounts(data){
  var tagsCount = {};
  data.forEach(function(datum){
    datum.tags.forEach(function(tag){
      tagsCount[tag] ? tagsCount[tag]++ : tagsCount[tag] = 1;
    })
  });
  return {
    total: data.length,
    gender: {
      male: data.filter(function(datum){
        return datum.gender.toLowerCase() === 'male';
      }).length,
      female: data.filter(function(datum){
        return datum.gender.toLowerCase() === 'female';
      }).length
    },
    age: {
      thirteenToEighteen: data.filter(function(datum){
        return datum.age >= 13 && datum.age < 18;
      }).length,
      eighteenToThirtyFour: data.filter(function(datum){
        return datum.age >= 18 && datum.age < 34;
      }).length,
      thirtyFourToFiftyFive: data.filter(function(datum){
        return datum.age >= 34 && datum.age < 55;
      }).length,
      fiftyFiveAndAbove: data.filter(function(datum){
        return datum.age >= 55;
      }).length

    },
    tags: tagsCount
  }
}