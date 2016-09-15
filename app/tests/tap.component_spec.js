var reflect = require("reflect-metadata");
var component = require("../pages/tap/tap.component");

describe("Tests for /pages/tap/tap.component.ts", function() {

  var tapComponent;
  beforeEach(function() {
     tapComponent = new component.TapPage();

  });

  it("Verify default message", function() {
    expect(tapComponent.message).toBe("16 taps left");
  });

  it("Decrease the tap count", function() {
    tapComponent.onTap();
    expect(tapComponent.message).toBe("15 taps left");
  });

  it("Verify completed task message", function(){
    spyOn(tapComponent, 'routeToHome');
    spyOn(tapComponent, 'alarmOff');
    var n = 16;
    while (n--){
      tapComponent.onTap();
    }
    expect(tapComponent.message).toBe("Make It Stop!");
    tapComponent.onTap();
    expect(tapComponent.routeToHome).toHaveBeenCalled();
  });

});
