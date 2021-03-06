﻿(function () {
	"use strict";
	var commonApp = angular.module("common.services", ["ngResource"]);
commonApp 		
    .factory('ShareDataService',
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
    });
}());