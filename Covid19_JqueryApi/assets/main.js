$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "https://api.covid19india.org/data.json",
        success: function(data) {

            //data in India Map part
            var totalStateWiseData = (data.statewise);
            $("#tested").text(data.tested[103].totalsamplestested);
            $("#date").text(totalStateWiseData[0].lastupdatedtime);
            $("#confirmed").text(totalStateWiseData[0].confirmed),
                $("#Deceased").text(totalStateWiseData[0].deaths),
                $("#recovered").text(totalStateWiseData[0].recovered),
                $("#active").text(totalStateWiseData[0].active);

            //search area   
            var totallength = totalStateWiseData.length;
            $("#button").click(function() {
                var EnteredValue = $('.search').val();
                for (var i = 0; i <= totallength; i++) {
                    var result = JSON.stringify(totalStateWiseData[i].state).replace(/"/g, "");
                    if (result.toLowerCase() == EnteredValue.toLowerCase()) {
                        let states = "<div>" + (JSON.stringify(totalStateWiseData[i].state)).replace(/"/g, "") + "</div>";
                        let confirmed = "<div>" + (JSON.stringify(totalStateWiseData[i].confirmed)).replace(/"/g, "") + "</div>";
                        let act = "<div>" + (JSON.stringify(totalStateWiseData[i].active)).replace(/"/g, "") + "</div>";
                        let recovered = "<div>" + JSON.stringify(totalStateWiseData[i].recovered).replace(/"/g, "") + "</div>";
                        let deseased = "<div>" + JSON.stringify(totalStateWiseData[i].deaths).replace(/"/g, "") + "</div>";
                        let update = "<div>" + JSON.stringify(totalStateWiseData[i].lastupdatedtime).replace(/"/g, "") + "</div>";
                        $('.NameState').html(states);
                        $('.conState').html("Confirmed" + confirmed);
                        $('.actState').html("Ativate" + act);
                        $('.recState').html("Recovered" + recovered);
                        $('.decState').html("Deseaced" + deseased);
                        $('.update').html("Updated Last" + update);
                    }
                }
            });

            //table of state information
            var text, con, act, rec, dec = '';
            for (var i = 0; i <= totallength; i++) {
                let states = "<tr>";
                let confirmed = "<tr>";
                let active = "<tr>";
                let recovered = "<tr>";
                let deseased = "<tr>";
                states += "<td>" + JSON.stringify(totalStateWiseData[i].state).replace(/"/g, "") + "</td>";
                confirmed += "<td>" + JSON.stringify(totalStateWiseData[i].confirmed).replace(/"/g, "") + "</td>";
                active += "<td>" + JSON.stringify(totalStateWiseData[i].active).replace(/"/g, "") + "</td>";
                recovered += "<td>" + JSON.stringify(totalStateWiseData[i].recovered).replace(/"/g, "") + "</td>";
                deseased += "<td>" + JSON.stringify(totalStateWiseData[i].deaths).replace(/"/g, "") + "</td>";
                text += states;
                con += confirmed;
                act += active;
                dec += deseased;
                rec += recovered;
                $('#Name').html(text), $('#con').html(con), $('#act').html(act),
                    $('#rec').html(rec), $('#dec').html(dec);
            }
        }
    });

    //autocompletes
    var availableTags = ['Total', 'Maharashtra', 'Tamil Nadu', 'Delhi', 'Gujarat', 'Uttar Pradesh',
        'Rajasthan', 'West Bengal', 'Madhya Pradesh', 'Haryana', 'Karnataka', 'Andhra Pradesh', 'Bihar',
        'Telangana', 'Jammu and Kashmir', 'Assam', 'Odisha', 'Punjab', 'Kerala', 'Uttarakhand', 'Chhattisgarh',
        'Jharkhand', 'Tripura', 'Ladakh', 'Goa', 'Himachal Pradesh', 'Manipur', 'Chandigarh', 'Puducherry',
        'Nagaland', 'Mizoram', 'Arunachal Pradesh', 'Sikkim', 'Dadra and Nagar Haveli and Daman and Diu',
        'Andaman and Nicobar Islands', 'Meghalaya', 'Lakshadweep'];

    $("#search").autocomplete({
        source: availableTags
    });

    //triggering Enter key while search
    $("#search").keyup(function(e) {
        if (e.which == 13) {
            $('#button').trigger('click');
        }
    });
});