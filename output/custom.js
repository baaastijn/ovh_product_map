$(document).ready(function(){
    // Searche Engine
    $("#search").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $(".card").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });

    // Button groups filtering
    $('.btn-group').on('click', '.btn', function() {
        // when clickin on a button group, change the active CSS class
        $(this).addClass('active').siblings().removeClass('active');

        var $stats = $('.active');
        var $items = $('.product');
 
        $items.show().removeClass("greyed-out border-greyed-out").addClass("border-ovh");
 
        
        if ($stats.length == 0){
            return;
        }
        
        // for each active item, will get his ID value (for example, iaas or pay_go)
        var $vstats = $.map($stats, function(o) {return $(o).data('id'); });
        $vstats = $vstats.filter(item => item);
        
        // for each button group
        $stats.each(function() {
            
            // store the button group
            var $stat = $(this);

            // for each product item (Card in CSS), we will filter them
            $items.filter(function() {
                // if the active fitler is on "all" then we don't filter
                if ($($stat).data('id') === "all") {
                    return;
                }
                
                // indexOf() will return -1 if not found, or the index position if found
                return $vstats.indexOf($(this).data($stat.data('type'))) < 0;
            }).addClass("greyed-out border-greyed-out").removeClass("border-ovh");
        })

      });
  });

// Datatable for Raw product table
$(document).ready( function () {
    $('#product_raw_data').DataTable({
    scrollX: true,
    "pageLength": 200,
    "select": true,
    "autoWidth": true,
    dom: 'Bfrtip',
    buttons: [
        'colvis','copy', 'csv'
    ]
});
    $("td:contains('True')").addClass('bg-green');
    $("td:contains('False')").addClass('bg-red');
} );


