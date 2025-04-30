export const validateForm = (email,password) =>{
    const mail=/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    const pass=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)

    if(!mail) return "Email is not valid";
    if(!pass) return "Password is not valid";
    return null;
}