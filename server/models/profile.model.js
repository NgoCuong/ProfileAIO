
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
    }

    get getDasheFormat() {
        return {
            address: this.address,
            apt: this.aptNumber,
            billingAddress: "",
            billingApt: "",
            billingCity: "",
            billingCountry: "United States",
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
            country: "United States",
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
            BillingCountry: "United States",
            BillingCity: this.city,
            BillingZipCode: this.zip,
            BillingPhoneNumber: this.phone,
            BillingHouseNumber: "",
            BillingAddressLine1: this.address,
            BillingAddressLine2: "",
            ShippingFirstName: this.fName,
            ShippingLastName: this.fName,
            ShippingCountry: "United States",
            ShippingCity: this.city,
            ShippingZipCode: this.zip,
            ShippingStateOrProvince: this.zip,
            ShippingPhoneNumber: this.phone,
            ShippingHouseNumber: "",
            ShippingAddressLine1: this.address,
            ShippingAddressLine2: ""
        };
    }

    get Month() {
        var words = this.ccExp.split('/');
        return words[0];

    }

    get Year() { 
        var words = this.ccExp.split('/');
        return "20"+words[1];
    }
}

module.exports = Profile;