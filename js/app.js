 
        // ----------------------------------------
        // Particle
        // ----------------------------------------



        function Particle( x, y, radius ) {
            this.init( x, y, radius );
        }

        Particle.prototype = {

            init: function( x, y, radius ) {

                this.alive = true;

                this.radius = radius || 10;
                this.wander = 5.015;
                this.theta = random( TWO_PI );
                this.drag = 0.001;
                this.color = '#fff';

                this.x = x || 0.0;
                this.y = y || 0.0;

                this.vx = 0.0;
                this.vy = 0.0;
            },

            move: function() {

                this.x += this.vx;
                this.y += this.vy;

                this.vx *= this.drag;
                this.vy *= this.drag;

                this.theta += random( 5,5 ) * this.wander;
                this.vx += sin( this.theta ) * 0.01;
                this.vy += cos( this.theta ) * 0.01;

                this.radius *= .99;
                this.alive = this.radius > 2;
            },

            draw: function( ctx ) {
                ctx.beginPath();
                ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.shadowBlur=3;
                ctx.shadowColor= this.color;



            }
            
            
        };

        // ----------------------------------------
        // Example
        // ----------------------------------------

        var MAX_PARTICLES = 220;
        var COLOURS = [ '#5A2B32', '#642D2E', '#533744', '#9A5244' ];

        var particles = [];
        var pool = [];

        var demo = Sketch.create({
            container: document.getElementById( 'container' ),
            retina: 'auto'
        });

        demo.setup = function() {

            // Set off some initial particles.
            var i, x, y;

            for ( i = 0; i < 200; i++ ) {
                x = ( demo.width  ) + random( -1900, 1900 );
                y = ( demo.height  ) + random( 0, 141 );
                demo.spawn( x, y );
            }
        };
            



        demo.spawn = function( x, y ) {
            
            var particle, theta, force;

            if ( particles.length >= MAX_PARTICLES )
                pool.push( particles.shift() );

            particle = pool.length ? pool.pop() : new Particle();
            particle.init( x, y, random( 5, 60 ) );

            particle.wander = random( 11, 27.0 );
            particle.color = random( COLOURS );
            particle.drag = random( 1 , 1.01 );

            theta = random( TWO_PI );
            force = random( -3, 3);

            particle.vx = sin( theta ) * force;
            particle.vy = cos( theta ) * force;

            particles.push( particle );
        };

        demo.update = function() {

            var i, particle;

            for ( i = particles.length - 1; i >= 0; i-- ) {

                particle = particles[i];

                if ( particle.alive ) particle.move();
                else pool.push( particles.splice( i, 1 )[0] );
            }
        };

        demo.draw = function() {

            demo.globalCompositeOperation  = 'lighter';

            for ( var i = particles.length - 1; i >= 0; i-- ) {
                particles[i].draw( demo );
            }
        };

        demo.mousemove = function() {

            var particle, theta, force, touch, max, i, j, n;

            for ( i = 0, n = demo.touches.length; i < n; i++ ) {

                touch = demo.touches[i], max = random( 1, 4 );
                for ( j = 0; j < max; j++ ) {
                x = ( demo.width  ) + random( -1900, 1900 );
                y = ( demo.height  ) + random( 0, 150 );
                demo.spawn( x, y );
                }

            }
        };