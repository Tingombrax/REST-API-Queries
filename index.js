// By DJ Tingombrax with support from Fabian <3 (nohomo)
// I SWEAR TO GOD DON'T USE THIS ON YOUR WEBSITE THERE IS 0 ENCRYPTION!!!

const axios = require("axios");

//Login Function ("Point 2", the client matches the credentials provided by the user with the servers data)
const login = async(user,pw) => {
    try{
        const Response = await axios.post("http://localhost:3010/auth/login", user, pw); //Location in which to open (path parameters) and needed credentials, the variable "Response" comes from the server or the Data sent is automatically stored as this variable what the fuck do I know
    } catch (error){
        console.log("Your credentials couldn't be verified. \n The program will now end."); //Outputs a message to the console
    }
}

//User Input Jazz (this is copy-pasted)
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
    const username = await getInput("Username: "); // Input Prompt for the username
    const password = await getInput("Password: "); // Input Prompt for the password
    const response0 = await login  ({username: username, password: password});// Array used for transferring Data from the 2 Input Windows above (This is "Point 1", the Program requests data from the Server here.)
    //Point 3, The server sends us a session token used for identification in the searchbar. AS I SAID THIS IS NOT SAFE SO DON'T ACTUALLY USE THIS FOR ANYTHING!
    const Response = await login ({username: username, password: password});
    const Token = Response.token; // The "token" variable gets read from the Response variable I talked about previously
    console.log(Response); // Outputs the Token, good for pairing with postman
};

main();