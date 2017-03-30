angular.module('ttuApp')
    .constant('CONSTANTS', {
        searchmodel: {
            "oneway": {
				"travelType": "oneway",
				"itineraryDetails":{
					"from":"",
					"to": "",
					"departure": new Date()
				},
				"travelInfo": {
					"fares": [],
					"totalFares": 0,
					"baggage": "",
					"baggageDetails": {},
					"baggagePrice": 0,
					"mealDetails": {},
					"mealsPrice": 0,
					"meals": [],
					"totalExtraPrice": 0
				},
				"travellerDetails": {
				    "adult": 1,
					"infant": 0,
					"child": 0,
					"adultprice": 0,	
					"childprice": 0,
					"infantprice": 0,
					"travellerInfo": [],
					"email":"",
					"code":"",
					"contact":"",
					"insurance":""
				}, 
                "bookDetails": [],
                "localObj": {}
            },
			"roundtrip":{
				"travelType":"roundtrip",
				"itineraryDetails":{
					"from":"",
					"to": "",
					"departure": new Date(),
					"arrival": new Date()
				},
				"travelInfo": {
					"fares": [],
					"totalFares": 0,
					"baggage": "",
					"baggageDetails": {},
					"baggagePrice": 0,
					"mealDetails": {},
					"mealsPrice": 0,
					"meals": [],
					"totalExtraPrice": 0
				},
				"travellerDetails": {
				    "adult": 1,
					"infant": 0,
					"child": 0,
					"adultprice": 0,	
					"childprice": 0,
					"infantprice": 0,
					"travellerInfo": [],
					"email":"",
					"code":"",
					"contact":"",
					"insurance":""
				}, 
                "bookDetails": [],
                "localObj": {}
				
			},
			"multi":{
			"travelType": "multi",
				"itineraryDetails":{
					"cities": []
				},
				"travelInfo": {
					"fares": [],
					"totalFares": 0,
					"baggage": "",
					"baggageDetails": {},
					"baggagePrice": 0,
					"mealDetails": {},
					"mealsPrice": 0,
					"meals": [],
					"totalExtraPrice": 0
				},
				"travellerDetails": {
				    "adult": 1,
					"infant": 0,
					"child": 0,
					"adultprice": 0,	
					"childprice": 0,
					"infantprice": 0,
					"travellerInfo": [],
					"email":"",
					"code":"",
					"contact":"",
					"insurance":""
				}, 
                "bookDetails": [],
                "localObj": {}
			},
			"travelType": "",
			"localObj": {}
        },
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        travelTypes: ["oneway", "roundtrip", "multi"]
		

    });