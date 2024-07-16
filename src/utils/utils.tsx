
export const speech = true; 

const recognition = new SpeechRecognition(); 
recognition.interimResults = true; 

recognition.addEventListener('result', e => { 
    const transcript = Array.from(e.results) 
        .map(result => result[0]) 
        .map(result => result.transcript) 
        .join('') 
    console.log(transcript); 
}); 
    
if (speech == true) { 
    recognition.start();  
}else{
    const result = recognition.stop()
    console.log(result)
}