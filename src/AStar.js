import PriorityQueue from 'js-priority-queue';

export function AStar(graph, start, end, heuristic, blocks) {
  const search = new PriorityQueue({
    comparator: (a, b) => {
      return (a.len + heuristic(a, end)) - (b.len + heuristic (b, end))
    },
    initialValues: [{len: 0, x: start.x, y: start.y}]
  });

  const nodeEq = (n1,n2) => (n1.x === n2.x && n1.y === n2.y);
  const isEnd = (node) => nodeEq(node,end);
  const isBlock = (node) => blocks.find(n => nodeEq(n,node));

  while(!isEnd(search.peek())) {
    const next = search.dequeue();
    graph[next.x][next.y].filter(n=>!isBlock(n))
      .map(node => {
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
