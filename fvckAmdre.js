
let automationIntervalId = null;

function performAutomationStep() {

  const wordElement = document.getElementById('word');

  if (!wordElement || !wordElement.textContent.trim()) {
    console.log('Aguardando nova palavra...');
    return;
  }

  const targetWord = wordElement.textContent.trim();
  let correctAnswer = null;

  const pageScripts = Array.from(document.querySelectorAll('script'));
  const regex = new RegExp(`word:\\s*"${targetWord}",\\s*correct:\\s*"(.*?)"`);

  for (const script of pageScripts) {
    const match = script.innerHTML.match(regex);
    if (match && match[1]) {
      correctAnswer = match[1];
      break;
    }
  }

  if (correctAnswer) {
    const allElements = Array.from(document.getElementsByTagName('*'));
    const answerElement = allElements.find(el => el.textContent.trim() === correctAnswer);

    if (answerElement) {
      console.log(`Clicando na resposta para "${targetWord}": "${correctAnswer}"`);
      answerElement.click();


      setTimeout(() => {
        const nextButton = document.getElementById('nextBtn');
        
        if (nextButton && nextButton.style.display !== 'none') {
          nextButton.click();
        } else {
        }
      }, 500);

    } else {

    }
  } else {
  }
}


function stopAutomation(event) {
  if (automationIntervalId && (event.type === 'keydown' || event.isTrusted)) {
    clearInterval(automationIntervalId);
    automationIntervalId = null;
    console.log('%cLoop PARADO', 'color: red; font-weight: bold; font-size: 16px;');
    document.removeEventListener('keydown', stopAutomation);
    document.removeEventListener('click', stopAutomation, true); 
  }
}

function startAutomation() {
  if (automationIntervalId) {
    console.log('O loop já está em execução.');
    return;
  }
  
  console.clear();
  console.log('%cLoop iniciado. Pressione qualquer tecla ou clique para parar.', 'color: green; font-weight: bold; font-size: 16px;');

  document.addEventListener('keydown', stopAutomation);
  document.addEventListener('click', stopAutomation, true);

  automationIntervalId = setInterval(performAutomationStep, 2000); 
}


startAutomation();
