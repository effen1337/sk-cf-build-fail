<script>
    import { onDestroy, onMount, tick } from 'svelte'
  
    export let toggleOnce = false
    export let relative = true
  
    let active = false
  
    async function click() {
      if (toggleOnce) {
        active = !active
        return
      }
  
      active = false
      await tick();
      active = true
    }

    let to, to2;
    onMount(()=> {
        to = setInterval(async () => {
            await click()
        }, 8000);
        to2 = setTimeout(async () => {
            await click();
        }, 2000)
        
    })

    onDestroy(()=> {
        if(to) clearInterval(to)
        if(to2) clearTimeout(to2)
    })
  </script>
  
  
  
  <span on:click={click} class:relative>
    <slot name="label" />
  
    {#if active}
      <div class="confetti">
        <slot />
      </div>
    {/if}
  </span>
  
  
  
  
  <style>
    .relative {
      position: relative;
    }
  
    .relative .confetti {
      position: absolute;
      top: 50%;
      left: 50%;
    }
  
    .confetti {
      pointer-events: none;
    }
  </style>
  