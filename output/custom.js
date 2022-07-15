// Made with the lovely isotope.metafizzy.co/ (on top of Masonry)
// external js: isotope.pkgd.js

// store filter for each group
var buttonFilters = {};
var buttonFilter;
// quick search regex
var qsRegex;


// init Isotope
var $grid = $('.grid').isotope({
    itemSelector: '.grid-item',
    percentPosition: true,
    masonry: {
        columnWidth: '.grid-sizer'
    },
    getSortData: {
        name: '.product_name',
    },
    filter: function() {
        var $this = $(this);
        var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
        var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
        return searchResult && buttonResult;
    }
}
);


$('.filters').on( 'click', '.btn', function() {
  var $this = $(this);
  // get group key
  var $buttonGroup = $this.parents('.btn-group');
  var filterGroup = $buttonGroup.attr('data-filter-group');
  // set filter for group
  buttonFilters[ filterGroup ] = $this.attr('data-filter');
  // combine filters
  buttonFilter = concatValues( buttonFilters );
    console.log(buttonFilter);
  // Isotope arrange
  $grid.isotope();
});


// change is-checked class on buttons
$('.btn-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.active').removeClass('active');
    $( this ).addClass('active');
  });
});

// use value of search field to filter
var $quicksearch = $('.quicksearch').keyup( debounce( function() {
  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
  $grid.isotope();
}) );


// flatten object by concatting values
function concatValues( obj ) {
  var value = '';
  for ( var prop in obj ) {
    value += obj[ prop ];
  }
  return value;
}

// debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {
  var timeout;
  threshold = threshold || 100;
  return function debounced() {
    clearTimeout( timeout );
    var args = arguments;
    var _this = this;
    function delayed() {
      fn.apply( _this, args );
    }
    timeout = setTimeout( delayed, threshold );
  };
}


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
