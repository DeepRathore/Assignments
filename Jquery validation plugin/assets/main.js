data = ['India', 'America', 'China'];
city = $('#city');
code = $('#code');

$(document).ready(function() {
    $('#formValid').validate({
        errorClass: 'error',
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

    $('#salary').val('Rs.' + (sliderSalary).slider('value'));
    $('#slider-height').slider({
        value: 150,
        min: 0,
        max: 200,
        step: 2,
        slide: function(event, ui) {
            $('#height').val(ui.value + 'cm');
        }
    });
    $('#height').val((sliderHeight).slider('value') + 'cm');

    //Country names
    $.each(data, function(key, value) {
        $('#country').append($("<option></option>").attr("value", key).text(value));
    });

    //select country code and states based on country chosen
    $('#country').change(function() {
        switch ($('#country').val()) {
            case '0':
                $(city).html("<option>Mumbai</option><option>Indore</option");
                $(code).html("<div>+91</div>");
                break;
            case '1':
                $(city).html("<option>New York</option><option>Los Angeles</option>");
                $(code).html("<div>+1</div>");
                break;
            case '2':
                $(city).html("<option>Beijing</option><option>Guangzhou</option>");
                $(code).html("<option>+81</option>");
                break;
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
            $('#allValues').append('<br>' + field.name + ' : ' +
                field.value + '');
        });
    });
});

//to set the image preview
var loadImg = (event) =>
    $('#frame').attr('src', URL.createObjectURL(event.target.files[0]));