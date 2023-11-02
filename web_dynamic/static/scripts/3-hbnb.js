document.addEventListener('DOMContentLoaded', function () {
  // add amenitites choosen to a list
  const amenityList = [];
  const amenityNameList = [];
  $('li input').change(function () {
    const amenityId = $(this).attr('data-id');
    const amenity = $(this).attr('data-name');

    if (amenityList.includes(amenityId)) {
      // get amenity ids index in amenityList
      const indexId = amenityList.indexOf(amenityId);
      // remove from list if present
      amenityList.splice(indexId, 1);

      // get amenity name index in amenityNameList
      const indexName = amenityNameList.indexOf(amenity);
      // remove from list if present
      amenityNameList.splice(indexName, 1);
    } else {
      // add amenity id to list
      amenityList.push(amenityId);

      // add amenity name
      amenityNameList.push(amenity);
    }
    $('.amenities h4').text(amenityNameList);
  });

  // check the status of api if it os OK light red of not okay light gray
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  // using api fetch place data and display in place session
  const myData = JSON.stringify({});
  const searchUrl = 'http://0.0.0.0:5001/api/v1/places_search/';
  $.ajax({
    url: searchUrl,
    type: 'POST',
    data: myData,
    dataType: 'json',
    contentType: 'application/json',
    success: function (resp) {
      $.each(resp, function (index, place) {
        $('section.places').append(`
           <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">${place.price_by_night}</div>
            </div>
            <div class="information">
            <div class="max_guest">${place.max_guest} Guest </div>
              <div class="number_rooms">${place.number_rooms} Bedroom</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom </div>
             </div>
             <div class="description">${place.description}</div>
            </article>`);
      });
    }
  });
});
