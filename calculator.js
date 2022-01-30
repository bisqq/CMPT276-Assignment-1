const addActivity = document.getElementsByClassName("ButtonAddAcitivity")[0];
const mean = document.getElementsByClassName("ButtonMean")[0];
const weigh = document.getElementsByClassName("ButtonWeighted")[0];

let count = 4;
addActivity.addEventListener("click", function addRow(e) {
    e.preventDefault();
    count += 1;
    
    let row = document.createElement("tbody");
    row.innerHTML = `
      <tr>
        <td>Activity` + count + `</td>
        <td>A` + count + `</td>
        <td><input class = "TextField" type="number" oninput="validity.valid||(value='');" min="0" name="nameWeight"></td>
        <td>
        <input class = "TextField" type="number" oninput="validity.valid||(value='');" min="0" name="fname" onkeyup = "calculatePercentage()">
        <label class = "LabelSize">/</label>
        <input class = "TextField" type="number" oninput="validity.valid||(value='');" min="0" name="lname" onkeyup = "calculatePercentage()">
        </td>
        <td>
          <h3 class = "headerThree" id = "percent-` + count + `"></h3>
        </td>
      </tr>
      `;

      document.querySelector("table").appendChild(row);

  });


  mean.addEventListener("click", function calculateMean(e) {
    e.preventDefault();

    let firstValueEl = document.getElementsByName("fname");
    let SecondValueEl = document.getElementsByName("lname");
    let displayResult = document.getElementsByClassName("ResultText")[0];

    let meanValue = Number(0);
    let fraction = Number(0);
    let countEmpty = Number(0);

    for (let i = 0; i < firstValueEl.length; i++) {

      if (firstValueEl[i].value != "" && SecondValueEl[i].value != "") {
        fraction += Number(firstValueEl[i].value / SecondValueEl[i].value);
      
      } else if (firstValueEl[i].value == "" && SecondValueEl[i].value == "") {
        fraction += Number(0);
        countEmpty += Number(1);

      } else if (firstValueEl[i].value == "" || SecondValueEl[i].value == "") {
        alert("Some fields are empty, so your grade might not be calculated properly");
        return;
      }
    }

    meanValue = Number(fraction) / Number(firstValueEl.length - countEmpty);
    
    if (isNaN(meanValue)) { 
      meanValue = Number(0);
    }

    displayResult.innerHTML = `Your grade is: ` + Number(meanValue * 100).toFixed(2) + `%`;

  });

  weigh.addEventListener("click", function calculateWeighted(e) {
    e.preventDefault();

    let firstValueEl = document.getElementsByName("fname");
    let SecondValueEl = document.getElementsByName("lname");
    let thirdValueEl = document.getElementsByName("nameWeight");
    let displayResult = document.getElementsByClassName("ResultText")[0];
    

    let weighValue = Number(0);
    let fraction = Number(0);
    let totalWeigh = Number(0);

    for (let i = 0; i < firstValueEl.length; i++) {


      if (firstValueEl[i].value != "" && SecondValueEl[i].value != "" && thirdValueEl[i].value != "") {
        fraction += Number(firstValueEl[i].value / SecondValueEl[i].value) * Number(thirdValueEl[i].value);
        totalWeigh += Number(thirdValueEl[i].value);
      
      } else if (firstValueEl[i].value == "" && SecondValueEl[i].value == "" && thirdValueEl[i].value == "") {
        fraction += Number(0);

      } else if (firstValueEl[i].value == "" || SecondValueEl[i].value == "" || thirdValueEl[i].value == "") {
        alert("Some fields are empty, so your grade might not be calculated properly");
        return;
      }
    }

    weighValue = Number(fraction) / Number(totalWeigh);

    if (isNaN(weighValue)) { 
      weighValue = Number(0);
    }

    displayResult.innerHTML = `Your grade is: ` + Number(weighValue * 100).toFixed(2) + `%`;

  });

 function calculatePercentage() {

    let firstValueEl = document.getElementsByName("fname");
    let SecondValueEl = document.getElementsByName("lname");
    let result = Number(0);

    for (let i = 0; i < firstValueEl.length; i++) {

      if (firstValueEl[i].value != "" && SecondValueEl[i].value != "") {
        result = Number(Number(firstValueEl[i].value) /  Number(SecondValueEl[i].value) * 100).toFixed(2);
        document.getElementById("percent-" + (i+1)).innerHTML = result + `%`;

      } else {
        document.getElementById("percent-" + (i+1)).innerHTML = ``;
      }
    }

  }