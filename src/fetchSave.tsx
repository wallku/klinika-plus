export const fetchSave = (name:string,email:string,phone:string) => {
    const request = new XMLHttpRequest();

    const url = "http://localhost/test.php";

    const params = {"email": email, "name": name, "phone": phone};

    request.open("POST",url, true);


    request.setRequestHeader("Content-Type", "application/json; charset=utf8");
    request.setRequestHeader("Accept", "application/json; charset=utf8");
    request.setRequestHeader("Access-Control-Allow-Origin", "*");

    request.send(JSON.stringify(params));
}

