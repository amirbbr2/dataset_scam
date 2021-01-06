$(document).ready(function() {
    $("#sk").on('click', function() {
        $("#dm").removeClass("active");
        $("#diamonds").hide();

        $("#sk").addClass("active");
        $("#skin").show();
    });

    $("#dm").on('click', function() {
        $("#sk").removeClass("active");
        $("#skin").hide();
        
        $("#dm").addClass("active");
        $("#diamonds").show();
    });

    $("button.btn-danger").on('click', function() {
        location.href='auth.php';
    });

    $("button.btn-info").on('click', function() {
        location.href='auth.php';
    });
});