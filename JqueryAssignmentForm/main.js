//slider for height and salary
$(document).ready(function() {
    $('#slider-salary').slider({
        value: 15000,
        min: 0,
        max: 50000,
        step: 5000,
        slide: function(event, ui) {
            $('#salary').val("Rs." + ui.value)
        }
    });

    $("#salary").val("Rs." + $("#slider-salary").slider("value"));

    $('#slider-height').slider({
        value: 150,
        min: 0,
        max: 200,
        step: 2,
        slide: function(event, ui) {
            $('#height').val(ui.value + "cm")
        }
    });

    $("#height").val($("#slider-height").slider("value") + "cm");

    //for validations
    //email
    $('#email').keyup(function() {
        if (validateEmail()) {
            //if validated
            $('#email').css("border", "2px solid green");
            $('#message').html("**Email Validated");
            $('#message').css("color", "green");
        } else {
            $('#email').css("border", "2px solid red");
            $('#message').html("**Enter A valid Email address");
            $('#message').css("color", "red");
        }
    });

    //name
    $('#name').keyup(function() {
        if (validateName()) {
            //if validated
            $('#name').css("border", "2px solid green");
            $('#nameMessage').html("**Name Validated");
            $('#nameMessage').css("color", "green");

        } else {
            $('#name').css("border", "2px solid red");
            $('#nameMessage').html("**First and last name compulsory");
            $('#nameMessage').css("color", "red");

        }
    });

    //age

    $("#age").keyup(function() {
        if (validateAge()) {
            $('#age').css("border", "2px solid green");
            $('#ageMessage').html("**Age Validated");
            $('#ageMessage').css("color", "green");
        } else {
            $('#age').css("border", "2px solid red");
            $('#ageMessage').html("**Please Enter a valid age");
            $('#ageMessage').css("color", "red");
        }
    });

    //phone 
    $('#phone').keyup(function() {
        if (validatePhone()) {
            $('#phone').css("border", "2px solid green");
            $('#phoneMessage').html("**Phone Number Validated");
            $('#phoneMessage').css("color", "green");
        } else {
            $('#phone').css("border", "2px solid red");
            $('#phoneMessage').html("**Please Enter a valid mobile number");
            $('#phoneMessage').css("color", "red");
        }
    });

    //enable and disable submit button
    $("#submit").prop('disabled', true);

    var toValidate = $('#name, #age, #email, #address'),
        valid = false;

    toValidate.keyup(function() {
        if ($(this).val().length > 0) {
            $(this).data('valid', true);
        } else {
            $(this).data('valid', false);
        }

        toValidate.each(function() {
            if ($(this).data('valid') == true && validateAge() && validateName() &&
                validateEmail() && validatePhone()) {
                valid = true;
            } else {
                valid = false;
            }
        });

        if (valid === true) {
            $("#submit").prop('disabled', false);
        } else {
            $("#submit").prop('disabled', true);
        }
    });

    //to show all filled values after click
    $("#submit").click(function() {
        $('#recieved').html("Inputs Received As Following :")
        alert("click to see the values Entered :")
        var x = $("form").serializeArray();
        $.each(x, function(i, field) {
            $("#allValues").append("<br>" + field.name + " : " +
                field.value + " ");
        });
    });

    //select country code and states based on country chosen
    $('#country').change(function() {
        var val = $(this).val();
        if (val == "India") {
            $('#code').html("<option>+91</option>");
        } else if (val == "America") {
            $('#code').html("<option>+1</option>");
        } else if (val == "China") {
            $('#code').html("<option>+86</option>");
        } else if (val == "Japan") {
            $('#code').html("<option>+81</option>");
        } else if (val == "Australia") {
            $('#code').html("<option>+61</option>");
        } else if (val == "Sri Lanka") {
            $('#code').html("<option>+94</option>");
        } else if (val == "item0") {
            $("#code").html("<option value=''>--Country Code--</option>");
        }

    });

    //select city based on country chosen
    $('#country').change(function() {
        var val = $(this).val();
        if (val == "India") {
            $('#city').html("<option>Mumbai</option><option>Delhi</option><option>Indore</option");
        } else if (val == "America") {
            $('#city').html("<option>New York</option><option>Los Angeles</option><option>Chicago</option>");
        } else if (val == "China") {
            $('#city').html("<option>Beijing</option><option>Guangzhou </option><option>Taipei </option");
        } else if (val == "Japan") {
            $('#city').html("<option> Tokyo</option><option>Guangzhou </option><option>Gold Coast</option");
        } else if (val == "Australia") {
            $('#city').html("<option>Sydney</option><option>Melbourne  </option><option>Osaka  </option");
        } else if (val == "Sri Lanka") {
            $('#city').html("<option>Colombo</option><option>Moratuwa  </option><option>Jaffna  </option");
        } else if (val == "item0") {
            $("#city").html("<option value=''>--select one--</option>");
        }

    });

});

function validateEmail() {
    //get value of input email
    var email = $('#email').val();

    //use regular expression
    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (reg.test(email)) {
        return true;
    } else {
        return false;
    }
}

function validateName() {
    //get value of input email
    var name = $('#name').val();

    //use regular expression
    var reg = /^[a-zA-Z]+ [a-zA-Z]+$/
    if (reg.test(name)) {
        return true;
    } else {
        return false;
    }
}

function validateAge() {
    var age = $('#age').val();

    if ((age >= 1) && (age <= 100)) {
        return true;
    } else {
        return false;
    }
}

function validatePhone() {
    var phone = $('#phone').val();
    var reg = /^\d{10}$/;
    if (reg.test(phone)) {
        return true;
    } else {
        return false;
    }
}

//to set the image preview
var loadImg = function(event) {
    $('#frame').attr('src', URL.createObjectURL(event.target.files[0]));
}