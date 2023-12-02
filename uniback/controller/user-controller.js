const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
    static Login = async (req, res) => {
        try {
            // checking validation results from express-validator middleware
            // Get userData from the request body
            const { email } = req.body;

            // Create a new user instance
          
            // Check if it's a university email
            const isUniversityEmail = UserController.isUniversityEmail(email);

            if (!isUniversityEmail) {
                throw new Error("Non University email");
            }

            // token for local storage
            const token = jwt.sign({
                email: email,
                isUniversityEmail, // Add isUniversityEmail to the token payload
            }, process.env.JWT_KEY, {
                expiresIn: '24h'
            });

            if (!token) {
                throw new Error("Signing Up Failed, Please Try again Later");
            }

            res.status(200).json({
                user: {
                    email: email,
                    isUniversityEmail,
                },
                token: token,
                message: "Sign up Successful"
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Function to check if the email is from a university domain
    static isUniversityEmail(email) {
        // Define an array of university domain patterns
        const universityDomains = ['edu', 'ac', 'univ'];

        // Extract the domain from the email
        const domain = email.split('@')[1];

        // Check if the domain matches any university domain pattern
        return universityDomains.some((univDomain) => domain.includes(univDomain));
    }
}

module.exports = UserController;
