/* Project specific Javascript goes here. */

/*
Formatting hack to get around crispy-forms unfortunate hardcoding
in helpers.FormHelper:

    if template_pack == 'bootstrap4':
        grid_colum_matcher = re.compile('\w*col-(xs|sm|md|lg|xl)-\d+\w*')
        using_grid_layout = (grid_colum_matcher.match(self.label_class) or
                             grid_colum_matcher.match(self.field_class))
        if using_grid_layout:
            items['using_grid_layout'] = True

Issues with the above approach:

1. Fragile: Assumes Bootstrap 4's API doesn't change (it does)
2. Unforgiving: Doesn't allow for any variation in template design
3. Really Unforgiving: No way to override this behavior
4. Undocumented: No mention in the documentation, or it's too hard for me to find
*/
$('.form-group').removeClass('row');


$(document).ready(function() {

    // close navbar properly for mobile
    $(".navbar-nav a").click(function(event) {
        $(".navbar-collapse").collapse('hide');
      });

    $("#rsvp-submit").click(function(event){
        if (!$('#name').val()) {
            return;
        }
        var guests = []
        $('.guest-row').each(function() {
            var name = $(this).find('input[name=guest-name]').val();
            var choice = $(this).find('.food_radio:checked').val();
            if (name) {
                guests.push({
                    name: name,
                    food_choice: choice
                })
            }
        });
        var dataToSend =
            {
            "name": $('#name').val(),
            "attending": $('input[name=attending]:checked').val(),
            "food_choice": $('input[name=food_choice]:checked').val(),
            "song_choice": $('#song').val(),
            "guests": guests
            };
         $.ajax({
              type:"POST",
              url:"https://sarahandzach.love/invite/rsvp/",
              contentType: 'application/json',
              data: JSON.stringify(dataToSend),
              success: function(){
                window.location.replace('/thankyou.html');
              }
         });
         return false; //<---- move it here
    });
});
