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
        res.status(200).send("Successful");
    }catch(error) {
        console.log(error);
        res.status(400).send(error);
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

async function getSheetNameFromGoogleExcel(sheetId, apiKey) {
    try{
        var sheetResults = [];
        var response = await axios.get(formatOptions(sheetId, null, apiKey));
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