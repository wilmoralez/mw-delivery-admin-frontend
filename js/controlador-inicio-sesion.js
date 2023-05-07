var adminActual;
autenticarAcceso=()=>{
    var localStorage = window.localStorage;
    let txtemail = document.getElementById('email-inicio').value;
    let txtpassword = document.getElementById('password-inicio').value;
   
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "email": txtemail,
      "password": txtpassword
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:8000/administradores/autenticar", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.message==null){
        let adminActual = result; 
        
        localStorage.setItem('AdminActual', JSON.stringify(adminActual));
        window.location.href='./index.html';}
        else{
          alert("Verifique su correo y contraseña, o llame a soporte tecnico");
        }
      })
      .catch(error => console.log('error', error));
  
  }