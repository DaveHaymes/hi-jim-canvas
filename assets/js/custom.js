const canvas = document.getElementById("hiJimCanvas");
      const ctx = canvas.getContext("2d");

      // Initial canvas size
      resizeCanvas();

      let textObjects = [];

      // Function to create a new text object with boundary constraints
      function createTextObject(text, speed, fontSize, fontFamily) {
        const padding = 200; // Padding to keep the text away from the edges
        const textWidth = ctx.measureText(text).width;
        const safeX =
          Math.random() * (canvas.width - textWidth - padding * 2) + padding; // Ensure within width boundary with padding
        const safeY =
          Math.random() * (canvas.height - fontSize - padding * 2) + padding; // Ensure within height boundary with padding

        return {
          text,
          x: safeX,
          y: safeY,
          dx: (Math.random() > 0.5 ? 1 : -1) * speed,
          dy: (Math.random() > 0.5 ? 1 : -1) * speed,
          fontSize,
          fontFamily,
          textColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
        };
      }

      // Function to check if two text objects overlap
      function isOverlapping(newObj, existingObj) {
        const widthA = ctx.measureText(newObj.text).width;
        const widthB = ctx.measureText(existingObj.text).width;
        const distX = newObj.x - existingObj.x;
        const distY = newObj.y - existingObj.y;
        const distance = Math.sqrt(distX * distX + distY * distY);

        // Check if distance is less than the combined width of both objects
        return distance < (widthA + widthB) / 2;
      }

      // Ensure new text object does not overlap with existing objects
      function placeTextObjectSafely(text, speed, fontSize, fontFamily) {
        let newObj;
        let overlapping;

        do {
          newObj = createTextObject(text, speed, fontSize, fontFamily);
          overlapping = textObjects.some((existingObj) =>
            isOverlapping(newObj, existingObj)
          );
        } while (overlapping);

        return newObj;
      }

      // Function to draw a text object
      function drawTextObject(obj) {
        // Reset to center if X or Y becomes negative
        if (obj.x < -1 || obj.y < -1) {
          obj.x = canvas.width / 2;
          obj.y = canvas.height / 2;
        }

        ctx.font = `${obj.fontSize}px ${obj.fontFamily}`;
        ctx.fillStyle = obj.textColor;
        ctx.fillText(obj.text, obj.x, obj.y);

        // Bounce off the edges
        if (
          obj.x + ctx.measureText(obj.text).width > canvas.width ||
          obj.x < 0
        ) {
          obj.dx = -obj.dx;
          obj.textColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // Change color on bounce
        }
        if (obj.y - obj.fontSize < 0 || obj.y > canvas.height) {
          obj.dy = -obj.dy;
          obj.textColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // Change color on bounce
        }

        // Update position
        obj.x += obj.dx;
        obj.y += obj.dy;
      }

      // Remove objects if they exit the canvas boundaries somehow
      function removeOffscreenObjects() {
        textObjects = textObjects.filter((obj) => {
          const textWidth = ctx.measureText(obj.text).width;
          return (
            obj.x + textWidth > 0 &&
            obj.x < canvas.width &&
            obj.y > 0 &&
            obj.y - obj.fontSize < canvas.height
          );
        });
      }

      // Function to draw the watermark
      function drawWatermark() {
        ctx.save(); // Save the current drawing state
        ctx.font = "bold 100px Arial"; // Set the font size and style for the watermark
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)"; // White color with 0.3 opacity
        ctx.textAlign = "center"; // Center the text horizontally
        ctx.textBaseline = "middle"; // Center the text vertically
        ctx.fillText("Hi Jim Canvas", canvas.width / 2, canvas.height / 2); // Draw the text in the center
        ctx.restore(); // Restore the previous drawing state
      }

      // Function to update the debug window with useful information
      function updateDebugWindow() {
        let debugInfo = `Number of Text Objects: ${textObjects.length}\n\n`;

        textObjects.forEach((obj, index) => {
          debugInfo += `Object ${index + 1}:\n`;
          debugInfo += `  Text: ${obj.text}\n`;
          debugInfo += `  Position: (${Math.round(obj.x)}, ${Math.round(
            obj.y
          )})\n`;
          debugInfo += `  Speed: (${obj.dx}, ${obj.dy})\n`;
          debugInfo += `  Font Size: ${obj.fontSize}\n`;
          debugInfo += `  Font Family: ${obj.fontFamily}\n`;
          debugInfo += `  Color: ${obj.textColor}\n\n`;
        });

        document.getElementById("debugContent").textContent = debugInfo;
      }

      // Animation loop
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the watermark first
        drawWatermark();

        // Draw and update each text object
        textObjects.forEach((obj) => {
          drawTextObject(obj);
        });

        // Remove objects if they exit the canvas
        removeOffscreenObjects();

        // Update the debug window with information
        updateDebugWindow();

        requestAnimationFrame(animate);
      }

      // Apply changes to all text objects
      document.getElementById("applyChanges").addEventListener("click", () => {
        let text = document.getElementById("textInput").value;
        let speed = parseInt(document.getElementById("speedInput").value);
        let fontSize = parseInt(document.getElementById("fontSizeInput").value);
        let fontFamily = document.getElementById("fontFamilySelect").value;

        // Update all text objects
        textObjects.forEach((obj) => {
          obj.text = text;
          obj.dx = obj.dy = speed;
          obj.fontSize = fontSize;
          obj.fontFamily = fontFamily;
        });
      });

      // Add new text object with random direction and no overlap, up to 5 objects
      document.getElementById("addTextBtn").addEventListener("click", () => {
        if (textObjects.length >= 5) {
          return; // Prevent adding more than 5 objects
        }

        let text = document.getElementById("textInput").value;
        let speed = parseInt(document.getElementById("speedInput").value);
        let fontSize = parseInt(document.getElementById("fontSizeInput").value);
        let fontFamily = document.getElementById("fontFamilySelect").value;

        // Add a new text object, ensuring it doesn't overlap with others
        const newObj = placeTextObjectSafely(text, speed, fontSize, fontFamily);
        textObjects.push(newObj);
      });

      // Randomize the trajectory of all text objects
      document.getElementById("randomizeBtn").addEventListener("click", () => {
        textObjects.forEach((obj) => {
          // Randomize the direction (dx, dy)
          obj.dx =
            (Math.random() > 0.5 ? 1 : -1) *
            parseInt(document.getElementById("speedInput").value);
          obj.dy =
            (Math.random() > 0.5 ? 1 : -1) *
            parseInt(document.getElementById("speedInput").value);
        });
      });

      // Reset to just 1 text object
      document.getElementById("resetBtn").addEventListener("click", () => {
        // Clear all objects and reset with just 1
        textObjects = [];
        textObjects.push(createTextObject("Hi Jim", 1, 50, "Arial"));
      });

      // Resize canvas to fit container
      function resizeCanvas() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = window.innerHeight;
      }

      // Adjust canvas size when window resizes
      window.addEventListener("resize", () => {
        resizeCanvas();
      });

      // Start with one bouncing text
      textObjects.push(createTextObject("Hi Jim", 1, 50, "Arial"));

      // Start the animation loop
      animate();