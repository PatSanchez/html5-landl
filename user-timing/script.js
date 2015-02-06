//Spits out a table containing 100,000 records in two columns:
// a random letter in the first column
// and a random number 1 - 1,000,000 in the second
function doLotsOfStuff() {
  window.performance.clearMarks();
  window.performance.clearMeasures();
  var randomData = generateRandomData();
  displayData(randomData);
  showPerformanceData();
}

//Returns an array of 100,000 objects containing a letter and number property.
//Letter is a random letter
//Number is a random number between 1 and 1,000,000
function generateRandomData() {
  window.performance.mark('mark_data_generation_started');
  var garbageArray = [];
  for (var i = 0; i < 10000; i++){
    garbageArray.push(
      {
        letter: String.fromCharCode(97 + Math.floor(Math.random() * 26)),
        number: Math.floor(Math.random() * 1000000)
      }
    );
  }
  window.performance.mark('mark_data_generation_completed');
  window.performance.measure('measure_data_generation_completed', 'mark_data_generation_started', 'mark_data_generation_completed');
  return garbageArray;
}

function displayData(data) {
  var table = document.getElementById('inject-garbage-here');
  window.performance.mark('mark_clear_display_started');
  table.innerHTML = '';
  window.performance.mark('mark_clear_display_completed');
  window.performance.mark('mark_data_display_started');
  data.forEach(function(item){
    var tableRow = document.createElement('tr');
    var letterTD = document.createElement('td');
    var numberTD = document.createElement('td');
    letterTD.innerHTML = item.letter;
    numberTD.innerHTML = item.number;
    tableRow.appendChild(letterTD);
    tableRow.appendChild(numberTD);
    table.appendChild(tableRow);
  });
  window.performance.mark('mark_data_display_completed');

  window.performance.measure('measure_clear_display', 'mark_clear_display_started', 'mark_clear_display_completed');
  window.performance.measure('measure_data_display', 'mark_data_display_started', 'mark_data_display_completed');
}

function showPerformanceData() {
  var table = document.getElementById('inject-performance-here');
  table.innerHTML = '';
  var headerRow = document.createElement('tr');
  var nameHeader = document.createElement('th');
  nameHeader.innerHTML = "Name";
  var durationHeader = document.createElement('th');
  durationHeader.innerHtml = "Duration";
  headerRow.appendChild(nameHeader);
  headerRow.appendChild(durationHeader);

  window.performance.getEntriesByType('measure').forEach(function(measure){
    var dataRow, nameTD, durationTD;

    dataRow = document.createElement('tr');

    nameTD = document.createElement('td');
    nameTD.innerHTML = measure.name;

    durationTD = document.createElement('td');
    durationTD.innerHTML = measure.duration.toFixed(3) + "ms";

    dataRow.appendChild(nameTD);
    dataRow.appendChild(durationTD);

    table.appendChild(dataRow);
  });
}