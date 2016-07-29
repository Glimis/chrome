chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    sendResponse({
      "price": $('#jd-price').text(),
      "number":$('#short-share span:eq(1)').text(),
      "name":$('#name h1').text(),
      "detail1":$('#product-detail-1').html(),
      "detail2":$('#product-detail-3').text(),
      "detail3":$('#product-detail-5').text()
    })
});