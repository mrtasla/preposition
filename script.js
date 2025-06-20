
// Prepositions Quiz JavaScript Implementation

document.addEventListener('DOMContentLoaded', function() {
    loadPrepositionsQuiz();
});

function loadPrepositionsQuiz() {
    const container = document.getElementById('prepositions-sections');
    
    if (!container) {
        console.error('Prepositions sections container not found');
        return;
    }

    // Clear existing content
    container.innerHTML = '';

    // Get prepositions data from the HTML script
    if (typeof prepositionsData === 'undefined') {
        console.error('Prepositions data not found');
        return;
    }

    // Create sections for each preposition
    prepositionsData.forEach((preposition, sectionIndex) => {
        const sectionElement = createPrepositionSection(preposition, sectionIndex);
        container.appendChild(sectionElement);
    });
}

function createPrepositionSection(preposition, sectionIndex) {
    const section = document.createElement('div');
    section.className = 'card';
    
    section.innerHTML = `
        <h2 class="section-title text-2xl font-bold mb-4">${preposition.name}</h2>
        <div class="mb-4">
            <h3 class="text-lg font-semibold mb-2">Explanation:</h3>
            <p class="text-gray-700 mb-3">${preposition.explanation}</p>
            <h4 class="text-md font-semibold mb-2">Examples:</h4>
            <ul class="list-disc list-inside space-y-1">
                ${preposition.examples.map(example => 
                    `<li class="text-gray-700">${example.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`
                ).join('')}
            </ul>
        </div>
        <div class="mcqs-container">
            <h3 class="text-lg font-semibold mb-4">Practice Questions:</h3>
            ${preposition.mcqs.map((mcq, mcqIndex) => 
                createMCQElement(mcq, sectionIndex, mcqIndex)
            ).join('')}
        </div>
    `;
    
    return section;
}

function createMCQElement(mcq, sectionIndex, mcqIndex) {
    const questionId = `q_${sectionIndex}_${mcqIndex}`;
    
    return `
        <div class="question-card">
            <p class="font-medium mb-3">${mcqIndex + 1}. ${mcq.question}</p>
            <div class="options-container">
                ${mcq.options.map((option, optionIndex) => `
                    <label class="option-label" for="${questionId}_${optionIndex}">
                        <input 
                            type="radio" 
                            id="${questionId}_${optionIndex}" 
                            name="${questionId}" 
                            value="${optionIndex}"
                            onchange="checkAnswer(${sectionIndex}, ${mcqIndex}, ${optionIndex}, ${mcq.correct})"
                        >
                        <span>${option}</span>
                    </label>
                `).join('')}
            </div>
            <div id="feedback_${sectionIndex}_${mcqIndex}" class="feedback" style="display: none;"></div>
        </div>
    `;
}

function checkAnswer(sectionIndex, mcqIndex, selectedAnswer, correctAnswer) {
    const feedbackElement = document.getElementById(`feedback_${sectionIndex}_${mcqIndex}`);
    const questionId = `q_${sectionIndex}_${mcqIndex}`;
    const options = document.querySelectorAll(`input[name="${questionId}"]`);
    
    // Reset all option styles
    options.forEach((option, index) => {
        const label = option.closest('.option-label');
        label.classList.remove('correct-answer', 'incorrect-answer');
        
        // Highlight correct answer
        if (index === correctAnswer) {
            label.classList.add('correct-answer');
        } else if (index === selectedAnswer && selectedAnswer !== correctAnswer) {
            label.classList.add('incorrect-answer');
        }
    });
    
    // Show feedback
    if (selectedAnswer === correctAnswer) {
        feedbackElement.textContent = '✓ Correct!';
        feedbackElement.className = 'feedback correct';
    } else {
        feedbackElement.textContent = '✗ Incorrect. The correct answer is highlighted in green.';
        feedbackElement.className = 'feedback incorrect';
    }
    
    feedbackElement.style.display = 'block';
    
    // Disable all options for this question
    options.forEach(option => {
        option.disabled = true;
    });
}

// Add some utility functions for better user experience
function resetQuiz() {
    // Reset all answers and feedback
    const allInputs = document.querySelectorAll('input[type="radio"]');
    const allFeedback = document.querySelectorAll('.feedback');
    const allLabels = document.querySelectorAll('.option-label');
    
    allInputs.forEach(input => {
        input.checked = false;
        input.disabled = false;
    });
    
    allFeedback.forEach(feedback => {
        feedback.style.display = 'none';
    });
    
    allLabels.forEach(label => {
        label.classList.remove('correct-answer', 'incorrect-answer');
    });
}

// Add reset button functionality if needed
function addResetButton() {
    const container = document.getElementById('prepositions-sections');
    if (container) {
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset Quiz';
        resetButton.className = 'bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 mt-6';
        resetButton.onclick = resetQuiz;
        container.appendChild(resetButton);
    }
}
