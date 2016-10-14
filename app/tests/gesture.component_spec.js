var reflect = require("reflect-metadata");
var component = require("../pages/gesture/gesture.component");
var appSettings = require("application-settings");


describe("Tests for /pages/gesture/gesture.component.ts", function() {

  var gestureComponent;
  beforeEach(function() {
    spyOn(appSettings, 'getNumber').and.returnValue(1);
    gestureComponent = new component.GesturePage();

  });

  it("Verifies default messages", function() {
    expect(gestureComponent.longPressMessage).toBe("Press and hold here x1");
    expect(gestureComponent.swipeMessage).toBe("Swipe LEFT here x1");
    expect(gestureComponent.pinchMessage).toBe("Pinch here x1");
    expect(gestureComponent.rotateMessage).toBe("Rotate here x1");
  });

  it("Long Press Gesture", function() {
    gestureComponent.onLongPress();
    expect(gestureComponent._taskStop()).toHaveBeenCalled;
    expect(gestureComponent.longPressMessage).toEqual("Success!!");
  });

  it("Swipe Gesture", function() {
    var swipeArgs = jasmine.createSpyObj('swipeArgs', ['direction']);
    swipeArgs.direction = 2;
    gestureComponent.onSwipe(swipeArgs);
    expect(gestureComponent._taskStop()).toHaveBeenCalled;
    expect(gestureComponent.swipeMessage).toEqual("Success!!");
  });

  it("Pinch Gesture", function() {
    gestureComponent.onPinch();
    expect(gestureComponent._taskStop()).toHaveBeenCalled;
    expect(gestureComponent.pinchMessage).toEqual("Success!!");
  });

  it("Rotate Gesture", function() {
    var rotateArgs = jasmine.createSpyObj('rotateArgs', ['rotation']);
    rotateArgs.rotation = 91;
    gestureComponent.onRotate(rotateArgs);
    expect(gestureComponent._taskStop()).toHaveBeenCalled;
    expect(gestureComponent.rotateMessage).toEqual("Success!!");
  });

  it("Completes the task", function() {
    spyOn(gestureComponent, 'routeToHome');
    spyOn(gestureComponent, 'alarmOff')
    gestureComponent.longPressCounter = 0;
    gestureComponent.swipeLeftCounter = 0;
    gestureComponent.pinchCounter = 0;
    gestureComponent.rotateCounter = 0;
    expect(gestureComponent.alarmOff).toHaveBeenCalled;
    expect(gestureComponent.routeToHome).toHaveBeenCalled;
  });

});
