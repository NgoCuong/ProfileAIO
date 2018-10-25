class Profile {

    constructor(profileName, email, firstName, middleName, lastName, cardHolderName, address, aptNumber, city, state, zip, ccType, ccNum, ccv, ccExp, Phone) {
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
        this.phone = Phone;
        this.country = "United States";
    }

    /*

    "ProfileName2": {
        "billing": {
        "address": "Address",
        "apt": "Apt",
        "city": "Portland",
        "country": "United States",
        "firstName": "FName",
        "lastName": "LName",
        "phoneNumber": "5033802012",
        "state": "OR",
        "zipCode": "97236"
        },
        "billingMatch": true,
        "card": {
        "cvv": "123",
        "holder": "Card Name",
        "month": "01",
        "number": "4561456278941235",
        "year": "2019"
        },
        "email": "Email@email.com",
        "profileName": "ProfileName2",
        "shipping": {
        "address": "Address",
        "apt": "Apt",
        "city": "Portland",
        "country": "United States",
        "firstName": "FName",
        "lastName": "LName",
        "phoneNumber": "5033802012",
        "state": "OR",
        "zipCode": "97236"
        }
    }
    */
    get getDasheFormatV2() {
        var o = {};
        var key = this.profileName;
        // o[key] = {};
        var billing = {
            address: this.address,
            apt: this.aptNumber,
            city: this.city,
            country: this.country,
            firstName: this.fName,
            lastName: this.lName,
            phoneNumber: this.phone,
            state: this.state,
            zipCode: this.zip,
        };
        o[key] = {
            billing
        };
        
        return o.profileName;
        // o[key].push(billing);
        // o[key].push({billing: "true"});
        // var card = {
        //     cvv: this.cvv,
        //     holder: this.ccType,
        //     month: this.Month,
        //     number: this.ccNum,
        //     year: this.Year
        // } 
        // o[key].push(card);
        // o[key].push({email: this.email});
        // o[key].push({profileName: this.profileName});
        // var shipping = {
        //     address: this.address,
        //     apt: this.aptNumber,
        //     city: this.city,
        //     country: this.country,
        //     firstName: this.fName,
        //     lastName: this.lName,
        //     phoneNumber: this.phone,
        //     state: this.state,
        //     zipCode: this.zip,            
        // }
        // o[key].push(shipping);
        // return o;
    }

    get getDasheFormatV1() {
        return {
            address: this.address,
            apt: this.aptNumber,
            billingAddress: "",
            billingApt: "",
            billingCity: "",
            billingCountry: this.country,
            billingFirstName: "",
            billingLastName: "",
            billingMatch: true,
            billingPhone: "",
            billingZipCode: "",
            cardCvv: this.ccv,
            cardExpiry: this.ccExp,
            cardName: this.cardHolderName,
            cardNumber: this.ccNum,
            city: this.city,
            country: this.country,
            email: this.email,
            firstName: this.fName,
            lastName: this.lName,
            oneUseOnly: true,
            phone: this.phone,
            zipCode: this.zip            
        };     
    }

    get getANBPlusFormat() {
        return {
            ProfileName: this.profileName,
            PaymentType: "Credit Card",
            HashTags: "",
            Email: this.email,
            IsCheckoutOncePerBilling: "",
            PaypalEmail: "",
            PaypalPassword: "",
            CreditCardType: this.ccType,
            NameOnCard: this.fName + " " + this.lName,
            CardNumber: this.ccNum,
            Cvv: this.ccv,
            ExpiredDateYear: this.Month,
            ExpiredDateYear: this.Year,
            DateOfBirth: "8/13/2018 12:00:00 AM",
            IsShippingAsBilling: "True",
            BillingFirstName: this.fName,
            BillingLastName: this.lName,
            BillingCountry: this.country,
            BillingCity: this.city,
            BillingZipCode: this.zip,
            BillingPhoneNumber: this.phone,
            BillingHouseNumber: "",
            BillingAddressLine1: this.address,
            BillingAddressLine2: "",
            ShippingFirstName: this.fName,
            ShippingLastName: this.fName,
            ShippingCountry: this.country,
            ShippingCity: this.city,
            ShippingZipCode: this.zip,
            ShippingStateOrProvince: this.zip,
            ShippingPhoneNumber: this.phone,
            ShippingHouseNumber: "",
            ShippingAddressLine1: this.address,
            ShippingAddressLine2: ""
        };
    }

    get getTripFormat() {
        return {
                profile: this.profileName,
                name: this.fName + " " + this.lName,
                address: this.address,
                apt: this.aptNumber,
                email: this.email,
                city: this.city,
                zip: this.zip,
                phone: this.phone, 
                country: this.country,
                state: this.state, 
                creditcardnumber: this.ccnum,
                cardtype: this.ccType,
                expirymonth: this.Month,
                expiryyear: this.Year,
                ccvs: this.ccv,
                ccnum: this.ccNum,
        };
    }

    get getSneakerCopFormat() {
        return this.profileName + "," + 
                this.state + "," + 
                this.address + "," +
                this.aptNumber  + "," +
                this.city  + "," +
                this.fName  + "," +
                this.lName  + "," +
                this.phone  + "," +
                this.zip + "," +
                this.country  + "," +
                this.ccv  + "," +
                this.ccNum + "," +
                this.Month + "," +
                this.Year + "," +
                this.email + "," +
                "us";
    }

    get Month() {
        var words = this.ccExp.split('/');
        return words[0];

    }

    get Year() { 
        var words = this.ccExp.split('/');
        return "20"+words[1];
    }

    get ProfileName () {
        return this.profileName;
    }
}

module.exports = Profile;