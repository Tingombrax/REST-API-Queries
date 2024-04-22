const axios = require("axios");

//Login Function
const login = async(user,pw) => {
    try{
        const Response = await axios.post("http://localhost:3010/auth/login", user, pw); //Location in which to open (path parameters) and needed credentials
    } catch (error){
        console.log("Your credentials couldn't be verified, the program will now crash.");
    }
}

//User Input Shizz
const readline = require('readline');
function getInput(prompt){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject ) =>{
        rl.question(prompt, (input) => {
            rl.close();
            resolve(input);
        });
    });
}

//Main Function
main = async() => {
    const username = await getInput("Username: ");
    const password = await getInput("Password: ");
    const response0 = await login  ({username: username, password: password});// Array used for transferring Data from the 2 Input Windows above
};

main();