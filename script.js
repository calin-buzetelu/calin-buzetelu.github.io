const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionElementContainer = document.getElementById('question-container')

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestion, currentQuestionIndex

function startGame(){
    console.log("Started")
    startButton.classList.add('hide')
    shuffledQuestion = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
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
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestion.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart quiz'
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
        question: 'What is a coronavirus?',
        answers: [
            { text: 'Coronaviruses are a large family of viruses which may cause illness in animals or humans.', correct: true},
            { text: 'Coronaviruses are a small family of bacteria which may cause illness in animals or humans.', correct: false},
            { text: 'Coronaviruses are a small family of viruses which may cause illness in animals', correct: false},
            { text: 'Coronaviruses are a large family of viruses which may cause illness in humans.', correct: false}
        ]
    }
]