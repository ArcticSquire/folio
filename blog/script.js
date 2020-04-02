/* Url parameter help: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript */
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('myParam');


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var foo = getParameterByName('foo'); // "lorem"

document.getElementById("dataurl").innerHTML = foo; 



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

var loadFrom = 1; // = Last row 
var loadTo = 5; // from the lastrow

// Get button increment working
/* 
function incrementLoad() {
  var inc = 5;
  var loadFrom = 1 + inc;
  var loadTo = 3 + inc;
        document.getElementById("amount").value = loadFrom;
  init();
    }
    */



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