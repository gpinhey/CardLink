import PriorityQueue from 'js-priority-queue';

export const Direction = {
  TOP: "T",
  TOPRIGHT: "TR",
  RIGHT: "R",
  BOTTOMRIGHT: "BR",
  BOTTOM: "B",
  BOTTOMLEFT: "BL",
  LEFT: "L",
  TOPLEFT: "TL",
  CENTER: "C"
}

Direction.opposite = (direction) => {
    switch(direction) {
      case Direction.TOP:
      return Direction.BOTTOM;
      case Direction.TOPRIGHT:
      return Direction.BOTTOMLEFT;
      case Direction.RIGHT:
      return Direction.LEFT;
      case Direction.BOTTOMRIGHT:
      return Direction.TOPLEFT;
      case Direction.BOTTOM:
      return Direction.TOP;
      case Direction.BOTTOMLEFT:
      return Direction.TOPRIGHT;
      case Direction.LEFT:
      return Direction.RIGHT;
      case Direction.TOPLEFT:
      return Direction.BOTTOMRIGHT;
      case Direction.CENTER:
      default:
      return Direction.CENTER;
    }
};

export function AStar(graph, start, end, heuristic, blocks) {
  const search = new PriorityQueue({
    comparator: (a, b) => {
      return (a.len + heuristic(a, end)) - (b.len + heuristic (b, end))
    },
    initialValues: [{len: 0, x: start.x, y: start.y, direction: Direction.CENTER}]
  });

  const nodeEq = (n1,n2) => (n1.x === n2.x && n1.y === n2.y);
  const isEnd = (node) => nodeEq(node,end);
  const isBlock = (node) => blocks.find(n=> nodeEq(n,node));

  const visited = [];
  try {
    while(!isEnd(search.peek())) {
      const next = search.dequeue();
      if (!visited[next.x]) visited[next.x] = [];
      graph[next.x][next.y].filter(n=>!visited[next.x][next.y] && (!isBlock(n) || isEnd(n)))
        .map(node => {
        search.queue({len: next.len + node.cost,
        x: node.x, y: node.y, prev: next, direction: node.direction});
      });
      visited[next.x][next.y] = true;
    }
  } catch (e) {
    // No valid path exists
    return [];
  }
  const path = [search.dequeue()];
  while(path[path.length-1].prev) { path.push(path[path.length-1].prev) }
  return path.map(node => {return {x:node.x, y:node.y, direction:node.direction}});
}

export function gridToGraph(xMax,yMax) {
  const graph = [];
  const cardinalCost = 1;
  const diagonalCost = 1.1;
  for (let x = 0; x < xMax; x++) {
    graph[x] = [];
    for (let y = 0; y < yMax; y++) {
      graph[x][y] = [];
      if (x > 0)      graph[x][y].push({x:x-1,y,cost:cardinalCost,
                                        direction:Direction.LEFT});
      if (y > 0)      graph[x][y].push({x,y:y-1,cost:cardinalCost,
                                        direction:Direction.TOP});
      if (x < xMax-1) graph[x][y].push({x:x+1,y,cost:cardinalCost,
                                        direction:Direction.RIGHT});
      if (y < yMax-1) graph[x][y].push({x,y:y+1,cost:cardinalCost,
                                        direction:Direction.BOTTOM});
      if (x > 0 && y > 0)           graph[x][y].push({x:x-1,y:y-1,cost:diagonalCost,
                                                      direction:Direction.TOPLEFT});
      if (x < xMax-1 && y > 0)      graph[x][y].push({x:x+1,y:y-1,cost:diagonalCost,
                                                      direction:Direction.TOPRIGHT});
      if (x > 0 && y < yMax-1)      graph[x][y].push({x:x-1,y:y+1,cost:diagonalCost,
                                                      direction:Direction.BOTTOMLEFT});
      if (x < xMax-1 && y < yMax-1) graph[x][y].push({x:x+1,y:y+1,cost:diagonalCost,
                                                      direction:Direction.BOTTOMRIGHT});
    }
  }
  return graph;
}

export function euclidean(curr, end) {
  const xdiff = curr.x - end.x;
  const ydiff = curr.y - end.y;
  return Math.sqrt(xdiff * xdiff + ydiff * ydiff);
}
