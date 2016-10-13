var reflect = require("reflect-metadata");
var component = require("../pages/maths/maths.component");
var appSettings = require("application-settings");

describe("Tests for MathGame component", function() {

  var MathGame;
  beforeEach(function() {
    spyOn(Math,'random').and.returnValue(1);
    spyOn(appSettings, 'getNumber').and.returnValue(10);
    MathGame = new component.MathsPage();   
  });

  describe("#question", function(){
    it("should display a math question", function() {
      expect(MathGame.question).toBe("What is 100+100+100+100?");
    });
  });

  describe("#message", function(){
    it("should output a feedback message when task is complete", function() {
      MathGame.answer = 400;
      expect(MathGame.message).toBe("Correct!!");
    })

    it("should output a feedback message when task is incomplete", function() {
      MathGame.answer = 1;
      expect(MathGame.message).toBe("Try again");
    })
  });


})
