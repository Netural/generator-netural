<% if(includeNeturalNotice) {%>
if(typeof console !== 'undefined' && typeof console.log !== 'undefined') {
	console.log('Crafted and created by Netural. Visit www.netural.com');
} else {
	console = {};
	console.log = console.error = function() {};
}
<% } %>
