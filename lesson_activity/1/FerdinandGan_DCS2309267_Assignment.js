// Variables to hold the circle objects
let circle1, circle2, circle3;

// Variables to control the timing of the animations
let startTime;
let duration = 1.2 * 1000; // 1.2 seconds in milliseconds for initial expansion
let compressionDuration = 1.5 * 1000; // 1.5 seconds for combined compression and zoom-out animation
let finalTransitionDuration = 0.6 * 1000; // 0.6 seconds for final transition to rectangles
let movementDuration = 0.8 * 1000; // 0.8 seconds for rectangle movement
let expansionDuration = 0.5 * 1000; // 0.5 seconds for circle expansion
let rectToCircleDuration = 0.6 * 1000; // 0.6 seconds for rectangles to circle transition
let platformMoveDuration = 0.5 * 1000; // 0.5 seconds for platform to move (half of original value)
let fallDuration = 1.0 * 1000; // 1.0 seconds for the falling of the circle
let waitDuration = 1.0 * 1000; // 1.0 seconds for the white ball to stay

// Position variables for rectangles and circle
let rectY1, rectY2, rectY3, circleX, circleY, circleSize, finalCircleY;

// Platform variables
let platformX, platformY, platformWidth, platformHeight;
let platformTargetX, platformTargetY;
let platformFallStartTime;
let platformFalling = false; // Track if the platform is falling

// Bounce variables
let bounceStartTime;
let falling = true; // Track if the ball is falling or rising

function setup() {
  let canvas = createCanvas(1280, 720); // Create a canvas of size 1280x720
  canvas.parent('canvas-container'); // Attach the canvas to an HTML container

  collegeLogo = loadImage('images.png');

  // Create three circles with initial positions, sizes, and colors
  circle1 = createCircle(width / 2, height / 2, 100, color(199, 222, 235));
  circle2 = createCircle(width / 2, height / 2, 140, color(170, 206, 227));
  circle3 = createCircle(width / 2, height / 2, 190, color(131, 188, 222));

  // Initial positions for rectangles
  rectY1 = height / 2 - 130 - 10; // Top position
  rectY2 = height / 2; // Middle position
  rectY3 = height / 2 + 130 + 10; // Bottom position

  // Initial platform position
  platformWidth = width / 9; // Slimmer platform width
  platformHeight = height / 9; // Slimmer platform height
  platformX = width;
  platformY = height / 2 + 130 + 10;
  platformTargetX = width / 2 - platformWidth / 2;
  platformTargetY = platformY;

  // Initial circle position
  circleX = width / 2;
  finalCircleY = height / 2 - 130 - 50;
  circleY = finalCircleY;
  circleSize = 70;

  // Record the starting time of the animation
  startTime = millis();
}

function draw() {
  let currentTime = millis();
  let elapsedTime = currentTime - startTime;

  // Animate expansion phase
  if (elapsedTime < duration) {
    animateExpansion(elapsedTime);
  // Animate combined compression and zoom-out phase
  } else if (elapsedTime < duration + compressionDuration) {
    animateCombinedCompressionAndZoomOut(elapsedTime - duration);
  // Animate final transition to rectangles
  } else if (elapsedTime < duration + compressionDuration + finalTransitionDuration) {
    animateFinalTransition(elapsedTime - duration - compressionDuration);
  // Animate rectangle movement
  } else if (elapsedTime < duration + compressionDuration + finalTransitionDuration + movementDuration) {
    animateRectangleMovement(elapsedTime - duration - compressionDuration - finalTransitionDuration);
  // Animate background circle expansion
  } else if (elapsedTime < duration + compressionDuration + finalTransitionDuration + movementDuration + expansionDuration) {
    animateCircleExpansion(elapsedTime - duration - compressionDuration - finalTransitionDuration - movementDuration);
  // Animate rectangles to small circle
  } else if (elapsedTime < duration + compressionDuration + finalTransitionDuration + movementDuration + expansionDuration + rectToCircleDuration) {
    animateRectanglesToCircle(elapsedTime - duration - compressionDuration - finalTransitionDuration - movementDuration - expansionDuration);
  // Wait with the small circle
  } else if (elapsedTime < duration + compressionDuration + finalTransitionDuration + movementDuration + expansionDuration + rectToCircleDuration + waitDuration) {
    drawFinalCircle();
  // Animate platform movement
  } else if (elapsedTime < duration + compressionDuration + finalTransitionDuration + movementDuration + expansionDuration + rectToCircleDuration + waitDuration + platformMoveDuration) {
    animatePlatformMovement(elapsedTime - duration - compressionDuration - finalTransitionDuration - movementDuration - expansionDuration - rectToCircleDuration - waitDuration);
  // Animate the circle falling to the platform or rising back up
  } else {
    if (falling) {
      animateFallingCircle(elapsedTime - duration - compressionDuration - finalTransitionDuration - movementDuration - expansionDuration - rectToCircleDuration - waitDuration - platformMoveDuration);
    } else {
      animateRisingCircle(elapsedTime - duration - compressionDuration - finalTransitionDuration - movementDuration - expansionDuration - rectToCircleDuration - waitDuration - platformMoveDuration - fallDuration);
    }
  }
  
  let scaleFactor = 0.5; // Scale factor (0.5 reduces the size to half)
  image(collegeLogo, 0, 0, collegeLogo.width * scaleFactor, collegeLogo.height * scaleFactor);

  

}

// Function to animate the expansion phase
function animateExpansion(elapsedTime) {
  background(59, 159, 217); // Set background color
  let progress = elapsedTime / duration; // Calculate progress of the animation

  // Extend the circles
  circle1.size = lerp(100, width * 0.8, progress);
  circle1.color = lerpColor(color(199, 222, 235), color(255, 255, 255), progress);

  circle2.size = lerp(140, width * 1.1, progress);
  circle2.color = lerpColor(color(170, 206, 227), color(255, 255, 255), progress);

  circle3.size = lerp(190, width * 1.4, progress);
  circle3.color = lerpColor(color(131, 188, 222), color(255, 255, 255), progress);

  // Draw the circles
  noStroke();
  fill(circle3.color);
  ellipse(circle3.x, circle3.y, circle3.size);
  fill(circle2.color);
  ellipse(circle2.x, circle2.y, circle2.size);
  fill(circle1.color);
  ellipse(circle1.x, circle1.y, circle1.size);
}

// Function to animate the combined compression and zoom-out phase
function animateCombinedCompressionAndZoomOut(elapsedTime) {
  background(237, 74, 9); // Set background color for squeezing and zoom-out

  let progress = min(1, elapsedTime / compressionDuration); // Calculate progress of the animation (limited to 1)

  // Calculate the squeezed circle size
  let squeezedCircleSize = map(progress, 0, 1, 120, 0); // Size of the squeezed circle (reversed)

  // Draw the squeezed circle
  noStroke();
  fill(255); // Set color to white
  ellipse(width / 2, height / 2, squeezedCircleSize);

  // Squeeze and zoom-out the shapes
  let squeezedProgress = map(progress, 0, 1, 0, 1); // Reverse progress for squeezing the shapes
  circle1.size = lerp(width * 0.8, 100, squeezedProgress);
  circle2.size = lerp(width * 1.1, 140, squeezedProgress);
  circle3.size = lerp(width * 1.4, 190, squeezedProgress);

  drawCircles();
}

// Function to animate the final transition to rectangles
function animateFinalTransition(elapsedTime) {
  background(237, 74, 9); // Set final background color

  let progress = elapsedTime / finalTransitionDuration; // Calculate progress of the animation

  // Transition the circles to rectangles
  let rectWidth = lerp(circle1.size, 400, progress); // Increase the width of the rectangles
  let rectHeight = 130;

  // Draw the rectangles in the middle and top and bottom positions
  noStroke();
  fill(255); // Set color to white
  rectMode(CENTER);
  rect(width / 2, height / 2 - rectHeight - 10, rectWidth, rectHeight); // Top rectangle
  rect(width / 2, height / 2, rectWidth, rectHeight); // Middle rectangle
  rect(width / 2, height / 2 + rectHeight + 10, rectWidth, rectHeight);
}

// Function to animate the movement of rectangles
function animateRectangleMovement(elapsedTime) {
  background(237, 74, 9); // Set background color

  let progress = elapsedTime / movementDuration; // Calculate progress of the animation

  // Calculate new positions for the rectangles
  let newY1 = lerp(height / 2 - 130 - 10, height / 2, progress); // Top to middle
  let newY2 = lerp(height / 2, height / 2 + 130 + 10, progress); // Middle to bottom
  let newY3 = lerp(height / 2 + 130 + 10, height / 2 - 130 - 10, progress); // Bottom to top

  // Update rectangle positions
  rectY1 = newY1; // Top to middle
  rectY2 = newY2; // Middle to bottom
  rectY3 = newY3; // Bottom to top

  // Draw the rectangles in their new positions with shadows
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = 5;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = 'rgba(0, 0, 0, 0.5)';

  noStroke();
  fill(255); // Set color to white

  // Draw top and middle rectangles first
  rectMode(CENTER);
  rect(width / 2, rectY1, 400, 130); // Top rectangle
  rect(width / 2, rectY2, 400, 130); // Middle rectangle

  // Add a grey shadow for the moving rectangle and draw it last
  drawingContext.shadowColor = 'rgba(128, 128, 128, 0.8)';
  rect(width / 2, rectY3, 400, 130); // Bottom rectangle
}

// Function to animate the circle expansion from the center
function animateCircleExpansion(elapsedTime) {
  let progress = elapsedTime / expansionDuration; // Calculate progress of the animation
  bgCircleSize = lerp(0, width * 1.5, progress); // Expand the circle

  // Draw the expanding circle
  background(237, 74, 9);
  noStroke();
  fill(24, 235, 172); // Set color to RGB(24, 235, 172)
  ellipse(width / 2, height / 2, bgCircleSize);

  // Draw the rectangles in their final positions
  fill(255); // Set color to white
  rectMode(CENTER);
  rect(width / 2, height / 2 - 130 - 10, 400, 130); // Top rectangle
  rect(width / 2, height / 2, 400, 130); // Middle rectangle
  rect(width / 2, height / 2 + 130 + 10, 400, 130); // Bottom rectangle
}

// Function to animate the transition of rectangles to a small circle
function animateRectanglesToCircle(elapsedTime) {
  let progress = elapsedTime / rectToCircleDuration; // Calculate progress of the animation
  background(24, 235, 172); // Set background color

  // Calculate the transition
  let rectWidth = lerp(400, 0, progress);
  let rectHeight = lerp(130, 0, progress);
  circleSize = lerp(0, 70, progress); // Target slightly larger circle size
  circleX = width / 2;
  circleY = height / 2 - 130 - 50;

  // Calculate new Y positions for rectangles moving towards the center point
  let newY1 = lerp(rectY1, circleY, progress);
  let newY2 = lerp(rectY2, circleY, progress);
  let newY3 = lerp(rectY3, circleY, progress);

  // Fill the space between the rectangles with white color
  noStroke();
  fill(255);
  rectMode(CENTER);
  rect(width / 2, (newY1 + newY2) / 2, rectWidth, abs(newY1 - newY2));
  rect(width / 2, (newY2 + newY3) / 2, rectWidth, abs(newY2 - newY3));

  // Draw the transitioning rectangles
  noStroke();
  fill(255); // Set color to white
  rectMode(CENTER);
  rect(width / 2, newY1, rectWidth, rectHeight); // Top rectangle
  rect(width / 2, newY2, rectWidth, rectHeight); // Middle rectangle
  rect(width / 2, newY3, rectWidth, rectHeight); // Bottom rectangle

  // Draw the small circle
  ellipse(circleX, circleY, circleSize);
}

// Function to draw the final circle after the transition
function drawFinalCircle() {
  background(24, 235, 172); // Set background color
  noStroke();
  fill(255); // Set color to white
  ellipse(circleX, circleY, circleSize); // Draw the final circle in its position
}

// Function to animate the platform movement
function animatePlatformMovement(elapsedTime) {
  let progress = elapsedTime / platformMoveDuration; // Calculate progress of the animation
  background(24, 235, 172); // Set background color

  // Move the platform
  platformX = lerp(width, platformTargetX, progress);

  // Draw the platform
  noStroke();
  fill(42, 135, 82); // Set color to RGB(42, 135, 82)
  rectMode(CORNER);
  rect(platformX, platformTargetY, platformWidth, platformHeight);

  // Draw the small circle
  fill(255); // Set color to white
  ellipse(circleX, circleY, circleSize);
}

// Function to animate the circle falling to the platform
function animateFallingCircle(elapsedTime) {
  let progress = elapsedTime / fallDuration; // Calculate progress of the fall

  // Use cubic easing for a faster fall (changed 2)
  let easedProgress = progress * progress * progress * progress * progress * progress * progress * progress * progress * progress * progress;

  let targetY = platformTargetY - platformHeight / 2; // Target y-position above the platform

  background(24, 235, 172); // Set background color

  // Draw the platform
  noStroke();
  fill(42, 135, 82); // Set color to RGB(42, 135, 82)
  rectMode(CORNER);
  rect(platformTargetX, platformTargetY, platformWidth, platformHeight);

  // Draw the falling circle 
  fill(255); // Set color to white
  let circlePosY = lerp(circleY, targetY, easedProgress); // (changed 1)
  ellipse(circleX, circlePosY, circleSize);

  if (elapsedTime >= fallDuration) {
    falling = false;
    bounceStartTime = millis();
    platformFallStartTime = millis(); // Start the platform fall timer
    platformFalling = true; // Set the platform to start falling
  }
}



// Function to animate the circle rising back to its original position
function animateRisingCircle(elapsedTime) {
  let progress = elapsedTime / fallDuration; // Calculate progress of the rise
  let targetY = platformTargetY - platformHeight / 2; // Target y-position above the platform

  background(24, 235, 172); // Set background color

  // Draw the falling platform if it is still visible
  if (platformFalling) {
    let platformFallProgress = (millis() - platformFallStartTime) / fallDuration;
    let platformFallY = lerp(platformTargetY, height, platformFallProgress);
    if (platformFallProgress < 1) {
      noStroke();
      fill(42, 135, 82); // Set color to RGB(42, 135, 82)
      rectMode(CORNER);
      rect(platformTargetX, platformFallY, platformWidth, platformHeight);
    } else {
      platformFalling = false; // Stop drawing the platform after it has fallen out of the canvas
    }
  }

  // Draw the rising circle
  fill(255); // Set color to white
  let circlePosY = lerp(targetY, finalCircleY, progress);
  ellipse(circleX, circlePosY, circleSize);

  if (elapsedTime >= fallDuration) {
    noLoop(); // Stop the animation
  }
}

// Function to draw the current state of the circles
function drawCircles() {
  noStroke();
  fill(circle3.color);
  ellipse(circle3.x, circle3.y, circle3.size);
  fill(circle2.color);
  ellipse(circle2.x, circle2.y, circle2.size);
  fill(circle1.color);
  ellipse(circle1.x, circle1.y, circle1.size);
}

// Function to create a circle object
function createCircle(x, y, size, color) {
  return {
    x: x,
    y: y,
    size: size,
    color: color
  };
}
