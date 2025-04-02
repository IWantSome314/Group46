// Hamish JS for Spot the Difference
document.addEventListener("DOMContentLoaded", () => {
    const differences = [
        { x: 270 ,y: 510, width: 20, height: 20 }, // Women on the stairs
        { x: 25, y: 480, width: 20, height: 20 }, // Ghost on the left
        { x: 118, y: 300, width: 20, height: 20 }, // Status on the balcony
        { x: 169, y: 329, width: 20, height: 20 }, // Left side window
        { x: 269, y: 111, width: 20, height: 20 }, // Cobwebs
        { x: 349, y: 160, width: 20, height: 20 }, // Cobwebs
        { x: 85, y: 770, width: 20, height: 20 }, // Pillows
    ];

    const margin = 10;

    const image1 = document.getElementById("image1");
    const image2 = document.getElementById("image2");

    // Log the screen positions of the differences
    [image1, image2].forEach((image, index) => {
        const rect = image.getBoundingClientRect();
        console.log(`Image ${index + 1} differences (screen positions):`);
        differences.forEach(diff => {
            const screenX = rect.left + diff.x;
            const screenY = rect.top + diff.y;
            console.log(`Difference at screen position: (${screenX}, ${screenY})`);
        });
    });

    [image1, image2].forEach((image) => {
        image.addEventListener("click", (event) => {
            const rect = image.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const found = differences.some(diff => 
                x >= diff.x - margin && x <= diff.x + diff.width + margin &&
                y >= diff.y - margin && y <= diff.y + diff.height + margin
            );

            if (found) {
                alert("You found a difference!");
            } else {
                alert("Try again!");
            }
        });
    });

    image1.addEventListener("click", (event) => {
        const rect = image1.getBoundingClientRect();
        const x = event.clientX - rect.left; // Image-relative X
        const y = event.clientY - rect.top;  // Image-relative Y

        console.log(`Image-relative coordinates: (${x}, ${y})`);
    });
});

[image1, image2].forEach((image, index) => {
    image.addEventListener("click", (event) => {
        const rect = image.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        console.log(`Clicked coordinates on Image ${index + 1}: (${x}, ${y})`);
    });
});
//