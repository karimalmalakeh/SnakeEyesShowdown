// Check if essential localStorage values are present
function ifUserExists() {
    const requiredKeys = ["firstName", "lastName", "username", "phoneNumber", "city", "email", "bank"];
    const hasAllData = requiredKeys.every(key => localStorage.getItem(key));
    if (hasAllData) {
        window.location.href = "game.html";
    }
}
// Handles laoding when the docmuent is ready    
$(document).ready(function () {
    ifUserExists();
     // Extend jQuery validator to support 'pattern'
     $.validator.addMethod("pattern", function (value, element, param) {
        return this.optional(element) || param.test(value);
    }, "Invalid format.");
    // Handles the jQuery validation   
    $("#playerForm").validate({
        rules: {
            firstName: {
                required: true,
                pattern: /^[A-Za-z][A-Za-z'`\- ]{0,18}[A-Za-z'\- ]$/
            }, 
            lastName: {
                required: true,
                pattern: /^[A-Za-z][A-Za-z'`\- ]{0,28}[A-Za-z'\- ]$/
            },
            username: {
                required: true,
                pattern: /^[A-Z][a-z]{3}[0-5]$/
            },
            phoneNumber: {
                required: true,
                pattern: /^\(\d{3}\) \d{3}-\d{4}$/
            },
            city: {
                required: true,
                pattern: /^[A-Za-z]{1,42}$/
            },
            email: {
                required: true,
                pattern: /^[A-Za-z0-9_.-]+@[A-Za-z0-9_]+\.(ca|org)$/
            },
            bank: {
                required: true,
                number: true,
                min: 5,
                max: 5000
            }
        },
        // Handles the messages displayed if the validation fails
        messages: {
            firstName: "Please enter a valid first name.",
            lastName: "Please enter a valid last name.",
            username: "Please enter a valid username; Ex: John1",
            phoneNumber: "Please enter a valid phone number; Ex: (123) 456-7890",
            city: "Please enter a valid city; letters only",
            email: "Please enter a valid email; must end in .ca or .org",
            bank: "Enter a value between $5 and $5000, divisible by 3."
        },
        submitHandler: function () {
            // handles checking if the bank amount entered is divisible by three
            const amount = parseInt($("#bank").val().trim())
            if (amount % 3 !== 0) {
                $("#bankError").html("Amount must be divisible by 3.");
                return false;
            }
            // Stores the user's info in the LocalStorage
            localStorage.setItem("firstName", $("#firstName").val().trim());
            localStorage.setItem("lastName", $("#lastName").val().trim());
            localStorage.setItem("username", $("#username").val().trim());
            localStorage.setItem("phoneNumber", $("#phoneNumber").val().trim());
            localStorage.setItem("city", $("#city").val().trim());
            localStorage.setItem("email", $("#email").val().trim());
            localStorage.setItem("bank", $("#bank").val().trim());

            window.location.href = "game.html";
        }
    });
});

