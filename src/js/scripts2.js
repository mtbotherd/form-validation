// just for the demos, avoids form submit
jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
});

$(document).ready(function() {
    $("#form2").validate({
        groups: {
            name: "checkboxGroup1[] checkboxGroup2[] checkboxGroup3[]"
        },
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
            // "checkboxGroup1[]": {
            //     require_form_group: [1, ".custom-control-input"]
            // },
            // "checkboxGroup2[]": {
            //     require_form_group: [1, ".custom-control-input"]
            // },
            // "checkboxGroup3[]": {
            //     require_form_group: [1, ".custom-control-input"]
            // },
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

            // Error message placement for checkbox. This is for the text only.
            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("div"));
            } else {
                error.insertAfter(element);
            }

            if (element.prop("id") === "checkbox1" || element.prop("id") === "checkbox2" || element.prop("id") === "checkbox3"){
                error.insertAfter(".checkbox-group");
            } else {
                error.insertAfter(element);
            }

            // Add the div element, if doesn't exists, and apply the icon classes to it.
            if (!element.next("div")[0]) {
                $("<div class='fas fa-exclamation-triangle fa-sm form-control-feedback'></div>").insertAfter(element);
                // $( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter( element );
            } else {
                error.insertAfter(element);
            }
        },
        success: function(label, element) {
            // Add the div element, if doesn't exists, and apply the icon classes to it.
            if (!$(element).next("div")[0]) {
                $("<i class='fas fa-check form-control-feedback'></i>").insertAfter($(element));
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
