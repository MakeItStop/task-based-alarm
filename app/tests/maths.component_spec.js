var reflect = require("reflect-metadata");
var component = require("../pages/maths/maths.component");

describe("Tests for MathGame component", function() {

  var MathGame;
  beforeEach(function() {
     spyOn(Math,'random').and.returnValue(0.7)
     MathGame = new component.MathsPage();

  });

  describe("#question", function(){
    it("should display a math question", function() {
      expect(MathGame.question).toBe("What is 20+20+20+20?");
    });
  });

  describe("#message", function(){
    it("should output a feedback message when task is complete", function() {
      MathGame.answer = 80
      expect(MathGame.message).toBe("Correct!!");
    })

    it("should output a feedback message when task is incomplete", function() {
      MathGame.answer = 1
      expect(MathGame.message).toBe("Try again");
    })
  });


})
