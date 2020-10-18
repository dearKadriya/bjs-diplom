'use strict';
const userForm = new UserForm();
function login(data) {
    ApiConnector.login({login: data.login, password: data.password}, (Response) => {
        if (Response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(`${Response.error}`);
        };
    });
}


userForm.loginFormCallback = login;

function register(data) {
    ApiConnector.register({login: data.login, password: data.password}, (Response) => {
        if (Response.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(`${Response.error}`);
        }
    });
}

userForm.registerFormCallback = register;
