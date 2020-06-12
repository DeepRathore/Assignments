var headings = ['Bangladesh dolor sit amet, c_', 'Commodo ut qui mollit et id', 'Ex in consequat sit qui enim.'];
var i = 0;

setInterval(function() {  //code for moving text above banner
   $('#heading').html(headings[i]);
    if (i == (headings.length - 1)) {
        i = 0;

    } else {
        i++;
    }
}, 1300);


//toggle plus and minus 
$(document).ready(function(){
	$(".dropbtn").on("click", function(){

    $(this).find($(".fa")).toggleClass('fa-plus fa-minus');
});

});


//function for targetting two carousels with one controller
function slideCarousels(ids, action) {
  var len = ids.length;
  var id = null;

  for (var i = 0; i < len; i++) {
      id = ids[i];
      $('#' + id).carousel({ slide: action });
  }
}

