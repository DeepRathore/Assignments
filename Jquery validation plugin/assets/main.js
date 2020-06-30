$(document).ready(function() {
    $('#formValid').validate({
        errorClass: 'my-error-class',
        rules: {
            age: {
                required: true,
                number: true,
                range: [1, 100],
            },
            email: {
                required: true,
                email: true,
                pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            },
            address: {
                required: true,
            }
        },
        messages: {
            email: {
                required: '**Please provide Email Address',
                pattern: '**Please enter a valid email.'
            },
        }
    });

    //by adding custom methods
    $.validator.addMethod('phone', function(value) {
        return /^\d{10}$/.test(value);
    }, '***Please enter a valid phone number.');

    $.validator.addMethod('cname', function(value) {
        return /^[a-zA-Z]+ [a-zA-Z]+$/.test(value);
    }, '***Please enter First and Last name both.');

    //slider for height and salary
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
	
	//select country code and states based on country chosen
    $('#country').change(function() {
        var city = $('#city');
        var code = $('#code');
        var val = $(this).val();
        if (val == "India") {
            $(city).html("<option>Mumbai</option><option>Delhi</option><option>Indore</option");
            $(code).html("<div>+91</div>");
        } else if (val == "America") {
            $(code).html("<div>+1</div>");
            $(city).html("<option>New York</option><option>Los Angeles</option><option>Chicago</option>");
        } else if (val == "China") {
            $(code).html("<div>+86</div>");
            $(city).html("<option>Beijing</option><option>Guangzhou</option><option>Taipei</option");
        } else if (val == "Japan") {
            $(code).html("<div>+81</div>");
            $(city).html("<option> Tokyo</option><option>Guangzhou</option><option>Gold Coast</option");
        } else if (val == "Australia") {
            $(code).html("<div>+61</div>");
            $(city).html("<option>Sydney</option><option>Melbourne</option><option>Osaka</option");
        } else if (val == "Sri Lanka") {
            $(code).html("<div>+94</div>");
            $(city).html("<option>Colombo</option><option>Moratuwa</option><option>Jaffna</option");
        } else if (val == "item0") {
            $(code).html("<div value=''>--Country Code--</div>");
            $(city).html("<option value=''>--select one--</option>");
        }
    });

    //disabling submit button
    $('input').on('keyup', function() {
        if ($("#formValid").valid()) {
            $('#submit').prop('disabled', false);
        } else {
            $('#submit').prop('disabled', 'disabled');
        }
    });

    //to show all filled values after click
    $('#submit').click(function() {
        $('#recieved').html('Inputs Received As Following :')
        var x = $('form').serializeArray();
        $.each(x, function(i, field) {
            $('#allValues').append(', ' + field.name + ' : ' +
                field.value + '');
        });
    });
});

//to set the image preview
var loadImg = (event) =>
    $('#frame').attr('src', URL.createObjectURL(event.target.files[0]));