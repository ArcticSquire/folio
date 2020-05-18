
window.onload = function() {

var id;
	
	
function getAllUrlParams(url) {
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  var obj = {};

  if (queryString) {
    queryString = queryString.split('#')[0];
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      var a = arr[i].split('=');
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      if (paramName.match(/\[(\d+)?\]$/)) {
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        if (paramName.match(/\[\d+\]$/)) {
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          obj[key].push(paramValue);
        }
      } else {
        if (!obj[paramName]) {
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string'){
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}
	

/* 
Based on:https://github.com/jsoma/tabletop
Adapted from on: https://css-tricks.com/creating-an-editable-webpage-with-google-spreadsheets-and-tabletop-js/ 
*/
// ==============
// ===TABLETOP===
// ==============

var publicSpreadsheetUrl =
  "https://docs.google.com/spreadsheets/d/1Y-C9Y-5HRr0xphKX8-5qh9VQlb0UzHh37fLKMGGnozo/edit?usp=sharing";

function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: true
  });
}

var id = getAllUrlParams();
var loadFrom = id; // = Last row 
var loadTo = 5; // from the lastrow

	console.log(id);
console.log(loadFrom);
	

function showInfo(data) {
  var loadNum = data.length - (loadTo); //accounts for header being row 1
  
  var html = '<div class="post">';
  for (let i = data.length - (loadFrom); i >= loadNum; --i) {
    // Gets each row (object) by (prop) name. e.g 'header'
    // Changed to dot notation from, var objDate = data[i]["image"];
    var objImage = data[i].image;
    var objHeader = data[i].header;
    var objDate = data[i].date;
    var objBody = data[i].body;
    var objButtonText = data[i].buttonText;
    var objbuttonLink = data[i].buttonLink;

    // ===============
    // ==== Image ====
    // ===============
    // if image prop is empty do nothing
    // Could add another if to add image alt if not empty or use header
    if (objImage.length === 0) {
      // Object is empty
    } else {
      // Create <img>
      html +=
        '<img src="' +
        objImage +
        '" alt="' +
        objHeader +
        '"></img>';
    }

    //Create seerate section for copy
    html += '<div class="copyContainer">';

    // ================
    // ==== Header ====
    // ================
    if (objHeader.length === 0) {
    } else {
      html += "<h1>" + objHeader + "</h1>";
    }

    // ==============
    // ==== date ====
    // ==============
    if (objDate.length === 0) {
    } else {
      html += '<div class="date">' + objDate + "</div>";
    }

    // ==============
    // ==== body ====
    // ==============
    if (objBody.length === 0) {
    } else {
      html += "<p>" + objBody + "</p>";
    }

    // ====================
    // ==== buttonText ====
    // ====================
    if (objButtonText.length === 0) {
    } else {
      html +=
        '<a class="postButton" href="' +
        objbuttonLink +
        '">' +
        objButtonText +
        "</a>";
    }

    // Close 'post' div
    html += '</div></div><div class="post">';
  }
  document.getElementById("blog").innerHTML = html;
}

// call the function
init();
	
	
	
	
}/* window.onload */