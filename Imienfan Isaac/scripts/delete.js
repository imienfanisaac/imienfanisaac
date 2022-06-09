
let deleteQuestionId = '';

// Function to read all current data in db collection "quiz"
const getQues = async () => {
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
            showQues(rawData);
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        });
};

getQues();

const showQues = (data) => {

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
                deleteQuestionId = docData.id
                submitToDb(docData.data)
            })
        }, 1000)
    });
};
const submitToDb = async (question) => {

    let id = deleteQuestionId
    console.log(id)

    await db
        .collection("quiz")
        .doc(id)
        .delete()
        .then(() => {
            window.location = ('delete.html')
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        });
}








