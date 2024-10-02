<script>
    let grid = Array.from({ length: 10 }, () => Array(10).fill(null));
    let element = 'wall'; // default element to place
  
    function handleClick(row, col) {
      if (grid[row][col] === element) {
        grid[row][col] = null; // remove element if clicked again
      } else {
        grid[row][col] = element; // place the element
      }
    }
  
    function setElement(newElement) {
      element = newElement;
    }
  </script>
  
  <style>
    .grid {
      display: grid;
      grid-template-columns: repeat(10, 40px);
      gap: 1px;
    }
    .cell {
      width: 40px;
      height: 40px;
      border: 1px solid #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .wall {
      background-color: gray;
    }
    .door {
      background-color: brown;
    }
    .light {
      background-color: yellow;
    }
  </style>
  
  <div>
    <div>
      <button on:click={() => setElement('wall')}>Wall</button>
      <button on:click={() => setElement('door')}>Door</button>
      <button on:click={() => setElement('light')}>Light</button>
    </div>
    
    <div class="grid">
      {#each grid as row, rowIndex}
        {#each row as cell, colIndex}
          <div
            class="cell {cell}"
            role="button"
            tabindex="0"
            on:click={() => handleClick(rowIndex, colIndex)}
            on:keydown={(e) => e.key === 'Enter' || e.key === ' ' ? handleClick(rowIndex, colIndex) : null}
            class:wall={cell === 'wall'}
            class:door={cell === 'door'}
            class:light={cell === 'light'}
          >
            {cell ? cell.charAt(0).toUpperCase() : ''}
          </div>
        {/each}
      {/each}
    </div>
  </div>
  