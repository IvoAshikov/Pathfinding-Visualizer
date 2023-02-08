export default function styleChanges(newBoard) {
  const algosDropdown = document.querySelector(".dropdown-algorithm");
  const mazeDropdown = document.querySelector(".dropdown-maze");
  const speedDropdown = document.querySelector(".dropdown-speed");

  document.querySelector(".bfs").addEventListener("click", () => {
    document.querySelector(".visualizer-button").innerHTML = "Visualize BFS!";
    algosDropdown.classList.remove("show");
    algosDropdown.classList.add("hide");
  });

  document.querySelector(".dfs").addEventListener("click", () => {
    document.querySelector(".visualizer-button").innerHTML = "Visualize DFS!";
    algosDropdown.classList.remove("show");
    algosDropdown.classList.add("hide");
  });

  document.querySelector(".algos").addEventListener("click", () => {
    if (algosDropdown.classList.contains("hide")) {
      algosDropdown.classList.add("show");
      algosDropdown.classList.remove("hide");
    } else if (algosDropdown.classList.contains("show")) {
      algosDropdown.classList.add("hide");
      algosDropdown.classList.remove("show");
    }
  });

  document.querySelector(".mazes").addEventListener("click", () => {
    if (mazeDropdown.classList.contains("hide")) {
      mazeDropdown.classList.add("show");
      mazeDropdown.classList.remove("hide");
    } else if (mazeDropdown.classList.contains("show")) {
      mazeDropdown.classList.add("hide");
      mazeDropdown.classList.remove("show");
    }
  });
  document.querySelector(".maze-one").addEventListener("click", () => {
    mazeDropdown.classList.add("hide");
    mazeDropdown.classList.remove("show");
    newBoard.createMazeOne();
  });
  document.querySelector(".maze-two").addEventListener("click", () => {
    mazeDropdown.classList.add("hide");
    mazeDropdown.classList.remove("show");
    newBoard.createMazeTwo();
  });
  document.querySelector(".visualizer-button").addEventListener("click", () => {
    if (document.querySelector(".visualizer-button").innerText === "Visualize BFS!") {
      newBoard.algorithmBFS();
    }
  });
  document.querySelector(".visualizer-button").addEventListener("click", () => {
    if (document.querySelector(".visualizer-button").innerText === "Visualize DFS!") {
      newBoard.algorithmDFS();
    }
  });
  document.querySelector(".fast").addEventListener("click", () => {
    document.querySelector(".speeds").innerText = "Speed: Fast";
    speedDropdown.classList.add("hide");
    speedDropdown.classList.remove("show");
    newBoard.changeSpeed();
  });
  document.querySelector(".average").addEventListener("click", () => {
    document.querySelector(".speeds").innerText = "Speed: Average";
    speedDropdown.classList.add("hide");
    speedDropdown.classList.remove("show");
    newBoard.changeSpeed();
  });
  document.querySelector(".slow").addEventListener("click", () => {
    document.querySelector(".speeds").innerText = "Speed: Slow";
    speedDropdown.classList.add("hide");
    speedDropdown.classList.remove("show");
    newBoard.changeSpeed();
  });
  document.querySelector(".speeds").addEventListener("click", () => {
    if (speedDropdown.classList.contains("hide")) {
      speedDropdown.classList.add("show");
      speedDropdown.classList.remove("hide");
    } else if (speedDropdown.classList.contains("show")) {
      speedDropdown.classList.add("hide");
      speedDropdown.classList.remove("show");
    }
  });
}
