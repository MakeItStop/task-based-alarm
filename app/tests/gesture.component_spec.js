var reflect = require("reflect-metadata");
var component = require("../pages/gesture/gesture.component");

describe("Tests for /pages/gesture/gesture.component.ts", function() {

  var gestureComponent;
  beforeEach(function() {
    gestureComponent = new component.GesturePage();
  });

  it("Verifies default messages", function() {
    expect(gestureComponent.longPressMessage).toBe("Press and hold here");
    expect(gestureComponent.swipeMessage).toBe("Swipe LEFT here");
    expect(gestureComponent.pinchMessage).toBe("Pinch here");
    expect(gestureComponent.rotateMessage).toBe("Rotate here");
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
    gestureComponent.longPress = true;
    gestureComponent.swipeLeft = true;
    gestureComponent.pinch = true;
    gestureComponent.rotate = true;
    expect(gestureComponent._stopAlarm()).toHaveBeenCalled;
    expect(gestureComponent.routeToHome).toHaveBeenCalled;
  });

});
