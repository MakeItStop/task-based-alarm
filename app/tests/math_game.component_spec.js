var reflect = require("reflect-metadata");
var component = require("../pages/math_game/math_game.component");

describe("Tests for MathGame component", function() {

  var MathGame;
  beforeEach(function() {
     MathGame = new component.MathGame();
  });

  it("Verify math question", function() {
    jasmine.createSpyObj('MathGame', ['num1','num2','num3','num4']);
    MathGame.num1 = 20;
    MathGame.num2 = 20;
    MathGame.num3 = 20;
    MathGame.num4 = 20;
    expect(MathGame.question).toBe("What is 20+20-20-20?");
  });


})
