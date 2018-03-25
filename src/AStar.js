import PriorityQueue from 'js-priority-queue';

export function AStar(graph, start, end, heuristic) {
  const search = new PriorityQueue({
    comparator: (a, b) => {
      return (a.len + heuristic(a, end)) - (b.len + heuristic (b, end))
    },
    initialValues: [{len: 0, x: start.x, y: start.y}]
  });

  const isEnd = (node) => (node.x === end.x && node.y === end.y);

  while(!isEnd(search.peek())) {
    const next = search.dequeue();
    graph[next.x][next.y].map(node => {
      search.queue({len: next.len + 1,
      x: node.x, y: node.y, prev: next});
    });
  }
  const path = [search.dequeue()];
  while(path[path.length-1].prev) { path.push(path[path.length-1].prev) }
  return path.map(node => {return {x:node.x, y:node.y}});
}

export function gridToGraph(xMax,yMax) {
  const graph = [];
  for (let x = 0; x < xMax; x++) {
    graph[x] = [];
    for (let y = 0; y < yMax; y++) {
      graph[x][y] = [];
      if (x > 0) graph[x][y].push({x:x-1,y});
      if (y > 0) graph[x][y].push({x,y:y-1});
      if (x < xMax-1) graph[x][y].push({x:x+1,y});
      if (y < yMax-1) graph[x][y].push({x,y:y+1});
      if (x > 0 && y > 0) graph[x][y].push({x:x-1,y:y-1});
      if (x < xMax-1 && y > 0) graph[x][y].push({x:x+1,y:y-1});
      if (x > 0 && y < yMax-1) graph[x][y].push({x:x-1,y:y+1});
      if (x < xMax-1 && y < yMax-1) graph[x][y].push({x:x+1,y:y+1});
    }
  }
  return graph;
}

export function euclidean(curr, end) {
  const xdiff = curr.x - end.x;
  const ydiff = curr.y - end.y;
  return Math.sqrt(xdiff * xdiff + ydiff * ydiff);
}
