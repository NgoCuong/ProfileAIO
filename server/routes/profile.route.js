var express = require("express");
var router = express.Router();
var profile = require("../models/profile.model");
var axios = require("axios");
var XLSX = require('xlsx');
var archiver = require('archiver');
var fs = require('fs');


//routes
router.post('/create/:id', GenerateProfile);
// router.get('/testing', CreateZipReponse);
module.exports = router;
const apiKey = "AIzaSyD65a02MsanOy8KDEvIKfR8lTfO77kJXd4";

const ProfileType = Object.freeze( {
    DASHE: 'dashe',
    ANBPLUS: 'anbplus',
    PD: 'pd',
    CYBER: 'cyber',
    SPLASHFORCE: 'splashforce',
    TRIP: 'trip',
    SNEAKERCOP: 'sneakercop'
});
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}


async function GenerateProfile(req, res, io) {
    try{
        console.log("Creating profile for " + req.params.id)

        if(doesIdExist(req.params.id.toUpperCase()) == false) return res.status(500).send("NOT SUPPORTED");
        //get the Sheet names from the google excel
        var sheetResults = await getSheetNameFromGoogleExcel(parseExcelId(req.body.url), apiKey);
        // await sleep(3000)
        req.app.io.emit("message", "reading excel");
        // //Take the first sheetName and add all the info
        var results = await getJsonFromGoogleExcel(parseExcelId(req.body.url), sheetResults[0], apiKey);
        req.app.io.emit("message", "Converting to profile Type");
        // //Convert the normal json format to the user's choice 
        var convertedResults = getConvertedProfiles(req.params.id.toLowerCase(), results);

        //determine what we are sending back to the frontend
        switch(req.params.id.toLowerCase()) {
            case ProfileType.ANBPLUS: 
                console.log("Running anb");
                await CreateANBResponse(req, res, convertedResults);
                console.log("Done running anb");
                break;
            case ProfileType.SNEAKERCOP: 
                console.log("Running sneakercop");
                await CreateSneakerCopResponse(req, res, convertedResults);
                console.log("Done running sneakercop");
                break;
            case ProfileType.TRIP: 
                console.log("Running trip");
                await CreateTripReponse(req, res, convertedResults);
                console.log("Done running trip");
                break;
        }        
    }catch(error) {
        console.log(error);
        res.status(400).send(error);
    }
}

async function CreateTripReponse(req, res, convertedProfiles) {
    try{
        var filename = "tripProfile.zip";
        var zip = archiver('zip');
        // var urlthis = 'https://docs.google.com/spreadsheets/d/18bmclCSFakTWte9Vi6fsRNCyW56ljfCCDn2THfDueR4/edit#gid=0';

        // var sheetResults = await getSheetNameFromGoogleExcel(parseExcelId(urlthis), apiKey);
        // var results = await getJsonFromGoogleExcel(parseExcelId(urlthis), sheetResults[0], apiKey);
        // var convertedResults = getConvertedProfiles('trip', results);

        // Send the file to the page output.
        zip.pipe(res);
        res.setHeader('Content-Disposition', 'attachment; filename=' + filename)
        res.type('application/zip');
        res.status(200);
        
        // Create zip with some files.
        convertedProfiles.forEach((element, index) => {
            zip.append(JSON.stringify(element), {name: index + "_profile.json"});
        });
        zip.finalize();
    }catch(error) {
        console.log(error);
        res.status(400).send(error);
    }
}

async function CreateANBResponse(req, res, convertedProfiles) {
    try{
       /* create workbook & set props*/
    //    var urlthis = 'https://docs.google.com/spreadsheets/d/18bmclCSFakTWte9Vi6fsRNCyW56ljfCCDn2THfDueR4/edit#gid=0';
    //    var sheetResults = await getSheetNameFromGoogleExcel(parseExcelId(urlthis), apiKey);
    //    console.log(sheetResults);
    //    var results = await getJsonFromGoogleExcel(parseExcelId(urlthis), sheetResults[0], apiKey);
    //    console.log("Attempting to convert to users choice of profileType");
    //    var convertedResults = getConvertedProfiles('sneakercop', results);
       
    //    console.log(convertedProfiles);
    
    
        const wb = { SheetNames: [], Sheets: {} };
        wb.Props = {
           Title: "ProfileAIO",
           Author: "Breadboy"
        };
        /*create sheet data & add to workbook*/
        var ws = XLSX.utils.json_to_sheet(convertedProfiles);
        var ws_name = "Profile Sheets";
        XLSX.utils.book_append_sheet(wb, ws, ws_name);     
        
        var wbout = new Buffer(XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' }));
        var filename = "myDataFile.xlsx";
        res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
        res.type('application/octet-stream');
        res.status(200).send(wbout);
    }catch(error) {
        console.log(error);
        res.status(400).send(error);
    }
}

async function CreateSneakerCopResponse(req, res, convertedProfiles) {
    try{
        console.log("CreateSneakerCopResponse");
        // var sheetResults = await getSheetNameFromGoogleExcel(parseExcelId(req.body.url), apiKey);
        // var results = await getJsonFromGoogleExcel(parseExcelId(req.body.url), sheetResults[0], apiKey);
        // var convertedResults = getConvertedProfiles('sneakercop', results);
        var filename = "sneakercop.csv";
        res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
        res.set('Content-Type', 'text/csv');
        res.status(200).send(convertedProfiles.join('\n'));
    }catch(error) {
        console.log(error);
        res.status(400).send(error);
    }

}

async function createDasheResponse(req, res, convertedProfiles) {
    try{
        // console.log(req.params.id);
        // if(doesIdExist(req.params.id.toUpperCase()) == false) return res.status(500).send("NOT SUPPORTED");

        // var sheetResults = await getSheetNameFromGoogleExcel(parseExcelId(req.body.url), apiKey);
        // console.log(sheetResults);
        // var results = await getJsonFromGoogleExcel(parseExcelId(req.body.url), sheetResults[0], apiKey);
        console.log("Attempting to convert to users choice of profileType");
        var convertedResults = getConvertedProfiles(req.params.id, results);
        // console.log(convertedResults);
        res.status(200).send(convertedResults);
    }catch(error) {
        console.log(error);
        res.status(400).send(error);
    }
}

function doesIdExist(id) {
    return (id in ProfileType);
    
}

function getConvertedProfiles(id ,results) {
    var convertedProfiles = [];
    results.forEach((element) => {
        convertedProfiles.push(findByIdAndConvertProfile(id, element));
    })
    return convertedProfiles;
}

function findByIdAndConvertProfile(id, one_profile) {
    switch(id) {
        case ProfileType.ANBPLUS: return one_profile.getANBPlusFormat;
        case ProfileType.DASHE: return one_profile.getDasheFormat;
        case ProfileType.SNEAKERCOP: return one_profile.getsneakercopFormat;
        case ProfileType.TRIP: return one_profile.getTripFormat;
    }
}

async function findByIdAndReturnReponse(req, res) {
    switch(id) {
        case ProfileType.ANBPLUS: return one_profile.getANBPlusFormat;
        case ProfileType.DASHE: return one_profile.getDasheFormat;
        case ProfileType.SNEAKERCOP: return one_profile.getsneakercopFormat;
        case ProfileType.TRIP: return one_profile.getTripFormat;
    }
}

async function getJsonFromGoogleExcel(excelId, sheetName, apiKey) {
    try {
        var profiles = [];
        var response = await axios.get(formatOptions(excelId, sheetName, apiKey));
        if(response.data.values.length < 2 ) {
            return Promise.reject("Error: Google excel is in the wrong format. ");
        }
        // console.log(response.data);
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


//need some error handling here 
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