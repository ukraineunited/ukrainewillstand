export default function DataExtractor(data) {
  // Personal Information
  const firstName = data.get("firstName"),
    lastName = data.get("lastName"),
    maidenName = data.get("maidenName"),
    fathersName = data.get("fathersName"),
    mothersName = data.get("mothersName"),
    dateOfBirth = data.get("dateOfBirth"),
    sex = data.get("sex"),
    placeOfBirth = data.get("placeOfBirth"),
    countryOfBirth = data.get("countryOfBirth"),
    citizenships = data.get("citizenships"),
    maritalStatus = data.get("maritalStatus"),
    height = data.get("height"),
    colorOfEyes = data.get("colorOfEyes"),
    specialMarks = data.get("specialMarks"),
    polishIdentificationNumber = data.get("polishIdentificationNumber");
  // Travel Documents
  const series = data.get("series"),
    number = data.get("number"),
    dateOfIssue = data.get("dateOfIssue"),
    dateOfExpiry = data.get("dateOfExpiry"),
    issuingAuthority = data.get("issuingAuthority"),
    numberOfEnteredPersons = data.get("numberOfEnteredPersons");
  // Place of Stay
  const city = data.get("city"),
    street = data.get("street"),
    buildingNumber = data.get("buildingNumber"),
    apartmentNumber = data.get("apartmentNumber"),
    postalCode = data.get("postalCode");
  if(!dateValidator(dateOfBirth?.toString())) return "Invalid date of birth";
  if(!dateValidator(dateOfIssue?.toString())) return "Invalid date of issue";
  if(!dateValidator(dateOfExpiry?.toString())) return "Invalid date of expiry";
  if(!peselgood(Number(polishIdentificationNumber))) return "Invalid polish identification number";
  return {
    personal:{
      firstName,
      lastName,
      maidenName,
      fathersName,
      mothersName,
      dateOfBirth,
      sex,
      placeOfBirth,
      countryOfBirth,
      citizenships,
      maritalStatus,
      height,
      colorOfEyes,
      specialMarks,
      polishIdentificationNumber
    },
    travelDocs: {
      series,
      number,
      dateOfIssue,
      dateOfExpiry,
      issuingAuthority,
      numberOfEnteredPersons
    },
    placeOfStay: {
      city,
      street,
      buildingNumber,
      apartmentNumber,
      postalCode
    }
  }
}

function dateValidator(date) {
  if(!date) return false;
  const parsedDate = Date.parse(date);
  if(isNaN(parsedDate)) return false;
  return true;
}

function peselgood(y) {
  if (y.length == 11) {
    var arr = [1,3,7,9,1,3,7,9,1,3];
    var sum = 0;
    //muliply pesel digits by checksum digits
    for (var i = 0; i < 10; i++) sum += arr[i] * y[i];
    sum = sum%10 == 0 ? 0 : 10-sum%10;
    return sum == y[10];
  } else return false;
}