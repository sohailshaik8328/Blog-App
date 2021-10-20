export default function validate(errors, name, value) {
    switch(name) {
        case "username":
            let usernameError = value.length < 7 ? "Username should be at-least 6 characters long" : "";
            errors.username = usernameError;
            break;
        case "email" :
            let emailError = value.indexOf('@') === -1 ? "Email should contain @" : "";
            errors.email = emailError; 
            break;
        case "password" :
            let passwordError;
            if(value.length < 7) {
                passwordError = "Password should be at-least 6 characters";
            }
            errors.password = passwordError;
            let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;
            if(!re.test(value)) {
                passwordError = "Password must contain a letter and a number";
            }
            errors.password = passwordError
            break;
        default:
            break;
    }
}