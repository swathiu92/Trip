angular.module('ttuApp')
    .constant('CONSTANTS', {
        searchmodel: {
            "arrival": new Date(),
            "departure": new Date(),
            "adult": 1,
            "adultprice": 0,
            "arrivalDate": "",
            "arrivalDay": "",
            "arrivalMonth": "",
            "arrivalYear": "",
            "baggage": "",
            "baggageDetails": {},
            "baggagePrice": 0,
            "bookDetails": [],
            "childprice": 0,
            "departureDate": "",
            "departureDay": "",
            "departureMonth": "",
            "departureYear": "",
            "fares": [],
            "from": "",
            "infantprice": 0,
            "mealDetails": {},
            "mealsPrice": 0,
            "showContainer": "",
            "to": "",
            "totalExtraPrice": 0,
            "totalFares": 0,
            "totalPrice": 0,
            "infant": 0,
            "child": 0,
            "cities": [],
            "meals": []
        },
		months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    });