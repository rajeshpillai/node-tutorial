function Square(side) {
    function area () {
      return side * side;
    }
    return {
      area: area
    }
}

module.exports = Square;