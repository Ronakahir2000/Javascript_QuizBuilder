document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.getElementById('submit-quiz');
    const resultDiv = document.getElementById('result');
    const errorMessageDiv = document.getElementById('error-message');

    // display questions
    function displayQuestions() {
        quizQuestions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'question';

            const questionText = document.createElement('p');
            questionText.textContent = question.question;
            questionElement.appendChild(questionText);

            // radio buttons for options
            question.options.forEach((option, optionIndex) => {
                const label = document.createElement('label');
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `question${index}`; // Group by question index
                radio.value = optionIndex; // Store option index

                label.appendChild(radio);
                label.appendChild(document.createTextNode(option));
                questionElement.appendChild(label);
                questionElement.appendChild(document.createElement('br'));
            });

            quizContainer.appendChild(questionElement);
        });
    }

    // check answers and calculate score
    function checkAnswers() {
        let score = 0;
        let allAnswered = true;
        errorMessageDiv.textContent = ''; // Clear previous error message

        quizQuestions.forEach((question, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (!selectedOption) {
                allAnswered = false;
            } else if (parseInt(selectedOption.value) === question.correctAnswer) {
                score++;
            }
        });

        if (!allAnswered) {
            errorMessageDiv.textContent = 'Please answer all questions before submitting.';
        } else {
            resultDiv.textContent = `Your total score is: ${score} out of ${quizQuestions.length}`;
        }
    }

    // Event listener for the submit button
    submitButton.addEventListener('click', checkAnswers);

    // Display the questions on page load
    displayQuestions();
});
