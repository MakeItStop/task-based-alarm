var reflect = require("reflect-metadata");
var component = require("../pages/alarm/alarm.component");

describe("Tests for /pages/alarm/alarm.component.ts", function() {

  var alarmComponent;
  beforeEach(function() {
     alarmComponent = new component.AlarmPage();
  });

  it("Verify default message", function() {
    expect(alarmComponent.message).toBe("16 taps left");
  });

  it("Decrease the tap count", function() {
    alarmComponent.onTap();
    expect(alarmComponent.message).toBe("15 taps left");
  });

  it("Verify completed task message", function(){
    var n = 16;
    while (n--){
      alarmComponent.onTap();
    };
    expect(alarmComponent.message).toBe("You are awake");
  });
})
