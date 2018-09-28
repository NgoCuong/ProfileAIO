const axois = require('axios');
const apiKey = "AIzaSyD65a02MsanOy8KDEvIKfR8lTfO77kJXd4";


exports.createSampleProfile = async function(req, res) {
    try{
        var excelId = parseExcelId(req.body.url);
        console.log(excelId);
        var result = await getSheetNameFromGoogleExcel(excelId, apiKey);
        result.forEach(async function(element) {
            var result = await getJsonFromGoogleExcel(excelId, element, apiKey);
            var dashe = getDasheFormat(result);
            res.status(200).send(dashe);  
        });

    }catch(error){
        console.log(error);
        res.status(400).send(error);
    }
};

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

async function getSheetNameFromGoogleExcel(sheetid, apiKey) {    
    try {
        var titles = [];
        console.log("getting from URL" + formatOptions(sheetid, null,apiKey));
        var response = await axois.get(formatOptions(sheetid, null,apiKey));
        if(response.data.sheets.length < 1) {
            return Promise.reject("Error: Google excel does not contain any sheets");
        }
        response.data.sheets.forEach(element => {           
            titles.push(element.properties.title);
        });
        return Promise.resolve(titles);
    } catch (error) {
        return Promise.reject("Could not fetch data from google api. " + error);
    }
}


var Profile = function(profileName, email, firstName, middleName, lastName, cardHolderName, address, aptNumber, city, state, zip, ccType, ccNum, ccv, ccExp, Phone) {
    this.profileName = profileName;
    this.email = email;
    this.fName = firstName;
    this.mName = middleName;
    this.lName = lastName;
    this.cardHolderName = cardHolderName;
    this.address = address;
    this.aptNumber = aptNumber;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.ccType = ccType;
    this.ccNum = ccNum;
    this.ccv = ccv;
    this.ccExp = ccExp;
    this.Phone = Phone;
}

async function getJsonFromGoogleExcel(excelId, sheetName, apiKey) {
    try {
        var profiles = [];
        var response = await axois.get(formatOptions(excelId, sheetName, apiKey));
        if(response.data.values.length < 2 ) {
            return Promise.reject("Error: Google excel is in the wrong format. ");
        }
        //skip the first one since its the row headers
        response.data.values.forEach((element, index) => {
            if(index < 1 ) return;
            profiles.push(
                new Profile(
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


function getDasheFormat(profiles) {
    var dasheResult = {};
    profiles.forEach(result => {
        dasheResult[result.profileName] = {
            address: result.address,
            apt: result.aptNumber,
            billingAddress: "",
            billingApt: "",
            billingCity: "",
            billingCountry: "United States",
            billingFirstName: "",
            billingLastName: "",
            billingMatch: true,
            billingPhone: "",
            billingZipCode: "",
            cardCvv: result.ccv,
            cardExpiry: result.ccExp,
            cardName: result.cardHolderName,
            cardNumber: result.ccNum,
            city: result.city,
            country: "United States",
            email: result.email,
            firstName: result.fName,
            lastName: result.lName,
            oneUseOnly: true,
            phone: result.Phone,
            zipCode: result.zip
        }
    });
    var jsonString = JSON.stringify(dasheResult);
    return jsonString;
}
