from docxtpl import DocxTemplate
from os import path


PLACE_OF_STAY_KEY = "placeOfStay"
CONTACT_INFO_KEY = "contactInfo"
PERSONAL_KEY = "personal"
CITY_KEY = "city"
STREET_KEY = "street"
TEL_MOTHER_KEY = "mothersPhone"
TEL_FATHER_KEY = "fathersPhone"
SOURCE_FOLDER = path.join("backend", "documents")
DESTINATION_FOLDER = path.join(SOURCE_FOLDER, "completed")


def fill_polish_form(json):
    """
    Fills the polish form from the given json and saves it as a docx. May throw KeyError if any
    expected key was missing.
    :param json: Assumed to be dictionary mapping strings to dictionaries, containing the
    keys "PlaceOfStay", "contactInfo" and "personal"
    """
    polish_form = DocxTemplate(path.join(SOURCE_FOLDER, "PolishForm.docx"))

    place_of_stay = json[PLACE_OF_STAY_KEY]
    contact_info = json[CONTACT_INFO_KEY]
    context = {
        STREET_KEY: place_of_stay[STREET_KEY],
        CITY_KEY: place_of_stay[CITY_KEY],
        TEL_FATHER_KEY: contact_info[TEL_FATHER_KEY],
        TEL_MOTHER_KEY: contact_info[TEL_MOTHER_KEY]
    }
    polish_form.render(context)
    personal = json[PERSONAL_KEY]
    name = " ".join((personal["firstName"], personal["lastName"]))
    polish_form.save(path.join(DESTINATION_FOLDER, name + ".docx"))

