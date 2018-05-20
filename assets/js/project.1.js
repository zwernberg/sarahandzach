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
    $("#rsvp-submit-DISABLEDFORNOW").click(function(event){
        guests = [
            {
                "name": $('input[name=guest1-name]').val(),
                "food_choice": $('input[name=guest1-food_choice]:checked').val()
            }
        ]
        var dataToSend =
            {
            "name": $('#name').val(),
            "attending": $('input[name=attending]:checked').val(),
            "food_choice": $('input[name=food_choice]:checked').val(),
            "guests": guests
            };
         $.ajax({
              type:"POST",
              url:"http://127.0.0.1:8000/invite/rsvp/",
              data: JSON.stringify(dataToSend),
              success: function(){
                  $('#message').html('<div class="alert alert-success text-center">Thank you for submitting.</div>')
              }
         });
         return false; //<---- move it here
    });
});
