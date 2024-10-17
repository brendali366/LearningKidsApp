// import Matter from 'matter-js'

// const Physics = (entities, { touches }) => {
//     let engine = entities.physics.engine
//     Matter.Engine.update(engine, 16)

//     // Handle touch events
//     touches.filter(t => t.type === 'move').forEach(t => {
//         if (entities.Bird && entities.Bird.body) {
//             Matter.Body.setPosition(entities.Bird.body, { 
//                 x: t.event.pageX,
//                 y: entities.Bird.body.position.y
//             })
//         }
//     })

//     return entities;
// }

// export default Physics

import Matter from 'matter-js'

const Physics = (entities, { time }) => {
    let engine = entities.physics.engine
    Matter.Engine.update(engine, time.delta)

    // Generate new treats
    if (Math.random() < 0.05) {
        const newTreat = entities.createTreat(engine.world);
        entities.treats[newTreat.id] = newTreat;
    }

    // Move treats and check for collisions
    Object.keys(entities.treats).forEach(treatId => {
        const treat = entities.treats[treatId];
        
        // Remove treats that have fallen off the screen
        if (treat.body.position.y > 800) {
            Matter.World.remove(engine.world, treat.body);
            delete entities.treats[treatId];
        }

        // Check for collision with the dog
        if (Matter.Collision.collides(treat.body, entities.Bird.body)) {
            // Handle collision (update score, remove life, etc.)
            if (treat.treatType === 'good') {
                entities.score += 1;
            } else {
                entities.lives -= 1;
            }
            
            // Remove the treat
            Matter.World.remove(engine.world, treat.body);
            delete entities.treats[treatId];
        }
    });

    // Handle dog movement
    if (entities.Bird && entities.Bird.body) {
        Matter.Body.setPosition(entities.Bird.body, { 
            x: entities.touch.x,
            y: entities.Bird.body.position.y
        });
    }

    return entities;
}

export default Physics;