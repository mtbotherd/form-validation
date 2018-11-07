$(document).ready(function() {
    $("#sampleForm").validate({
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

        errorPlacement: function ( error, element ) {
			// Add the `help-block` class to the error element
			error.addClass( "help-block" );

			// Add `has-feedback` class to the parent div.form-group
			// in order to add icons to inputs
			element.parents( ".form-group" ).addClass( "has-feedback" );

			if ( element.prop( "type" ) === "checkbox" || element.prop( "type" ) === "radio" ) {
                $( "<span class='fas fa-exclamation-triangle form-control-feedback'></span>" ).appendTo( element.parents( ".form-group" ) );
				error.appendTo( element.parents( ".form-group" ) );
			} else {
                $( "<span class='fas fa-exclamation-triangle form-control-feedback'></span>" ).insertAfter( element );
				error.appendTo( element.parents( ".form-group" ) );
			}
		},
		success: function ( label, element ) {
			// Add the span element, if doesn't exists, and apply the icon classes to it.
			if ( !$( element ).next( "span" )[ 0 ] ) {
				$( "<span class='fas fa-check form-control-feedback'></span>" ).insertAfter( $( element ) );
			}
		},
		highlight: function ( element, errorClass, validClass ) {
			$( element ).parents( ".form-group" ).addClass( errorClass ).removeClass( validClass );
			$( element ).next( "span" ).addClass( "fa-exclamation-triangle" ).removeClass( "fa-check" );
		},
		unhighlight: function ( element, errorClass, validClass ) {
			$( element ).parents( ".form-group" ).addClass( validClass ).removeClass( errorClass );
			$( element ).next( "span" ).addClass( "fa-check" ).removeClass( "fa-exclamation-triangle" );
		}
    });
});
