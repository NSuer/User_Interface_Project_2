<script>
  import { lights } from '../stores.js';
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
      } else if ( // Define doors
        rowIndex === 0 || rowIndex === gridHeight - 1 || colIndex === 0 || colIndex === gridWidth - 1) {
        return 'wall'; // Specific door positions
      } else if ( // Define room areas
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


</script>

<div class="grid" style="grid-template-columns: repeat({gridWidth}, 1fr); grid-template-rows: repeat({gridHeight}, 1fr);">
  {#each grid as row, rowIndex}
    {#each row as cell, colIndex}
      <div class="cell {cell}" >
        {#if cell === 'door'}
          <div class="door-icon"></div>
        {/if}
        {#if $lights.find(light => light.location_x === rowIndex && light.location_y === colIndex)}
          {#each $lights as light}
            {#if light.location_x === rowIndex && light.location_y === colIndex}
              <div class="light" style=
              'background-color: {light.color};
              opacity: {light.opacity}'></div>
            {/if}
          {/each}
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
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .door-icon {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;
  }
</style>



