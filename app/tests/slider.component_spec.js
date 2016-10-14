var reflect = require("reflect-metadata");
var component = require("../pages/slider/slider.component");

describe("Tests for /pages/slider/slider.component.ts", function() {

  var sliderComponent;
  beforeEach(function() {
     sliderComponent = new component.SliderPage();
  });

  it("Task is incomplete when sum is incorrect, totalMessage is updated", function(){
    sliderComponent._expectedSum = 20;
    sliderComponent._taskStop(15);
    expect(sliderComponent.totalMessage).toEqual("Current total: 15");
    expect(sliderComponent.alarmOff).not.toHaveBeenCalled;
    expect(sliderComponent.routeToHome).not.toHaveBeenCalled;
  })

  it("Task is complete when sum is matched", function() {
    spyOn(sliderComponent, 'routeToHome');
    spyOn(sliderComponent, 'alarmOff');
    sliderComponent._expectedSum = 20;
    sliderComponent._taskStop(20);
    expect(sliderComponent.alarmOff).toHaveBeenCalled;
    expect(sliderComponent.routeToHome).toHaveBeenCalled;
  });

});
