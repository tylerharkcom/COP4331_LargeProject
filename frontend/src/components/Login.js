import React, { useState } from "react";

function Login() {
  var loginName;
  var loginPassword;

  const [message, setMessage] = useState("");

    const goToRegister = event => {
        event.preventDefault();

        window.location.href = '/register';
    }

  const doLogin = async (event) => {
    event.preventDefault();

    var sha256 = function sha256(pwd)
    {
        pwd = pwd.concat("beepboop");
        function rightRotate(value, amount) {
            return (value>>>amount) | (value<<(32 - amount));
        };
        
        var mathPow = Math.pow;
        var maxWord = mathPow(2, 32);
        var lengthProperty = 'length'
        var i, j; // Used as a counter across the whole file
        var result = ''
    
        var words = [];
        var asciiBitLength = pwd[lengthProperty]*8;
        
        var hash = sha256.h = sha256.h || [];
        // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
        var k = sha256.k = sha256.k || [];
        var primeCounter = k[lengthProperty];
    
        var isComposite = {};
        for (var candidate = 2; primeCounter < 64; candidate++) {
            if (!isComposite[candidate]) {
                for (i = 0; i < 313; i += candidate) {
                    isComposite[i] = candidate;
                }
                hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
                k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
            }
        }
        
        pwd += '\x80' // Append Ƈ' bit (plus zero padding)
        while (pwd[lengthProperty]%64 - 56) pwd += '\x00' // More zero padding
        for (i = 0; i < pwd[lengthProperty]; i++) {
            j = pwd.charCodeAt(i);
            if (j>>8) return; // ASCII check: only accept characters in range 0-255
            words[i>>2] |= j << ((3 - i)%4)*8;
        }
        words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
        words[words[lengthProperty]] = (asciiBitLength)
        
        // process each chunk
        for (j = 0; j < words[lengthProperty];) {
            var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
            var oldHash = hash;
            // This is now the undefinedworking hash", often labelled as variables a...g
            // (we have to truncate as well, otherwise extra entries at the end accumulate
            hash = hash.slice(0, 8);
            
            for (i = 0; i < 64; i++) {
                var i2 = i + j;
                // Expand the message into 64 words
                // Used below if 
                var w15 = w[i - 15], w2 = w[i - 2];
    
                // Iterate
                var a = hash[0], e = hash[4];
                var temp1 = hash[7]
                    + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
                    + ((e&hash[5])^((~e)&hash[6])) // ch
                    + k[i]
                    // Expand the message schedule if needed
                    + (w[i] = (i < 16) ? w[i] : (
                            w[i - 16]
                            + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
                            + w[i - 7]
                            + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
                        )|0
                    );
                // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
                var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
                    + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
                
                hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
                hash[4] = (hash[4] + temp1)|0;
            }
            
            for (i = 0; i < 8; i++) {
                hash[i] = (hash[i] + oldHash[i])|0;
            }
        }
        
        for (i = 0; i < 8; i++) {
            for (j = 3; j + 1; j--) {
                var b = (hash[i]>>(j*8))&255;
                result += ((b < 16) ? 0 : '') + b.toString(16);
            }
        }
        return result;
    };

    var pwd = sha256(loginPassword.value);
    var obj = { username: loginName.value, password: pwd };
    var js = JSON.stringify(obj);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      var res = JSON.parse(await response.text());

      if (response.status != 200) {
        setMessage(res.error);
      } else {
        var user = { firstName: res.fName, lastName: res.lName };
        localStorage.setItem("user_data", JSON.stringify(user));

        setMessage("");
        window.location.href = "/dashboard";
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  return (
    <div id="loginDiv" class="center">
      <div id="loginWrapper">
        <h1 class="pageTitle">FoodBuddy</h1>
        <form id="loginForm" onSubmit={doLogin}>
          <span id="inner-title">PLEASE LOG IN</span>
          <br />
          <div class="form-group">
            <input
              type="text"
              id="loginName"
              placeholder="Username"
              ref={(c) => (loginName = c)}
            />
            <br />
            <input
              type="password"
              id="loginPassword"
              placeholder="Passsword"
              ref={(c) => (loginPassword = c)}
            />
            <br />
          </div>
          <div id="rememberme" class="checkbox">
            <label>
              <input type="checkbox" /> Remember me
            </label>
          </div>
          <div id="loginButton">
            <input
              type="submit"
              class="btn btn-primary"
              value="Login"
              onClick={doLogin}
            />
          </div>
          <div id="registerLink">
            <label>
              Don't have an account? <br />
              <a href="#" onClick={goToRegister}>Create one here!</a>
            </label>
          </div>
        </form>
        <span id="loginResult">{message}</span>
      </div>
    </div>
  );
}

export default Login;
