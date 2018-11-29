$(document).ready(function() {

    // File upload - show file value after file selection.
    $('.custom-file-input').on('change', function() {
        var fileName = document.getElementById("fileUploadField").files[0].name;
        $(this).next('.custom-file-label').addClass("selected").html(fileName);
    })
});