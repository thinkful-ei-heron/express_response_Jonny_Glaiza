const express = require('express');

const app = express();


//this lets us make a get route
app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.get('/sum', (req, res) => {
    //1. get values from the request
    const a = req.query.a;
    const b = req.query.b;

    //2. validate the values
    if(!a) {
        //3. name was not provided
        return res.status(400).send('Please provide a first Digit');
    }

    if(!b) {
        //3. race was not provided
        return res.status(400).send('Please provide a second Digit');
    }

    //4. and 5. both name and race are valid so do the processing.
    const sum = parseInt(a)+parseInt(b);

    res.send(`${sum}`);
});

app.get('/cipher', (req, res) => {
    //1. get values from the request
    const text = req.query.text;
    const shift = req.query.shift;

    //2. validate the values
    if(!text) {
        //3. name was not provided
        return res.status(400).send('Please provide a text');
    }

    if(!shift) {
        //3. race was not provided
        return res.status(400).send('Please provide a shift');
    }

    //4. and 5. both name and race are valid so do the processing.
   const ceasarCipher = function() {
       let arr = text.split(''); 
       let arr2=[];
       console.log(arr2);
       for (let char of arr) {
        
           arr2.push(String.fromCharCode(String.charCodeAt(char) + parseInt(shift)))  
           console.log(arr2)
       }
       console.log(arr2);
       return arr2.join(); 
   }

    //6. send the response
    res.send(ceasarCipher());
});

// Drill 3
app.get('/lotto', (req, res) => {
    const { numbers } = req.query; 
  
    // validation: 
    // 1. the numbers array must exist
    // 2. must be an array
    // 3. must be 6 numbers
    // 4. numbers must be between 1 and 20
  
    if(!numbers) {
      return res
        .status(200)
        .send("numbers is required");
    }
  
    if(!Array.isArray(numbers)) {
      return res
        .status(200)
        .send("numbers must be an array");
    }
  
    const guesses = numbers
          .map(n => parseInt(n))
          .filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20));
    
    if(guesses.length != 6) {
      return res
        .status(400)
        .send("numbers must contain 6 integers between 1 and 20");
    }      
  
    // fully validated numbers
  
    // here are the 20 numbers to choose from
    const stockNumbers = Array(20).fill(1).map((_, i) => i + 1);
  
    //randomly choose 6
    const winningNumbers = [];
    for(let i = 0; i < 6; i++) {
      const ran = Math.floor(Math.random() * stockNumbers.length);
      winningNumbers.push(stockNumbers[ran]);
      stockNumbers.splice(ran, 1);
    }
  
    //compare the guesses to the winning number
    let diff = winningNumbers.filter(n => !guesses.includes(n));
  
    // construct a response
    let responseText;
  
    switch(diff.length){
      case 0: 
        responseText = 'Wow! Unbelievable! You could have won the mega millions!';
        break;
      case 1:   
        responseText = 'Congratulations! You win $100!';
        break;
      case 2:
        responseText = 'Congratulations, you win a free ticket!';
        break;
      default:
        responseText = 'Sorry, you lose';  
    }
  
    res.json({
      guesses,
      winningNumbers,
      diff,
      responseText
    });
  
    res.send(responseText);
  });


app.listen(8000, (req, res) => {
    console.log('Express server is listening on port 8000!');
});
