var userData;
addLoremIpsum();
getData();


function addLoremIpsum() {
  var container = document.getElementById('lorem-ipsum');
  container.innerHTML = container.innerHTML + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius ipsum purus, a laoreet purus pulvinar quis. Sed rhoncus ipsum vel neque accumsan, ut imperdiet ligula ornare. Morbi rhoncus efficitur ex sit amet varius. Mauris suscipit libero purus, vitae molestie nibh ornare id. Duis nec pellentesque ipsum. In fermentum quis lorem et finibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec at ornare eros.</br></br>'
}

function getData() {
  $.ajax({
    url: 'data.json'
  })
    .then(function(data){
      userData = data.concat(data).concat(data).concat(data).concat(data).concat(data).concat(data)
        .concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data)
        .concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data)
        .concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data)
        .concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data)
        .concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data)
        .concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data)
        .concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data)
        .concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data)
        .concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data)
        .concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data)
        .concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data)
        .concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data)
        .concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data)
        .concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data);
    });
}

/**
 * Get counts of the data
 * @param data
 * @returns {Object} counts - The counts of the data
 * @returns {number} counts.total - Total number of people
 * @returns {number} counts.gender.male - Number of Males
 * @returns {number} counts.gender.female - Number of Females
 * @returns {number} counts.age.thirteenToEighteen - Number of people between 13 and 18
 * @returns {number} counts.age.eighteenToThirtyFour - Number of people between 18 and 34
 * @returns {number} counts.age.thirtyFourToFiftyFive - Number of people between 34 and 55
 * @returns {number} counts.age.fiftyFiveAndAbove - Number of people after 55 and above
 * @returns {Object} counts.tags -  Counts of all tags where key is tag name
 */
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

function startComputation() {
  window.performance.mark('mark_computation_started');
  console.log(getCounts(userData));
  window.performance.mark('mark_computation_completed');
  window.performance.measure('measure_computation', 'mark_computation_started', 'mark_computation_completed');
}
function startComputationWithWorker() {
  var worker = new Worker('worker.js');
  worker.addEventListener('message', function(e) {
    console.log(e.data);
  }, false);
  worker.postMessage({ command: 'getCounts', parameter: userData})
}