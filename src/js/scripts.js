$(document).ready(function() {

    // Bootstrap 4 validation - Example starter JavaScript for disabling form submissions if there are invalid fields
    (function() {
        //'use strict';
        window.addEventListener('load', function() {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {

                    var failed = false;

                    if ($("[name='customCheckbox']:checked").length == 0) {
                        $("[name='customCheckbox']").attr('required', true);
                        failed = true;
                    } else {
                        $("[name='customCheckbox']").attr('required', false);
                    }

                    if (form.checkValidity() === false) {
                        failed = true;
                    }

                    if (failed == true) {
                        event.preventDefault();
                        event.stopPropagation();
                    }

                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    })();
});