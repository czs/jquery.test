jQuery(document).ready(function($) {
	//alert('ddd');
	//$.test.foo1();
	//$.test.bar1('param');

	$('.hilight').hilight();

var $img1 = $('.c1');
var $img2 = $('.c2');

$img2.each(function(index, el) {
	$(el).attr({
		'th:src': $($img1.get(index)).attr('th:src')
	});
});

console.log($img2.appendTo("#d").html());

});
