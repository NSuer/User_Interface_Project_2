<script>
  const gridWidth = 40;  // In Columns
  const gridHeight = 30; // In Rows

  // Generate a basic floor plan with walls and doors
  const grid = Array.from({ length: gridHeight }, (_, rowIndex) => {
    return Array.from({ length: gridWidth }, (_, colIndex) => {
      // Define walls and doors
      if (
        // Doorway into apartment
        (rowIndex === Math.floor(gridHeight * 0.0) && colIndex === Math.floor(gridWidth * 0.33))
        // Doorway into bedroom
        || (rowIndex === Math.floor(gridHeight * 0.5) && colIndex === Math.floor(gridWidth * 0.33))
        // Doorway into bathroom
        || (rowIndex === Math.floor(gridHeight * 0.65) && colIndex === Math.floor(gridWidth * 0.23))
        // Doorway into closet
        || (rowIndex === Math.floor(gridHeight * 0.8) && colIndex === Math.floor(gridWidth * 0.33))
        // Doorway into kitchen
        || (rowIndex === Math.floor(gridHeight * 0.1) && colIndex === Math.floor(gridWidth * 0.23))
      ) {
        return 'door'; // Wall on edges
      } 
      // Define doors
      else if (rowIndex === 0 || rowIndex === gridHeight - 1 || colIndex === 0 || colIndex === gridWidth - 1) {
        return 'wall'; // Specific door positions
      } 
      // Define room areas
      else if (
        // Kitchen: Outline
        (rowIndex === Math.floor(gridHeight * 0.0) && colIndex >= Math.floor(gridWidth * 0.0) && colIndex <= Math.floor(gridWidth * 0.67)) || 
        (rowIndex === Math.floor(gridHeight * 0.5) && colIndex >= Math.floor(gridWidth * 0.0) && colIndex <= Math.floor(gridWidth * 0.23)) || 
        (colIndex === Math.floor(gridWidth * 0.0) && rowIndex >= Math.floor(gridHeight * 0.03) && rowIndex <= Math.floor(gridHeight * 0.5)) || 
        (colIndex === Math.floor(gridWidth * 0.23) && rowIndex >= Math.floor(gridHeight * 0.03) && rowIndex <= Math.floor(gridHeight * 0.5)) ||
        // Bedroom: Outline
        (rowIndex === Math.floor(gridHeight * 0.5) && colIndex >= Math.floor(gridWidth * 0.43) && colIndex <= Math.floor(gridWidth * 1.0)) || 
        // Bathroom: Outline
        (rowIndex === Math.floor(gridHeight * 0.5) && colIndex >= Math.floor(gridWidth * 0.23) && colIndex <= Math.floor(gridWidth * 0.43)) ||
        (rowIndex === Math.floor(gridHeight * 0.8) && colIndex >= Math.floor(gridWidth * 0.23) && colIndex <= Math.floor(gridWidth * 0.43)) ||
        (colIndex === Math.floor(gridWidth * 0.23) && rowIndex >= Math.floor(gridHeight * 0.5) && rowIndex <= Math.floor(gridHeight * 1.0)) ||
        // Closet: Outline
        (rowIndex === Math.floor(gridHeight * 1.0) && colIndex >= Math.floor(gridWidth * 0.43) && colIndex <= Math.floor(gridWidth * 1.1)) ||
        (colIndex === Math.floor(gridWidth * 0.43) && rowIndex >= Math.floor(gridHeight * 0.83) && rowIndex <= Math.floor(gridHeight * 1.0)) ||
        (colIndex === Math.floor(gridWidth * 1.1) && rowIndex >= Math.floor(gridHeight * 0.83) && rowIndex <= Math.floor(gridHeight * 1.0))
      ) {
        return 'wall'; // Room areas
      }
      return null; // Empty space
    });
  });

  let lights = new Set();

  function toggleLight(x, y) {
    const position = `${x},${y}`;
    if (lights.has(position)) {
      lights.delete(position);
    } else {
      lights.add(position);
    }
  }
</script>

<div class="grid" style="grid-template-columns: repeat({gridWidth}, 1fr); grid-template-rows: repeat({gridHeight}, 1fr);">
  {#each grid as row, rowIndex}
    {#each row as cell, colIndex}
      <div class="cell {cell}" >
        {#if cell === 'door'}
          <div class="door-icon"></div>
        {/if}
        {#if lights.has(`${colIndex},${rowIndex}`)}
          <div class="light"></div>
        {/if}
      </div>
    {/each}
  {/each}
</div>

<style>
  .grid {
    height: 100%; /* Full viewport height */
    width: 100%; /* Full viewport width */
    display: grid;
    gap: 1px;
    background-color: lightgrey;
  }

  .cell {
    position: relative;
    background-color: white;
  }

  .wall {
    background-color: black;
  }

  .light {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: yellow;
    border-radius: 50%;
  }

  .door-icon {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: brown;
  }
</style>



