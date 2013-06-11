$(document).ready(function(){
  $('#zoom').magnify({
    showEvent: 'click',
    hideEvent: 'click',
    loadingImage:' '
  });
});

var petShop = {
  
  changeImg : function(e){
	if($(e.target).parent().hasClass('selected')){
	  return;
	}
	else{
	  $('#largeImg').attr('src', $(e.target).attr('src'));
	  $('#zoom').attr('href',$(e.target).attr('src'));
	  $('.smImg').each(function(){
	    if($(this).hasClass('selected')){
		  $(this).removeClass('selected');
		}
		$(e.target).parent().addClass('selected');
	  });
	}
  },
  
  validateCart : function(){
    if(isNaN(parseInt($('#qty').val())) || $('#size :selected').val() == ''){
	  alert('Error: Please make sure you have a valid quantity and size selected');
	}
	else{
	  petShop.addToCart();
	}
  },
  
  qtyListener : function(e){
    var key = e.which;
	
    if ((key >= 48 && key <= 57) || key == 8 || key == 0){
	 if($('#qty').val() == 'qty'){$('#qty').val('');}
	  return true;
	}
	else{
	  e.preventDefault();
	  return false;
	}
  },
  
  addToCart : function(){
    var price = parseInt($('#qty').val())*parseFloat($('.price').text());
	price = price.toFixed(2);
	
    $('#cart').prepend('<div class="lineItem section bottomDot"><div class="itempart">'+$("#qty").val()+'</div>'
	                   +'<div class="itempart">'+$(".title").text()+'</div>'
					   +'<div class="itempart">$'+price+'</div>'
					   +'<div class="itempart x" onclick="petShop.removeItem(event)">X</div>');
	
	var count = $('.lineItem').length;
	$('#cartItems').html("<div class='count'>Cart<br/>-"+count+"-</div>");
	
	var total = parseFloat($('.totalPrice').text()) + parseFloat(price);
	total = total.toFixed(2);
	
	$('.totalPrice').text(total);
	
    return;
  },
  
  removeItem : function(e){
    var price = $(e.target).siblings().eq(2).text();
	price = price.replace('$','');
	price = parseFloat(price);
	
	var totalPrice = parseFloat($('.totalPrice').text()) - price;
	totalPrice = totalPrice.toFixed(2);
	
	$('.totalPrice').text(totalPrice);
	
	$(e.target).parent().remove();
	
	var count = $('.lineItem').length;
	$('#cartItems').html('<div class="count">Cart<br/>-'+count+'-</div>');
  },
  
  showCart : function(){
    $('#cart').show();
  },
  
  hideCart : function(){
    $('#cart').hide();
  },
  
  changeTab : function(e){
    if($(e.target).hasClass('activeTab')){
	  return;
	}
	else{
	  $('.tab').each(function(){
	    if($(this).hasClass('activeTab')){
		  $(this).removeClass('activeTab');
		  $(this).addClass('inactiveTab');
		  $(this).children('.clear').hide();	  
		}
	  });
	  $(e.target).children('.clear').show();
	  $(e.target).addClass('activeTab');
	  if($(e.target).attr('id') == 'descTab'){
	    $('#tabContent').html('Guccio Gucci founded the House of Gucci in 1921 in Florence. The horse bit icon on this collar is reminiscent of the elegant'
		                     +' equestrian style made popular by the fashion architect. Always a favorite this group is extra fabulous on the larger dog as it'
							 +' is a substantial piece. <ul><li>"In the Style of Gucci" dog collar Buckskin</li><li>Classic horsebit icon</li><li>'
							 +'100% Italian full grain leather</li><li>Italian hardware</li><li>Polished nickel</li><li>Handcrafted in Canada</li>'
							 +'<li>Lined in black Italian leather</li></ul>');
	  }
	  else if($(e.target).attr('id') == 'howTab'){
	    $('#tabContent').html("<span class='largeTxt'>How to Measure:</span><br />These collars are measured from the end of the buckle to the first hole and to the"
		                     +" last hole. The adjustment from the first holeto the last is 2 inches. There are five holes. To measure for your dog, use a"
							 +" cloth tape measure or a piece of string andmeasure snugly, but not tightly around your dog's neck. This will be the small"
							 +" length of the collar. This leaves up to 2 inchesto lengthen the collar to make it fit comfortably.");
	  }
	  else if($(e.target).attr('id') == 'shipping'){
	    $('#tabContent').html("<span class='largeTxt'>Shipping:</span><br />Leaves our warehouse in 1-3 business days. *<br/><br/>"
                              +"<span class='largeTxt'>Holiday Return Policy:</span><br/>We will give you a full refund on new and unopened items that you"
							  +" purchase Nov. 1 - Dec. 31, if you return them within 30 days of delivery, or by Jan. 31 whichever date is later.<br/>"
                              +"<a href='javascript: petShop.showPopUp()'>More details &#187;</a><br/><br/>"
                              +"* For your safety, some orders go through our loss prevention department. If we select your order for this process, we will"
							  +" immediately notify you that there may be up to a 3-day delay on your order.<br/><br/>"
                              +" <span class='largeTxt'>Standard Shipping:</span><br/> Our standard shipping method is ground shipping. You should receive "
							  +"your products within 5-10 business days from the day you order them.<br/><a href='javascript: showPopUp();'>More details &#187;</a><br/><br/>"
                              +"<span class='largeTxt'>Expedited Shipping:</span><br/>We offer Next Day, 2 Day, and 3 Day shipping for most items. "
							  +"Expedited shipping is not available for items being shipped to PO Boxes or APO/FPO destinations. For more information on "
							  +"this please view our Expedited Shipping page.<br/><a href='javascript: petShop.showPopUp();'>More details &#187;</a>");
	  }
	}
  },
  
  showPopUp : function(){
    $('#window').show();  
  },
  hidePopUp : function(){
    $('#window').hide();
  }
};