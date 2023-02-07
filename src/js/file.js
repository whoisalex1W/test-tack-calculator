window.onload = function (e) {
  changeData();
  changeRange();
};

function changeData() {
  //get all needed data
  var ranges = document.getElementsByClassName("range");
  var storageRange = document.getElementById("volume");
  var transferRange = document.getElementById("transfer");
  var prices = document.getElementsByClassName("under-range__price");
  //counting price due to plan
  for (let index = 0; index < prices.length; index++) {
    let storageValue = 0;
    let transferValue = 0;
    switch (index) {
      case 0:
        storageValue = 0.005;
        transferValue = 0.01;
        let sum1 = (
          storageRange.value * storageValue +
          transferRange.value * transferValue
        ).toFixed(2);
        prices[index].innerHTML = `${sum1 >= 7 ? sum1 : 7}`;
        break;
      case 1:
        storageValue = document.getElementById("bunny-radio-hdd").checked
          ? document.getElementById("bunny-radio-hdd").value
          : document.getElementById("bunny-radio-ssd").value;
        transferValue = 0.01;
        let sum2 = (
          storageRange.value * storageValue +
          transferRange.value * transferValue
        ).toFixed(2);
        prices[index].innerHTML = sum2 <= 10 ? `${sum2}` : "10.00";
        break;
      case 2:
        if(storageRange.value > 75) {
          storageValue = document.getElementById("scaleway-radio-multi").checked
          ? document.getElementById("scaleway-radio-multi").value
          : document.getElementById("scaleway-radio-single").value;
        }
        transferValue = transferRange.value <= 75 ? 0 : 0.02;
        
        let sum3 =
          (storageRange.value * storageValue + transferRange.value * transferValue);
        sum3 = (sum3 - 100 * storageValue).toFixed(2);
        prices[index].innerHTML = sum3 <= 0 ? "0" : `${sum3}`;
        break;
      case 3:
        storageValue = 0.01;
        transferValue = 0.01;
        let sum4 = (
          storageRange.value * storageValue +
          transferRange.value * transferValue
        ).toFixed(2);
        prices[index].innerHTML = sum4 >= 5 ? `${sum4}` : "5";
        break;
      default:
        break;
    }
  }
  //sorting array to color min subscription
  let sortedRanges = Array.from(ranges);
  sortedRanges.sort((nodeA, nodeB) => {
    return parseFloat(nodeA.style.width) - parseFloat(nodeB.style.width);
  });
  //add and remove color of min subscription
  for (let index = 0; index < sortedRanges.length; index++) {
    index === 0
      ? addColor(sortedRanges[index])
      : removeColor(sortedRanges[index]);
  }

  var volume = document.getElementById("volume");
  var transfer = document.getElementById("transfer");

  for (let index = 0; index < ranges.length; index++) {
    ranges[index].style.width = `${
      prices[index].innerHTML * 5
    }px`;
  }
  document.getElementById("input-volume").value = `${volume.value}`;
  document.getElementById("input-transfer").value = `${transfer.value}`;
}

function changeRange(str) {
  document.getElementById(str).value = document.getElementById(
    `input-${str}`
  ).value;
}

function addColor(element) {
  switch (element.id.slice(-1)) {
    case "1":
      element.style.backgroundColor = "red";
      break;
    case "2":
      element.style.backgroundColor = "orange";
      break;
    case "3":
      element.style.backgroundColor = "purple";
      break;
    case "4":
      element.style.backgroundColor = "blue";
      break;
    default:
      break;
  }
}

function removeColor(element) {
  element.style.backgroundColor = "";
}

function minWidth(array) {
  let minWidth = array[0].style.width;
  let minElement = array[0];
  for (let index = 0; index < array.length; index++) {
    if (
      parseFloat(array[index].style.width.replace("px", "")) <
      parseFloat(minWidth.replace("px", ""))
    ) {
      minWidth = array[index].style.width;
      minElement = array[index];
    }
  }
  return minElement;
}
