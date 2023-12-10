class Bubbles {
  constructor(container, name) {
    this.container = container;
    this.name = name;
    this.messages = [];
  }

  talk(message) {
    this.messages.push(message);
    this.render();
  }

  render() {
    if (!this.container) {
      console.error("Container is null or undefined");
      return;
    }
    
    const bubbleContainer = document.createElement("div");

    this.messages.forEach((message) => {
      const bubble = document.createElement("div");
      bubble.textContent = message.content;
      // Apply styling or classes as needed
      bubbleContainer.appendChild(bubble);
    });

    if (this.container) {
      this.container.innerHTML = "";
      this.container.appendChild(bubbleContainer);
    } else {
      console.error("Container is null or undefined");
    }
  }
}

function prepHTML(options) {
  // Logic for preparing HTML, if necessary
}

export { Bubbles, prepHTML };
