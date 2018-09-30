
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
        this.Phone = Phone;
    }

    get getDasheFormat() {
        return JSON.stringify({
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
            phone: this.Phone,
            zipCode: this.zip            
        });     
    }


}

module.exports = Profile;