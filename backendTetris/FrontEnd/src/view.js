export default class View {
  static colors = {
    1: "white",
    2: "white",
    3: "white",
    4: "white",
    5: "white",
    6: "white",
    7: "white",
  };
  constructor(element, width, height, rows, columns) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext("2d");

    this.playfieldBorderWidth = 4;
    this.playfieldX = this.playfieldBorderWidth + this.width / 4;
    this.playfieldY = this.playfieldBorderWidth;
    this.playfieldWidth = this.width / 2;
    this.playfieldHeight = this.height;
    this.playfieldInnerWidth =
      this.playfieldWidth - this.playfieldBorderWidth * 2;
    this.playfieldInnerHeight =
      this.playfieldHeight - this.playfieldBorderWidth * 2;

    this.blockWidth = this.playfieldInnerWidth / columns;
    this.blockHeight = this.playfieldInnerHeight / rows;

    this.panelX = (this.playfieldWidth / 2) * 3 + 15;
    this.panelY = 0;
    this.panelWidth = this.width / 4;
    this.panelHeight = this.height;

    this.isLoginFormVisible = true;

    this.element.appendChild(this.canvas);
  }

  renderLoginForm() {
    if (!this.isLoginFormVisible) return;

    this.context.clearRect(0, 0, this.width, this.height);

    const formContainer = document.createElement("div");
    formContainer.style.position = "absolute";
    formContainer.style.left = this.width / 2 + 530 + "px"; ///ПЕРЕДЕЛАТЬ КООРДИНАТЫ
    formContainer.style.top = this.height / 2 - 75 + "px";
    formContainer.style.width = "300px";
    formContainer.style.height = "150px";
    formContainer.style.border = "2px solid white";
    formContainer.style.borderRadius = "5px";
    formContainer.style.padding = "10px";

    const usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.placeholder = "Enter your username";
    usernameInput.style.width = "100%";
    usernameInput.style.marginBottom = "10px";

    const telegramInput = document.createElement("input");
    telegramInput.type = "text";
    telegramInput.placeholder = "Enter your telegram";
    telegramInput.style.width = "100%";
    telegramInput.style.marginBottom = "10px";

    const submitButton = document.createElement("button");
    submitButton.innerText = "Submit";
    submitButton.style.width = "100%";
    submitButton.style.cursor = "pointer";

    formContainer.appendChild(usernameInput);
    formContainer.appendChild(telegramInput);
    formContainer.appendChild(submitButton);

    this.element.appendChild(formContainer);

    submitButton.addEventListener("click", async () => {
      console.log("Form submitted!");
    
      const username = usernameInput.value;
      const telegram = telegramInput.value;
      if (!username || !telegram) {
        console.error('Missing required fields');
        return;
      }
    
      try {
        const response = await fetch('/api/createUserScore', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: username, telegram, score: 0 }),
        });
    
        if (response.ok) {
          const newUserScore = await response.json();
          console.log('Form submitted successfully:', newUserScore);
        } else {
          console.error('Error submitting form:', response.statusText);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    
      formContainer.remove();
      this.isLoginFormVisible = false;
      this.renderStartScreen();
    });
  }

  renderLoginScreen() {
    if (!this.isLoginFormVisible) return;

    this.context.fillStyle = "white";
    this.context.font = '18px "Press Start 2P"';
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText("Login", this.width / 2, this.height / 2);
    const textWidth = this.context.measureText("Login").width;
    const buttonX = this.width / 2 - textWidth / 2;
    const buttonY = this.height / 2 - 10;
    const buttonWidth = textWidth;
    const buttonHeight = 20;
    this.context.strokeStyle = "white";
    this.context.strokeRect(buttonX, buttonY, buttonWidth, buttonHeight);
    this.canvas.addEventListener("click", (event) => {
      const mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
      const mouseY = event.clientY - this.canvas.getBoundingClientRect().top;

      if (
        mouseX >= buttonX &&
        mouseX <= buttonX + buttonWidth &&
        mouseY >= buttonY &&
        mouseY <= buttonY + buttonHeight
      ) {
        this.renderLoginForm();
      }
    });
  }

  renderMainScreen(state) {
    this.clearScreen();
    this.renderPlayfield(state);
    this.renderPanel(state);
  }

  renderStartScreen() {
    this.context.fillStyle = "white";
    this.context.font = '18px "Press Start 2P"';
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText(
      "Press ENTER to Start",
      this.width / 2,
      this.height / 2
    );
  }

  renderPauseScreen() {
    this.context.fillStyle = "rgba(0,0,0,0.75)";
    this.context.fillRect(0, 0, this.width, this.height);

    this.context.fillStyle = "white";
    this.context.font = '18px "Press Start 2P"';
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText(
      "Press ENTER to Resume",
      this.width / 2,
      this.height / 2
    );
  }

  renderEndScreen({ score }) {
    this.clearScreen();

    this.context.fillStyle = "rgba(0,0,0,0.75)";
    this.context.fillRect(0, 0, this.width, this.height);

    this.context.fillStyle = "white";
    this.context.font = '18px "Press Start 2P"';
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText("GAME OVER", this.width / 2, this.height / 2 - 48);
    this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2);
    this.context.fillText(
      `Press ENTER to Restart`,
      this.width / 2,
      this.height / 2 + 48
    );
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  renderPlayfield({ playfield }) {
    for (let y = 0; y < playfield.length; y++) {
      const line = playfield[y];
      for (let x = 0; x < line.length; x++) {
        const block = line[x];
        if (block) {
          this.renderBlock(
            this.playfieldX + x * this.blockWidth,
            this.playfieldY + y * this.blockHeight,
            this.blockWidth,
            this.blockHeight,
            View.colors[block]
          );
        }
      }
    }

    this.context.strokeStyle = "white";
    this.context.lineWidth = this.playfieldBorderWidth;
    this.context.strokeRect(
      this.playfieldX - this.playfieldBorderWidth,
      this.playfieldY - this.playfieldBorderWidth,
      this.playfieldWidth,
      this.playfieldHeight
    );
  }

  renderPanel({ level, score, lines, nextPiece }) {
    this.context.textAlign = "start";
    this.context.textBaseline = "top";
    this.context.fillStyle = "white";
    this.context.font = '14px "Press Start 2P"';
    this.context.fillText(`Score: ${score}`, this.panelX, this.panelY);
    this.context.fillText(`Lines: ${lines}`, this.panelX, this.panelY + 24);
    this.context.fillText(`Level: ${level}`, this.panelX, this.panelY + 48);
    this.context.fillText(`Next:`, this.panelX, this.panelY + 96);

    for (let y = 0; y < nextPiece.blocks.length; y++) {
      for (let x = 0; x < nextPiece.blocks[y].length; x++) {
        const block = nextPiece.blocks[y][x];
        if (block) {
          this.renderBlock(
            this.panelX + x * this.blockWidth * 0.5,
            this.panelY + 100 + y * this.blockHeight * 0.5,
            this.blockWidth * 0.5,
            this.blockHeight * 0.5,
            View.colors[block]
          );
        }
      }
    }
  }

  renderBlock(x, y, width, height, color) {
    this.context.fillStyle = color;
    this.context.strokeStyle = "black";
    this.context.lineWidth = 2;
    this.context.fillRect(x, y, width, height);
    this.context.strokeRect(x, y, width, height);
  }
}
