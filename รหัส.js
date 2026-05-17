let ss, sheet, lastrow, lastcol, range, values;
var folderID = "10eRkDdnnkJ2PMvRZSN1FrdAC8TAWP9Mh"; //Replace the "root"with folder ID to upload files to a specific folder
var reporttable = "dayReportFoTecher";
var dutygrouptable = "dutygroup";
const days = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัดสบดี", "ศุกข์", "เสาร์"];

function doGet(e) {
  return HtmlService.createTemplateFromFile('index').evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function initSpreadsheet(tablename) {
  ss = SpreadsheetApp.getActiveSpreadsheet();
  sheet = ss.getSheetByName(tablename);
  lastrow = sheet.getLastRow();
  lastcol = sheet.getLastColumn();
  //console.go("lastRow",lastrow,"lastCol",lastcol);
}

function addDataVale(name, department) {
  initSpreadsheet(reporttable);
  sheet.appendRow([new Date, "ข้อความบันทึกประจำวัน"], "ผู้รายงาน", "รูปภาพ");
}

function extracUrl(url) {
  var match = url.match(/([a-zA-Z0-9_-]{25,})/);
  if (match && match.length > 0) {
    return match[0];
  }
  return null;
}

function getReports() {
  initSpreadsheet(reporttable);
  var data = sheet.getDataRange().getValues();
  data.shift(); // remove headers
  var idex = lastrow - 1;
  //Logger.log(idex);
  for (var rowi = 0; rowi < lastrow - 1; rowi++) {
    //Logger.log(data[rowi][1]);
    data[rowi][1] = data[rowi][1].toISOString();
    //Logger.log(data[rowi][1]);
    //Logger.log(data[rowi][7]);
    data[rowi][7] = extracUrl(data[rowi][7]);
    //Logger.log(data[rowi][7]);
  }
  //Logger.log(data);
  return data;
}

function getDutyGroup() {
  var day = new Date();
  day = day.getDay();
  initSpreadsheet(dutygrouptable);
  var data = sheet.getDataRange().getValues();
  data.shift();
  Logger.log(data);
  var meatdata = [];
  for (var i = 0; i < lastrow - 1; i++) {
    if (data[i][lastcol - 1] === days[day]) {
      meatdata.push(data[i]);
    }
  }
  Logger.log(meatdata);
  return meatdata
}

function uploadFiles(formObject) {
  try {
    var folder = DriveApp.getFolderById(folderID);
    /*sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    lastrow = sheet.getLastRow();*/
    initSpreadsheet(reporttable);
    var nextId = lastrow < 2 ? 1 : sheet.getRange(lastrow, 1).getValue() + 1;

    var fileUrl = "";
    var fileName = "";

    //Upload file if exists and update the file url
    if (formObject.activityImages.length > 0) {
      var blob = formObject.activityImages;
      var file = folder.createFile(blob);
      file.setDescription("Uploaded by " + formObject.fname);
      fileUrl = file.getUrl();
      fileName = file.getName();
    }
    else {
      fileUrl = "Record saved without a file";
    }
    //Saving records to Google Sheet
    var day = parseInt(formObject.duty);

    sheet.appendRow([
      nextId,
      Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy"),
      days[day],
      formObject.dutyspace,
      formObject.fname,
      formObject.activityNote,
      fileName,
      fileUrl]);
    // Return the URL of the saved file
    return fileUrl;
  }
  catch (error) {
    return error.toString();
  }
}