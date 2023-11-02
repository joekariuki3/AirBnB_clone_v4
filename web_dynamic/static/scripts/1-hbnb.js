document.addEventListener('DOMContentLoaded', function () {
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
});
