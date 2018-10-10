var express = require("express");
var router = express.Router();
var profile = require("../models/profile.model");
var axios = require("axios");

//routes
router.post('/create', create);
module.exports = router;
const apiKey = "AIzaSyD65a02MsanOy8KDEvIKfR8lTfO77kJXd4";

async function create(req, res) {
    try{
        var sheetResults = await getSheetNameFromGoogleExcel(parseExcelId(req.body.url), apiKey);
        console.log(sheetResults);
        var results = await getJsonFromGoogleExcel(parseExcelId(req.body.url), 'Sheet1', apiKey);
        console.log(results);
        res.status(200);
        res.send(results);
    }catch(error) {
        console.log(error);
        res.status(400).send(error);
    }


}

async function getJsonFromGoogleExcel(excelId, sheetName, apiKey) {
    try {
        var profiles = [];
        console.log(formatOptions(excelId, sheetName, apiKey));
        var response = await axios.get(formatOptions(excelId, sheetName, apiKey));
        if(response.data.values.length < 2 ) {
            return Promise.reject("Error: Google excel is in the wrong format. ");
        }
        console.log(response.data);
        //skip the first one since its the row headers
        response.data.values.forEach((element, index) => {
            if(index < 1 ) return;
            profiles.push(
                new profile(
                    element[0],
                    element[1],
                    element[2],
                    element[3],
                    element[4],
                    element[5],
                    element[6],
                    element[7],
                    element[8],
                    element[9],
                    element[10],
                    element[11],
                    element[12],
                    element[13],
                    element[14],
                    element[15])
                );
        });
         return Promise.resolve(profiles);
    } catch (error) {
        return Promise.reject("Could not read google excel properly. " + error);
    }
 }

function formatOptions(excelId, sheetName, apiKey) {
    if(!sheetName) {
        return "https://sheets.googleapis.com/v4/spreadsheets/" + excelId + "?key=" + apiKey;
    } else {
        return "https://sheets.googleapis.com/v4/spreadsheets/" + excelId + "/values/" + sheetName + "?key=" + apiKey;
    }
 }

 function parseExcelId(url) {
    var words = url.split('/');
    return words[5];
}

async function getSheetNameFromGoogleExcel(sheetUrl, apiKey) {
    try{
        var sheetResults = [];
        var response = await axios.get(formatOptions(sheetUrl, null, apiKey));
        if(response.data.sheets.length < 1) {
            return Promise.reject("Error: Google excel does not contain any excel sheets");
        }
        response.data.sheets.forEach(element => {
            sheetResults.push(element.properties.title);
        });
        return Promise.resolve(sheetResults);
    }catch(error){
        return Promise.reject("Could not fetch data from google : " + error);
    }

}