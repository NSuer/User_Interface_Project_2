<script>
    export let lightState = { row: 0, col: 0, state: 'off', color: 'white', brightness: 0 };
  
    // Define the grid size
    const rows = 5;
    const cols = 5;
    let grid = Array.from({ length: rows }, () => Array(cols).fill(null));
  
    function toggleWall(row, col) {
      grid[row][col] = grid[row][col] === 'wall' ? null : 'wall';
    }
  
    function toggleLight(row, col) {
      // Remove the light if it's already placed here
      if (lightState.row === row && lightState.col === col) {
        lightState = { row: 0, col: 0, state: 'off', color: 'white', brightness: 0 };
      } else {
        lightState = { row, col, state: 'on', color: lightState.color, brightness: lightState.brightness };
      }
    }
  </script>
  
  <style>
    .grid {
      display: grid;
      grid-template-columns: repeat(5, 60px);
      gap: 5px;
    }
    .cell {
      width: 60px;
      height: 60px;
      border: 1px solid #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background-color: #f9f9f9;
    }
    .wall {
      background-color: gray;
    }
    .lightbulb {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
  </style>
  
  <div class="grid">
    {#each Array(rows) as _, rowIndex}
      {#each Array(cols) as _, colIndex}
        <button
          class="cell {grid[rowIndex][colIndex]}"
          on:click={() => toggleLight(rowIndex, colIndex)}
          on:contextmenu|preventDefault={() => toggleWall(rowIndex, colIndex)} 
          on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleLight(rowIndex, colIndex); }}
          aria-label="Toggle light or wall"
          style="cursor: {grid[rowIndex][colIndex] ? 'not-allowed' : 'pointer'}"
        >
          {#if grid[rowIndex][colIndex] === 'wall'}
            <div class="wall"></div>
          {/if}
          {#if lightState.row === rowIndex && lightState.col === colIndex}
            <div
              class="lightbulb"
              style="background-color: {lightState.state === 'on' ? lightState.color : 'transparent'}; opacity: {lightState.state === 'on' ? lightState.brightness / 100 : 0};"
            ></div>
          {/if}
        </button>
      {/each}
    {/each}
  </div>
  
  <p>Right-click to toggle walls.</p>
  
  