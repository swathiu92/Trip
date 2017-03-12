(function () {
    var app = angular.module("ttuApp");
    app.factory('ShareDataService', ["$http", "$q", "$log", ShareDataService]);

    function ShareDataService(){
    	var dataObject = {};
    	

 	    function getSharedData(){
	    	return dataObject;
	    }
 	    function getSharedDataForKey(key){
	    	return dataObject[key];
	    }
	    function setSharedData(data,key){
	    	dataObject[key]=data[key];
	    }	    
	    function setSharedDataForKey(data,key){
	    	dataObject[key]=data;
	    }
	    var service = {
        		getSharedData : getSharedData,
        		setSharedData : setSharedData,
        		getSharedDataForKey : getSharedDataForKey,
        		setSharedDataForKey:setSharedDataForKey
            };
        return service;
    }
})();