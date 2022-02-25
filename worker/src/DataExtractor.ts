export default function DataExtractor(data: FormData) {
  // Personal Information
  const firstName = data.get("firstName"),
    lastName = data.get("lastName"),
    maidenName = data.get("maidenName"),
    fathersName = data.get("fathersName"),
    fathersPhone = data.get("fathersPhone"),
    mothersName = data.get("mothersName"),
    mothersPhone = data.get("mothersPhone"),
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
  // Validation
  if(!dateOfBirth) return "Date of Birth is required";
  if(!dateOfIssue) return "Date of Issue is required";
  if(!dateOfExpiry) return "Date of Expiry is required";
  if(!polishIdentificationNumber) return "Polish Identification Number is required/is not valid";
  if(!dateValidator(dateOfBirth?.toString())) return "Invalid date of birth";
  if(!dateValidator(dateOfIssue?.toString())) return "Invalid date of issue";
  if(!dateValidator(dateOfExpiry?.toString())) return "Invalid date of expiry";
  if(typeof polishIdentificationNumber !== "string" || !peselgood(polishIdentificationNumber)) return "Invalid polish identification number";
  return {
    personal:{
      firstName,
      lastName,
      maidenName,
      fathersName,
      fathersPhone,
      mothersName,
      mothersPhone,
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

function dateValidator(date: string) {
  if(!date) return false;
  const parsedDate = Date.parse(date);
  if(isNaN(parsedDate)) return false;
  return true;
}

function peselgood(PESELString: string) : Boolean{
  const PESEL = PESELString.split("").map(e => Number(e));
  if (PESEL.length == 11) {
    var arr = [1,3,7,9,1,3,7,9,1,3];
    var sum = 0;
    //muliply pesel digits by checksum digits
    for (var i = 0; i < 10; i++) sum += arr[i] * PESEL[i];
    sum = sum%10 == 0 ? 0 : 10-sum%10;
    return sum == PESEL[10];
  } else return false;
}