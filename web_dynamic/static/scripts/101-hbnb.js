document.addEventListener("DOMContentLoaded", function () {
    // add amenitites choosen to a list
    const amenityListId = [];
    const amenityNameList = [];
    const stateListId = [];
    const stateNameList = [];
    const cityListId = [];
    const cityNameList = [];
  
    function addFilter(that, idList, nameList) {
      const id = that.attr("data-id");
      const name = that.attr("data-name");
  
      if (idList.includes(id)) {
        // check if id is in the list
        const indexId = idList.indexOf(id);
        // remove id from list if present
        idList.splice(indexId, 1);
  
        // check if name index in nameList
        const indexName = nameList.indexOf(name);
        // remove from list if present
        nameList.splice(indexName, 1);
      } else {
        // add id to list
        idList.push(id);
  
        // add name to nameList
        nameList.push(name);
      }
    }
    $(".amenities li input").change(function () {
      addFilter($(this), amenityListId, amenityNameList);
      $(".amenities h4").text(amenityNameList);
    });
    $(".stateli input.statecheckbox").change(function () {
      addFilter($(this), stateListId, stateNameList);
      const all = stateNameList + cityNameList;
      $(".locations .stateorcity").text(all);
    });
    $(".cityli input.citycheckbox").change(function () {
      addFilter($(this), cityListId, cityNameList);
      const all = stateNameList + cityNameList;
      $(".locations .stateorcity").text(all);
    });
  
    // check the status of api if it os OK light red of not okay light gray
    $.get("http://0.0.0.0:5001/api/v1/status/", function (data, textStatus) {
      if (data.status === "OK") {
        $("div#api_status").addClass("available");
      } else {
        $("div#api_status").removeClass("available");
      }
    });
  
    // using api fetch place data and display in place session
    let myData = JSON.stringify({});
    const searchUrl = "http://0.0.0.0:5001/api/v1/places_search/";
    $.ajax({
      url: searchUrl,
      type: "POST",
      data: myData,
      dataType: "json",
      contentType: "application/json",
      success: function (resp) {
        $.each(resp, function (index, place) {
          $("section.places").prepend(`
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
               <div class="reviews">
                  <h2><span data-id="${place.id}" class="showreview">Hide</span></span>Reviews</h2>
                  <ul>
                      <li>
                          <h3>
                              From Bob Dylan the 27th January 2017
                          </h3>
                          <p>
                              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam soluta culpa
                              excepturi rem magnam quidem ut exercitationem,
  
                          </p>
                      </li>
                  </ul>
              </div>
              </article>`);
        });
      },
    });
  
    // when Review show is clicked
    $(".reviews h2 span").click(function () {
      let placeId = $(this).attr("data-id");
      getReview(placeId);
      console.log(placeId);
    });
    function getReview(placeId) {
      let reviewUrl = `http://0.0.0.0:5001/api/v1/places/${placeId}/reviews`;
      $.ajax({
        url: reviewUrl,
        type: "GET",
        success: function (index, reviews) {
          console.log(reviews);
        },
      });
    }
  
    // when search is clicked
    $("button").click(function () {
      myData = JSON.stringify({
        states: stateListId,
        cities: cityListId,
        amenities: amenityListId,
      });
      $("section.places").empty();
      $.ajax({
        url: searchUrl,
        type: "POST",
        data: myData,
        dataType: "json",
        contentType: "application/json",
        success: function (resp) {
          $.each(resp, function (index, place) {
            $("section.places").append(`
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
        },
      });
    });
  
    // closing braces
  });