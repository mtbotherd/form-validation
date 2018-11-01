jQuery.validator.setDefaults({
    debug: true,
    submitHandler: function() {
        alert("Success!  The form has been submitted.");
    }
});

$(document).ready(function() {
    $("#form2").validate({
        rules: {
            textField: "required",
            numberField: "required",
            emailField: {
                required: true,
                email: true
            },
            passwordField: {
                required: true,
                minlength: 8
            },
            dateField: "required",
            urlField: {
                required: true,
                url: true,
                normalizer: function(value) {
                    var url = value;

                    // Check if it doesn't start with http:// or https:// or ftp://
                    if (url && url.substr(0, 7) !== "http://" &&
                        url.substr(0, 8) !== "https://" &&
                        url.substr(0, 6) !== "ftp://") {
                        // then prefix with http://
                        url = "http://" + url;
                    }

                    // Return the new url
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
            textField: "Please add some text.",
            numberField: "Please enter a number.",
            emailField: "Please enter a valid email.",
            passwordField: {
                required: "Please provide a password.",
                minlength: "Password must be at least 8 characters."
            },
            dateField: "Please select a date.",
            urlField: "Please enter a valid URL.",
            selectField: "Please select an option",
            selectMultipleField: "Please select at least one option.",
            textareaField: "Please enter some text.",
            fileUploadField: "Please select a file to upload.",
            checkboxSingle: "Please check the box.",
            checkboxGroup: "Please check at least one box.",
            radioGroup: "Please select one."
        },
        errorElement: "em",

        // Replaces default .has-error class with Bootstrap 4 .is-valid class
        errorClass: "is-invalid",
        // Replaces default .has-succes class with Bootstrap 4 .is-valid class
        validClass: "is-valid",

        errorPlacement: function(error, element) {
            //Add the `help-block` class to the error element
            error.addClass("help-block");
            //
            // Add `has-feedback` class to the parent div.form-group
            // in order to add icons to inputs
            element.parents(".form-group").addClass("has-feedback");

            // Add error
            if (element.prop("type") === "checkbox" || element.prop("type") === "radio") {
                // If checkbox/radio append after parent div.
                //This prevents error from displaying after first element of checkbox/radio group.
                $("<span class='form-control-feedback fas fa-exclamation-triangle'></span>").appendTo(element.parents(".form-group"));
                error.appendTo(element.parents(".form-group"));
            } else {
                $("<span class='form-control-feedback fas fa-exclamation-triangle'></span>").insertAfter(element);
                error.insertAfter(element.next("span"));
            }
        },
        success: function(element) {
            // if ($(element).closest(".is-valid")) {
            //     $(".form-control-feedback").removeClass(errorClass).addClass(validClass);
            // }
        },
        highlight: function(element, errorClass, validClass) {
            $(element).closest(".form-group").addClass(errorClass).removeClass(validClass);

        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).closest(".form-group").removeClass(errorClass).addClass(validClass);
            $(element).next("span").addClass("fa-check").removeClass("fa-exclamation-triangle");
        }
    });
});