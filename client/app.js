// Add Host
function addHost(){

    // Getting Host Details from the Form.
    const hostName = document.getElementById("hostName").value;
    const hostEmail = document.getElementById("hostEmail").value;
    const hostPhone = document.getElementById("hostPhone").value;
    const hostAddress = document.getElementById("hostAddress").value;
    
    // POST Request.
    const data = {
        name: hostName,
        email: hostEmail,
        phone: hostPhone,
        address: hostAddress
    };

    // Encoding in proper format to get rid of CORS errors.
    let formBody = [];
    for(let field in data)
    {
      let encodedKey = encodeURIComponent(field);
      let encodedValue = encodeURIComponent(data[field]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
  
    // Sending HTTP POST request.
    fetch('https://visitor-entry-management.herokuapp.com/host/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    });

    alert(`Host Added`); 
}

// Add Visitor
function addVisitor(){

    // Getting Visitor Details
    const visitorName = document.getElementById("visitorName").value;
    const visitorEmail = document.getElementById("visitorEmail").value;
    const visitorPhone = document.getElementById("visitorPhone").value;
    const visitorTime = document.getElementById("visitorTime").value;

    const checkOutTime = visitorTime.substring(0,2) + visitorTime.substring(3,5);

    // POST Request.
    const data = {
        name: visitorName,
        email: visitorEmail,
        phone: visitorPhone,
        checkOutTime: checkOutTime
    };

    // Encoding in proper format to get rid of CORS errors.
    let formBody = [];
    for(let field in data)
    {
      let encodedKey = encodeURIComponent(field);
      let encodedValue = encodeURIComponent(data[field]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
  
    // Sending HTTP POST Request.
    fetch('https://visitor-entry-management.herokuapp.com/visitors/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    });

    alert(`Your response has been recorded and sent to host.`); 
}

// Get Host
async function getHost() {

    // Fetch Host Details
    const host = await fetch(`https://visitor-entry-management.herokuapp.com/host/host`);
    const hostData = await host.json();
    const hostValue = hostData.msg;

    // If host found, display host details and form to add visitor.
    if(hostValue != "ERROR"){

        // Message
        console.log("No Error");
        document.getElementById("hostDiv").innerHTML = `
              <div class="d-flex flex-row">
                <div class="p-4 align-self-start">
                  <i class="fa fa-check"></i>
                </div>
                <div class="p-4 align-self-end">
                  <h2>Host: ${hostValue}</h2>
                  <br>
                  <h6>Please add the vistor details in the form.</h6>
                </div>
              </div>
        `;

        // Visitor Form
        document.getElementById("visitorDiv").innerHTML = 
        `
        <div class="card bg-primary text-center card-form">
          <div class="card-body">
            <h3>Add Visitor</h3>
            <p>Please fill out this form to send your information to host</p>
            <form class = "visitor" onsubmit="addVisitor()">
              <div class="form-group">
                <input type="text" class="form-control form-control-lg" placeholder="Name" id="visitorName" required>
              </div>
              <div class="form-group">
                <input type="email" class="form-control form-control-lg" placeholder="Email" id="visitorEmail" required>
              </div>
              <div class="form-group">
                <input type="number" class="form-control form-control-lg" placeholder="Phone" id="visitorPhone" required>
              </div>
              <div class="form-group">
                <input type="time" class="form-control form-control-lg" placeholder="Checkout Time" id="visitorTime" required>
              </div>
              <input type="submit" class="btn btn-outline-light btn-block">
            </form>
          </div>
        </div>
        `;
    }

    // If no host found display message and form to add the host.
    else{
        // Host Form
        document.getElementById("hostDiv").innerHTML = 
        `
        <div class="card bg-primary text-center card-form">
          <div class="card-body">
            <h3>Add Host</h3>
            <p>Please fill out this form</p>
            <form class = "hostform" onsubmit="addHost(event)">
              <div class="form-group">
                <input type="text" class="form-control form-control-lg" id="hostName" placeholder="Name" required>
              </div>
              <div class="form-group">
                <input type="email" class="form-control form-control-lg" id="hostEmail" placeholder="Email" required>
              </div>
              <div class="form-group">
                <input type="number" class="form-control form-control-lg" id="hostPhone" placeholder="Phone" required>
              </div>
              <div class="form-group">
                <input type="text" class="form-control form-control-lg" id="hostAddress" placeholder="Address" required>
              </div>
              <input type="submit" class="btn btn-outline-light btn-block">
            </form>
          </div>
        </div>
        <br>
        `;

        // Displaying the message to add Host.
        document.getElementById("visitorDiv").innerHTML = 
        `
        <br><br>
        <div class="d-flex flex-row">
          <div class="p-4 align-self-start">
            <i class="fa fa-times"></i>
          </div>
          <div class="p-4 align-self-end">
            <h2>No Host Found! Please add the Host first.</h2>
            <br>
          </div>
        </div>
        `;
    }
}

// Rendering the Home Page on the basis of Host is there or Not.
getHost();
