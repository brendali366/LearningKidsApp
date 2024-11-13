import { Alert, Button, Image, ImageBackground, Pressable, SafeAreaView, StyleSheet, Switch, Text, PixelRatio, TextInput, View, Modal, StatusBar, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import { Questions } from '../config/questions';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';
import { database } from '../config/firebaseConfig'; // Your Firebase config
import { ref, onValue } from 'firebase/database';
import { auth } from '../config/firebaseConfig';
import { isNewBackTitleImplementation } from 'react-native-screens';
import { useRoute, useNavigation } from '@react-navigation/native';
const { height } = Dimensions.get('window');
const fontsize = PixelRatio.getFontScale() * 16;
export default function Page() {

  

  const route = useRoute();
  const { child_username } = route.params; // Access the child's username
  const navigation = useNavigation();

    const [contacts, setContacts] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [questionNumber, setQuestionNumber] = useState(1);
    const [usedQuestions, setUsedQuestions] = useState([]);
    const [selectedIncorrectAnswers, setSelectedIncorrectAnswers] = useState([]); // Added to store incorrect answers
    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    const getRandomQuestion = (contact) => {
      const randomQuestion = Questions[Math.floor(Math.random() * Questions.length)];
      const formattedQuestion = randomQuestion.question.replace('{name}', contact.name);
      return { formattedQuestion, key: randomQuestion.key };
  };
  
  useEffect(() => {
    const fetchContacts = async () => {
        const parentId = auth.currentUser?.uid; // Get the current user's ID
        const childId = 'EmergencyContacts'; // Replace with actual child ID logic

        if (!parentId || !childId) {
            Alert.alert('Error', 'Parent or Child ID missing.');
            return;
        }

        const contactsRef = ref(database, `parents/${parentId}/children/${childId}/emergencyContacts`);
        onValue(contactsRef, (snapshot) => {
            const data = snapshot.val();
            const loadedContacts = data ? Object.keys(data).map(key => ({ ...data[key], key })) : [];
            setContacts(loadedContacts);

            if (loadedContacts.length > 0) {
                const randomIndex = Math.floor(Math.random() * loadedContacts.length);
                const randomContact = loadedContacts[randomIndex];

                // Select a random question template
                const randomQuestionTemplate = Questions[Math.floor(Math.random() * Questions.length)];
                const formattedQuestion = randomQuestionTemplate.question.replace('{name}', randomContact.name);
                const questionKey = randomQuestionTemplate.key; // Keep question key for consistency

                // Set the question and answer based on the selected question template
                setCurrentQuestion(formattedQuestion);
                const correctAnswer = randomContact[questionKey] || '';
                setAnswer(correctAnswer); // Set the correct answer

                // Collect incorrect answers based on the same attribute
                const incorrectAnswers = loadedContacts
                    .filter(contact => contact.key !== randomContact.key) // Avoid duplicates
                    .map(contact => contact[questionKey]) // Use the same key for incorrect answers
                    .filter(answer => answer !== undefined && answer !== correctAnswer); // Filter out undefined and correct answers

                // Randomly select 2 distinct incorrect answers
                const selectedIncorrectAnswers = [];
                while (selectedIncorrectAnswers.length < 2 && incorrectAnswers.length > 0) {
                    const incorrectIndex = Math.floor(Math.random() * incorrectAnswers.length);
                    const incorrectAnswer = incorrectAnswers[incorrectIndex];
                    if (!selectedIncorrectAnswers.includes(incorrectAnswer)) {
                        selectedIncorrectAnswers.push(incorrectAnswer);
                    }
                }

                // Ensure we have exactly 2 incorrect answers
                if (selectedIncorrectAnswers.length < 2) {
                    Alert.alert('Not enough distinct incorrect answers found.');
                } else {
                    setSelectedIncorrectAnswers(selectedIncorrectAnswers);
                }
                const answersArray = [
                  <Pressable key={1} style={styles.answers} onPress={() => handleOptionPress(answer)}>
                      <Text style={styles.answerText}>{answer || 'Select an answer'}</Text>
                  </Pressable>,
                  ...selectedIncorrectAnswers.map((incorrectAnswer, index) => (
                      <Pressable key={index + 2} style={styles.answers} onPress={() => handleOptionPress(incorrectAnswer)}>
                          <Text style={styles.answerText}>{incorrectAnswer || 'Missing contact information'}</Text>
                      </Pressable>
                  )),
                ];
                setShuffledAnswers(shuffleArray(answersArray));
            } else {
                Alert.alert('No contacts available');
            }
        });
    };

    fetchContacts();
}, [currentQuestion, isCorrect]);

 
  
    const handleAnswerSelection = () => {
      Alert.alert(`The answer is: ${answer}`); // Show the phone number
    };



//score
  const increaseNum = 10;
  const [score, setScore] = useState(0);
  const incrementScore = () => {
    setScore(score + increaseNum);
  };

//hearts
  const [imageCount, setImageCount] = useState(3);
  const imageSources = [
    require('../../assets/heartIcon.png'),
    require('../../assets/heartIcon.png'),
    require('../../assets/heartIcon.png'),
  ];

  const [health, setHealth] = useState(3);
  const decrementHealth = () => {
    setHealth(health => Math.max(health - 1, 0));
  };
//hint modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true); 
  };
 
//retry modal
const [isRetryModalVisible, setIsRetryModalVisible] = useState(false);
const showRetryModal = () => {
  setIsRetryModalVisible(true);
}

//pause modal
const [isPauseModalVisisble, setIsPauseModalVisible] = useState(false);
const showPauseModal = () => {
  setIsPauseModalVisible(true);
}

//finish modal
const [isFinishModalVisible, setIsFinishModalVisible] = useState(false);
const showFinishModal = () => {
  setIsFinishModalVisible(true);
}


// random number generator
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min +1)) + min;
}
const randomNum = getRandomNumber(0,Questions.length);


//Questions
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [selectedOption, setSelectedOption] = useState(null);
const [isCorrect, setIsCorrect] = useState(false);


const [hasAnswered, setHasAnswered] = useState(false);
const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

const [isCorrectModalVisible, setisCorrectModalVisible] = useState(false);

const showCorrectModal = () => {
  setisCorrectModalVisible(true);
  setTimeout(() => {
  setisCorrectModalVisible(false);
  }, 1000); 
};

const [isIncorrectModalVisible, setisIncorrectModalVisible] = useState(false);
const showIncorrectModal = () => {
  setisIncorrectModalVisible(true);
  setTimeout(() => {
  setisIncorrectModalVisible(false);
  }, 1000); 
};
//handle pressed option
const handleOptionPress = (pressedOption) => {
  if (!hasAnswered){
    setHasAnswered(true);
    const optionText = pressedOption.props.children;

    console.log("has answered", hasAnswered);
    // const isAnswerCorrect = pressedOption === answer;
    const isAnswerCorrect = optionText.trim() ===String(answer).trim();
    setSelectedOption(optionText);
    setIsCorrect(isAnswerCorrect)
   

    
    setIsNextButtonDisabled(false);
    
    if(isAnswerCorrect){
      increaseXP();
      incrementScore();
      showCorrectModal();
    }
    else{
      // Alert.alert(`The answer is: ${answer}`);
      showIncorrectModal();
      setImageCount(imageCount-1);
      if(imageCount == 1)
      {
        setIsRetryModalVisible(true);
      }
    }
  }
};

const getBackgroundColor = (option) => {
  // console.log("selectedOption:", selectedOption); // Debugging
  // console.log("option:", option); // Debugging
  // console.log("isCorrect:", isCorrect); // Debugging
  if (selectedOption !== undefined && selectedOption !== null) {
    //console.log("choosing color");
    if (String(selectedOption) == String(answer)){
      // return isCorrect ? 'green' : 'red'; // Correct answer -> green, Incorrect answer -> red
        
    }
  }
  return 'rgba(211, 211, 211, 0.3)'; // Default background for unselected options
};



const handleNext = () => {
  setHasAnswered(false); // Re-enable answer choices
  setSelectedOption(null);
  setIsCorrect(null);
  if (contacts.length > 0) {
    setIsNextButtonDisabled(true);
      const randomIndex = Math.floor(Math.random() * contacts.length);
      const randomContact = contacts[randomIndex];

      let formattedQuestion, questionKey;

      // Generate a new random question
      const questionData = getRandomQuestion(randomContact);
      formattedQuestion = questionData.formattedQuestion;
      questionKey = questionData.key;

      // Set the question and correct answer
      setCurrentQuestion(formattedQuestion);
      const correctAnswer = randomContact[questionKey] || '';
      setAnswer(correctAnswer);

      // Collect incorrect answers based on the same attribute
      const incorrectAnswers = contacts
          .filter(contact => contact.key !== randomContact.key) // Avoid duplicates
          .map(contact => contact[questionKey]) // Use the same key for incorrect answers
          .filter(answer => answer !== undefined && answer !== correctAnswer); // Filter out undefined and correct answers

      // Randomly select 2 distinct incorrect answers
      const selectedIncorrectAnswers = [];
      while (selectedIncorrectAnswers.length < 2 && incorrectAnswers.length > 0) {
          const incorrectIndex = Math.floor(Math.random() * incorrectAnswers.length);
          const incorrectAnswer = incorrectAnswers[incorrectIndex];
          if (!selectedIncorrectAnswers.includes(incorrectAnswer)) {
              selectedIncorrectAnswers.push(incorrectAnswer);
          }
      }

      // Ensure we have exactly 2 incorrect answers
      if (selectedIncorrectAnswers.length < 2) {
          Alert.alert('Not enough distinct incorrect answers found.');
      } else {
          setSelectedIncorrectAnswers(selectedIncorrectAnswers);
      }

      setUsedQuestions([...usedQuestions, formattedQuestion]); // Add to used questions

      // Increment question number, reset if greater than 7
      if (questionNumber < 7) {
          setQuestionNumber(questionNumber + 1);
      } else {
          // Handle game completion logic here
          setIsFinishModalVisible(true);
          setQuestionNumber(1); // Reset question number if desired
          setUsedQuestions([]); // Reset used questions for replay
      }
  } else {
      Alert.alert('No contacts available');
  }

};



//Questions out of 7
//const [questionNumber, setQuestionNumber ]= useState(1);
const incrementQuestionNumber = () => {
  if(questionNumber < 7)
  {
    setQuestionNumber(questionNumber + 1);
  }
  
}
//xp
const xpIncreaseAmount = 5
const [currentXP, setCurrentXP] = useState(0);
const increaseXP = () => {
  setCurrentXP(currentXP + xpIncreaseAmount);
};

const resetGame = () => {
  setImageCount(3); 
  setScore(0);
  setCurrentQuestionIndex(0); 
  setQuestionNumber(1); 
  setCurrentXP(0); 
  setIsRetryModalVisible(false);
  setSelectedOption(null);
  setIsCorrect(false);
  setIsNextButtonDisabled(true);
  setHasAnswered(false);
  
};



//answer array randomize


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}



  return (
    <ImageBackground source={require('../../assets/CorgiEscapeBG.png')} style={styles.background}>
      <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

        {/* Retry Modal */}
        <Modal animationType='slide' transparent={true} visible={isRetryModalVisible}> 
          <View style={styles.retryModalWrapper}>
            <View style={styles.retryBox}>
                <View style ={{position: 'absolute', top: 10}}>
                  <Text style={styles.modalText}>
                    OH NO! You ran out of lives. Would you like to retry?
                  </Text>
                </View>
              <View style={styles.retryOptionsArea}>
              
                <Pressable style={styles.retryOptions} onPress={() => {setIsRetryModalVisible(!isRetryModalVisible); resetGame();}}>
                  <Text style={styles.answerText}>
                    Retry
                  </Text>
                </Pressable>
                
                <Link href={`/gamehub/gamehub_mainscreen?child_username=${child_username}`} asChild>
                  <Pressable style={styles.retryOptions}>
                    <Text style={styles.answerText}>
                      Game Hub
                    </Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>
        </Modal>

        {/* Pause Modal */}
        <Modal animationType='slide' transparent={true} visible={isPauseModalVisisble}>
          <View style={styles.retryModalWrapper}>
            <View style={styles.retryBox}>
              <View style ={{position: 'absolute', top: 10}}>
                <Text style={styles.answerText}>
                  Game Paused
                </Text>
              </View>
              <View style={styles.retryOptionsArea}>
                <Pressable style={styles.retryOptions} onPress={() => setIsPauseModalVisible(false)}>
                  <Text style={styles.answerText}>
                    Resume
                  </Text>
                </Pressable>
                {/* <Pressable style={styles.retryOptions}>
                  <Text style={styles.answerText}>
                    Settings
                  </Text>
                </Pressable> */}
                <Link href={`/gamehub/gamehub_mainscreen?child_username=${child_username}`} asChild>
                  <Pressable style={styles.retryOptions}>
                    <Text style={styles.answerText}>
                      GameHub
                    </Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>
        </Modal>

        {/* Game Completed Modal */}
        <Modal animationType='slide' transparent={true} visible={isFinishModalVisible}>
          <View style={styles.modalWrapper}>
            <View style={styles.retryBox}>
              <View style ={{position: 'absolute', top: 10}}>
                <Text style={styles.answerText}>
                  You Completed The Game!!!
                </Text>
              </View>
              <View style={styles.finishDetails}>
                <Text style={styles.answerText}>
                  XP Earned: {currentXP} 
                </Text>
                <Text style={styles.answerText}>
                  Score: {score}
                </Text>
              </View>
              <View style={styles.retryOptionsArea}>
                <Pressable style={styles.retryOptions} onPress={() => {setIsFinishModalVisible(false); resetGame();}}>
                    <Text style={styles.answerText}>
                      Play Again
                    </Text>
                </Pressable>
                <Link href={`/gamehub/gamehub_mainscreen?child_username=${child_username}`} asChild>
                  <Pressable style={styles.retryOptions}>
                      <Text style={styles.answerText}>
                        GameHub
                      </Text>
                    </Pressable>
                </Link>
              </View>
            </View>
          </View>
        </Modal>

        {/* Correct/Incorrect Modals */}
        <Modal animationType='fade' transparent={true} visible={isCorrectModalVisible}>
          <View style={styles.modalWrapper}>
            <View style= {styles.correct_incorrect_Modal_Wrapper}>
              <Text style={styles.answerText}>
                CORRECT! GOOD JOB!
              </Text>
            </View>
          </View>
        </Modal>

        <Modal animationType='fade' transparent={true} visible={isIncorrectModalVisible}>
          <View style={styles.modalWrapper}>
            <View style= {styles.correct_incorrect_Modal_Wrapper}>
              <Text style={styles.answerText}>
                INCORRECT
              </Text>
            </View>
          </View>
        </Modal>

        <Pressable style={styles.Backbutton} onPress={() => setIsPauseModalVisible(true)}>
          <Image source={require('../../assets/pause_button.png')}/>
        </Pressable>
        
        <View>
          <Text style={styles.QuestionOrder}>{questionNumber} OF 7</Text>
        </View>
        <View style={styles.hearts}>
          {imageSources.slice(0, imageCount).map((source, index) => (
          <Image 
          key={index} 
          source={source}
          />))}
          {imageCount === 0 && (
          <View style={styles.emptyHeartsPlaceholder}>
          {/* Empty hearts placeholder */}
        </View>
  )}

        </View>

        {/* <View style = {styles.healthTest}>
          <Text>(Testing Purposes) Health: {health}</Text>
        </View> */}
        <View style={styles.score}>
          <Text style={styles.scoreText}>XP: {currentXP}</Text>
          
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>

        <View style={styles.questionArea}>
          <Text style={styles.questionText}>{currentQuestion}</Text>
         
        </View>

        <View style={styles.answerArea}>
  {shuffledAnswers.map((answerComponent, index) => (
    React.cloneElement(answerComponent, {
      key: index,
      style: [
        styles.answers,
        { backgroundColor: getBackgroundColor(answerComponent.props.children) },
        hasAnswered && { opacity: 0.5 },
      ],
      onPress: () => handleOptionPress(answerComponent.props.children),
      disabled: hasAnswered,
    })
  ))}
</View>




        <View style = {styles.nextButtonArea}>
          <Pressable style = {({ pressed }) => [styles.nextButton, pressed ? styles.pressedNextButton : styles.nextButton, isNextButtonDisabled && {opacity: 0.5}]}
           onPress={() => {handleNext();}} disabled={isNextButtonDisabled}>
            <Text>NEXT</Text>
          </Pressable>
        </View>

      

      </SafeAreaView>
    </ImageBackground>

  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensures the background image covers the entire screen
  },

  Backbutton: {
    maxWidth: 200, // Set a fixed width or use maxWidth
    padding: 10,
    //backgroundColor: '#f7e7b4',
    //borderRadius: 5,
    //marginVertical: 10, 
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    top: 5,
    left: 5,
  },
  //modal background
  retryModalWrapper:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: '100%',
  },

  retryBox:{
    height: '25%',
    width:'80%',
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#A7C7E7',
    borderRadius: 15,
    borderWidth: 1,
    
  },
  retryOptionsArea:{
    flexDirection: 'column',
    position:'absolute',
    bottom: 0,
    gap: 5,
    width: "100%",
    justifyContent: 'space-between',
    padding: 25,
    alignItems: 'center',
    paddingTop: 10


  },
  retryOptions:{
    borderRadius: 7,
    alignItems: 'center',
    alignContent:'center',
    paddingVertical: 3,
    width: '90%',
    backgroundColor: '#f7e7b4',
    borderWidth: 1,
    
  },

  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    //backgroundColor: 'rgba(128, 128, 128, 0.4)',
  },
  correct_incorrect_Modal_Wrapper: {
    flex: 1,
    position: 'absolute',
    top: height * 0.4,
    width: "100%",


  },
  modalView: {
    width: '70%',
    justifyContent: 'center',
    // position: 'absolute',
    // bottom: 165,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  
  finishDetails:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width:'100%',
    paddingHorizontal: 10,
    position: 'absolute',
    top: 60,
  },


  
  healthTest: {
    alignSelf: 'flex-end',

  },
  
  testArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',


  },
  
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    padding: 16, // Padding around the container
    //backgroundColor: '#A7C7E7',
    
  },

  hearts: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'right',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    marginTop: 15,
  },

  score: {
    width: '100%',
    flexDirection: 'row',
    //justifyContent: 'flex-end',
    justifyContent: 'space-between',
    //justifyContent: 'space-around',
    paddingHorizontal: 10,

  },

  scoreText:{
    fontSize: 25,
    fontFamily: 'EBGaramond_800ExtraBold',
    color: 'white',
    textShadowColor: 'black', // Outline color
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 1, // Blur radius for the shadow
  },
  QuestionOrder:{
    fontSize: 25,
    fontFamily: 'EBGaramond_800ExtraBold',
    color: 'white',
    textShadowColor: 'black', // Outline color
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 1, // Blur radius for the shadow
    position: 'absolute',
    top: 10,
    left: '41.5%',
    width: '100%'
  },

  questionArea:{
    backgroundColor: 'rgba(211, 211, 211, 0.3)',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: '30%',
    borderWidth: 1,
    borderRadius: 15,
    marginHorizontal: 10,
    width: '96%',
    textAlign: 'center',
  },

  answerArea: {
    width: '100%',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    gap: 5,
    marginTop: 10,
    justifyContent: 'space-between',
    fontFamily: 'EBGaramond_800ExtraBold',
    height: '35%',
  },

  answers: {
    
    backgroundColor: 'rgba(211, 211, 211, 0.1)',
    flexDirection: 'column',
    borderColor: 'black',
    borderWidth: 1,
    alignContent: 'center',
    borderRadius: 15,
    height: '45%',
    //width: 400,
    minWidth: '100%',
    justifyContent: 'center',
    fontFamily: 'EBGaramond_800ExtraBold',
   
   
  },
  pressedAnswer: {
    backgroundColor: 'rgba(211, 211, 211, 0.7)',

  },

  button: {
    width: 200, // Set a fixed width or use maxWidth
    padding: 10,
    backgroundColor: '#f7e7b4',
    borderRadius: 5,
    marginVertical: 10, 
    alignItems: 'center'
  },
  
  ModalButton: {
    width: 200, // Set a fixed width or use maxWidth
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 10, 
    alignItems: 'center'
  },

questionText:
{
  fontSize: '25',
  fontFamily: 'EBGaramond_800ExtraBold',
  color: 'white',
  textShadowColor: 'black', // Outline color
  textShadowOffset: { width: 2, height: 2 }, 
  textShadowRadius: 1, // Blur radius for the shadow
},

answerText: {
  fontSize: '25',
  fontFamily: 'EBGaramond_800ExtraBold',
  color: 'white',
  textShadowColor: 'black', // Outline color
  textShadowOffset: { width: 2, height: 2 }, 
  textShadowRadius: 1, // Blur radius for the shadow
  
  //width: '90%',
  //height: '100%',
  textAlign: 'center',
  textAlignVertical: 'center',
  alignItems: 'center',
  borderRadius: 15,
},
modalText: {
  fontSize: 12,
  fontFamily: 'EBGaramond_800ExtraBold',
  color: 'white',
  textShadowColor: 'black', // Outline color
  textShadowOffset: { width: 2, height: 2 }, 
  textShadowRadius: 1, // Blur radius for the shadow
  
  //width: '90%',
  //height: '100%',
  textAlign: 'center',
  textAlignVertical: 'center',
  alignItems: 'center',
  borderRadius: 15,
},

nextButtonArea: {
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  bottom: '5%',
  width: '100%',
},

nextButton: {
  padding: 10,
  backgroundColor: '#f7e7b4',
  borderRadius: 5,
  alignItems: 'center',
  minWidth: '75%',


},
pressedNextButton: {
  backgroundColor: '#d9ca9c',

},
emptyHeartsPlaceholder: {
  width: "100%", 
  height: 32, 
},


});