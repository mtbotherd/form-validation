jQuery.validator.setDefaults({
    debug: true,
    submitHandler: function() {
        alert("submitted!");
    }
})
$(document).ready(function() {
    $("#form2").validate({
        rules: {
            textField: "required",
            numberField: "required",
            emailField: {
                required: true,
                email: true
            },
            passwordField: "required",
            dateField: "required",
            urlField: {
                required: true,
                url: true,
                normalizer: function(value) {
                    var url = value;
                    // Check if it doesn't start with http:// or https://.
                    if (url && url.substr(0, 7) !== "http://" && url.substr(0, 8) !== "https://") {
                        //then prefix with http://
                        url = "http://" + url;
                    }
                    // Return the new urlInput
                    return url;
                }
            },
            selectField: "required",
            selectMultipleField: "required",
            textareaField: "required",
            fileUploadField: "required",
            checkboxSingle: "required",
            checkboxGroup: "required",
            radioGroup: "required"
        },
        messages: {
            textField: "Please enter some text.",
            numberField: "Please enter a number.",
            emailField: {
                required: "Please enter an email address.",
                email: "Your email address must be in the format of name@domain.com."
            },
            passwordField: "Please enter a password.",
            dateField: "Please enter a date.",
            urlField: "Please enter a valid url.",
            selectField: "Please select an option.",
            selectMultipleField: "Please select at least one option.",
            textareaField: "Please enter some text.",
            fileUploadField: "Please select a file to upload",
            checkboxSingle: "Please check the box.",
            checkboxGroup: "Please check at least one box.",
            radioGroup: "Please choose one."
        },
        errorElement: "em",
        errorPlacement: function(error, element) {
            // Add the `help-block` class to the error element
            error.addClass("help-block");

            //error.insertAfter(element);

            // Add `has-feedback` class to the parent div.input-container in order to add icons to inputs
            //element.parents(".input-container").addClass("has-feedback");

            // Error message placement for checkbox. This is for the text only.
            if (element.prop("type") === "checkbox" || element.prop("type") === "radio") {
                error.insertAfter(element.parents(".form-group"));
            } else {
                error.insertAfter(element);
            }

            // Add the div element, if doesn't exists, and apply the icon classes to it.
            if (!element.next("div")[0]) {
                $("<div class='form-control-feedback fas fa-exclamation-triangle fa-sm'></div>").insertAfter(element);
            } else {
                error.insertAfter(element);
            }
        },
        success: function(label, element) {
            //Add the div element, if doesn 't exists, and apply the icon classes to it.
            if (!$(element).next("div")[0]) {
                $("<div class='form-control-feedback fas fa-check fa-sm'></div>").insertAfter($(element));
            }
        },
        highlight: function(element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("has-error").removeClass("has-success");
            $(element).next("div").addClass("fa-exclamation-triangle").removeClass("fa-check");
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("has-success").removeClass("has-error");
            $(element).next("div").addClass("fa-check").removeClass("fa-exclamation-triangle");
        }
    });

});