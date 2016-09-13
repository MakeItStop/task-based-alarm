var reflect = require("reflect-metadata");
var component = require("../pages/slider/slider.component");

describe("Tests for /pages/slider/slider.component.ts", function() {

  var sliderComponent;
  beforeEach(function() {
     sliderComponent = new component.SliderPage();

  });

  it("Counter begins at 0", function() {
    expect(sliderComponent.sliderCounter).toEqual(0);
  })

  it("Maxed slider increases counter by 1", function() {
    var slider = jasmine.createSpyObj('slider', ['value', 'maxValue']);
    slider.value = 10;
    slider.maxValue = 10;
    sliderComponent.valueChanged(slider);
    expect(sliderComponent.sliderCounter).toEqual(1);
    expect(sliderComponent._taskStop()).toHaveBeenCalled;
  })

  it("User interaction is false after slider is maxed", function() {
    var slider = jasmine.createSpyObj('slider', ['isUserInteractionEnabled', 'value', 'maxValue']);
    slider.value = 10;
    slider.maxValue = 10;
    slider.isUserInteractionEnabled = true;
    sliderComponent.valueChanged(slider);
    expect(slider.isUserInteractionEnabled).toBeFalse;

  })

  it("Task is complete with all sliders maxed out", function() {
    spyOn(sliderComponent, 'routeToHome');
    sliderComponent.sliderCounter = 5;
    sliderComponent._taskStop();
    expect(sliderComponent._stopAlarm()).toHaveBeenCalled;
    expect(sliderComponent.routeToHome).toHaveBeenCalled;

  })


})
