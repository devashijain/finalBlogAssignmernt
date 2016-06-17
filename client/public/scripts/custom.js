(function($){
    $(document).ready(function(){
      $(".pagination").customPaginate({
         itemsToPaginate : ".post"
        // $.getJSON("page.json", function( data ) {
        //  itemsToPaginate : data.length
        //  });
      });
    });
})(jQuery);
