import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const registerUser = async ({ email, password, firstName, lastName, userType }) => {
    try {
        // Create user in Firebase Authentication
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        const { uid } = userCredential.user;

        // Send email verification
        await userCredential.user.sendEmailVerification();

        //check email verification

        // Save additional details to Firestore (optional: only after email verification)
        await firestore().collection('users').doc(uid).set({
            firstName,
            lastName,
            userType,
            email,
            createdAt: firestore.FieldValue.serverTimestamp(),
        });

        return {
            success: true,
            message: 'User registered successfully.Verification email has been sent. Please verify your email to proceed.',
        };
    } catch (error) {
        console.error('Error during user registration:', error);
        return { success: false, message: error.message }; // Return error details
    }
};
export const loginUser = async ({ email, password }) => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        if (!user.emailVerified) {
            // Send verification email if not verified
            await user.sendEmailVerification();
            await auth().signOut();
            return {
                success: false,
                message: 'Please verify your email. A new verification email has been sent.',
            };
        }

        // Proceed if email is verified
        return { success: true, message: 'Login successful!', user: user };
    } catch (error) {
        console.error('Error logging in:', error);

        let errorMessage = "Error occured during login"
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'No account found for this email.';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Incorrect password.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Invalid email address.';
        }
        else if (error.code === 'auth/invalid-credential') {
            errorMessage = 'Invalid email or password';
        }
        else if (error.code === 'auth/too-many-requests') {
            errorMessage = 'Please verify you email address.';
        }

        return { success: false, message: errorMessage };
    }
};

export const checkEmailVerification = async () => {
    const user = auth().currentUser;

    if (user && !user.emailVerified) {
        alert('Please verify your email before accessing the app.');
        return false; // Prevent access
    }

    return true; // Allow access
};
export const resendVerificationEmail = async () => {
    const user = auth().currentUser;
    if (user) {
        await user.sendEmailVerification();
        alert('Verification email sent. Please check your inbox.');
    }
};
export const forgotPassword = async (email) => {
    try {
        // Step 1: Check if email exists in Firestore
        const usersCollection = await firestore().collection('users').where('email', '==', email).get();

        if (usersCollection.empty) {
            return {
                success: false,
                message: 'No account found with this email address. Please register first',
            };
        }

        await auth().sendPasswordResetEmail(email);
        return {
            success: true,
            message: 'Password reset email sent successfully. Please check your inbox.',
        };
    } catch (error) {
        console.error('Error sending password reset email:', error);

        let errorMessage = 'An error occurred.';
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'No user found with this email.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Invalid email address.';
        }

        return { success: false, message: errorMessage };
    }
};

