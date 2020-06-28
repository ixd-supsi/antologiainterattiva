        // Little Canvas things
        var canv = document.querySelector("#gameCanvas"),
            ctx = canv.getContext("2d");
            container = document.querySelector('#container'),
            
            
            


            // Set Canvas to be window size
            
            WIDTH = canv.width = window.innerWidth;
            HEIGHT = canv.height = window.innerHeight;
            MAX_PARTICLES = 70,
            DRAW_INTERVAL = 80,
            // container = document.querySelector('#container'),
  
            gameCanvas = new Array();

            function setDimensions(e) {

            WIDTH = canv.width = window.innerWidth;
            HEIGHT = canv.height = window.innerHeight;
            // gameCanvas.style.width = WIDTH+'px';
            // gameCanvas.style.height = HEIGHT+'px';
            canv.width = WIDTH;
            canv.height = HEIGHT;


 
            } 

            setDimensions();
            window.addEventListener('resize', setDimensions);    





        // const FPS = 30; // frames per second
        // const FRICTION = 0.7; // friction coefficient of space (0 = no friction, 1 = lots of friction)
        // const ROID_JAG = 0.4; // jaggedness of the asteroids (0 = none, 1 = lots)
        // const ROID_NUM = 30; // starting number of asteroids
        // const ROID_SIZE = 100; // starting size of asteroids in pixels
        // const ROID_SPD = 50; // max starting speed of asteroids in pixels per second
        // const ROID_VERT = 10; // average number of vertices on each asteroid
        // const SHIP_SIZE = 30; // ship height in pixels
        // const SHIP_THRUST = 5; // acceleration of the ship in pixels per second per second
        // const SHIP_TURN_SPD = 360; // turn speed in degrees per second
        // const SHOW_CENTRE_DOT = false; // show or hide ship's centre dot

        // /** @type {HTMLCanvasElement} */
        // // var canv = document.getElementById("gameCanvas");
        // // var ctx = canv.getContext("2d");

        // // set up the spaceship object
        // var ship = {
        //     x: canv.width / 1,
        //     y: canv.height / 1,
        //     r: SHIP_SIZE / 2,
        //     a: 90 / 180 * Math.PI, // convert to radians
        //     rot: 0,
        //     thrusting: false,
        //     thrust: {
        //         x: 0,
        //         y: 0
        //     }
        // }

        // -----add---------


        function Circle() {
            this.settings = {ttl:20000, xmax:5, ymax:2, rmax:10, rt:1, xdef:960, ydef:540, xdrift:10, ydrift: 10, random:true, blink:true};

            this.reset = function() {
                this.x = (this.settings.random ? WIDTH*Math.random() : this.settings.xdef);
                this.y = (this.settings.random ? HEIGHT*Math.random() : this.settings.ydef);
                this.r = ((this.settings.rmax-1)*Math.random()) + 1;
                this.dx = (Math.random()*this.settings.xmax) * (Math.random() < .5 ? -1 : 1);
                this.dy = (Math.random()*this.settings.ymax) * (Math.random() < .5 ? -1 : 1);
                this.hl = (this.settings.ttl/DRAW_INTERVAL)*(this.r/this.settings.rmax);
                this.rt = Math.random()*this.hl;
                this.settings.rt = Math.random()+1;
                this.stop = Math.random()*.1+.1;
                this.settings.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
                this.settings.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
            }

            this.fade = function() {
                this.rt += this.settings.rt;
            }

            this.draw = function() {
                if(this.settings.blink && (this.rt <= 0 || this.rt >= this.hl)) {
                    this.settings.rt = this.settings.rt*-1;
                } else if(this.rt >= this.hl) {
                    this.reset();
                }

                var newo = 1-(this.rt/this.hl);
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
                    ctx.closePath();

                var cr = this.r*newo;
                    gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
                    gradient.addColorStop(0.0, 'rgba(255,255,255,'+newo+')');
                    gradient.addColorStop(this.stop, 'rgba(255,255,255,'+(newo*.6)+')');
                    gradient.addColorStop(1.0, 'rgba(77,101,181,0)');
                    ctx.fillStyle = gradient;
                    ctx.fill();
            }

            this.move = function() {
                this.x += (this.rt/this.hl)*this.dx;
                this.y += (this.rt/this.hl)*this.dy;
                if(this.x > WIDTH || this.x < 0) this.dx *= -1;
                if(this.y > HEIGHT || this.y < 0) this.dy *= -1;
            }

            this.getX = function() { return this.x; }
            this.getY = function() { return this.y; }
        }
        for (var i = 0; i < MAX_PARTICLES; i++) {
            gameCanvas.push(new Circle());
            gameCanvas[i].reset();
        }

        function draw() {
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            for(var i = 0; i < gameCanvas.length; i++) {
                gameCanvas[i].fade();
                gameCanvas[i].move();
                gameCanvas[i].draw();
            }
        }

        setInterval(draw, DRAW_INTERVAL);






   // ------------add

        // // set up asteroids
        // ctx.fillStyle = "black";
        // var roids = [];
        // createAsteroidBelt();

        // // set up event handlers
        // document.addEventListener("keydown", keyDown);
        // document.addEventListener("keyup", keyUp);

        // // set up the game loop
        // setInterval(update,  FPS);

        // function createAsteroidBelt() {
        //     roids = [];
        //     var x, y;
        //     for (var i = 0; i < ROID_NUM; i++) {
        //         // random asteroid location (not touching spaceship)
        //         do {
        //             x = Math.floor(Math.random() * canv.width);
        //             y = Math.floor(Math.random() * canv.height);
        //         } while (distBetweenPoints(ship.x, ship.y, x, y) < ROID_SIZE * 2 + ship.r);
        //         roids.push(newAsteroid(x, y));
        //     }
        // }

        // function distBetweenPoints(x1, y1, x2, y2) {
        //     return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        // }

        // function keyDown(/** @type {KeyboardEvent} */ ev) {
        //     switch(ev.keyCode) {
        //         case 37: // left arrow (rotate ship left)
        //             ship.rot = SHIP_TURN_SPD / 180 * Math.PI / FPS;
        //             break;
        //         case 38: // up arrow (thrust the ship forward)
        //             ship.thrusting = true;
        //             break;
        //         case 39: // right arrow (rotate ship right)
        //             ship.rot = -SHIP_TURN_SPD / 180 * Math.PI / FPS;
        //             break;
        //     }
        // }

        // function keyUp(/** @type {KeyboardEvent} */ ev) {
        //     switch(ev.keyCode) {
        //         case 37: // left arrow (stop rotating left)
        //             ship.rot = 0;
        //             break;
        //         case 38: // up arrow (stop thrusting)
        //             ship.thrusting = false;
        //             break;
        //         case 39: // right arrow (stop rotating right)
        //             ship.rot = 0;
        //             break;
        //     }
        // }

        // function newAsteroid(x, y) {
        //     var roid = {

        //         a: Math.random() * Math.PI * 1, // in radians
        //         offs: [],
        //         r: Math.random() * 50 + 1,
        //         vert: Math.floor(Math.random() * (ROID_VERT + 1) + ROID_VERT / 2),
        //         x: x,
        //         y: y,
        //         xv: Math.random() * ROID_SPD / FPS * (Math.random() < 0.5 ? 1 : -1),
        //         yv: Math.random() * ROID_SPD / FPS * (Math.random() < 0.5 ? 1 : -1)

        //     };

        //     // populate the offsets array
        //     for (var i = 0; i < roid.vert; i++) {
        //         roid.offs.push(Math.random() * ROID_JAG * 2 + 1 - ROID_JAG);
        //     }

        //     return roid;
        // }

        // function update() {
        //     // draw space
        //     ctx.fillStyle = "black";
        //     ctx.fillRect(0, 0, canv.width, canv.height);

        //     // thrust the ship
        //     if (ship.thrusting) {
        //         ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
        //         ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;

        //         // draw the thruster
        //         ctx.fillStyle = "red";
        //         ctx.strokeStyle = "yellow";
        //         ctx.lineWidth = SHIP_SIZE / 10;
        //         ctx.beginPath();
        //         ctx.moveTo( // rear left
        //             ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + 0.5 * Math.sin(ship.a)),
        //             ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - 0.5 * Math.cos(ship.a))
        //         );
        //         ctx.lineTo( // rear centre (behind the ship)
        //             ship.x - ship.r * 5 / 3 * Math.cos(ship.a),
        //             ship.y + ship.r * 5 / 3 * Math.sin(ship.a)
        //         );
        //         ctx.lineTo( // rear right
        //             ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - 0.5 * Math.sin(ship.a)),
        //             ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + 0.5 * Math.cos(ship.a))
        //         );
        //         ctx.closePath();
        //         ctx.fill();
        //         ctx.stroke();
        //     } else {
        //         // apply friction (slow the ship down when not thrusting)
        //         ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
        //         ship.thrust.y -= FRICTION * ship.thrust.y / FPS;
        //     }

        //     // draw the triangular ship
        //     ctx.strokeStyle = "white";
        //     ctx.lineWidth = SHIP_SIZE / 20;
        //     ctx.beginPath();
        //     ctx.moveTo( // nose of the ship
        //         ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
        //         ship.y - 4 / 3 * ship.r * Math.sin(ship.a)
        //     );
        //     ctx.lineTo( // rear left
        //         ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + Math.sin(ship.a)),
        //         ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - Math.cos(ship.a))
        //     );
        //     ctx.lineTo( // rear right
        //         ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - Math.sin(ship.a)),
        //         ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + Math.cos(ship.a))
        //     );
        //     ctx.closePath();
        //     ctx.stroke();

        //     // draw the asteroids
            
        //     ctx.strokeStyle = "white";
        //     ctx.lineWidth = 2;
        //     var a, r, x, y, offs, vert;
        //     for (var i = 0; i < roids.length; i++) {

        //         // get the asteroid properties
                
        //         a = roids[i].a;
        //         r = roids[i].r;
        //         x = roids[i].x;
        //         y = roids[i].y;
        //         offs = roids[i].offs;
        //         vert = roids[i].vert;
                
        //         // draw the path
                
        //         ctx.beginPath();
        //         ctx.moveTo(
        //             x + r * offs[0] * Math.cos(a),
        //             y + r * offs[0] * Math.sin(a)
        //         );

        //         // draw the polygon
                
        //         for (var j = 1; j < vert; j++) {
        //             ctx.lineTo(
        //                 x + r * offs[j] * Math.cos(a + j * Math.PI * 2 / vert),
        //                 y + r * offs[j] * Math.sin(a + j * Math.PI * 2 / vert)
        //             );
        //         }
        //         ctx.closePath();
        //         ctx.stroke();
        //         ctx.fill();

        //         // move the asteroid
        //         roids[i].x += roids[i].xv;
        //         roids[i].y += roids[i].yv;

        //         // handle asteroid edge of screen
        //         if (roids[i].x < 0 - roids[i].r) {
        //             roids[i].x = canv.width + roids[i].r;
        //         } else if (roids[i].x > canv.width + roids[i].r) {
        //             roids[i].x = 0 - roids[i].r
        //         }
        //         if (roids[i].y < 0 - roids[i].r) {
        //             roids[i].y = canv.height + roids[i].r;
        //         } else if (roids[i].y > canv.height + roids[i].r) {
        //             roids[i].y = 0 - roids[i].r
        //         }
        //     }
            
        //     // centre dot
        //     if (SHOW_CENTRE_DOT) {
        //         ctx.fillStyle = "red";
        //         ctx.fillRect(ship.x - 1, ship.y - 1, 2, 2);
        //     }

        //     // rotate the ship
        //     ship.a += ship.rot;

        //     // move the ship
        //     ship.x += ship.thrust.x;
        //     ship.y += ship.thrust.y;

        //     // handle edge of screen
        //     if (ship.x < 0 - ship.r) {
        //         ship.x = canv.width + ship.r;
        //     } else if (ship.x > canv.width + ship.r) {
        //         ship.x = 0 - ship.r;
        //     }
        //     if (ship.y < 0 - ship.r) {
        //         ship.y = canv.height + ship.r;
        //     } else if (ship.y > canv.height + ship.r) {
        //         ship.y = 0 - ship.r;
        //     }
        // }
