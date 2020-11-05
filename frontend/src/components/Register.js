import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';

function Register() 
{

    var loginName;
    var loginPassword;
    var firstName;
    var lastName;
    var email;
    var checkEmail;
    
    
    const [message,setMessage] = useState('');

    const doRegister = async event =>
    {
        event.preventDefault();
        let check = email.value === checkEmail.value;
        if (!check)
        {
            setMessage('The emails do not match!');
            return;
        }

        if(firstName.value==""||lastName.value=="")
        {
            setMessage('Please enter your first and last name');
            return;
        }

        if(loginName.value=="")
        {
            setMessage('A username is required');
            return;
        }

        if(loginPassword.value=="")
        {
            setMessage('A password is required');
            return;
        }

        var expression = /\S+@\S+/ ;
        if(!expression.test(String(email.value).toLowerCase()))
        {
            setMessage('Please enter a valid email address');
            return;
        }

        expression = /^\w+$/;
        if(!expression.test(loginName.value))
        {
            setMessage('Your username may only contain letters, numbers, and underscores');
            return;
        }

        if(loginPassword.value.length<8)
        {
            setMessage('Your password must be at least 8 characters long');
            return;
        }

        expression = /[!@#$%*]/;
        if(!expression.test(loginPassword.value))
        {
            setMessage('Your password must contain at least one of the following special character: @, !, #, $, %, *');
            return;
        }

        expression = /[0-9]/
        if(!expression.test(loginPassword.value))
        {
            setMessage('Your password must contain at least one digit (0-9)');
            return;
        }

        expression = /[a-z]/
        if(!expression.test(loginPassword.value))
        {
            setMessage('Your password must contain at least one lowercase letter');
            return;
        }

        expression = /[A-Z]/
        if(!expression.test(loginPassword.value))
        {
            setMessage('Your password must contain at least one uppercase letter');
            return;
        }

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

        loginPassword = sha256(loginPassword.value);

        var obj = { username: loginName.value, password: loginPassword, fName: firstName.value, lName: lastName.value, email: email.value };
        var js = JSON.stringify(obj);
        
        try 
        {
            const response = await fetch("http://localhost:5000/api/register", {
              method: "POST",
              body: js,
              headers: { "Content-Type": "application/json" },
            });
      
            var res = JSON.parse(await response.text());
      
            if (response.status != 200) {
                var error = res.error;
                setMessage(error);
                return;
            } else {
                setMessage("Success! If you are not redirected, please ckick 'Go to login'");
                setTimeout(function() {
                    window.location.href = '/';
                }, 2000);
                return;
            }
        } catch (e) {
            alert(e.toString());
            return;
        };
    }

    const goToLogin = event => 
    {
        event.preventDefault();
        window.location.href = '/';
    }

    return (
        <div id="registerDiv" class="center">
            <div id="registerWrapper">
                <h1 class="pageTitle">FoodBuddy</h1>
                <form id="registerForm" onSubmit={doRegister}>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="registerFirstName">First name</label>
                            <input type="text" class="form-control" id="registerFirstName" placeholder="Enter your first name" ref={(c) => firstName = c} />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="registerLastName">Last name</label>
                            <input type="text" class="form-control" id="registerLastName" placeholder="Enter your last name" ref={(c) => lastName = c} />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="registerEmail1">Email address</label>
                            <input type="email" class="form-control" id="registerEmail1" aria-describedby="emailHelp" placeholder="Enter email" ref={(c) => email = c} />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="verifyEmail1">Verify email address</label>
                            <input type="email" class="form-control" id="verifyEmail1" aria-describedby="emailHelp" placeholder="Reenter email" ref={(c) => checkEmail = c} />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="registerLoginName">Username</label>
                            <input type="username" class="form-control" id="registerLoginName" placeholder="Username" ref={(c) => loginName = c} />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="registerLoginPassword1">Password</label>
                            <input type="password" class="form-control" id="registerLoginPassword1" data-tip data-for="passwordTip" placeholder="Password" ref={(c) => loginPassword = c} />
                            <ReactTooltip id="passwordTip" place="bottom" effect="solid">
                                Your password should:
                                <ul>
                                    <li>be at least 8 characters long</li>
                                    <li>contain at least one capital letter, at least one lowercase letter, and at least one digit</li>
                                    <li>contain at least one of the following special characters: @, !, #, $, %, *</li>
                                </ul>
                            </ReactTooltip>
                        </div>
                    </div>
                    <div>
                        <button type="submit" class="btn btn-primary" onClick={doRegister}>Register</button>
                        <button type="reset" style={{marginLeft: "10px", marginRight: "10px"}} class="btn btn-secondary">Reset</button>
                        <button type="button" style={{marginLeft: "10x"}} class="btn btn-secondary" onClick={goToLogin}>Go to login</button>
                    </div>
                </form>
                <span id="registerResult" class="lightText">{message}</span>
            </div>
        </div>
    );
};

export default Register;