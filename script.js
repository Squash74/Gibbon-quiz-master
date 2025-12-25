// Quiz Data - Questions organized by theme
const quizData = {
    christmas: [
        { question: "In which country did the tradition of putting up a Christmas tree originate?", answer: "Germany" },
        { question: "What is the name of the plant often hung in doorways during Christmas, under which people kiss?", answer: "Mistletoe" },
        { question: "In the song 'The Twelve Days of Christmas,' what gift is given on the fifth day?", answer: "Five golden rings" },
        { question: "Which ancient civilization started the tradition of exchanging gifts during winter celebrations?", answer: "Ancient Rome" },
        { question: "What beverage is traditionally left out for Santa Claus on Christmas Eve?", answer: "Milk" },
        { question: "In South Africa, what is the popular Christmas tradition involving singing door-to-door?", answer: "Carol singing or Christmas carols" },
        { question: "What are the three gifts that the Wise Men brought to baby Jesus?", answer: "Gold, frankincense, and myrrh" },
        { question: "Which popular Christmas song was originally written for Thanksgiving?", answer: "Jingle Bells" },
        { question: "In which ocean is Christmas Island located?", answer: "Indian Ocean" },
        { question: "What is the main ingredient in the South African traditional Christmas dish 'Malva pudding'?", answer: "Apricot jam" },
        { question: "What is the name of the Grinch's dog in 'How the Grinch Stole Christmas'?", answer: "Max" },
        { question: "In what year did Coca-Cola start the modern Santa Claus advertising campaign?", answer: "1931" },
        { question: "What Christmas decoration was originally made from silver strands?", answer: "Tinsel" },
        { question: "Which country traditionally eats KFC for Christmas dinner?", answer: "Japan" },
        { question: "What is the name of the famous Christmas ballet featuring the Sugar Plum Fairy?", answer: "The Nutcracker" },
        { question: "In South Africa, where do many people celebrate Christmas Day?", answer: "At the beach" },
        { question: "What year was the first Christmas stamp issued in the USA?", answer: "1962" },
        { question: "What is the name of the period leading up to Christmas in the Christian calendar?", answer: "Advent" },
        { question: "In the movie 'Home Alone,' where is the McCallister family traveling when they leave Kevin behind?", answer: "Paris" },
        { question: "What is Boxing Day (December 26th) called in South Africa?", answer: "Day of Goodwill" },
        { question: "Which Christmas carol contains the lyrics 'Sleep in heavenly peace'?", answer: "Silent Night" },
        { question: "What is traditionally hidden in a Christmas pudding?", answer: "A coin (silver sixpence)" },
        { question: "What is the best-selling Christmas song of all time?", answer: "White Christmas by Bing Crosby" },
        { question: "In which modern-day country was Saint Nicholas born?", answer: "Turkey" },
        { question: "What do children in the Netherlands leave out for Sinterklaas's horse?", answer: "Carrots or hay" },
        { question: "How many reindeer does Santa have (including Rudolph)?", answer: "Nine" },
        { question: "What is the name of the Christmas-themed ballet with music by Tchaikovsky?", answer: "The Nutcracker" },
        { question: "In which year did Christmas become a federal holiday in the United States?", answer: "1870" },
        { question: "What fruit is traditionally placed in Christmas stockings?", answer: "Orange or tangerine" },
        { question: "What is the name of the main antagonist in 'The Nightmare Before Christmas'?", answer: "Oogie Boogie" }
    ],
    movies: [
        { question: "Which 1994 film features the line 'Life is like a box of chocolates'?", answer: "Forrest Gump" },
        { question: "What is the highest-grossing film of all time (not adjusted for inflation)?", answer: "Avatar (2009)" },
        { question: "In which South African district was the 2009 film 'District 9' primarily set?", answer: "Johannesburg (District 9)" },
        { question: "Who directed the 'Lord of the Rings' trilogy?", answer: "Peter Jackson" },
        { question: "Which actor played Iron Man in the Marvel Cinematic Universe?", answer: "Robert Downey Jr." },
        { question: "What 1997 film became the first to gross over $1 billion worldwide?", answer: "Titanic" },
        { question: "In which film does Leonardo DiCaprio say 'I'm the king of the world!'?", answer: "Titanic" },
        { question: "Which South African actress won an Oscar for her role in 'Monster'?", answer: "Charlize Theron" },
        { question: "What is the name of the fictional African nation in 'Black Panther'?", answer: "Wakanda" },
        { question: "Who directed 'Jurassic Park'?", answer: "Steven Spielberg" },
        { question: "Which 1994 film features John Travolta and Samuel L. Jackson as hitmen?", answer: "Pulp Fiction" },
        { question: "What is the name of the island in 'Jurassic Park'?", answer: "Isla Nublar" },
        { question: "Which film won the Academy Award for Best Picture in 2020?", answer: "Parasite" },
        { question: "Who played Neo in 'The Matrix' trilogy?", answer: "Keanu Reeves" },
        { question: "Which animated film features a character named Simba?", answer: "The Lion King" },
        { question: "In which city is the South African film 'Tsotsi' set?", answer: "Johannesburg" },
        { question: "What is the name of Han Solo's ship in 'Star Wars'?", answer: "Millennium Falcon" },
        { question: "Which director is known for films like 'Inception,' 'Interstellar,' and 'The Dark Knight'?", answer: "Christopher Nolan" },
        { question: "Who played Jack Dawson in 'Titanic'?", answer: "Leonardo DiCaprio" },
        { question: "Which film features the song 'My Heart Will Go On' by Celine Dion?", answer: "Titanic" },
        { question: "What is the name of the computer in '2001: A Space Odyssey'?", answer: "HAL 9000" },
        { question: "Which South African comedian starred in 'Crazy Monkey: Straight Outta Benoni'?", answer: "Leon Schuster" },
        { question: "In 'The Shawshank Redemption,' how many years was Andy Dufresne imprisoned?", answer: "19 years" },
        { question: "Which actress played Hermione Granger in the 'Harry Potter' series?", answer: "Emma Watson" },
        { question: "What year was the first 'Toy Story' film released?", answer: "1995" },
        { question: "Who directed 'Schindler's List'?", answer: "Steven Spielberg" },
        { question: "Which film features the line 'May the Force be with you'?", answer: "Star Wars" },
        { question: "What is the name of the actor who played Wolverine in the X-Men films?", answer: "Hugh Jackman" },
        { question: "In which decade is 'Stranger Things' set?", answer: "1980s" },
        { question: "Which 2018 superhero film was the first to be nominated for Best Picture at the Oscars?", answer: "Black Panther" },
        { question: "Who composed the instrumental score for 'The Lion King'?", answer: "Hans Zimmer" },
        { question: "What is the name of the hobbit played by Elijah Wood in 'Lord of the Rings'?", answer: "Frodo Baggins" },
        { question: "Which film won the first ever Academy Award for Best Picture in 1929?", answer: "Wings" },
        { question: "In 'The Godfather,' what is placed in the bed as a warning?", answer: "A horse's head" },
        { question: "Which actress played Furiosa in 'Mad Max: Fury Road'?", answer: "Charlize Theron" },
        { question: "What is the name of the ship in 'Pirates of the Caribbean'?", answer: "The Black Pearl" },
        { question: "Who directed 'E.T. the Extra-Terrestrial'?", answer: "Steven Spielberg" },
        { question: "Which 2019 film won the Oscar for Best Picture?", answer: "Green Book" },
        { question: "What is the name of the island where 'Jurassic Park' takes place?", answer: "Isla Nublar" },
        { question: "Who played the Joker in 'The Dark Knight' (2008)?", answer: "Heath Ledger" }
    ],
    places: [
        { question: "What is the capital city of South Africa (executive)?", answer: "Pretoria" },
        { question: "Which mountain is the highest peak in Africa?", answer: "Mount Kilimanjaro" },
        { question: "What is the largest desert in the world by area?", answer: "Antarctica (polar desert)" },
        { question: "In which South African city would you find Table Mountain?", answer: "Cape Town" },
        { question: "What is the longest river in the world?", answer: "The Nile" },
        { question: "Which country has the most natural lakes?", answer: "Canada" },
        { question: "What is the smallest country in the world?", answer: "Vatican City" },
        { question: "In which country would you find Machu Picchu?", answer: "Peru" },
        { question: "What is the capital of Australia?", answer: "Canberra" },
        { question: "Which South African provinces does the Garden Route pass through?", answer: "Western Cape and Eastern Cape" },
        { question: "What is the largest island in the world?", answer: "Greenland" },
        { question: "In which city would you find the Eiffel Tower?", answer: "Paris" },
        { question: "What is the deepest ocean in the world?", answer: "Pacific Ocean" },
        { question: "Which river flows through the Grand Canyon?", answer: "Colorado River" },
        { question: "What is the capital of New Zealand?", answer: "Wellington" },
        { question: "In which country would you find the ancient city of Petra?", answer: "Jordan" },
        { question: "What is considered the largest sheet of falling water in the world?", answer: "Victoria Falls" },
        { question: "Which South African city is known as the 'City of Gold'?", answer: "Johannesburg" },
        { question: "What is the tallest building in the world (as of 2023)?", answer: "Burj Khalifa" },
        { question: "In which country is the Great Barrier Reef located?", answer: "Australia" },
        { question: "What is the capital of Kenya?", answer: "Nairobi" },
        { question: "Which mountain range separates Europe from Asia?", answer: "Ural Mountains" },
        { question: "What is the largest city in South Africa by population?", answer: "Johannesburg" },
        { question: "In which country would you find the Taj Mahal?", answer: "India" },
        { question: "What is the second-largest country in the world by land area?", answer: "Canada" },
        { question: "Which African country has the most pyramids?", answer: "Sudan" },
        { question: "What is the name of the famous rock formation in the Northern Territory of Australia?", answer: "Uluru (Ayers Rock)" },
        { question: "Which two South African provinces is Kruger National Park located in?", answer: "Mpumalanga and Limpopo" },
        { question: "What is the capital of Brazil?", answer: "Brasília" },
        { question: "Which ocean is the smallest?", answer: "Arctic Ocean" },
        { question: "In which country would you find the ancient ruins of Angkor Wat?", answer: "Cambodia" },
        { question: "What is the longest mountain range in the world?", answer: "The Andes" },
        { question: "Which South African city is the legislative capital?", answer: "Cape Town" },
        { question: "What is the capital of Japan?", answer: "Tokyo" },
        { question: "In which country is the Serengeti National Park located?", answer: "Tanzania" },
        { question: "What is the largest lake in Africa?", answer: "Lake Victoria" },
        { question: "What is the capital city of Hungary, divided by the Danube River?", answer: "Budapest" },
        { question: "What is the name of the famous beach in Rio de Janeiro?", answer: "Copacabana" },
        { question: "In which South African city would you find the Union Buildings?", answer: "Pretoria" },
        { question: "What is the capital of Egypt?", answer: "Cairo" }
    ],
    people: [
        { question: "Who was the first president of South Africa after apartheid?", answer: "Nelson Mandela" },
        { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
        { question: "Who is known as the 'Father of Modern Physics'?", answer: "Albert Einstein" },
        { question: "Which South African won the Nobel Peace Prize in 1984?", answer: "Desmond Tutu" },
        { question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
        { question: "Who was the first person to walk on the moon?", answer: "Neil Armstrong" },
        { question: "Which South African Paralympic athlete was known as the 'Blade Runner'?", answer: "Oscar Pistorius" },
        { question: "Who is the author of the 'Harry Potter' series?", answer: "J.K. Rowling" },
        { question: "Who invented the telephone?", answer: "Alexander Graham Bell" },
        { question: "Which South African comedian hosts 'The Daily Show'?", answer: "Trevor Noah" },
        { question: "Who was the first female Prime Minister of the United Kingdom?", answer: "Margaret Thatcher" },
        { question: "Who composed the 'Fifth Symphony'?", answer: "Ludwig van Beethoven" },
        { question: "Which scientist developed the theory of evolution by natural selection?", answer: "Charles Darwin" },
        { question: "Who painted 'The Starry Night'?", answer: "Vincent van Gogh" },
        { question: "Which South African heart surgeon performed the first human heart transplant?", answer: "Christiaan Barnard" },
        { question: "Who wrote '1984' and 'Animal Farm'?", answer: "George Orwell" },
        { question: "Who is the co-founder of Microsoft alongside Bill Gates?", answer: "Paul Allen" },
        { question: "Which South African actress won an Oscar for 'Monster' in 2004?", answer: "Charlize Theron" },
        { question: "Who discovered penicillin?", answer: "Alexander Fleming" },
        { question: "Who was the longest-reigning British monarch before Queen Elizabeth II?", answer: "Queen Victoria" },
        { question: "Which physicist developed the theory of general relativity?", answer: "Albert Einstein" },
        { question: "Who wrote 'Pride and Prejudice'?", answer: "Jane Austen" },
        { question: "Which South African golfer has won multiple major championships?", answer: "Gary Player" },
        { question: "Who is known as the 'Queen of Pop'?", answer: "Madonna" },
        { question: "Who was the first African American President of the United States?", answer: "Barack Obama" },
        { question: "Which ancient Greek philosopher taught Alexander the Great?", answer: "Aristotle" },
        { question: "Who invented the World Wide Web?", answer: "Tim Berners-Lee" },
        { question: "Which South African author won the Nobel Prize in Literature in 1991?", answer: "Nadine Gordimer" },
        { question: "Who wrote 'The Great Gatsby'?", answer: "F. Scott Fitzgerald" },
        { question: "Who is the founder of SpaceX and Tesla?", answer: "Elon Musk" },
        { question: "Which South African swimmer won gold in the 4x100m freestyle relay at the 2004 Olympics?", answer: "Roland Schoeman and Ryk Neethling (part of the team)" },
        { question: "Who painted 'The Last Supper'?", answer: "Leonardo da Vinci" },
        { question: "Which explorer led the first expedition to circumnavigate the globe?", answer: "Ferdinand Magellan" },
        { question: "Who was the CEO of Naspers that transformed it into a global internet and media giant?", answer: "Koos Bekker" },
        { question: "Who wrote 'To Kill a Mockingbird'?", answer: "Harper Lee" },
        { question: "Who is the current (2023) President of the United States?", answer: "Joe Biden" },
        { question: "Which scientist is famous for his laws of motion?", answer: "Isaac Newton" },
        { question: "Who was the first woman to win a Nobel Prize?", answer: "Marie Curie" },
        { question: "Which South African cricketer is known as 'AB'?", answer: "AB de Villiers" },
        { question: "Who wrote 'The Catcher in the Rye'?", answer: "J.D. Salinger" }
    ],
    sport: [
        { question: "Which country won the FIFA World Cup in 2018?", answer: "France" },
        { question: "In which year did South Africa win the Rugby World Cup for the first time?", answer: "1995" },
        { question: "How many players are there on a cricket team?", answer: "11" },
        { question: "Which South African swimmer is known as 'The Torpedo'?", answer: "Chad le Clos" },
        { question: "In which sport would you perform a 'slam dunk'?", answer: "Basketball" },
        { question: "Who holds the record for the most Olympic gold medals?", answer: "Michael Phelps" },
        { question: "What is the maximum score in a single frame of ten-pin bowling?", answer: "30" },
        { question: "Which South African golfer is nicknamed 'The Black Knight'?", answer: "Gary Player" },
        { question: "In which year were the first modern Olympic Games held?", answer: "1896" },
        { question: "How many Grand Slam tournaments are there in tennis per year?", answer: "Four" },
        { question: "Which country hosted the 2010 FIFA World Cup?", answer: "South Africa" },
        { question: "What is the diameter of a basketball hoop in inches?", answer: "18 inches" },
        { question: "Which South African rugby player is known as 'The Beast'?", answer: "Tendai Mtawarira" },
        { question: "In which sport do you use a puck?", answer: "Ice hockey" },
        { question: "Who won the FIFA World Cup in 2022?", answer: "Argentina" },
        { question: "How many points is a touchdown worth in American football?", answer: "Six" },
        { question: "Which South African cricket captain led the team in the 2000s?", answer: "Graeme Smith" },
        { question: "What is the national sport of Japan?", answer: "Sumo wrestling" },
        { question: "In which city were the 2012 Summer Olympics held?", answer: "London" },
        { question: "How long is an Olympic swimming pool in meters?", answer: "50 meters" },
        { question: "Which South African athlete is known as 'Wayde van Niekerk'?", answer: "400m world record holder" },
        { question: "What is the maximum break in snooker?", answer: "147" },
        { question: "Which country has won the most FIFA World Cups?", answer: "Brazil (5)" },
        { question: "In which sport do you compete for the Stanley Cup?", answer: "Ice hockey" },
        { question: "Which South African rugby team is known as 'The Springboks'?", answer: "South African national rugby team" },
        { question: "How many minutes are in a professional soccer match (excluding extra time)?", answer: "90 minutes" },
        { question: "What is the highest possible break in snooker?", answer: "155 (with free ball)" },
        { question: "Which tennis player has won the most Grand Slam titles (men's singles)?", answer: "Novak Djokovic (as of 2023)" },
        { question: "In which sport would you perform a 'hat-trick'?", answer: "Cricket, football/soccer, ice hockey (various sports)" },
        { question: "What is the name of South Africa's premier first-class cricket competition?", answer: "CSA 4-Day Series" },
        { question: "How many players are on a rugby union team?", answer: "15" },
        { question: "Which athlete holds the world record for the 100m sprint?", answer: "Usain Bolt" },
        { question: "In which year did South Africa win the Rugby World Cup for the third time?", answer: "2019" },
        { question: "What are Canada's two official national sports?", answer: "Lacrosse (summer) and Ice Hockey (winter)" },
        { question: "How many holes are played in a standard round of golf?", answer: "18" },
        { question: "Which South African boxer was nicknamed 'The Rose of Soweto'?", answer: "Dingaan Thobela" },
        { question: "In which sport do you compete for the Ashes?", answer: "Cricket" },
        { question: "What is the maximum weight of a soccer ball in grams?", answer: "450 grams" },
        { question: "Which South African athlete won gold in the 800m at the 2016 Olympics?", answer: "Caster Semenya" },
        { question: "How many players are on a basketball team on the court at once?", answer: "Five" }
    ]
};

// Quiz State
let currentTheme = '';
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let answerRevealed = false;

// DOM Elements
const themeSelection = document.getElementById('themeSelection');
const quizContainer = document.getElementById('quizContainer');
const gameOver = document.getElementById('gameOver');
const questionText = document.getElementById('questionText');
const answerSection = document.getElementById('answerSection');
const answerText = document.getElementById('answerText');
const showAnswerBtn = document.getElementById('showAnswerBtn');
const scoringButtons = document.getElementById('scoringButtons');
const correctBtn = document.getElementById('correctBtn');
const incorrectBtn = document.getElementById('incorrectBtn');
const nextBtn = document.getElementById('nextBtn');
const newGameBtn = document.getElementById('newGameBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const currentThemeEl = document.getElementById('currentTheme');
const questionNumber = document.getElementById('questionNumber');
const totalQuestions = document.getElementById('totalQuestions');
const scoreEl = document.getElementById('score');
const finalScore = document.getElementById('finalScore');
const finalTotal = document.getElementById('finalTotal');
const percentage = document.getElementById('percentage');
const runningPercentEl = document.getElementById('runningPercent');

// Theme Selection
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentTheme = btn.dataset.theme;
        startQuiz();
    });
});

// Start Quiz
function startQuiz() {
    // Reset state
    score = 0;
    currentQuestionIndex = 0;
    answerRevealed = false;
    
    // Get and shuffle questions for the theme
    questions = [...quizData[currentTheme]];
    shuffleArray(questions);
    
    // Update UI
    themeSelection.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    gameOver.classList.add('hidden');
    
    currentThemeEl.textContent = capitalizeFirstLetter(currentTheme);
    totalQuestions.textContent = questions.length;
    scoreEl.textContent = score;
    runningPercentEl.textContent = '0';

    displayQuestion();
}

// Display Current Question
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    answerText.textContent = question.answer;
    
    // Update question number
    questionNumber.textContent = currentQuestionIndex + 1;
    
    // Reset UI state
    answerSection.classList.add('hidden');
    showAnswerBtn.classList.remove('hidden');
    scoringButtons.classList.add('hidden');
    nextBtn.classList.add('hidden');
    answerRevealed = false;
}

// Show Answer
showAnswerBtn.addEventListener('click', () => {
    answerSection.classList.remove('hidden');
    showAnswerBtn.classList.add('hidden');
    scoringButtons.classList.remove('hidden');
    answerRevealed = true;
});

// Alternative: Click question card to show answer
document.querySelector('.question-card').addEventListener('click', () => {
    if (!answerRevealed && !showAnswerBtn.classList.contains('hidden')) {
        answerSection.classList.remove('hidden');
        showAnswerBtn.classList.add('hidden');
        scoringButtons.classList.remove('hidden');
        answerRevealed = true;
    }
});

// Update running percentage
function updateRunningPercent() {
    const answered = currentQuestionIndex + 1;
    const percent = Math.round((score / answered) * 100);
    runningPercentEl.textContent = percent;
}

// Correct Answer
correctBtn.addEventListener('click', () => {
    score++;
    scoreEl.textContent = score;
    updateRunningPercent();
    scoringButtons.classList.add('hidden');
    nextBtn.classList.remove('hidden');
});

// Incorrect Answer
incorrectBtn.addEventListener('click', () => {
    updateRunningPercent();
    scoringButtons.classList.add('hidden');
    nextBtn.classList.remove('hidden');
});

// Next Question
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
});

// End Quiz
function endQuiz() {
    quizContainer.classList.add('hidden');
    gameOver.classList.remove('hidden');
    
    finalScore.textContent = score;
    finalTotal.textContent = questions.length;
    
    const percentScore = Math.round((score / questions.length) * 100);
    percentage.textContent = `${percentScore}%`;
}

// New Game
newGameBtn.addEventListener('click', () => {
    quizContainer.classList.add('hidden');
    themeSelection.classList.remove('hidden');
});

// Play Again
playAgainBtn.addEventListener('click', () => {
    gameOver.classList.add('hidden');
    themeSelection.classList.remove('hidden');
});

// Utility Functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
