WooZoneCountryCheck = (function ($) {
    "use strict";

    var maincontainer       = null,
    	product_asin		= null,
    	available_countries = [],
    	cc_template 		= null;
    
    // init function, autoload
    (function init() {

        // load the triggers
        $(document).ready(function(){
            maincontainer = $(".WooZone-country-check");
            load_template();
            make_requests();
        });
    })();

    function add_country( new_country )
    {
    	available_countries.push( new_country );
    }

    function load_template()
    {
    	cc_template = maincontainer.find("#WooZone-cc-template").html();
    }

    function set_product_asin( __ )
    {
    	product_asin = __;
    }

    function product_exist( elm, domain )
    {
    	$.ajax({
	        crossDomain: true,
	        type:"GET",
	        processData: false,
	        contentType: "application/json; charset=utf-8",
	        async: true,
			converters: {"* text": window.String, "text html": true, "text json": true, "text xml": jQuery.parseXML},
	        url: "https://www.amazon." + ( domain ) + "/dp/" + product_asin,
	        data: {},
	        dataType: "jsonp",                
	        jsonp: false,
	        complete: function (XMLHttpRequest, textStatus) {
	        	console.log( XMLHttpRequest, textStatus ); 
	        	if( 404 == XMLHttpRequest.status ){
	        		//console.log( domain , "not found" );
	        		elm.find(".WooZone-cc-status").html( "<span class='WooZone-status-unavailable'>not available</span" );
	        	}else{
	        		//console.log( domain , "product valid" );
	        		elm.find(".WooZone-cc-status").html( "<span class='WooZone-status-available'>available</span" );
	        	}
			}
	    });
    }

    function make_requests()
    {
    	$.each( available_countries, function( key, value ){
    		var __ = $(cc_template).clone();
    		__.find(".WooZone-cc_domain").addClass( value.domain.replace(".", "-") );
    		__.find(".WooZone-cc_name").text( value.name );

    		maincontainer.append( __ );

    		product_exist( __, value.domain );
    	} );
    }

    function triggers() 
    {
    }

	// external usage
	return {
		"add_country"		: add_country,
		"set_product_asin"	: set_product_asin,
		"make_requests"		: make_requests
	}
})(jQuery);

