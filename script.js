const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const welcomeHeader = document.getElementById('Welcome')
const questionElementContainer = document.getElementById('question-container')

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestion, currentQuestionIndex, correctAnswers

function startGame(){
    console.log("Quiz started")
    startButton.classList.add('hide')
    welcomeHeader.classList.add('hide')
    shuffledQuestion = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    correctAnswers = 0
    questionElementContainer.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestion[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    });
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if(correct){
        correctAnswers++
    }
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestion.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart quiz'
        correctAnswers = 0
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is a coronavirus?',
        answers: [
            { text: 'Coronaviruses are a large family of viruses which may cause illness in animals or humans.', correct: true},
            { text: 'Coronaviruses are a small family of bacteria which may cause illness in animals or humans.', correct: false},
            { text: 'Coronaviruses are a small family of viruses which may cause illness in animals', correct: false},
            { text: 'Coronaviruses are a large family of viruses which may cause illness in humans.', correct: false}
        ]
    }, 
    {
        question: 'What disease does the recently discovered coronavirus cause?',
        answers: [
            { text: 'The most recently discovered coronavirus does not cause coronavirus disease COVID-19.', correct: false},
            { text: 'The most recently discovered coronavirus causes coronavirus disease COVID-19.', correct: true},
            { text: 'The most recently discovered coronavirus causes coronavirus disease COVID.', correct: false},
            { text: 'The most recently discovered coronavirus causes coronavirus disease COVID-18.', correct: false}
        ]
    }, 
    {
        question: 'What is COVID-19?',
        answers: [
            { text: 'COVID-19 is the infectious disease caused by the most recently discovered coronavirus.', correct: true},
            { text: 'COVID-19 is the infectious disease caused by the most recently discovered corticovirus.', correct: false},
            { text: 'COVID-19 is the infectious disease caused by the most recently discovered circovirus.', correct: false},
            { text: 'COVID-19 is the infectious disease caused by the most recently discovered cystovirus.', correct: false}
        ]
    }, 
    {
        question: 'Where did the COVID-19 outbreak begin?',
        answers: [
            { text: 'The outbreak began in Italy, in December 2019.', correct: false},
            { text: 'The outbreak began in the United States, in December 2019.', correct: false},
            { text: 'The outbreak began in France, in December 2019.', correct: false},
            { text: 'The outbreak began in China, in December 2019.', correct: true}
        ]
    },
    {
        question: 'What are the symptoms of COVID-19?',
        answers: [
            { text: 'The most common symptoms of COVID-19 are muscle pain, and dry cough.', correct: false},
            { text: 'The most common symptoms of COVID-19 are fever, stomach ache, and wet cough.', correct: false},
            { text: 'The most common symptoms of COVID-19 are fever, tiredness, and dry cough.', correct: true},
            { text: 'The most common symptoms of COVID-19 are fever, tiredness.', correct: false},
        ]
    },
    {
        question: 'How does COVID-19 spread?',
        answers: [
            { text: 'The disease can spread from person to person through small droplets from the nose or mouth which are spread when a person with COVID-19 coughs or exhales.', correct: true},
            { text: 'The disease can spread from animals to persons through small droplets from the nose or mouth which are spread when an animal with COVID-19 coughs or exhales.', correct: false},
            { text: 'The disease can spread from person to person through blood.', correct: false},
            { text: 'The disease can spread from person to person through sexual intercourse.', correct: false},
        ]
    }
]