from docxtpl import DocxTemplate
from collections import defaultdict
from os import path


PLACE_OF_STAY_KEY = "placeOfStay"
CONTACT_INFO_KEY = "contactInfo"
PERSONAL_KEY = "personal"
SOURCE_FOLDER = path.join("backend", "documents")
DESTINATION_FOLDER = path.join(SOURCE_FOLDER, "completed")


def fill_polish_form(json):
    """
    Fills the polish form from the given json and saves it as a docx. May throw KeyError if any
    expected key was missing.
    :param json: Assumed to be dictionary mapping strings to dictionaries, containing the
    keys "placeOfStay", "contactInfo" and "personal"
    """
    polish_form = DocxTemplate(path.join(SOURCE_FOLDER, "PolishForm.docx"))
    fill_and_save_template_from_data(polish_form, decompose_json(json))


def fill_romanian_form(json):
    """
    Fills the Romanian form from the given json and saves it as a docx. May throw KeyError if any
    expected key was missing.
    :param json: Assumed to be dictionary mapping strings to dictionaries, containing the
    keys "placeOfStay", "contactInfo" and "personal"
    """
    romanian_form = DocxTemplate(path.join(SOURCE_FOLDER, "RomanianForm.docx"))
    fill_and_save_template_from_data(romanian_form, decompose_json(json))


def decompose_json(json):
    """
    Decomposes the given json to its components. May throw KeyError if any expected key was missing.
    :param json: Assumed to be dictionary mapping strings to dictionaries, containing the
    keys "placeOfStay", "contactInfo" and "personal".
    :return: A defaultdict containing all the data from each component.
    """
    return defaultdict(str, **json[PLACE_OF_STAY_KEY], **json[CONTACT_INFO_KEY],
                       **json[PERSONAL_KEY])


def fill_and_save_template_from_data(template, data):
    template.render(data)
    name = " ".join((data["firstName"], data["lastName"]))
    template.save(path.join(DESTINATION_FOLDER, name + ".docx"))
