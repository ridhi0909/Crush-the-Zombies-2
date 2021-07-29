class Ground{
    constructor(x,y,w,h,c){
        var options = {
            isStatic: true
        };
        this.body = Bodies.rectangle(x,y,w,h,options);
        World.add(world,this.body);

        this.color = c;
        this.width = w;
        this.height = h;
    }
    display(){
        rectMode(CENTER);
        push()
        translate(this.body.position.x,this.body.position.y);
        fill(this.color);
        rect(0,0,this.width,this.height);
        pop()
    }
}