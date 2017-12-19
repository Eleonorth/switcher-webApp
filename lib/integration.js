
(function($){ $(document).ready(function(){

    var offset = $(".navbar").offset().top;

    $(document).scroll(function(){
        var scrollTop = $(document).scrollTop();

        if(scrollTop > offset)
        {
            $(".navbar").css("position", "fixed");
        }
            else {
            $(".navbar").css("position", "static");
        }
    });
});

})(jQuery);