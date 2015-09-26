/*

	Go Balance Clock Library  - v6 -	2015-01-27

	
	Start clock: 
		
		goBalance.clock.start(); // Start clock, every second calculate all avoided emissions
		
		goBalance.clock.startWithAction( [action] ); // Does the same as goBalance.clock.start() and execute function passed [action] every second
	
	Stop clock:
		goBalance.clock.stop();
	
	If you do not want use goBalance.clock.start() or  Before using values about avoided emission, you have to calculate them:		
		
		Calculate based with the date passed as argument
		goBalance.clock.avoidedEmissions().calculate( new Date() ); 
		
		OR
		
		Calculate based with the current date
		goBalance.clock.avoidedEmissions().calculateCurrentDate();
			
	
	Getting avoided emissions data:
		
		Return the value of avoided emissions:
			goBalance.clock.avoidedEmissions().inTCO2e;
			goBalance.clock.avoidedEmissions().inCars;
			goBalance.clock.avoidedEmissions().inFlightsLondonToRio;
			goBalance.clock.avoidedEmissions().inFlightsLondonToNYC;
			goBalance.clock.avoidedEmissions().inFlightsLondonToAbuDhabi;
			goBalance.clock.avoidedEmissions().inIPhones6;
			goBalance.clock.avoidedEmissions().inCheeseburgers;
			goBalance.clock.avoidedEmissions().inCocaCola300mlAluminumCan;
			goBalance.clock.avoidedEmissions().inCocaCola2LPlasticBottle;

		Return object AvoidedEmissions:
		
			goBalance.clock.avoidedEmissionsByKey("cgv");
			goBalance.clock.avoidedEmissionsByKey("cars");
			goBalance.clock.avoidedEmissionsByKey("flightsLondonToRio");
			goBalance.clock.avoidedEmissionsByKey("flightsLondonToNYC");
			goBalance.clock.avoidedEmissionsByKey("flightsLondonToAbuDhabi");
			goBalance.clock.avoidedEmissionsByKey("iPhones6");
			goBalance.clock.avoidedEmissionsByKey("cheeseburgers");
			goBalance.clock.avoidedEmissionsByKey("cocaCola300mlAluminumCans");
			goBalance.clock.avoidedEmissionsByKey("cocaCola2LPlasticBottles");
			
			Using AvoidedEmissions object:
				
				lastCalculateFormatted(); 
				If 12345678.37293749023, return  12,345,678.37
				
				lastCalculateWithDesc(); 
				If object is flightsLondonToRio with value 12345678.37293749023, return  "12,345,678.37  flights from London To Rio"
				
				desc(); 
				If object is flightsLondonToRio, return " flights from London To Rio"
				
				srcImg;
				you can set the image for avoided emissions
			
	
	Getting random avoided emissions:
		
		// Choose randomly a key string of avoided emissions
		goBalance.clock.newRandomKeyAvoidedEmissions(); 
		
		// Return the key string randomly chosen: "cgv", "cars", "flightsLondonToRio", "flightsLondonToNYC", "flightsLondonToAbuDhabi", "iPhones6", "cheeseburgers", "cocaCola300mlAluminumCans", "cocaCola2LPlasticBottles"  
		goBalance.clock.randomKeyAvoidedEmissions(); 
		
		// Return object AvoidedEmissions
		goBalance.clock.avoidedEmissionsChosenRandomly();
	
	
	
	Release notes:

		v6
			* In AvoidedEmissions class, new property srcImg, which can set url of image avoided emission  
			
		v5.1
			* goBalance.clock.chooseKeyRandomlyChoseAvoidedEmission() changed to "goBalance.clock.newRandomKeyAvoidedEmissions()" 
			* goBalance.clock.keyRandomlyChoseAvoidedEmission() changed to "goBalance.clock.randomKeyAvoidedEmissions()" 
			* goBalance.clock.avoidedEmissionsChoseRandomly() changed to "goBalance.clock.avoidedEmissionsChosenRandomly()" 
			* In AvoidedEmissions class: lastCalculateFormated() to valueFormatted(); lastCalculateWithDesc() to valueWithDesc()

		v5.00
			* Random avoided emissions
			* start and stop clock functions
			* AvoidedEmissions class has new function lastCalculateFormated(), lastCalculateWithDesc(), desc()
	
*/

var goBalance = goBalance || {};

goBalance.clock = goBalance.clock || {};

goBalance.clock = (function () {

	"use strict";

	var dateTimeProjectStart = new Date(2011, 5, 10, 0, 0, 0),

		Interval = function Interval(d1, d2) {
			var seconds = parseInt((d2.getTime() - d1.getTime()) / 1000, 10);
			this.initial = function () { return d1;};
			this.end = function () { return d2;};
			this.inSeconds = function () {return seconds;};
		},
	
		AvoidedEmissions = function(perYear, desc, srcImg) {
			var lastCalculation = 0.0;
			this.value = function() { return lastCalculation; };
			this.desc = function(){	return desc;	};
			this.calculate = function(seconds){
				lastCalculation = seconds * (perYear / 365 / 24 / 3600);
				return lastCalculation;	
			};
			this.valueFormatted = function() {
				return formatNumber(lastCalculation) ;
			};		
			this.valueWithDesc = function() {
				return this.valueFormatted() + " " + desc;
			};
			this.srcImg = srcImg;
		};
	
	/**
	 * Returns a random integer between min (inclusive) and max (inclusive)
	 * Using Math.round() will give you a non-uniform distribution!
	 */
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	function formatNumber(number){
		return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
	}	
	
	
	var allAvoidedEmissions = {};
	
	allAvoidedEmissions.cgv = new AvoidedEmissions(7702808, " tCO2e", "");		
	allAvoidedEmissions.cars = new AvoidedEmissions(1638895, " cars", "http://go-balance.com/wp-content/uploads/2014/12/car.png");
	allAvoidedEmissions.flightsLondonToRio = new AvoidedEmissions(5925237, " flights from London To Rio", "http://go-balance.com/wp-content/uploads/2014/12/airplane.png");
	allAvoidedEmissions.flightsLondonToNYC = new AvoidedEmissions(10698344.4, " flights from London To NYC", "http://go-balance.com/wp-content/uploads/2014/12/airplane.png");
	allAvoidedEmissions.flightsLondonToAbuDhabi = new AvoidedEmissions(10003646.7, " flights from London To AbuDhabi", "http://go-balance.com/wp-content/uploads/2014/12/airplane.png");
	allAvoidedEmissions.iPhones6 = new AvoidedEmissions(81082189, " iPhones 6", "http://go-balance.com/wp-content/uploads/2014/12/iPhone.png");
	allAvoidedEmissions.cheeseburgers = new AvoidedEmissions(2484776774.2, " cheeseburgers", "http://go-balance.com/wp-content/uploads/2014/12/burger.png");
	allAvoidedEmissions.cocaCola300mlAluminumCans = new AvoidedEmissions(45310635294.1, " CocaCola 300ml aluminum cans", "http://go-balance.com/wp-content/uploads/2014/12/can.png");
	allAvoidedEmissions.cocaCola2LPlasticBottles  = new AvoidedEmissions(15405616000, " CocaCola 2L plastic bottles", "http://go-balance.com/wp-content/uploads/2014/12/bottle.png");		
	
	
	// From http://stackoverflow.com/questions/18912932/object-keys-not-working-in-internet-explorer
	// Object.keys is not avaiable in IE < 9
	if (!Object.keys) {
		Object.keys = function(obj) {
			var keys = [];

			for (var i in obj) {
				if (obj.hasOwnProperty(i)) {
					keys.push(i);
				}
			}

			return keys;
		};
	}
	
								
	var randomKeyAvoidedEmissions,
	
		newRandomKeyAvoidedEmissions = function() {								
			var keys = Object.keys(allAvoidedEmissions),			
				idRandomComparison = getRandomInt(1, keys.length - 1); // choose random avoided emission, except allAvoidedEmissions.CGV ( index = 0)
			
			randomKeyAvoidedEmissions = keys[idRandomComparison];
			
			return randomKeyAvoidedEmissions;
		},

		randomKeyAvoidedEmissionsWithCheck = function() {
			if(typeof randomKeyAvoidedEmissions === 'undefined'){
				newRandomKeyAvoidedEmissions();
			}
			return randomKeyAvoidedEmissions;
		},
	
		calculateAvoidedEmissions = function(currentDate) {
				
			var interval = new Interval(dateTimeProjectStart, currentDate);
			
			for(var key in allAvoidedEmissions){
				allAvoidedEmissions[key].calculate(interval.inSeconds());
			}
						
		},
		
		intervalID = void 0,
		currentDate = new Date(),
		externalActionClock,
		
		stopClock = function() {
		
			if(typeof intervalID !== 'undefined'){
				clearInterval(intervalID);
			}
			
			intervalID = void 0;
			
		},
			
		startClock = function(action) {
			
			externalActionClock = action;
			
			stopClock();
			
			intervalID = setInterval(function() {
			
				currentDate = new Date(); 
				
				calculateAvoidedEmissions(currentDate); 
				
				if(typeof externalActionClock === 'function'){
					externalActionClock();			
				}
				
			},1000);
			
		};

	return {
	
		start: function() {
			startClock(void 0);
		},
		
		startWithAction: function (action) {
			startClock(action);
		},
		
		stop: stopClock,
		
		date: function(){
			return currentDate;
		},
	
		randomKeyAvoidedEmissions: function() {		
			return randomKeyAvoidedEmissionsWithCheck();			
		},
				
		newRandomKeyAvoidedEmissions: function() {
			newRandomKeyAvoidedEmissions();
		},

		avoidedEmissionsChosenRandomly: function() {
			
			return allAvoidedEmissions[randomKeyAvoidedEmissionsWithCheck()];
			
		},

		avoidedEmissionsByKey: function(keyAvoidedEmissions) {
			
			return allAvoidedEmissions[keyAvoidedEmissions];
		
		},		
		
		
		avoidedEmissions: function() {
			return {
			
				inTCO2e: allAvoidedEmissions.cgv.value(),
				inCars: allAvoidedEmissions.cars.value(),
				inFlightsLondonToRio: allAvoidedEmissions.flightsLondonToRio.value(),
				inFlightsLondonToNYC: allAvoidedEmissions.flightsLondonToNYC.value(),
				inFlightsLondonToAbuDhabi: allAvoidedEmissions.flightsLondonToAbuDhabi.value(),
				inIPhones6: allAvoidedEmissions.iPhones6.value(),
				inCheeseburgers: allAvoidedEmissions.cheeseburgers.value(),
				inCocaCola300mlAluminumCan: allAvoidedEmissions.cocaCola300mlAluminumCans.value(),
				inCocaCola2LPlasticBottle: allAvoidedEmissions.cocaCola2LPlasticBottles.value(),
				
				
				calculate: function(currentDate) {
					calculateAvoidedEmissions(currentDate);					
				},
				
				calculateCurrentDate: function() {
					calculateAvoidedEmissions(new Date());
				},
				
				byKey: function(keyAvoidedEmissions) {
			
					return allAvoidedEmissions[keyAvoidedEmissions];
		
				}
				
				
			};
		}
		
	};
	
})();


