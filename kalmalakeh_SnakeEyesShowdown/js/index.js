const $$ = sel => document.querySelector(sel);
// Lets the splash page either play out or get skipped by the user
const skiptToForm = () => window.location.href = "intro.html";
  document.getElementById("skipBtn").addEventListener("click", skiptToForm);
  setTimeout(skiptToForm, 7000); 
  // Creating canvas elements
  const canvas = $$("#canvas");
  const context = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Creating a new Image() object
  const coinImg = new Image();
  coinImg.src = "./images/dollar.png" 
  // Handles the appearnce of the coins on the screen. All random width, height, opacity, and position
  const coins = [];
  for (let i = 0; i < 115; i++) {
    coins.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 20 + Math.random() * 20,
      speed: 1 + Math.random() * 2,
      opacity: Math.random()
    });
  }
  // Handles drawing the animation 
  const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let c of coins) {
      context.globalAlpha = c.opacity;
      context.drawImage(coinImg, c.x, c.y, c.size, c.size);
      context.globalAlpha = 1;
      // Makes it so the coins are going downwards instead of upwards
      c.y += c.speed;
      if (c.y > canvas.height + c.size) c.y = -c.size;
    }
    requestAnimationFrame(draw);
  };
  // Adds the image to appear and draw to display when the page loads
  coinImg.onload = draw; 
  