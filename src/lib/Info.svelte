<script>
   let showInfo = false;
 
   function toggleInfo() {
     showInfo = !showInfo;
   }
 </script>
 
 <button class="info-button" on:click={toggleInfo}>
   {showInfo ? 'Hide Info' : 'Show Info'}
 </button>
 
 {#if showInfo}
   <div class="info-box">
     <p>This floor plan allows you to add, edit, or remove lights. Click on an empty space to add a new light. Click on an existing light to modify or delete it.</p>
   </div>
 {/if}
 
 
 <style>
   .info-button {
      margin-bottom: 0.5rem;  
      margin-top: 0.5rem;         
      padding: 0.5rem 1rem;          
      background-color: #007bff;   
      color: white;                 
      border: none;                  
      border-radius: 0.5rem;         
      cursor: pointer;               
      font-size: 1rem;              
      width: 20%;                    
   }
 
   .info-box {
      background-color: #f8f9fa;     
      padding: 1rem;                 
      border: 0.1rem solid #ddd;     
      margin-bottom: 1.5rem;         
      border-radius: 0.5rem;        
      font-size: 1rem;               
      max-width: 90%;               
   }
 </style>