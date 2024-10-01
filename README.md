# 🎨 Hi Jim Canvas - Canvas Object Manipulation

Welcome to **Hi Jim Canvas**! This project showcases how to use the HTML5 Canvas element for creating interactive and dynamic text and object animations. It's been designed as a very basic example for my friend Jim to demonstrate some of my experience using canvas manipulation.

## ✨ Features

- 🚀 **Dynamic Text Manipulation**: Add and control animated text on the canvas with customizable options.
- 🏀 **Bouncing Animation**: Text objects bounce across the screen, reacting to the edges of the canvas demonstrating collision detection.
- 🌈 **Vibrant Color Shifts**: Text changes color on every bounce for a lively effect.
- 🎛 **Interactive Controls**:
  - Add up to **5 text objects**.
  - Adjust the speed and size of the text with intuitive sliders.
  - Randomize the movement of the text objects for unpredictable fun.
  - Reset to the default "Hi Jim" canvas with a single click.
- 🖥 **Debug Window**: Gain insight into the current state of the canvas with real-time information about each text object’s properties.

## 🎯 How It Works

1. **Canvas Animation**: The text objects move around the canvas, bouncing off the edges and changing color when they hit a boundary.
2. **Boundary Safety**: Text objects are placed carefully to avoid overlapping with others, and if they move off-screen, they’re reset.
3. **Customization**: You can apply changes to the text in real-time or add new text objects with random directions and speeds.

## 📂 Project Structure

- `index.html`: The main HTML file that lays out the structure of the page and sets up the canvas element.
- `assets/js/custom.js`: The JavaScript file that contains the logic for canvas manipulation, animation, and user interactivity.
- `assets/css/custom.css`: The CSS file that contains all the custom styling.

## 🚀 Getting Started

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/davehaymes/hi-jim-canvas.git
   cd hi-jim-canvas
   ```

2. **Open `index.html` in Your Browser**:

   Simply open the `index.html` file in any modern web browser to start using the canvas.

   ```bash
   open index.html
   ```

3. **Use the Interactive Options**:
   - Enter your own custom text to display on the canvas and click **Apply Changes**.
   - Add up to 5 bouncing text objects with the **Add Text** button.
   - Adjust the **speed** and **font size** using the sliders.
   - Click **Randomize Trajectory** to mix up the movement of the text objects.
   - Click **Reset** to clear the canvas and start with a single "Hi Jim" text.

## ⚙️ Customization

The project is easily customizable. Feel free to dive into the `assets/js/custom.js` file to tweak the behavior and visuals:

- Adjust the **font sizes**, **speed**, or **font family** to change the appearance and movement.
- Modify the **bouncing behavior** and boundary constraints.
- Add additional interactive controls as needed.

## 🛠 Technologies Used

- **HTML5 Canvas** for the drawing and animation of text.
- **JavaScript** for handling animations, user inputs, and canvas manipulation.
- **Bootstrap 5** for the responsive layout and styling.

## 📸 Screenshots

### Overview Image

![Overview Image](https://davehaymes-github.s3.us-west-1.amazonaws.com/af30452ccfe546e3a42017ac6ead8c61f3f4bdcd.png)

### Options Menu

![Options Menu](https://davehaymes-github.s3.us-west-1.amazonaws.com/07cb297e38ca87279320b4bfcf70b3f1ebc36186.png)

### Debug Information

![Debug Information](https://davehaymes-github.s3.us-west-1.amazonaws.com/e2f90fecf21468d1171c31995f4373706c18b265.png)

---

## 📜 License

This project is licensed under the MIT License.

---

👋 **Special Note**: This project was created for my friend Jim as an example of basic Canvas manipulation.
