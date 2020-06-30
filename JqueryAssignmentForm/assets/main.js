//slider for height and salary
$(document).ready(function() {
    var sliderSalary = $('#slider-salary');
    var sliderHeight = $('#slider-height')
    $(sliderSalary).slider({
        value: 15000,
        min: 0,
        max: 50000,
        step: 5000,
        slide: function(event, ui) {
            $('#salary').val('Rs.' + ui.value)
        }
    });

    $('#salary').val('Rs.' + $(sliderSalary).slider('value'));

    $('#slider-height').slider({
        value: 150,
        min: 0,
        max: 200,
        step: 2,
        slide: function(event, ui) {
            $('#height').val(ui.value + 'cm');
        }
    });
    $('#height').val($(sliderHeight).slider('value') + 'cm');

    //for validations
    //email
    $('#email').keyup(function() {
        if (validateEmail()) {
            $(this).css('border', '2px solid #008000'),
                $('#message').html("**Email Validated").css("color", "#008000");
        } else {
            $(this).css("border", "2px solid #FF0000"),
                $('#message').html("**Enter A valid Email address").css("color", "#FF0000");
        }
    });

    //name
    $('#name').keyup(function() {
        if (validateName()) {
            $('#nameMessage').html("**Name Validated").css("color", "#008000");

        } else {
            $('#nameMessage').html("**Please Enter a valid name").css("color", "#FF0000");

        }
    });

    //age
    $('#age').keyup(function() {
        if (validateAge()) {
            $('#ageMessage').html("**Age Validated").css("color", "#008000");
        } else {
            $('#ageMessage').html("**Please Enter a valid age").css("color", "#FF0000");
        }
    });

    //phone 
    $('#phone').keyup(function() {
        if (validatePhone()) {
            $('#phoneMessage').html("**Phone Number Validated").css("color", "#008000");
        } else {
            $('#phoneMessage').html("**Please Enter a valid mobile number").css("color", "#FF0000");
        }
    });
    var x, y;
    //enable and disable submit button
    $('#submit').prop('disabled', true);
    var toValidate = $('#email, #address'); //manytime key is pressed on selecte element+condition
    var valid = false;
    toValidate.keyup(function() {
        if ($(this).val().length > 0) {
            $(this).data('valid', true);
        } else {
            $(this).data('valid', false);
        }

        toValidate.each(function() {
            if ($(this).data('valid') == true && validateAge() && validateName() && validatePhone()) {
                valid = true;

            } else {
                valid = false;
            }
        });

        if (valid === true) {
            $('#submit').prop('disabled', false);
        } else {
            $('#submit').prop('disabled', true);
        }
    });

    //to show all filled values after click
    $('#submit').click(function() {
        $('#recieved').html('Inputs Received As Following :')
        var x = $('form').serializeArray();
        $.each(x, function(i, field) {
            $('#allValues').append("<br>" + field.name + " : " +
                field.value + " ");
        });
    });

    //select country code and states based on country chosen
    $('#country').change(function() {
        var city = $('#city');
        var code = $('#code');

        var val = $(this).val();
        if (val == "India") {
            $(city).html("<option>Mumbai</option><option>Delhi</option><option>Indore</option");
            $(code).html("<option>+91</option>");
        } else if (val == "America") {
            $(code).html("<option>+1</option>");
            $(city).html("<option>New York</option><option>Los Angeles</option><option>Chicago</option>");
        } else if (val == "China") {
            $(code).html("<option>+86</option>");
            $(city).html("<option>Beijing</option><option>Guangzhou</option><option>Taipei</option");
        } else if (val == "Japan") {
            $(code).html("<option>+81</option>");
            $(city).html("<option> Tokyo</option><option>Guangzhou</option><option>Gold Coast</option");
        } else if (val == "Australia") {
            $(code).html("<option>+61</option>");
            $(city).html("<option>Sydney</option><option>Melbourne</option><option>Osaka</option");
        } else if (val == "Sri Lanka") {
            $(code).html("<option>+94</option>");
            $(city).html("<option>Colombo</option><option>Moratuwa</option><option>Jaffna</option");
        } else if (val == "item0") {
            $(code).html("<option value=''>--Country Code--</option>");
            $(city).html("<option value=''>--select one--</option>");
        }
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


});

//to set the image preview
function loadImg(event) {
    $('#frame').attr('src', URL.createObjectURL(event.target.files[0]));
}