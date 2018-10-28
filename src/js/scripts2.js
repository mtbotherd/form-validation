// just for the demos, avoids form submit
jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
});

$(document).ready(function() {
    $("#form2").validate({
        rules: {
            text: "required",
            number: "required",
            email: {
                required: true,
                email: true
            },
            password: "required",
            date: "required",
            url: {
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
            select: "required",
            selectMultiple: "required",
            textarea: "required",
            file: "required",
            checkbox: "required",
            checkboxGroup: "required",
            radio: "required"
        },
        messages: {
            text: "Please enter some text.",
            number: "Please enter a number.",
            email: {
                required: "Please enter an email address.",
                email: "Your email address must be in the format of name@domain.com."
            },
            password: "Please enter a password.",
            date: "Please enter a date.",
            url: "Please enter a valid url.",
            select: "Please select an option.",
            selectMultiple: "Please select at least one option.",
            textarea: "Please enter some text.",
            file: "Please select a file to upload",
            checkbox: "Please check the box.",
            checkboxGroup: "Please check at least one box.",
            radio: "Please choose one."
        },
        //errorElement: "em",
        errorPlacement: function(error, element) {
            // Add the `help-block` class to the error element
            error.addClass("help-block");

            // Add `has-feedback` class to the parent div.input-container
            // in order to add icons to inputs
            element.parents(".input-container").addClass("has-feedback");

            //error.insertAfter(element);

            // Error message for checkbox
            if (element.attr("name") === "checkbox") {
                error.insertAfter(element.parent("div"));
            }
            else {
                error.insertAfter(element);
            }

            // if (element.attr("name") === "radio") {
            //     error.insertAfter(element.parent("label"));
            // } else {
            //     error.insertAfter(element);
            // }
            //
            // if (element.attr("name") == "checkboxGroup"){
            //     error.insertAfter("label[for='checkbox3']");
            // } else {
            //     error.insertAfter(element);
            // }

            // Add the div element, if doesn't exists, and apply the icon classes to it.
            if (!element.next("div")[0]) {
                $("<div class='fas fa-exclamation-triangle fa-sm form-control-feedback'></div>").insertAfter(element);
                // $( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter( element );
            }
        },
        success: function(label, element) {
            // Add the div element, if doesn't exists, and apply the icon classes to it.
            if (!$(element).next("div")[0]) {
                $("<div class='fas fa-check form-control-feedback'></div>").insertAfter($(element));
            }
        },
        highlight: function(element, errorClass, validClass) {
            $(element).parents(".input-container").addClass("has-error").removeClass("has-success");
            $(element).next("div").addClass("fa-exclamation-triangle").removeClass("fa-check");
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parents(".input-container").addClass("has-success").removeClass("has-error");
            $(element).next("div").addClass("fa-check").removeClass("fa-exclamation-triangle");
        }
    });

});
