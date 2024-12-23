import { PriorityQueue } from "typescript-collections";
import { findOppositDirection, ValidGridDirection } from "../directionHelper";
import Coordinates from "./coordinates";
import GridHandler from "./grid";
import { dijkstraConfig, queueState } from "./models/dijkstra";

export default class Dijkstra {
  grid!: GridHandler;
  config: dijkstraConfig;

  constructor (grid: GridHandler, config: dijkstraConfig) {
    this.grid = grid;
    this.config = config;
  }

  findAllShortestRoutes() {
    const validRoutes: Set<Map<string, number>> = new Set();
    const priorityQueue: queueState[] = [];
    const visited = new Map<string, number>();

    const initialQueueItem: queueState = {
      cost: 0,
      facing: this.config.startDir,
      location: this.config.startLocation,
      route: new Map<string, number>().set(this.config.startLocation.coordinatesAsKey, 0),
    };

    priorityQueue.push(initialQueueItem);

    const MAX_STEPS = Infinity;
    let stepCounter = 0;

    while (priorityQueue.length > 0 && MAX_STEPS > stepCounter) {
      priorityQueue.sort((a, b) => a.cost - b.cost);

      stepCounter++;
      // console.log('########## SEPERATOR ##########');
      // console.log(priorityQueue);

      if (stepCounter + 1 === MAX_STEPS) {
        console.log(priorityQueue);
      }
      
      const currentNode = priorityQueue.shift();
      if (!currentNode) continue;

      if (visited.has(currentNode.location.coordinatesAsKey) && visited.get(currentNode.location.coordinatesAsKey)! < currentNode.cost) continue;
      visited.set(currentNode.location.coordinatesAsKey, currentNode.cost);

      // console.log(currentNode.cost);

      if (currentNode.location.equals(this.config.endLocation)) { // End of the path found
        validRoutes.add(currentNode.route);
      }

      // console.log(this.findAdjecent(currentNode.location, currentNode.facing, currentNode.route));
      this.findAdjecent(currentNode.location, currentNode.facing, currentNode.route).forEach((neighbor) => {
        const newCost = currentNode.cost + neighbor.cost;
        const newQueueItem: queueState = {
          cost: newCost,
          facing: neighbor.facing,
          location: neighbor.coordinates,
          route: new Map<string, number>(currentNode.route).set(neighbor.coordinates.coordinatesAsKey, newCost),
        };

        // console.log('newQueueItem', newQueueItem);
        

        priorityQueue.push(newQueueItem);
      });
    }

    return validRoutes;
  }

  findSingleShortestRoute(): queueState | null {
    const priorityQueue: queueState[] = [];
    const visited = new Map<string, number>();

    const initialQueueItem: queueState = {
      cost: 0,
      facing: this.config.startDir,
      location: this.config.startLocation,
      route: new Map<string, number>().set(this.config.startLocation.coordinatesAsKey, 0),
    };

    priorityQueue.push(initialQueueItem);

    const MAX_STEPS = Infinity;
    let stepCounter = 0;

    while (priorityQueue.length > 0 && MAX_STEPS > stepCounter) {
      priorityQueue.sort((a, b) => a.cost - b.cost);

      stepCounter++;
      // console.log('########## SEPERATOR ##########');
      // console.log(priorityQueue);

      if (stepCounter + 1 === MAX_STEPS) {
        console.log(priorityQueue);
      }
      
      const currentNode = priorityQueue.shift();
      if (!currentNode) continue;

      if (visited.has(currentNode.location.coordinatesAsKey) && visited.get(currentNode.location.coordinatesAsKey)! < currentNode.cost) continue;
      visited.set(currentNode.location.coordinatesAsKey, currentNode.cost);

      // console.log(currentNode.cost);

      if (currentNode.location.equals(this.config.endLocation)) { // End of the path found
        return currentNode;
      }

      // console.log(this.findAdjecent(currentNode.location, currentNode.facing, currentNode.route));
      this.findAdjecent(currentNode.location, currentNode.facing, currentNode.route).forEach((neighbor) => {
        const newCost = currentNode.cost + neighbor.cost;
        const newQueueItem: queueState = {
          cost: newCost,
          facing: neighbor.facing,
          location: neighbor.coordinates,
          route: new Map<string, number>(currentNode.route).set(neighbor.coordinates.coordinatesAsKey, newCost),
        };

        // console.log('newQueueItem', newQueueItem);
        

        priorityQueue.push(newQueueItem);
      });
    }

    return null;
  }

  findAdjecent(
    coordinates: Coordinates,
    currentFacing: ValidGridDirection,
    visited: Map<string, number>
  ) {
    const neighbors = this.grid.calculateAvailableDirections(coordinates, this.config.wallChar);

    return neighbors.map((neighborDir) => {
      const newCoordinates = coordinates.getCoordinatesInDirection(neighborDir);
      const newCost = currentFacing === neighborDir ? this.config.walkCost : this.config.turnCost + this.config.walkCost;

      if (visited.has(newCoordinates.coordinatesAsKey)) return null;

      if (neighborDir === findOppositDirection(currentFacing)) return null;

      return {
        cost: newCost,
        coordinates: newCoordinates,
        facing: neighborDir
      }
    }).filter((neighbor) => neighbor !== null);
  }
}
