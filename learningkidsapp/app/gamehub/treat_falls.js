// import React from 'react';
// import { Pressable, Text, View, StyleSheet} from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import {  useFonts, EBGaramond_600SemiBold,EBGaramond_800ExtraBold} from '@expo-google-fonts/eb-garamond';
// import { Link } from 'expo-router';
// import { GameEngine } from 'react-native-game-engine';
// import entities from '../entities';
// //import Physics from '../physics';
// //i still can not get entities to work
// import Bird from "../components/Bird"
// import Physics from '../physics';



// export default function Button(clickButton) {

//     {/*loading fonts here */}
//     let [fontsLoaded] = useFonts({
//         EBGaramond_600SemiBold,EBGaramond_800ExtraBold
//     });
//     if (!fontsLoaded) {
//         return null;
//       }

//     {/*Buttons for screens*/}
//     const { onPressIndex, indexScreenBtn = 'Index.Js' } = clickButton;

//   return (
//     <View style={styles.container}>

//     {/*Game engine takes in the systems -> physics engine and entities */}
//       <GameEngine
//       system = {[Physics]}
//       entities={entities()}
//         style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>

//       </GameEngine>



//     {/*To hide the status bar set hidden= true */}
    
//     <StatusBar style="auto" hidden={true} />

            



//     </View>

//   );
// }

// const styles = StyleSheet.create({
// container: {
//   justifyContent: 'center',
//   alignItems: 'center',       
//   backgroundColor: '#A7C7E7',
//   flex: 1,
// },
// indexButton:{
//   backgroundColor: '#FAC898',
//   width: 200, 
//   padding: 10,
//   borderRadius: 5,
//   marginVertical: 10, 
//   alignItems: 'center'
// },
// });







//PREVIOUS WORKING CODE

// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import { useFonts, EBGaramond_600SemiBold, EBGaramond_800ExtraBold } from '@expo-google-fonts/eb-garamond';
// import { GameEngine } from 'react-native-game-engine';
// import entities from '../entities';
// import Physics from '../physics';

// export default function TreatFalls() {
//     const [gameEngine, setGameEngine] = useState(null);
//     const [running, setRunning] = useState(true);

//     let [fontsLoaded] = useFonts({
//         EBGaramond_600SemiBold,
//         EBGaramond_800ExtraBold
//     });

//     useEffect(() => {
//         setRunning(true);
//     }, []);

//     if (!fontsLoaded) {
//         return null;
//     }

//     return (
//         <View style={styles.container}>
//             <GameEngine
//                 ref={(ref) => { setGameEngine(ref) }}
//                 systems={[Physics]}
//                 entities={entities()}
//                 running={running}
//                 onEvent={(e) => {
//                     switch (e.type) {
//                         case 'game_over':
//                             setRunning(false);
//                             gameEngine.stop();
//                             break;
//                     }
//                 }}
//                 style={styles.gameEngine}
//             >
//                 <StatusBar style="auto" hidden={true} />
//             </GameEngine>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#A7C7E7',
//     },
//     gameEngine: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//     }
// });


//second try
// import Matter from 'matter-js'

// const TreatFalls = (entities, { touches, time }) => {
//     let engine = entities.physics.engine
//     Matter.Engine.update(engine, 16)

//     // Generate new treats
//     if (Math.random() < 0.05) {
//         const newTreat = entities.createTreat(engine.world);
//         entities.treats[newTreat.id] = newTreat;
//     }

//     // Move treats and check for collisions
//     Object.keys(entities.treats).forEach(treatId => {
//         const treat = entities.treats[treatId];
        
//         // Remove treats that have fallen off the screen
//         if (treat.body.position.y > 800) {
//             Matter.World.remove(engine.world, treat.body);
//             delete entities.treats[treatId];
//         }

//         // Check for collision with the dog
//         if (Matter.Collision.collides(treat.body, entities.Bird.body)) {
//             // Handle collision (update score, remove life, etc.)
//             if (treat.treatType === 'good') {
//                 entities.score += 1;
//             } else {
//                 entities.lives -= 1;
//             }
            
//             // Remove the treat
//             Matter.World.remove(engine.world, treat.body);
//             delete entities.treats[treatId];
//         }
//     });

//     // Handle dog movement
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

// export default TreatFalls;










//third try

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { GameEngine } from 'react-native-game-engine';
// import Matter from 'matter-js';
// import entities from '../entities';

// const TreatFalls = () => {
//     const [running, setRunning] = useState(true);
//     const [gameEngine, setGameEngine] = useState(null);
//     const [score, setScore] = useState(0);
//     const [lives, setLives] = useState(3);

//     useEffect(() => {
//         setRunning(true);
//     }, []);

//     const updateHandler = (entities, { touches, time }) => {
//         let engine = entities.physics.engine;
//         Matter.Engine.update(engine, time.delta);

//         // Generate new treats
//         if (Math.random() < 0.05) {
//             const newTreat = entities.createTreat(engine.world);
//             entities.treats[newTreat.id] = newTreat;
//         }

//         // Move treats and check for collisions
//         Object.keys(entities.treats).forEach(treatId => {
//             const treat = entities.treats[treatId];
            
//             // Remove treats that have fallen off the screen
//             if (treat.body.position.y > 800) {
//                 Matter.World.remove(engine.world, treat.body);
//                 delete entities.treats[treatId];
//             }

//             // Check for collision with the dog
//             if (Matter.Collision.collides(treat.body, entities.Bird.body)) {
//                 if (treat.treatType === 'good') {
//                     setScore(prevScore => prevScore + 1);
//                 } else {
//                     setLives(prevLives => prevLives - 1);
//                 }
                
//                 // Remove the treat
//                 Matter.World.remove(engine.world, treat.body);
//                 delete entities.treats[treatId];
//             }
//         });

//         // Handle dog movement
//         touches.filter(t => t.type === 'move').forEach(t => {
//             if (entities.Bird && entities.Bird.body) {
//                 Matter.Body.setPosition(entities.Bird.body, { 
//                     x: t.event.pageX,
//                     y: entities.Bird.body.position.y
//                 });
//             }
//         });

//         return entities;
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.score}>Score: {score}</Text>
//             <Text style={styles.lives}>Lives: {lives}</Text>
//             <GameEngine
//                 ref={(ref) => { setGameEngine(ref) }}
//                 style={styles.gameContainer}
//                 systems={[updateHandler]}
//                 entities={entities()}
//                 running={running}
//                 onEvent={(e) => {
//                     if (e.type === 'game_over') {
//                         setRunning(false);
//                         gameEngine.stop();
//                     }
//                 }}
//             >
//             </GameEngine>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     gameContainer: {
//         position: 'absolute',
//         top: 0,
//         bottom: 0,
//         left: 0,
//         right: 0,
//     },
//     score: {
//         position: 'absolute',
//         top: 50,
//         left: 20,
//         fontSize: 24,
//     },
//     lives: {
//         position: 'absolute',
//         top: 50,
//         right: 20,
//         fontSize: 24,
//     },
// });

// export default TreatFalls;






// fourth try


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { GameEngine } from 'react-native-game-engine';
// import Matter from 'matter-js';
// import entities from '../entities';
// import Treat from '../components/Treat';

// const TreatFalls = () => {
//     const [running, setRunning] = useState(true);
//     const [gameEngine, setGameEngine] = useState(null);
//     const [score, setScore] = useState(0);
//     const [lives, setLives] = useState(3);

//     useEffect(() => {
//         setRunning(true);
//     }, []);

//     const updateHandler = (entities, { touches, time }) => {
//         let engine = entities.physics.engine;
//         Matter.Engine.update(engine, time.delta);

//         // Generate new treats
//         if (Math.random() < 0.05) {
//             const newTreat = entities.createTreat(engine.world);
//             entities.treats[newTreat.id] = newTreat;
//         }

//         // Move treats and check for collisions
//         Object.keys(entities.treats).forEach(treatId => {
//             const treat = entities.treats[treatId];
            
//             // Remove treats that have fallen off the screen
//             if (treat.body.position.y > 800) {
//                 Matter.World.remove(engine.world, treat.body);
//                 delete entities.treats[treatId];
//             }

//             // Check for collision with the dog
//             if (Matter.Collision.collides(treat.body, entities.Bird.body)) {
//                 if (treat.treatType === 'good') {
//                     setScore(prevScore => prevScore + 1);
//                 } else {
//                     setLives(prevLives => prevLives - 1);
//                 }
                
//                 // Remove the treat
//                 Matter.World.remove(engine.world, treat.body);
//                 delete entities.treats[treatId];
//             }
//         });

//         // Handle dog movement
//         touches.filter(t => t.type === 'move').forEach(t => {
//             if (entities.Bird && entities.Bird.body) {
//                 Matter.Body.setPosition(entities.Bird.body, { 
//                     x: t.event.pageX,
//                     y: entities.Bird.body.position.y
//                 });
//             }
//         });

//         return entities;
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.score}>Score: {score}</Text>
//             <Text style={styles.lives}>Lives: {lives}</Text>
//             <GameEngine
//                 ref={(ref) => { setGameEngine(ref) }}
//                 style={styles.gameContainer}
//                 systems={[updateHandler]}
//                 entities={entities()}
//                 running={running}
//                 onEvent={(e) => {
//                     if (e.type === 'game_over') {
//                         setRunning(false);
//                         gameEngine.stop();
//                     }
//                 }}
//             >
//                 {Object.keys(entities()).map((key) => {
//                     if (key.startsWith('treat')) {
//                         const treat = entities()[key];
//                         return <Treat key={key} body={treat.body} treatType={treat.treatType} />;
//                     }
//                     return null;
//                 })}
//             </GameEngine>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     gameContainer: {
//         position: 'absolute',
//         top: 0,
//         bottom: 0,
//         left: 0,
//         right: 0,
//     },
//     score: {
//         position: 'absolute',
//         top: 50,
//         left: 20,
//         fontSize: 24,
//     },
//     lives: {
//         position: 'absolute',
//         top: 50,
//         right: 20,
//         fontSize: 24,
//     },
// });

// export default TreatFalls;

//nth

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { GameEngine } from 'react-native-game-engine';
// import Matter from 'matter-js';
// import entities from '../entities';
// import Treat from '../components/Treat';

// const TreatFalls = () => {
//     const [running, setRunning] = useState(true);
//     const [gameEngine, setGameEngine] = useState(null);
//     const [score, setScore] = useState(0);
//     const [lives, setLives] = useState(3);
//     const [treats, setTreats] = useState({});

//     useEffect(() => {
//         setRunning(true);
//     }, []);

//     const updateHandler = (entities, { touches, time }) => {
//         let engine = entities.physics.engine;
//         Matter.Engine.update(engine, time.delta);

//         // Generate new treats
//         if (Math.random() < 0.05) {
//             const newTreat = entities.createTreat(engine.world);
//             setTreats(prevTreats => ({...prevTreats, [newTreat.id]: newTreat}));
//         }

//         // Move treats and check for collisions
//         Object.keys(treats).forEach(treatId => {
//             const treat = treats[treatId];
            
//             // Remove treats that have fallen off the screen
//             if (treat.body.position.y > 800) {
//                 Matter.World.remove(engine.world, treat.body);
//                 setTreats(prevTreats => {
//                     const newTreats = {...prevTreats};
//                     delete newTreats[treatId];
//                     return newTreats;
//                 });
//             }

//             // Check for collision with the dog
//             if (Matter.Collision.collides(treat.body, entities.Bird.body)) {
//                 if (treat.treatType === 'good') {
//                     setScore(prevScore => prevScore + 1);
//                 } else {
//                     setLives(prevLives => prevLives - 1);
//                 }
                
//                 // Remove the treat
//                 Matter.World.remove(engine.world, treat.body);
//                 setTreats(prevTreats => {
//                     const newTreats = {...prevTreats};
//                     delete newTreats[treatId];
//                     return newTreats;
//                 });
//             }
//         });

//         // Handle dog movement
//         touches.filter(t => t.type === 'move').forEach(t => {
//             if (entities.Bird && entities.Bird.body) {
//                 Matter.Body.setPosition(entities.Bird.body, { 
//                     x: t.event.pageX,
//                     y: entities.Bird.body.position.y
//                 });
//             }
//         });

//         return entities;
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.score}>Score: {score}</Text>
//             <Text style={styles.lives}>Lives: {lives}</Text>
//             <GameEngine
//                 ref={(ref) => { setGameEngine(ref) }}
//                 style={styles.gameContainer}
//                 systems={[updateHandler]}
//                 entities={entities()}
//                 running={running}
//                 onEvent={(e) => {
//                     if (e.type === 'game_over') {
//                         setRunning(false);
//                         gameEngine.stop();
//                     }
//                 }}
//             >
//                 {Object.entries(treats).map(([key, treat]) => (
//                     <Treat key={key} body={treat.body} treatType={treat.treatType} />
//                 ))}
//             </GameEngine>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     gameContainer: {
//         position: 'absolute',
//         top: 0,
//         bottom: 0,
//         left: 0,
//         right: 0,
//     },
//     score: {
//         position: 'absolute',
//         top: 50,
//         left: 20,
//         fontSize: 24,
//     },
//     lives: {
//         position: 'absolute',
//         top: 50,
//         right: 20,
//         fontSize: 24,
//     },
// });

// export default TreatFalls;


// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import { GameEngine } from 'react-native-game-engine';
// import Matter from 'matter-js';
// import entities from '../entities';
// import Treat from '../components/Treat';

// const { width, height } = Dimensions.get('window');

// const TreatFalls = () => {
//     const [running, setRunning] = useState(true);
//     const [gameEngine, setGameEngine] = useState(null);
//     const [score, setScore] = useState(0);
//     const [lives, setLives] = useState(3);
//     const entitiesRef = useRef(entities());

//     useEffect(() => {
//         setRunning(true);
//     }, []);

//     const updateHandler = (entities, { time }) => {
//         let engine = entities.physics.engine;
//         Matter.Engine.update(engine, time.delta);

//         // Generate new treats
//         if (Math.random() < 0.05) {
//             const newTreat = entities.createTreat();
//             const newTreatId = `treat-${Object.keys(entities).length}`;
//             entities[newTreatId] = newTreat;
//         }

//         // Move treats and check for collisions
//         Object.keys(entities).forEach(key => {
//             if (key.startsWith('treat')) {
//                 const treat = entities[key];
                
//                 // Remove treats that have fallen off the screen
//                 if (treat.body.position.y > height) {
//                     Matter.World.remove(engine.world, treat.body);
//                     delete entities[key];
//                 }

//                 // Check for collision with the dog
//                 if (entities.Bird && Matter.Collision.collides(treat.body, entities.Bird.body)) {
//                     if (treat.treatType === 'good') {
//                         setScore(prevScore => prevScore + 1);
//                     } else {
//                         setLives(prevLives => prevLives - 1);
//                     }
                    
//                     // Remove the treat
//                     Matter.World.remove(engine.world, treat.body);
//                     delete entities[key];
//                 }
//             }
//         });

//         return entities;
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.score}>Score: {score}</Text>
//             <Text style={styles.lives}>Lives: {lives}</Text>
//             <GameEngine
//                 ref={(ref) => { setGameEngine(ref) }}
//                 style={styles.gameContainer}
//                 systems={[updateHandler]}
//                 entities={entitiesRef.current}
//                 running={running}
//                 onEvent={(e) => {
//                     if (e.type === 'game_over') {
//                         setRunning(false);
//                         gameEngine.stop();
//                     }
//                 }}
//             />
//             {Object.entries(entitiesRef.current).map(([key, entity]) => {
//                 if (key.startsWith('treat')) {
//                     return <Treat key={key} body={entity.body} treatType={entity.treatType} />;
//                 }
//                 return null;
//             })}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     gameContainer: {
//         position: 'absolute',
//         top: 0,
//         bottom: 0,
//         left: 0,
//         right: 0,
//     },
//     score: {
//         position: 'absolute',
//         top: 50,
//         left: 20,
//         fontSize: 24,
//     },
//     lives: {
//         position: 'absolute',
//         top: 50,
//         right: 20,
//         fontSize: 24,
//     },
// });

// export default TreatFalls;


// nth + 1

// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import { GameEngine } from 'react-native-game-engine';
// import Matter from 'matter-js';
// import entities from '../entities';
// import Treat from '../components/Treat';

// const { width, height } = Dimensions.get('window');

// const TreatFalls = () => {
//   const [running, setRunning] = useState(true);
//   const [gameEngine, setGameEngine] = useState(null);
//   const [score, setScore] = useState(0);
//   const [lives, setLives] = useState(3);
//   const entitiesRef = useRef(entities());

//   const fixedTimeStep = 1000 / 60; // 60 FPS
//   const maxSubSteps = 10;
//   let accumulator = 0;

//   useEffect(() => {
//     setRunning(true);
//   }, []);

//   const updateHandler = (entities, { time }) => {
//     let engine = entities.physics.engine;
    
//     accumulator += time.delta;
    
//     while (accumulator >= fixedTimeStep) {
//       Matter.Engine.update(engine, fixedTimeStep);
//       accumulator -= fixedTimeStep;

//       // Generate new treats
//       if (Math.random() < 0.05) {
//         const newTreat = entities.createTreat();
//         const newTreatId = `treat-${Object.keys(entities).length}`;
//         entities[newTreatId] = newTreat;
//       }

//       // Move treats and check for collisions
//       Object.keys(entities).forEach(key => {
//         if (key.startsWith('treat')) {
//           const treat = entities[key];
//           // Remove treats that have fallen off the screen
//           if (treat.body.position.y > height) {
//             Matter.World.remove(engine.world, treat.body);
//             delete entities[key];
//           }
//           // Check for collision with the dog
//           if (entities.Bird && Matter.Collision.collides(treat.body, entities.Bird.body)) {
//             if (treat.treatType === 'good') {
//               setScore(prevScore => prevScore + 1);
//             } else {
//               setLives(prevLives => prevLives - 1)
//               if(prevLives === 0);
//             }
//             // Remove the treat
//             Matter.World.remove(engine.world, treat.body);
//             delete entities[key];
//           }
//         }
//       });
//     }

//     return entities;
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.score}>Score: {score}</Text>
//       <Text style={styles.lives}>Lives: {lives}</Text>
//       <GameEngine
//         ref={(ref) => { setGameEngine(ref) }}
//         style={styles.gameContainer}
//         systems={[updateHandler]}
//         entities={entitiesRef.current}
//         running={running}
//         onEvent={(e) => {
//           if (e.type === 'game_over') {
//             setRunning(false);
//             gameEngine.stop();
//           }
//         }}
//       />
//       {Object.entries(entitiesRef.current).map(([key, entity]) => {
//         if (key.startsWith('treat')) {
//           return <Treat key={key} body={entity.body} treatType={entity.treatType} />;
//         }
//         return null;
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//         container: {
//             flex: 1,
//             backgroundColor: '#fff',
//         },
//         gameContainer: {
//             position: 'absolute',
//             top: 0,
//             bottom: 0,
//             left: 0,
//             right: 0,
//         },
//         score: {
//             position: 'absolute',
//             top: 50,
//             left: 20,
//             fontSize: 24,
//         },
//         lives: {
//             position: 'absolute',
//             top: 50,
//             right: 20,
//             fontSize: 24,
//         },
// });

// export default TreatFalls;











//nth + 2 try

// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import { GameEngine } from 'react-native-game-engine';
// import Matter from 'matter-js';
// import entities from '../entities';
// import Treat from '../components/Treat';

// const { width, height } = Dimensions.get('window');

// const TreatFalls = () => {
//   const [running, setRunning] = useState(true);
//   const [gameEngine, setGameEngine] = useState(null);
//   const [score, setScore] = useState(0);
//   const [lives, setLives] = useState(3);
//   const entitiesRef = useRef(entities());

//   const fixedTimeStep = 1000 / 60; // 60 FPS
//   const maxSubSteps = 10;
//   let accumulator = 0;

//   useEffect(() => {
//     setRunning(true);
//   }, []);

//   const updateHandler = (entities, { time, dispatch }) => {
//     let engine = entities.physics.engine;
    
//     accumulator += time.delta;
    
//     while (accumulator >= fixedTimeStep) {
//       Matter.Engine.update(engine, fixedTimeStep);
//       accumulator -= fixedTimeStep;

//       // Generate new treats
//       if (Math.random() < 0.05) {
//         const newTreat = entities.createTreat();
//         const newTreatId = `treat-${Object.keys(entities).length}`;
//         entities[newTreatId] = newTreat;
//       }

//       // Move treats and check for collisions
//       Object.keys(entities).forEach(key => {
//         if (key.startsWith('treat')) {
//           const treat = entities[key];
//           // Remove treats that have fallen off the screen
//           if (treat.body.position.y > height) {
//             Matter.World.remove(engine.world, treat.body);
//             delete entities[key];
//           }
//           // Check for collision with the dog
//           if (entities.Bird && Matter.Collision.collides(treat.body, entities.Bird.body)) {
//             if (treat.treatType === 'good') {
//               setScore(prevScore => prevScore + 1);
//             } else {
//               setLives(prevLives => {
//                 const newLives = prevLives - 1;
//                 if (newLives <= 0) {
//                   dispatch({ type: 'game_over' });
//                 }
//                 return newLives;
//               });
//             }
//             // Remove the treat
//             Matter.World.remove(engine.world, treat.body);
//             delete entities[key];
//           }
//         }
//       });
//     }

//     return entities;
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.score}>Score: {score}</Text>
//       <Text style={styles.lives}>Lives: {lives}</Text>
//       <GameEngine
//         ref={(ref) => { setGameEngine(ref) }}
//         style={styles.gameContainer}
//         systems={[updateHandler]}
//         entities={entitiesRef.current}
//         running={running}
//         onEvent={(e) => {
//           if (e.type === 'game_over') {
//             setRunning(false);
//             gameEngine.stop();
//           }
//         }}
//       />
//       {Object.entries(entitiesRef.current).map(([key, entity]) => {
//         if (key.startsWith('treat')) {
//           return <Treat key={key} body={entity.body} treatType={entity.treatType} />;
//         }
//         return null;
//       })}
//       {!running && (
//         <View style={styles.gameOverOverlay}>
//           <Text style={styles.gameOverText}>Game Over</Text>
//           <Text style={styles.finalScoreText}>Final Score: {score}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   gameContainer: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   score: {
//     position: 'absolute',
//     top: 50,
//     left: 20,
//     fontSize: 24,
//   },
//   lives: {
//     position: 'absolute',
//     top: 50,
//     right: 20,
//     fontSize: 24,
//   },
//   gameOverOverlay: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   gameOverText: {
//     fontSize: 48,
//     color: 'white',
//     marginBottom: 20,
//   },
//   finalScoreText: {
//     fontSize: 32,
//     color: 'white',
//   },
// });

// export default TreatFalls;



// nth + 3 try
// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import { GameEngine } from 'react-native-game-engine';
// import Matter from 'matter-js';
// import entities from '../entities';
// import Treat from '../components/Treat';

// const { width, height } = Dimensions.get('window');

// const TreatFalls = () => {
//   const [running, setRunning] = useState(true);
//   const [gameEngine, setGameEngine] = useState(null);
//   const [score, setScore] = useState(0);
//   const [lives, setLives] = useState(3);
//   const entitiesRef = useRef(entities());

//   const fixedTimeStep = 1000 / 60; // 60 FPS
//   let accumulator = 0;

//   useEffect(() => {
//     setRunning(true);
//   }, []);

//   const createTreat = (world) => {
//     const treatSize = 30;
//     const x = Math.random() * (width - treatSize);
//     const y = -treatSize; // Start above the screen
//     const treatType = Math.random() > 0.3 ? 'good' : 'bad';

//     const treat = Matter.Bodies.rectangle(x, y, treatSize, treatSize, {
//       label: 'Treat',
//       frictionAir: 0.02,
//       restitution: 0.3,
//     });

//     Matter.World.add(world, treat);

//     return {
//       body: treat,
//       treatType,
//       renderer: <Treat />
//     };
//   };

//   const updateHandler = (entities, { time, dispatch }) => {
//     let engine = entities.physics.engine;
//     let world = engine.world;
    
//     accumulator += time.delta;
    
//     while (accumulator >= fixedTimeStep) {
//       Matter.Engine.update(engine, fixedTimeStep);
//       accumulator -= fixedTimeStep;

//       // Generate new treats
//       if (Math.random() < 0.03) {
//         const newTreat = createTreat(world);
//         const newTreatId = `treat-${Object.keys(entities).length}`;
//         entities[newTreatId] = newTreat;
//       }

//       // Move treats and check for collisions
//       Object.keys(entities).forEach(key => {
//         if (key.startsWith('treat')) {
//           const treat = entities[key];
//           // Remove treats that have fallen off the screen
//           if (treat.body.position.y > height + 50) {
//             Matter.World.remove(world, treat.body);
//             delete entities[key];
//           }
//           // Check for collision with the dog
//           if (entities.Bird && Matter.Collision.collides(treat.body, entities.Bird.body)) {
//             if (treat.treatType === 'good') {
//               setScore(prevScore => prevScore + 1);
//             } else {
//               setLives(prevLives => {
//                 const newLives = prevLives - 1;
//                 if (newLives <= 0) {
//                   dispatch({ type: 'game_over' });
//                 }
//                 return newLives;
//               });
//             }
//             // Remove the treat
//             Matter.World.remove(world, treat.body);
//             delete entities[key];
//           }
//         }
//       });
//     }

//     return entities;
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.score}>Score: {score}</Text>
//       <Text style={styles.lives}>Lives: {lives}</Text>
//       <GameEngine
//         ref={(ref) => { setGameEngine(ref) }}
//         style={styles.gameContainer}
//         systems={[updateHandler]}
//         entities={entitiesRef.current}
//         running={running}
//         onEvent={(e) => {
//           if (e.type === 'game_over') {
//             setRunning(false);
//             gameEngine.stop();
//           }
//         }}
//       />
//       {!running && (
//         <View style={styles.gameOverOverlay}>
//           <Text style={styles.gameOverText}>Game Over</Text>
//           <Text style={styles.finalScoreText}>Final Score: {score}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   gameContainer: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   score: {
//     position: 'absolute',
//     top: 50,
//     left: 20,
//     fontSize: 24,
//   },
//   lives: {
//     position: 'absolute',
//     top: 50,
//     right: 20,
//     fontSize: 24,
//   },
//   gameOverOverlay: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   gameOverText: {
//     fontSize: 48,
//     color: 'white',
//     marginBottom: 20,
//   },
//   finalScoreText: {
//     fontSize: 32,
//     color: 'white',
//   },
// });

// export default TreatFalls;


//nth + 4 try

// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import { GameEngine } from 'react-native-game-engine';
// import Matter from 'matter-js';
// import entities from '../entities';
// import Treat from '../components/Treat';

// const { width, height } = Dimensions.get('window');

// const TreatFalls = () => {
//   const [running, setRunning] = useState(true);
//   const [gameEngine, setGameEngine] = useState(null);
//   const [score, setScore] = useState(0);
//   const [lives, setLives] = useState(3);
//   const entitiesRef = useRef(entities());

//   useEffect(() => {
//     setRunning(true);
//   }, []);

//   const createTreat = (world) => {
//     const treatSize = 50; // Increased size
//     const x = Math.random() * (width - treatSize);
//     const y = -treatSize; // Start above the screen
//     const treatType = Math.random() > 0.3 ? 'good' : 'bad';

//     const treat = Matter.Bodies.rectangle(x, y, treatSize, treatSize, {
//       label: 'Treat',
//       frictionAir: 0,
//       friction: 0,
//       restitution: 0,
//       isSensor: true,
//     });

//     Matter.World.add(world, treat);

//     return {
//       body: treat,
//       treatType,
//       renderer: <Treat />
//     };
//   };

//   const updateHandler = (entities, { time, dispatch }) => {
//     let engine = entities.physics.engine;
//     let world = engine.world;
    
//     Matter.Engine.update(engine, time.delta);

//     // Generate new treats
//     if (Math.random() < 0.02) {
//       const newTreat = createTreat(world);
//       const newTreatId = `treat-${Object.keys(entities).length}`;
//       entities[newTreatId] = newTreat;
//     }

//     // Move treats and check for collisions
//     Object.keys(entities).forEach(key => {
//       if (key.startsWith('treat')) {
//         const treat = entities[key];
        
//         // Apply constant downward velocity
//         Matter.Body.setVelocity(treat.body, { x: 0, y: 8 });
        
//         // Remove treats that have fallen off the screen
//         if (treat.body.position.y > height + 50) {
//           Matter.World.remove(world, treat.body);
//           delete entities[key];
//         }
        
//         // Check for collision with the dog
//         if (entities.Bird && Matter.Collision.collides(treat.body, entities.Bird.body)) {
//           if (treat.treatType === 'good') {
//             setScore(prevScore => prevScore + 1);
//           } else {
//             setLives(prevLives => {
//               const newLives = prevLives - 1;
//               if (newLives <= 0) {
//                 dispatch({ type: 'game_over' });
//               }
//               return newLives;
//             });
//           }
//           // Remove the treat
//           Matter.World.remove(world, treat.body);
//           delete entities[key];
//         }
//       }
//     });

//     return entities;
//   };

//   return (
//     <View style={styles.container}>
//       <GameEngine
//         ref={(ref) => { setGameEngine(ref) }}
//         style={styles.gameContainer}
//         systems={[updateHandler]}
//         entities={entitiesRef.current}
//         running={running}
//         onEvent={(e) => {
//           if (e.type === 'game_over') {
//             setRunning(false);
//             gameEngine.stop();
//           }
//         }}
//       />
//       <Text style={styles.score}>Score: {score}</Text>
//       <Text style={styles.lives}>Lives: {lives}</Text>
//       {!running && (
//         <View style={styles.gameOverOverlay}>
//           <Text style={styles.gameOverText}>Game Over</Text>
//           <Text style={styles.finalScoreText}>Final Score: {score}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   gameContainer: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   score: {
//     position: 'absolute',
//     top: 50,
//     left: 20,
//     fontSize: 24,
//     zIndex: 1,
//   },
//   lives: {
//     position: 'absolute',
//     top: 50,
//     right: 20,
//     fontSize: 24,
//     zIndex: 1,
//   },
//   gameOverOverlay: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 2,
//   },
//   gameOverText: {
//     fontSize: 48,
//     color: 'white',
//     marginBottom: 20,
//   },
//   finalScoreText: {
//     fontSize: 32,
//     color: 'white',
//   },
// });

// export default TreatFalls;

//nth + 5 tries
// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, Dimensions, ImageBackground, Pressable, Image } from 'react-native';
// import { GameEngine } from 'react-native-game-engine';
// import Matter from 'matter-js';
// import entities from '../entities';
// import Treat from '../components/Treat';
// import { useNavigation } from '@react-navigation/native';

// const { width, height } = Dimensions.get('window');

// const TreatFalls = () => {
//   const [running, setRunning] = useState(true);
//   const [gameEngine, setGameEngine] = useState(null);
//   const [score, setScore] = useState(0);
//   const [lives, setLives] = useState(3);
//   const entitiesRef = useRef(entities());

//   useEffect(() => {
//     setRunning(true);
//   }, []);

//   const createTreat = (world) => {
//     const treatSize = 50;
//     const x = Math.random() * (width - treatSize);
//     const y = -treatSize;
//     const treatType = Math.random() > 0.3 ? 'good' : 'bad';

//     const treat = Matter.Bodies.rectangle(x, y, treatSize, treatSize, {
//       label: 'Treat',
//       frictionAir: 0,
//       friction: 0,
//       restitution: 0,
//       isSensor: true,
//     });

//     Matter.World.add(world, treat);

//     return {
//       body: treat,
//       treatType,
//       renderer: <Treat />
//     };
//   };

//   const updateHandler = (entities, { time, dispatch }) => {
//     let engine = entities.physics.engine;
//     let world = engine.world;
    
//     Matter.Engine.update(engine, time.delta);

//     if (Math.random() < 0.02) {
//       const newTreat = createTreat(world);
//       const newTreatId = `treat-${Object.keys(entities).length}`;
//       entities[newTreatId] = newTreat;
//     }

//     Object.keys(entities).forEach(key => {
//       if (key.startsWith('treat')) {
//         const treat = entities[key];
        
//         Matter.Body.setVelocity(treat.body, { x: 0, y: 5 });
        
//         if (treat.body.position.y > height + 50) {
//           Matter.World.remove(world, treat.body);
//           delete entities[key];
//         }
        
//         if (entities.Bird && Matter.Collision.collides(treat.body, entities.Bird.body)) {
//           if (treat.treatType === 'good') {
//             setScore(prevScore => prevScore + 1);
//           } else {
//             setLives(prevLives => {
//               const newLives = prevLives - 1;
//               if (newLives <= 0) {
//                 dispatch({ type: 'game_over' });
//               }
//               return newLives;
//             });
//           }
//           Matter.World.remove(world, treat.body);
//           delete entities[key];
//         }
//       }
//     });

//     return entities;
//   };

//     // IS IT GAMEHUB/GAMEHUB_MAINSCREEN!?
//   // Move the backButton function inside the component
//   const navigation = useNavigation(); // Move useNavigation inside the component
//   const backButton = () => {
//     navigation.navigate('gamehub/gamehub_mainscreen');
//   };



//   return (
//     <ImageBackground 
//       source={require('../../assets/treatfallsbg.png')} 
//       style={styles.backgroundImage}
//     >
//       <View style={styles.container}>
//         <Pressable style={styles.back_arrow_img} onPress={backButton}>
//           <Image source={require('../../assets/back_arrow.png')} style={styles.back_arrow_img} />
//         </Pressable>
//         <GameEngine
//           ref={(ref) => { setGameEngine(ref) }}
//           style={styles.gameContainer}
//           systems={[updateHandler]}
//           entities={entitiesRef.current}
//           running={running}
//           onEvent={(e) => {
//             if (e.type === 'game_over') {
//               setRunning(false);
//               gameEngine.stop();
//             }
//           }}
//         />
//         <Text style={styles.score}>Score: {score}</Text>
//         <Text style={styles.lives}>Lives: {lives}</Text>
//         {!running && (
//           <View style={styles.gameOverOverlay}>
//             <Text style={styles.gameOverText}>Game Over</Text>
//             <Text style={styles.finalScoreText}>Final Score: {score}</Text>
//           </View>
//         )}
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   container: {
//     flex: 1,
//   },
//   gameContainer: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
    
//   },
//   score: {
//     position: 'absolute',
//     top: 100,
//     right: 20,
//     fontSize: 24,
//     zIndex: 1,
//     color: 'white', // Changed to white for better visibility on background
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: {width: -1, height: 1},
//     textShadowRadius: 10
//   },
//   lives: {
//     position: 'absolute',
//     top: 50,
//     //top: 125,
//     right: 20,
//     fontSize: 24,
//     zIndex: 1,
//     color: 'white', // Changed to white for better visibility on background
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: {width: -1, height: 1},
//     textShadowRadius: 10
//   },
//   gameOverOverlay: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 2,
//   },
//   gameOverText: {
//     fontSize: 48,
//     color: 'white',
//     marginBottom: 20,
//   },
//   finalScoreText: {
//     fontSize: 32,
//     color: 'white',
//   },
//   back_arrow_img: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//     width: 75,
//     height: 75,
//   },
// });


import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Pressable, Image } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import entities from '../entities';
import Treat from '../components/Treat';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const TreatFalls = () => {
  const [running, setRunning] = useState(true);
  const [gameEngine, setGameEngine] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const entitiesRef = useRef(entities());

  const navigation = useNavigation(); // Use the navigation from the app's root container

  useEffect(() => {
    setRunning(true);
  }, []);

  const createTreat = (world) => {
    const treatSize = 50;
    const x = Math.random() * (width - treatSize);
    const y = -treatSize;
    const treatType = Math.random() > 0.3 ? 'good' : 'bad';

    const treat = Matter.Bodies.rectangle(x, y, treatSize, treatSize, {
      label: 'Treat',
      frictionAir: 0,
      friction: 0,
      restitution: 0,
      isSensor: true,
    });

    Matter.World.add(world, treat);

    return {
      body: treat,
      treatType,
      renderer: <Treat />
    };
  };

  const updateHandler = (entities, { time, dispatch }) => {
    let engine = entities.physics.engine;
    let world = engine.world;

    Matter.Engine.update(engine, time.delta);

    if (Math.random() < 0.02) {
      const newTreat = createTreat(world);
      const newTreatId = `treat-${Object.keys(entities).length}`;
      entities[newTreatId] = newTreat;
    }

    Object.keys(entities).forEach(key => {
      if (key.startsWith('treat')) {
        const treat = entities[key];

        Matter.Body.setVelocity(treat.body, { x: 0, y: 5 });

        if (treat.body.position.y > height + 50) {
          Matter.World.remove(world, treat.body);
          delete entities[key];
        }

        if (entities.Bird && Matter.Collision.collides(treat.body, entities.Bird.body)) {
          if (treat.treatType === 'good') {
            setScore(prevScore => prevScore + 1);
          } else {
            setLives(prevLives => {
              const newLives = prevLives - 1;
              if (newLives <= 0) {
                dispatch({ type: 'game_over' });
              }
              return newLives;
            });
          }
          Matter.World.remove(world, treat.body);
          delete entities[key];
        }
      }
    });

    return entities;
  };

  const backButton = () => {
    navigation.navigate('../gamehub/gamehub_mainscreen'); // Use navigation prop to navigate
  };

  return (
    <ImageBackground 
      source={require('../../assets/treatfallsbg.png')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Pressable style={styles.back_arrow_img} onPress={backButton}>
          <Image source={require('../../assets/back_arrow.png')} style={styles.back_arrow_img} />
        </Pressable>
        <GameEngine
          ref={(ref) => { setGameEngine(ref) }}
          style={styles.gameContainer}
          systems={[updateHandler]}
          entities={entitiesRef.current}
          running={running}
          onEvent={(e) => {
            if (e.type === 'game_over') {
              setRunning(false);
              gameEngine.stop();
            }
          }}
        />
        <Text style={styles.score}>Score: {score}</Text>
        <Text style={styles.lives}>Lives: {lives}</Text>
        {!running && (
          <View style={styles.gameOverOverlay}>
            <Text style={styles.gameOverText}>Game Over</Text>
            <Text style={styles.finalScoreText}>Final Score: {score}</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  score: {
    position: 'absolute',
    top: 100,
    right: 20,
    fontSize: 24,
    zIndex: 1,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  lives: {
    position: 'absolute',
    top: 50,
    right: 20,
    fontSize: 24,
    zIndex: 1,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  gameOverOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  gameOverText: {
    fontSize: 48,
    color: 'white',
    marginBottom: 20,
  },
  finalScoreText: {
    fontSize: 32,
    color: 'white',
  },
  back_arrow_img: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 75,
    height: 75,
  },
});

export default TreatFalls;
