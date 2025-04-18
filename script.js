document.addEventListener("DOMContentLoaded", () => {
  //Hamish - Spot the Difference
  const differences = [
    { x: 270, y: 510, width: 20, height: 20 }, // Women on the stairs
    { x: 25, y: 480, width: 20, height: 20 }, // Ghost on the left
    { x: 118, y: 300, width: 20, height: 20 }, // Status on the balcony
    { x: 169, y: 329, width: 20, height: 20 }, // Left side window
    { x: 269, y: 111, width: 20, height: 20 }, // Cobwebs
    { x: 349, y: 160, width: 20, height: 20 }, // Cobwebs 2 for cobwebs since its  large area
    { x: 85, y: 770, width: 20, height: 20 }, // Pillows
  ];

  const margin = 25; 
  const image1 = document.getElementById("image1"); // Image 1
  const image2 = document.getElementById("image2"); // Image 2
  let foundDifferences = 0; 

  const button = document.createElement("button");
  button.textContent = "Next Level";
  button.className = "spot-difference-button"; 
  button.style.display = "none";
  button.style.position = "absolute";
  button.style.top = "700px";
  button.style.left = "90%";
  button.style.transform = "translateX(-50%)";
  document.body.appendChild(button);


  button.addEventListener("click", () => {
    alert("Well Done! You found all the differences!");
    window.location.href = "question7-dylan.html";
  });

  
  if (image1 && image2) {
    [image1, image2].forEach((image, index) => {
      const rect = image.getBoundingClientRect();
      console.log(`Image ${index + 1} differences (screen positions):`);
      differences.forEach((diff) => {
        const screenX = rect.left + diff.x; 
        const screenY = rect.top + diff.y; 
        console.log(`Difference at screen position: (${screenX}, ${screenY})`); 
      });

      image.addEventListener("click", (event) => {
        const rect = image.getBoundingClientRect();
        const x = event.clientX - rect.left; 
        const y = event.clientY - rect.top; 

        const found = differences.some((diff, index) => {
          if (
            x >= diff.x - margin &&
            x <= diff.x + diff.width + margin &&
            y >= diff.y - margin &&
            y <= diff.y + diff.height + margin
          ) {
            // Remove the found difference from the array to prevent duplicate clicks
            differences.splice(index, 1);
            foundDifferences++;
            return true;
          }
          return false;
        });

        if (found) {
          alert("You found a difference!");
          // Check if all differences are found
          if (foundDifferences === 6) {
            button.style.display = "block"; // Show the button
          }
        } else {
          alert("Try again!");
        }
      });
    });
  }


  // Dylan script for torch and hidden clues
  function checkCode() {
    const inputCode = document.getElementById("codeInput");
    if (!inputCode) return;

    const entered = inputCode.value.toLowerCase();
    const correctCode = "5413";

    window.location.href = entered === correctCode ? "win.html" : "death8.html";
  }

  window.checkCode = checkCode;

  const torch = document.getElementById("torch");
  const masks = document.querySelectorAll(".clue-mask");

  if (torch) {
    let isDragging = false;

    torch.addEventListener("mousedown", () => {
      isDragging = true;
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      torch.style.left = `${e.clientX - 75}px`;
      torch.style.top = `${e.clientY - 75}px`;

      masks.forEach((mask) => {
        const rect = mask.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        mask.style.maskImage = `radial-gradient(circle 100px at ${x}px ${y}px, transparent 0%, black 120px)`;
        mask.style.webkitMaskImage = `radial-gradient(circle 100px at ${x}px ${y}px, transparent 0%, black 120px)`;
      });
    });
  }
});
