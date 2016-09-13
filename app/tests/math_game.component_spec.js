var reflect = require("reflect-metadata");
var component = require("../pages/math_game/math_game.component");

describe("Tests for MathGame component", function() {

  var MathGame;
  beforeEach(function() {
     MathGame = new component.MathGame();
     MathGame.num1 = 20;
     MathGame.num2 = 20;
     MathGame.num3 = 20;
     MathGame.num4 = 20;
  });

  it("should display a math question", function() {
    expect(MathGame.question).toBe("What is 20+20-20-20?");
  });

  it("should output a feedback message when task is complete", function() {
    MathGame._answer = 0
    expect(MathGame.message).toBe("Correct!!");
  })

  it("should output a feedback message when task is incomplete", function() {
    MathGame._answer = 1
    expect(MathGame.message).toBe("Try again");
  })

})
