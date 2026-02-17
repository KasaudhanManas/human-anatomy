// script.js

// ----- 1. Interactive diagrams (system pages) -----
// Data store for all anatomy parts
const anatomyDB = {
  // skeletal
  skull: { name: 'Skull', desc: '28 bones including mandible. Protects the brain.' },
  spine: { name: 'Spine (vertebral column)', desc: '33 vertebrae; houses spinal cord.' },
  ribcage: { name: 'Ribcage', desc: '12 pairs of ribs + sternum. Protects heart & lungs.' },
  'left-clavicle': { name: 'Left clavicle', desc: 'Connects arm to trunk; transmits weight.' },
  'right-clavicle': { name: 'Right clavicle', desc: 'Slender bone between scapula and sternum.' },
  'left-humerus': { name: 'Left humerus', desc: 'Upper arm bone; articulates with scapula.' },
  'right-humerus': { name: 'Right humerus', desc: 'Upper arm bone; attachment for muscles.' },
  'left-forearm': { name: 'Left radius & ulna', desc: 'Forearm bones; allow rotation of hand.' },
  'right-forearm': { name: 'Right radius & ulna', desc: 'Allow pronation and supination.' },
  pelvis: { name: 'Pelvis', desc: 'Supports digestive organs; transmits weight to legs.' },
  'left-femur': { name: 'Left femur', desc: 'Thigh bone; longest bone in body.' },
  'right-femur': { name: 'Right femur', desc: 'Thigh bone; supports body weight.' },
  'left-tibia': { name: 'Left tibia/fibula', desc: 'Shin bone (tibia) and slender fibula.' },
  'right-tibia': { name: 'Right tibia/fibula', desc: 'Medial weight‑bearing bone.' },

  // muscular
  pectorals: { name: 'Pectoralis major', desc: 'Chest muscle; adducts and rotates arm.' },
  'left-biceps': { name: 'Left biceps brachii', desc: 'Flexes elbow and supinates forearm.' },
  'right-biceps': { name: 'Right biceps brachii', desc: 'Flexes elbow.' },
  abdominals: { name: 'Rectus abdominis', desc: 'Flexes trunk; “six‑pack” muscle.' },
  'left-quad': { name: 'Left quadriceps', desc: 'Four muscles that extend the knee.' },
  'right-quad': { name: 'Right quadriceps', desc: 'Extends knee; used in walking.' },
  trapezius: { name: 'Trapezius', desc: 'Moves, rotates, and stabilizes the scapula.' },

  // circulatory
  heart: { name: 'Heart', desc: 'Four‑chambered pump; beats 100,000 times/day.' },
  aorta: { name: 'Aorta', desc: 'Largest artery; carries blood from heart to body.' },
  'pulmonary-artery': { name: 'Pulmonary artery', desc: 'Carries deoxygenated blood to lungs.' },
  'superior-vena-cava': { name: 'Superior vena cava', desc: 'Returns blood from upper body to heart.' },
  'inferior-vena-cava': { name: 'Inferior vena cava', desc: 'Returns blood from lower body to heart.' },

  // nervous
  cerebrum: { name: 'Cerebrum', desc: 'Largest part; responsible for thought, memory.' },
  cerebellum: { name: 'Cerebellum', desc: 'Coordinates voluntary movement and balance.' },
  brainstem: { name: 'Brainstem', desc: 'Controls automatic functions (breathing, heart rate).' },
  'spinal-cord': { name: 'Spinal cord', desc: 'Transmits signals between brain and body.' },
  'nerve-left': { name: 'Peripheral nerves', desc: 'Carry sensory and motor information.' },
  'nerve-right': { name: 'Peripheral nerves', desc: 'Carry sensory and motor information.' }
};

// Handle clicks on any anatomy part
document.addEventListener('click', function(e) {
  const part = e.target.closest('.anatomy-part');
  if (!part) return;

  const partKey = part.dataset.part;
  const data = anatomyDB[partKey];
  if (!data) return;

  // Find the info panel on the current page
  const infoDiv = part.closest('main')?.querySelector('.part-info');
  if (!infoDiv) return;

  const nameEl = infoDiv.querySelector('.part-name');
  const descEl = infoDiv.querySelector('.part-desc');
  if (nameEl && descEl) {
    nameEl.textContent = data.name;
    descEl.textContent = data.desc;
  }
});

// ----- 2. Quiz functionality (only on quiz.html) -----
if (document.getElementById('quiz-container')) {
  const questions = [
    {
      question: 'How many bones are in the adult human body?',
      options: ['206', '213', '198', '215'],
      correct: 0
    },
    {
      question: 'Which is the longest bone in the human body?',
      options: ['Tibia', 'Femur', 'Humerus', 'Fibula'],
      correct: 1
    },
    {
      question: 'What is the main function of the cerebellum?',
      options: ['Memory', 'Balance & coordination', 'Breathing', 'Speech'],
      correct: 1
    },
    {
      question: 'Which blood vessel carries oxygenated blood away from the heart?',
      options: ['Artery', 'Vein', 'Capillary', 'Vena cava'],
      correct: 0
    },
    {
      question: 'Approximately how many muscles are in the human body?',
      options: ['Over 600', 'Exactly 500', '320', '850'],
      correct: 0
    },
    {
      question: 'Which part of the brain controls breathing and heart rate?',
      options: ['Cerebrum', 'Cerebellum', 'Brainstem', 'Hypothalamus'],
      correct: 2
    },
    {
      question: 'What is the largest organ in the human body?',
      options: ['Liver', 'Heart', 'Skin', 'Lungs'],
      correct: 2
    },
    {
      question: 'How many chambers does the human heart have?',
      options: ['2', '3', '4', '5'],
      correct: 2
    },
    {
      question: 'Which type of muscle is involuntary and found in the heart?',
      options: ['Skeletal', 'Smooth', 'Cardiac', 'Striated'],
      correct: 2
    },
    {
      question: 'What is the scientific name for the breastbone?',
      options: ['Clavicle', 'Scapula', 'Sternum', 'Xiphoid'],
      correct: 2
    }
  ];

  let currentQuestion = 0;
  let score = 0;
  let answerLock = false;

  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const nextBtn = document.getElementById('next-btn');
  const restartBtn = document.getElementById('restart-btn');
  const scoreEl = document.getElementById('score');

  function loadQuestion() {
    answerLock = false;
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('div');
      btn.classList.add('option');
      btn.textContent = opt;
      btn.dataset.idx = idx;
      btn.addEventListener('click', () => selectOption(idx, btn));
      optionsEl.appendChild(btn);
    });
    // Update next button text
    nextBtn.textContent = (currentQuestion === questions.length - 1) ? 'Finish' : 'Next';
  }

  function selectOption(idx, btnEl) {
    if (answerLock) return;
    answerLock = true;
    const correctIdx = questions[currentQuestion].correct;
    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(opt => opt.classList.remove('correct', 'wrong'));
    if (idx === correctIdx) {
      btnEl.classList.add('correct');
      score++;
    } else {
      btnEl.classList.add('wrong');
      allOptions[correctIdx].classList.add('correct');
    }
  }

  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      loadQuestion();
    } else {
      // quiz finished
      questionEl.textContent = 'Quiz completed!';
      optionsEl.innerHTML = '';
      scoreEl.textContent = `Your score: ${score} / ${questions.length}`;
      nextBtn.style.display = 'none';
    }
  }

  function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answerLock = false;
    nextBtn.style.display = 'inline-block';
    scoreEl.textContent = '';
    loadQuestion();
  }

  nextBtn.addEventListener('click', nextQuestion);
  restartBtn.addEventListener('click', restartQuiz);

  // Start quiz
  loadQuestion();
}