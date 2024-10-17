import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, Pressable } from 'react-native';
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

  const navigation = useNavigation();
  const backButton = () => {
    navigation.navigate('gamehub/gamehub_mainscreen');
  };

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
    };

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

  
  return (
    <ImageBackground 
      source={require('../../assets/treatfallsbg.png')} 
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={backButton}>
          <Image source={require('../../assets/back_arrow.png')} style={styles.backArrowImage} />
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
    top: 80,
    right: 20,
    fontSize: 24,
    zIndex: 1,
    color: 'white', // Changed to white for better visibility on background
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  lives: {
    position: 'absolute',
    top: 50,
    right: 20,
    fontSize: 24,
    zIndex: 1,
    color: 'white', // Changed to white for better visibility on background
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
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

  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  backArrowImage: {
    width: 50,
    height: 50,
  },
});


export default TreatFalls;