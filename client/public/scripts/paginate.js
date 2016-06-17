(function ($){
    $.fn.customPaginate = function(options)
    {
      var paginationContainer = this;
      var itemsToPaginate;
      var defaults = {
        itemsPerPage : 4
      };
      var settings = {};
      var itemsPerPage = settings.itemsPerPage;
      $.extend(settings , defaults , options);
      itemsToPaginate = $(settings.itemsToPaginate);
       var numberOfPaginateLinks = Math.ceil(itemsToPaginate.length / itemsToPaginate);
      $("<ul></ul>").prependTo(paginationContainer);
      alert(itemsToPaginate);
      for(var index=0; index<numberOfPaginateLinks ; index++){
        paginationContainer.find("ul").append("<li>"+ (index + 1)  +"</li>");
      }
      itemsToPaginate.filter(":lt("+ (itemsPerPage - 1) + ")").hide();
        paginationContainer.find("ul li").on('click',function(){
          var linkNumber = $(this).text();
          var itemsToHide = itemsToPaginate.filter(":lt("+ ((linkNumber -1) +itemsPerPage) + ")");
          $.merge(itemsToHide , itemsToPaginate.filter(":gt("+ ((linkNumber + itemsPerPage) -1) + ")"));
          itemsToHide.hide();
          var itemsToShow = itemsToPaginate.not(itemsToHide);
          itemsToShow.show();
        })
    }
}(jQuery));
