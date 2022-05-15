const startBtn = document.getElementById('start');
const Qdiv = document.getElementById('question');
const Question = document.getElementById('main-q');
const answer = document.getElementById('ansForm');
const title = document.getElementById('mainText');

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const randomIntFromInterval = (min, max) => { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const createQuestion = () => {
    const number1 = randomIntFromInterval(2, 60);
    const number2 = randomIntFromInterval(2, 30);
    const logicalRand = randomIntFromInterval(0,2);

    let answer;
    let logical;

    switch(logicalRand) {
        case 0:
            answer = number1 + number2
            logical = '+'
            break;
        case 1:
            answer = number1 - number2
            logical = '-'
            break;
        case 2:
            answer = number1 * number2
            logical = 'x'
            break;
        case 3:
            answer = number1 / number2
            logical = '÷'
            break;
    }

    const returnObject = {
        num1: number1,
        num2: number2,
        answer: answer,
        logical: logical
    };

    return returnObject;
}

const NewQuestionElement = () => {

    const questionDat = createQuestion();
    Question.innerText = `${questionDat.num1} ${questionDat.logical} ${questionDat.num2}`;
    return questionDat;

}

const handleVisibility = () => {
    startBtn.classList.add('hidden');
    title.classList.add('hidden');
    

    Question.classList.remove('hidden');
    answer.classList.remove('hidden');
}

const handleStart = () => {

    handleVisibility()
    let questionData = NewQuestionElement();

    answer.addEventListener('keyup', async function (e) {
        if (e.key === 'Enter') {

            userAnswer = parseInt(e.target.value);
            e.target.value = '';

            if (userAnswer !== questionData.answer) {
                const pText = Question.innerText
                Question.innerText = '❌';
                await sleep(500);
                Question.innerText = pText;

            }

            if (userAnswer === questionData.answer) {
                Question.innerText = '✅';
                await sleep(500);
                questionData = NewQuestionElement();

            }

        }
    })

}

startBtn.addEventListener('click', handleStart);