var reflect = require("reflect-metadata");
var component = require("../pages/setAlarm/setAlarm.component");
var appSettings = require("application-settings");


describe("Tests for /pages/setAlarm/setAlarm.component.ts", function() {

  var setAlarmComponent;
  beforeEach(function() {
     setAlarmComponent = new component.SetAlarmPage();
  });
  describe("#configureTime()", function(){
    it("Verifies that configureTime set a default time value", function() {
      var timePicker = jasmine.createSpyObj('timePicker', ['hour', 'minute']);
      appSettings.setNumber("hour", 9);
      appSettings.setNumber("minute", 25);
      setAlarmComponent.configureTime(timePicker);
      expect(timePicker.hour).toEqual(9);
      expect(timePicker.minute).toEqual(25);
    });
  });
  describe("#saveTime()", function(){

    var timePicker
    
    beforeEach(function(){
      timePicker = jasmine.createSpyObj('timePicker', ['hour', 'minute']);
      timePicker.hour = 12;
      timePicker.minute = 10;
      spyOn(setAlarmComponent, '_routeToList')
    })

    it("is able to save a set hour and minute value", function() {
      setAlarmComponent.saveTime(timePicker);
      expect(appSettings.getNumber("hour")).toEqual(12);
      expect(appSettings.getNumber("minute")).toEqual(10);
    });

    it("is able to call the router function", function() {
      setAlarmComponent.saveTime(timePicker);
      expect(setAlarmComponent._routeToList).toHaveBeenCalled();
    });


    it("is able to save a set plusDays value for today", function() {
      spyOn(setAlarmComponent, '_isSelectedTimeTomorrow').and.returnValue(false);
      setAlarmComponent.saveTime(timePicker);
      expect(appSettings.getNumber("plusDays")).toEqual(0);
    });

    it("is able to save a set plusDays value for tomorrow", function() {
      spyOn(setAlarmComponent, '_isSelectedTimeTomorrow').and.returnValue(true);
      setAlarmComponent.saveTime(timePicker);
      expect(appSettings.getNumber("plusDays")).toEqual(1);

    });

  });

  // it("is able to save a set task value", function() {
  // });
  // describe("")
});
