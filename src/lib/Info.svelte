<script>
   let showInfo = false;
 
   function toggleInfo() {
     showInfo = !showInfo;
   }
 </script>
 
 <div class="info-container">
   <button class="info-button" on:click={toggleInfo}>
      {showInfo ? 'Hide Info' : 'Show Info'}
   </button>
   
   {#if showInfo}
      <div class="info-box">
      <p>This floor plan allows you to add, edit, or remove lights. Click on an empty space to add a new light. Click on an existing light to modify or delete it.</p>
      </div>
   {/if}
</div>
 
 <style>
   .info-container {
      display: flex;
      align-items: flex-start;
      margin-top: 0.5rem;
      width: 100%;
   }

   .info-button {
      position: relative;

      margin-top: 0.5rem;     
      margin-left: 15px;    
      padding: 0.5rem;         
      background-color: rgb(251, 203, 51);   
      color: black;                 
      border: none;                  
      border-radius: 10px;         
      cursor: pointer;               
      font-size: 1rem;              
      width: 20%;       
      bottom: 7px;             
   }
 
   .info-box {
      background-color: #f8f9fa;     
      padding: 0.25rem;                 
      border: 0.1rem solid #ddd;     
      margin-bottom: 1.5rem;         
      border-radius: 0.5rem;        
      font-size: 1rem;               
      max-width: 90%; 
      margin-left: 0.5rem;              
   }
 </style>