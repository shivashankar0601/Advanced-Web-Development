const Validations = (fields) => {
    let errors = {
        description: "",
        name: "",
        unitType: "",
        quantity: "",
        availability: "",
        condition: "",
        images: "",
        validForm: false,
    };
    if (fields.name.length === 0) {
        errors.name = "Item name field should not be empty";
        return errors;
    }

    if (!/^[a-zA-Z\s]+$/.test(fields.name)) {
        errors.name = "Item name should contain only alphabets";
        return errors;
    }

    if (fields.description.length < 20) {
        errors.description = "description should be minimum of 20 characters";
        return errors;
    }

    if (fields.unitType.length < 2) {
        errors.unitType = "Unit Type value should be a minimum of 2 characters";
        return errors;
    }

    if (!/^[a-zA-Z]+$/.test(fields.unitType)) {
        errors.unitType =
            "please enter a valid value for Unit Type (only alphabets)";
        return errors;
    }

    if (fields.quantity.length === 0) {
        errors.quantity = "Item quantity is a mandatory field";
        return errors;
    }

    if (fields.availability.length === 0) {
        errors.availability = "Availability is a mandatory field";
        return errors;
    }

    if (fields.condition.length === 0) {
        errors.condition = "Condition is a mandatory field";
        return errors;
    }

    if (fields.images.length === 0) {
        errors.images = "Atleast one image is mandatory for a post";
        return errors;
    }

    errors.validForm = true;
    return errors;
};

export default Validations;
