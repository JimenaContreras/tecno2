class Lila {
  constructor() {
    let numLilas = floor(random(2, 4));
    this.diameter = 300;
    this.color = color(175, 130, 232, random(50,200));

    let pos = random(4);
    if (pos < 1) { // lateral superior
      this.x = random(0, width);
      this.y = random(0, 100);
    } else if (pos < 2) { // lateral derecho
      this.x = random(700, width);
      this.y = random(0, height);
    } else if (pos < 3) { // lateral inferior
      this.x = random(0, width);
      this.y = random(700, height);
    } else { // lateral izquierdo
      this.x = random(0, 100);
      this.y = random(0, height);
    }
    this.overlap = false;

   
  }

  draw() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }

  checkOverlap() {
    for (let l of lilas) {
      if (l !== this) {
        let distance = dist(this.x, this.y, l.x, l.y);
        if (distance < (this.diameter / 2 + l.diameter / 2)) {
          return true;
        }
      }
    }
    return false;
  }

  actualizarPosicion(){
     
     if(this.x<140 | this.x>700 ){
      if (mouseX<400){
        this.x=this.x-1;
      }
      if(mouseX>400){
        this.x=this.x+1;
      }
      if(this.x < 0 ){
        this.x=this.x+1;
       }
       if(this.x>800){
        this.x=this.x-1;
       }
     }

     if(this.y<140 | this.y>700 ){
      if (mouseY<400){
        this.y=this.y-1;
      }
      if(mouseY>400){
        this.y=this.y+1;
      }
      if(this.y < 0 ){
        this.y=this.y+1;
       }
       if(this.y>800){
        this.y=this.y-1;
       }
     }


    
    
  }


}





