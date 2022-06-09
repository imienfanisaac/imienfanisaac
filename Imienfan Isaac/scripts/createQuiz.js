let rawData = [];
let newQuestion = {};

// Function to read all current data in db collection "quiz"
const getData = async () => {
    // I empty the rawData array for each request
  rawData = []

  await db
    .collection("quiz")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        rawData.push(doc.data());
        //Here we show the quiz
      });
    })
    .then(() => {
      showQuiz(rawData);
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
};

getData();

// Getting elements in the DOM
let questionEl = document.getElementById("question");
let answerOneEl = document.querySelector("#answer1");
let answerTwoEl = document.querySelector("#answer2");
let answerThreeEl = document.querySelector("#answer3");
let cardInfoEl = document.createElement("DIV");
let resultsEl = document.querySelector(".results");
let messageEl = document.querySelector("#checkmessage");
let ratingsEl = document.querySelector("#ratings");

let questionBut = document.querySelector("#questionbutton");
let resetBut = document.querySelector("#resetbutton");

//This function is to submit questions. 
const submitQuestion = (question, answers, points) => {
  let submitTime = new Date()
   // Added a new document in collection "quiz"
  db.collection("quiz")
    .add({
      question: question,
      answers: answers,
      points: points,
      date: submitTime
    })
    .then((docref) => {
      console.log("Document successfully written with id!", docref.id);
      getData()
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

// Event handler for getting the new question and possible answers
function sendData() {

  messageEl.remove();
  let question = String(questionEl.value);
  let answerOne = String(answerOneEl.value);
  let answerTwo = String(answerTwoEl.value);
  let answerThree = String(answerThreeEl.value);
  let allAnswers = {
    answer1: answerOne,
    answer2: answerTwo,
    answer3: answerThree,
  };

  let points = document.getElementsByClassName(
    "ques-point fa fa-star star checked"
  ).length;

  // Function to send the new question and answers to db, not active yet
   submitQuestion(question, allAnswers, points);
};

// And This event is for resetting the form
function resetInfo() {
  questionEl.innerText = "";
  answerOneEl.innerText = "";
  answerTwoEl.innerText = "";
  answerThreeEl.innerText = "";
  pointsEl.innerText = "";
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

// And this one is to show the quiz questions
const showQuiz = (data) => {
  console.log(data);

  let newestDate = "";
  let lastQuestion = "";
  data.map((docData, i) => {
    if (docData.date > newestDate) {
      newestDate = docData.date;
      lastQuestion = docData;
    }
  });

  //Let´s empty the card for the latest question first
  const card = document.getElementById("usercards");
  card.innerHTML = ''

  // And create a div for the newest question
  cardInfoEl = document.createElement("DIV");
  cardInfoEl.innerHTML = "";

  cardInfoEl.innerHTML = `
          <div class="col mb-4 tarjetas">
              <div class="card bg-light text-dark my-3">
                  <div class="card-body">
                      <h6 class="card-title">Question: ${lastQuestion.question}</h6>
                      <div>
                      <p class="card-text">Answer 1: ${lastQuestion.answers.answer1}
                      <p class="card-text">Answer 2: ${lastQuestion.answers.answer2}
                      <p class="card-text">Answer 3: ${lastQuestion.answers.answer3}</p>
                      </div>
                      <h6 class="pt-3">Difficulty rate</h6>
                      <span class="fa fa-star ques-star-0"></span>
                      <span class="fa fa-star ques-star-0"></span>
                      <span class="fa fa-star ques-star-0"></span>
                      <span class="fa fa-star ques-star-0"></span>
                      <span class="fa fa-star ques-star-0"></span>
                  </div>
              </div>
          </div>
      </div>`;

      questionEl.value = "";

      cardInfoEl.innerHTML = cardInfo;

      card.append(cardInfoEl);

      // A little time out, in case the DOM is not rendered with the
      // question cards so quickly
      setTimeout(() => {
        importRating(lastQuestion.points, 0);
      }, 1000);
    }


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

// Event to rate the question´s difficulty level
let starEl = document.querySelectorAll(".star");

starEl.forEach((star) => {
  star.addEventListener("click", (e) => {
    e.preventDefault();
    setQuestionRate(e);
  });
});
//Routing to the quiz HTML file
function goToQuiz() {
  window.location = 'checkquiz.html'
}