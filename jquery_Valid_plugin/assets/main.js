 var data = {
     "India": { 0: "Mumbai", 1: "Delhi", 2: "Indore", "code": "+91" },
     "America": { 0: "Texas", 1: "California", 2: "Georgia", "code": "+1" },
     "China": { 0: "Beijing", 1: "Hubei", 2: "Shanghai", "code": "+81" }
 };

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
                 required: 'Please provide Email Address',
                 pattern: 'Please enter a valid email.'
             },
         }
     });

     //by adding custom methods
     $.validator.addMethod('phone', function(value) {
         return /^\d{10}$/.test(value);
     }, 'Please enter a valid phone number.');

     $.validator.addMethod('cname', function(value) {
         return /^[a-zA-Z]+ [a-zA-Z]+$/.test(value);
     }, 'Please enter First and Last name both.');

     //slider for height and salary
     var sliderSalary = $('#slider-salary');
     var sliderHeight = $('#slider-height');
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

     (sliderHeight).slider({
         value: 150,
         min: 0,
         max: 200,
         step: 2,
         slide: function(event, ui) {
             $('#height').val(ui.value + 'cm');
         }
     });
     $('#height').val((sliderHeight).slider('value') + 'cm');

     //Country names select options
     var countryName = Object.keys(data);
     $.each(countryName, function(key, value) {
         $('#country').append($("<option></option>").attr("value", key).text(value));
     });

     //select country code and states based on country chosen
     $('#country').change(function() {
         var city = $('#city');
         var code = $('#code');
         var selectedCountry = $('#country').find(":selected").text();
         var totalCountry = countryName.length;
         var optionText, option = '';
         for (let i = 0; i <= totalCountry; i++) {
             var retrivedLength = Object.keys(data).length;
             for (let j = 0; j <= retrivedLength - 1; j++) {
                 if (selectedCountry == ([Object.keys(data)[i]])) {
                     optionText = ([Object.values(data)[i][j]]);
                     option += (`<option> ${optionText}</option>`);
                     (city).html(option);
                     (code).html([Object.values(data)[i].code]);
                 }
             }
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