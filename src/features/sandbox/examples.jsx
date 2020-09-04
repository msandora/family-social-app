$('.upsell-form').hide();
var $selector = $('.upsell-form').find('select');
var offers = {};
$('.checkbox').click(function () {
  if ($(this).hasClass('first-offer')) {
    var $firstOffer = $('.first-offer');
    if ($firstOffer.hasClass('checked')) {
      $firstOffer.removeClass('checked');
      offers[$selector.find('option').eq(0).val()] = 0;
    } else {
      $firstOffer.addClass('checked');
      offers[$selector.find('option').eq(0).val()] = 1;
    }
  } else {
    var $secondOffer = $('.second-offer');
    if ($secondOffer.hasClass('checked')) {
      $secondOffer.removeClass('checked');
      offers[$selector.find('option').eq(1).val()] = 0;
    } else {
      $secondOffer.addClass('checked');
      offers[$selector.find('option').eq(1).val()] = 1;
    }
  }
});

$('.order-btn').click(function () {
  if ($('.checkbox').hasClass('checked')) {
    return true;
  } else {
    return false;
  }
});

window.mojoApp._hooks.add('upsell_form_send_offers_filter', function (
  value,
  options
) {
  if ($('.checkbox').hasClass('checked')) {
    for (var o in options) {
      options[o] = 0;
    }
    for (var i in offers) {
      options[i] = offers[i];
    }
    return options;
  } else {
    return false;
  }
});
