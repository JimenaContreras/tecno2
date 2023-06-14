class CustomImage {
  constructor(x, y) {
    this.imageX = x;
    this.imageY = y;
    this.maxImages = 10;
    this.imageIndex = Math.floor(Math.random() * this.maxImages);
    this.images = [];
    for (let i = 0; i < this.maxImages; i++) {
      this.images[i] = loadImage("data/rayas amarillas/amarillas" + nf(i, 2) + ".png");
    }
  }

  showImage() {
    image(this.images[this.imageIndex], this.imageX, this.imageY);
  }

  updatePosition() {
    let mouseXDiff = mouseX - width / 2;
    let mouseYDiff = mouseY - height / 2;
    let moveX = mouseXDiff * 0.05;
    let moveY = mouseYDiff * 0.05;
    this.imageX = min(max(this.imageX, -this.images[this.imageIndex].width / 2), width - this.images[this.imageIndex].width / 2);
    this.imageY = min(max(this.imageY, -this.images[this.imageIndex].height / 2), height - this.images[this.imageIndex].height / 2);
    this.imageX += moveX;
    this.imageY += moveY;
  }

  checkDistance(other) {
    let distance = dist(this.imageX, this.imageY, other.imageX, other.imageY);
    if (distance < minDistance) {
      let direction = createVector(this.imageX - other.imageX, this.imageY - other.imageY);
      direction.normalize();
      direction.mult(minDistance - distance);
      this.imageX += direction.x;
      this.imageY += direction.y;
      other.imageX -= direction.x;
      other.imageY -= direction.y;
    }
  }

}