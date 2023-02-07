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
    switch (index) {
      case 0:
        let sum1 = (
          storageRange.value * 0.005 +
          transferRange.value * 0.01
        ).toFixed(2);
        // prices[index].innerHTML = sum1 >= 7 ? `${sum1}$` : "7$";
        prices[index].innerHTML = `${sum1 >= 7 ? sum1 : 7}$` ;
        break;
      case 1:
        let subscriptionBunnyPrice = document.getElementById("bunny-radio-hdd")
          .checked
          ? document.getElementById("bunny-radio-hdd").value
          : document.getElementById("bunny-radio-ssd").value;
        let sum2 = (
          storageRange.value * subscriptionBunnyPrice +
          transferRange.value * 0.01
        ).toFixed(2);
        prices[index].innerHTML = sum2 <= 10 ? `${sum2}$` : "10$";
        break;
      case 2:
        let subscriptionScalewayPrice = document.getElementById(
          "scaleway-radio-multi"
        ).checked
          ? document.getElementById("scaleway-radio-multi").value
          : document.getElementById("scaleway-radio-single").value;
        let sum3 =
          storageRange.value * subscriptionScalewayPrice +
          transferRange.value * 0.02;
        sum3 = (sum3 - 100 * subscriptionScalewayPrice).toFixed(2);
        prices[index].innerHTML = sum3 <= 0 ? "0$" : `${sum3}$`;
        break;
      case 3:
        let sum4 = (
          storageRange.value * 0.01 +
          transferRange.value * 0.01
        ).toFixed(2);
        prices[index].innerHTML = sum4 >= 5 ? `${sum4}$` : "5$";
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
      prices[index].innerHTML.replace("$", "") * 5
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
    case '1':
      element.style.backgroundColor = "red";
      break;
    case '2':
      element.style.backgroundColor = "orange";
      break;
    case '3':
      element.style.backgroundColor = "purple";
      break;
    case '4':
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
  let minIndex = 0;
  let minWidth = array[minIndex].style.width;
  let minElement = array[minIndex];
  for (let index = 0; index < array.length; index++) {
    if (
      parseFloat(array[index].style.width.replace("px", "")) <
      parseFloat(minWidth.replace("px", ""))
    ) {
      minWidth = array[index].style.width;
      minIndex = index;
      minElement = array[index];
    }
  }
  return minElement;
}
