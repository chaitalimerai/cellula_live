// autoplay slider //

$(document).ready(function () {
  var owl = $('.owl-carousel');
  owl.owlCarousel({
    items: 6,
    loop: false,
    // margin:40,
    autoplay: false,
    autoplayspeed: 100,
    dots: false,
    // navText: ['<i class="fa-angle-left"></i>', '<i class="fa-angle-left"></i>'],
    responsive: {
      0: {
        items: 2
      },

      600: {
        items: 6
      }
    }
  });
})


// custom dropdown //

$(".custom-select").each(function () {
  var classes = $(this).attr("class"),
    id = $(this).attr("id"),
    name = $(this).attr("name");
  var template = '<div class="' + classes + '">';
  template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
  template += '<div class="custom-options">';
  $(this).find("option").each(function () {
    template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
  });
  template += '</div></div>';

  $(this).wrap('<div class="custom-select-wrapper"></div>');
  $(this).hide();
  $(this).after(template);
});
$(".custom-option:first-of-type").hover(function () {
  $(this).parents(".custom-options").addClass("option-hover");
}, function () {
  $(this).parents(".custom-options").removeClass("option-hover");
});
$(".custom-select-trigger").on("click", function () {
  $('html').one('click', function () {
    $(".custom-select").removeClass("opened");
  });
  $(this).parents(".custom-select").toggleClass("opened");
  event.stopPropagation();
});
$(".custom-option").on("click", function () {
  $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
  $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
  $(this).addClass("selection");
  $(this).parents(".custom-select").removeClass("opened");
  $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
});


$(document).ready(function () {
  $(document).on('change', '.btn-file :file', function () {
    var input = $(this),
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [label]);
  });

  $('.btn-file :file').on('fileselect', function (event, label) {

    var input = $(this).parents('.input-group').find(':text'),
      log = label;

    if (input.length) {
      input.val(log);
    } else {
      if (log) alert(log);
    }

  });
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#img-upload').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#imgInp").change(function () {
    readURL(this);
  });
});

$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll >= 0) {

    $(".header-section").addClass("shadow-new");
  } else {
    $(".header-section").removeClass("shadow-new");
  }
});

$("#news-slider").owlCarousel({
  items: 1,
  itemsDesktop: [1199, 2],
  itemsMobile: [600, 1],
  pagination: true,
  autoPlay: true
});

$(document).ready(function () {
  $('[id^=detail-]').hide();
  $('.toggle').click(function () {
    $input = $(this);
    $target = $('#' + $input.attr('data-toggle'));
    $target.slideToggle();
  });
});


var selector = '.nav li';

$(selector).on('click', function () {
  $(selector).removeClass('active');
  $(this).addClass('active');
});


// var rangeSlider = $(".price-range"),
//   amount = $("#amount"),
//   minPrice = rangeSlider.data('min'),
//   maxPrice = rangeSlider.data('max');
// rangeSlider.slider({
//   range: true,
//   min: minPrice,
//   max: maxPrice,
//   values: [minPrice, maxPrice],
//   slide: function (event, ui) {
//     amount.val("$" + ui.values[0] + " - $" + ui.values[1]);
//   }
// });
// amount.val(" $" + rangeSlider.slider("values", 0) +
//   " - $" + rangeSlider.slider("values", 1)
// );


//INCREMENT DECREMENT VALUSE
$(document).ready(function () {
  var sitePlusMinus = function () {
    $('.js-btn-minus').on('click', function (e) {
      e.preventDefault();
      if ($(this).closest('.input-group').find('.form-control').val() != 0) {
        $(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
      } else {
        $(this).closest('.input-group').find('.form-control').val(parseInt(0));
      }
    });
    $('.js-btn-plus').on('click', function (e) {
      e.preventDefault();
      $(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);
    });
  };
  sitePlusMinus();
});

