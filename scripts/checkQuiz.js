let quizData = []
console.log(window)

// Function to read all current data in db collection "quiz"
const getQuizData = async () => {
    await db
        .collection("quiz")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                docData = doc.data();
                quizData.push(docData)
                //Here we show the quiz
            });
        })
        .then(() => {
            showFinalQuiz(quizData);
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        });
};

getQuizData();

// Getting elements in the DOM
let quizResultsEl = document.querySelector(".quizresults");
let quizMessageEl = document.querySelector("#check-quiz-message");
let quizRatingsEl = document.querySelector("#quest-ratings");

// And this one is to show the quiz questions
const showFinalQuiz = (data) => {
    console.log(data);

    data.map((docData, i) => {
        console.log(docData);
        if (docData) {
            const card = document.querySelector("#quizcards");
            quizResultsEl = document.createElement("DIV");
            quizResultsEl.innerHTML = "";

            let cardInfo = `
                    <div class="col mb-4 tarjetas">
                        <div class="card bg-light text-dark my-3">
                            <div class="card-body">
                                <h5 class="card-title">Question: ${docData.question}</h5>
                                <div>
                                <p class="card-text">Answer 1: ${docData.answers.answer1}
                                <p class="card-text">Answer 2: ${docData.answers.answer2}
                                <p class="card-text">Answer 3: ${docData.answers.answer3}</p>
                                </div>
                                <h5 class="pt-3">Difficulty rate</h5>
                                <span class="fa fa-star ques-star-${i}"></span>
                                <span class="fa fa-star ques-star-${i}"></span>
                                <span class="fa fa-star ques-star-${i}"></span>
                                <span class="fa fa-star ques-star-${i}"></span>
                                <span class="fa fa-star ques-star-${i}"></span>
                            </div>
                        </div>
                    </div>
                </div>`;

            quizResultsEl.innerHTML = cardInfo;
            quizResultsEl.style.width = "100%"
            
            card.append(quizResultsEl);

            // A little time out, in case the DOM is not rendered with the
            // question cards so quickly
            setTimeout(() => {
                importRating(docData.points, i);
            }, 1000);
        }
    })

};

// Function to display the difficulty rate of the questions in db
function importRating(points, i) {
    let starsEl = document.getElementsByClassName(`ques-star-${i}`);
    for (i = 0; i < starsEl.length; i++) {
        if (points > i) {
            starsEl[i].classList.toggle("checked");
        }
    }
}