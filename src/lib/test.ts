type Shape = "circle" | "square" | "triangle";

  

function getArea(shape: Shape) {
  switch (shape) {
    case "circle": return 3.14;
    case "square": return 4;
    case "triangle": return 0.5;
    default:
      const check: never = shape;
      return check;
  }
}

function find<T>(value : T): T {
  return value;
}

const result = find<number>(42);
