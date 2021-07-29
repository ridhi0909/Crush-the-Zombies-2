class Stone{
    constructor(x,y,r){
        var options = {
            restitution: 0.8
        };
        this.body = Bodies.circle(x,y,r,options);
        World.add(world,this.body);


        this.radius = r;
        
    }
    display(){
        ellipseMode(CENTER);
        push()
        strokeWeight(2);
        translate(this.body.position.x,this.body.position.y);
        fill("white");
        ellipse(0,0,this.radius,this.radius);
        noStroke();
        pop()
    }
}