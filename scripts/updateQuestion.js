let questionsData = [];
let updateQuestionId = '';

// Function to read all current data in db collection "quiz"
const getQuestions = async () => {
    // I empty the rawData array for each request
    rawData = [];

    await db
        .collection("quiz")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                rawData.push({
                    id: doc.id,
                    data: doc.data()
                });
                //Here we show the quiz
            });
        })
        .then(() => {
            showQuestions(rawData);
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        });
};

getQuestions();

function setQuestionRate(event) {
    let allStars = document.querySelectorAll(".star");
    allStars.forEach((star) => {
        // We remove all checked stars in case we change our minds
        star.classList.remove("checked");
        // And set checked to those stars with id less than event star id
        if (Number(event.target.id) >= Number(star.id)) {
            star.classList.toggle("checked");
        }
    });
}

const showChosenQuestion = (question, id) => {

    console.log(question)

    document.getElementById('update-form').style.display = "block"
    //document.getElementById('questionresult').style.display = 'block'

    // Getting elements in the DOM
    document.getElementById("chosen-question").value = question.question
    document.getElementById("chosen-answer1").value = question.answers.answer_1
    document.getElementById("chosen-answer2").value = question.answers.answer_2
    document.getElementById("chosen-answer3").value = question.answers.answer_3

    // Event to rate the question´s difficulty level
    let starEl = document.querySelectorAll(".star");

    starEl.forEach((star) => {
        star.addEventListener("click", (e) => {
            e.preventDefault();
            setQuestionRate(e);
        });
    });
}

// And this one is to show the quiz questions
const showQuestions = (data) => {

    let chosenQuestion = {};
    data.map((docData, i) => {

        //Let´s get the card to append the info on
        const card = document.getElementById("questionscards");
        // And create a div for the questions in quiz
        cardInfoEl = document.createElement("DIV");
        cardInfoEl.innerHTML = "";

        cardInfoEl.innerHTML = `
                <div class="carddiv col-12 mb-4 w-100">
                    <div class="card-body shadow bg-light text-dark my-3">
                        <h6 id=${docData.id} class="card-title">Question: ${docData.data.question}</h6>                            
                    </div>
               </div>`;

        card.append(cardInfoEl);

        document.getElementById(`${docData.id}`).style.cursor = 'pointer'

        setTimeout(() => {
            document.getElementById(`${docData.id}`).addEventListener('click', (e) => {
                chosenQuestion = docData.data
                setTimeout(() => {
                    // I remove the display of questions
                    card.style.display = 'none'
                    updateQuestionId = docData.id
                    showChosenQuestion(chosenQuestion, e.target.id)
                }, 500)
            })
        }, 1000)
    });
};

const submitToDb = async (question) => {

    let id = updateQuestionId

    await db
        .collection("quiz")
        .doc(id)
        .update(question)
        .then(() => {
            alert('Question succesfully updated. You are redirected to check quiz');
            window.location = ('checkQuiz.html')
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        });
}

const updateQues = (e) => {

    // Getting elements in the DOM
    let ques = document.getElementById("chosen-question").value
    let ans1 = document.getElementById("chosen-answer1").value
    let ans2 = document.getElementById("chosen-answer2").value
    let ans3 = document.getElementById("chosen-answer3").value
    let rightAns = document.getElementById("chosen-rightans").value

    let points = document.getElementsByClassName(
        "chosen ques-point fa fa-star star checked"
    ).length;

    question = {
        'question': ques,
        'answers': {
            'answer_1': ans1,
            'answer_2': ans2,
            'answer_3': ans3
        },
        'points': points,
        'date': new Date(),
        'right_ans': Number(rightAns)
    }
    console.log(question)

    submitToDb(question)
}

const backToQuestions = () => {
    window.location('updateQuestion.html')
}