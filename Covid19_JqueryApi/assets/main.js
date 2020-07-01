$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "https://api.covid19india.org/data.json",
        success: function(data) {
            //data in India Map part
            var totalStateWiseData = (data.statewise);
            $('#tested').text(data.tested[103].totalsamplestested);
            $('#date').text(totalStateWiseData[0].lastupdatedtime);
            $('#confirmed').text(totalStateWiseData[0].confirmed);
            $('#deceased').text(totalStateWiseData[0].deaths);
            $('#recovered').text(totalStateWiseData[0].recovered);
            $('#active').text(totalStateWiseData[0].active);

            //search area   
            var totalLength = totalStateWiseData.length;
            $('#button').click(function() {
                var enteredValue = $('.search').val();
                for (var i = 0; i <= totalLength; i++) {
                    var result = (totalStateWiseData[i].state);
                    if (result.toLowerCase() == enteredValue.toLowerCase()) {
                        let states = '<div>' + (totalStateWiseData[i].state) + '</div>';
                        let confirmed = '<div>' + (totalStateWiseData[i].confirmed) + '</div>';
                        let act = '<div>' + (totalStateWiseData[i].active) + '</div>';
                        let recovered = '<div>' + (totalStateWiseData[i].recovered) + '</div>';
                        let deseased = '<div>' + (totalStateWiseData[i].deaths) + '</div>';
                        let update = '<div>' + (totalStateWiseData[i].lastupdatedtime) + '</div>';
                        let note = '<div>' + (totalStateWiseData[i].statenotes) + '</div>';
                        $('.nameState').html(states);
                        $('.confirmState').html('Confirmed' + confirmed);
                        $('.activeState').html('Ativate' + act);
                        $('.recoveredState').html('Recovered' + recovered);
                        $('.deceasedState').html('Deseaced' + deseased);
                        $('.update').html('Updated Last' + update);
                        $('.stateNote').html(note);
                    }
                }
            });

            //table of state information
            var states, confirmed, active, recovered, deseased = '';
            for (var i = 0; i <= totalLength; i++) {
                states += '<tr><td>' + (totalStateWiseData[i].state) +'</td></tr>';
                confirmed += '<tr><td>' + (totalStateWiseData[i].confirmed) + '</td></tr>';
                active += '<tr><td>' + (totalStateWiseData[i].active) +  '</td></tr>';
                recovered += '<tr><td>'+ (totalStateWiseData[i].recovered) + '</td></tr>';
                deseased += '<tr><td>' + (totalStateWiseData[i].deaths) +  '</td></tr>';
                $('#name').html(states);
                $('#con').html(confirmed);
                $('#act').html(active);
                $('#rec').html(recovered);
                $('#dec').html(deseased);
            }
        }
    });

    //autocompletes
    var availableTags = ['Total', 'Maharashtra', 'Tamil Nadu', 'Delhi', 'Gujarat', 'Uttar Pradesh',
        'Rajasthan', 'West Bengal', 'Madhya Pradesh', 'Haryana', 'Karnataka', 'Andhra Pradesh', 'Bihar',
        'Telangana', 'Jammu and Kashmir', 'Assam', 'Odisha', 'Punjab', 'Kerala', 'Uttarakhand', 'Chhattisgarh',
        'Jharkhand', 'Tripura', 'Ladakh', 'Goa', 'Himachal Pradesh', 'Manipur', 'Chandigarh', 'Puducherry',
        'Nagaland', 'Mizoram', 'Arunachal Pradesh', 'Sikkim', 'Dadra and Nagar Haveli and Daman and Diu',
        'Andaman and Nicobar Islands', 'Meghalaya', 'Lakshadweep'
    ];

    $('#search').autocomplete({
        source: availableTags
    });

    //triggering Enter key while search
    $('#search').keyup(function(e) {
        if (e.which == 13) {
            $('#button').trigger('click');
        }
    });
});