const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_SECRET_ID
);

// Generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || process.env.JWT_SECRET_KEY || 'supersecretjwtkey', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, dob, phoneNumber, address } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ message: 'Missing password' });
    }
    if (!firstName || !lastName) {
      return res.status(400).json({ message: 'First name and last name are required' });
    }
    if (phoneNumber && !/^\+?[0-9]{7,15}$/.test(phoneNumber)) {
      return res.status(400).json({ message: 'Invalid phone number' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      dob,
      phoneNumber,
      address,
    });

    if (user) {
      res.status(201).json({
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          dob: user.dob,
          phoneNumber: user.phoneNumber,
          address: user.address,
          role: user.role,
        },
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          dob: user.dob,
          phoneNumber: user.phoneNumber,
          address: user.address,
          role: user.role,
        },
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dob: user.dob,
        phoneNumber: user.phoneNumber,
        address: user.address,
        role: user.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.dob = req.body.dob || user.dob;
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
      user.address = req.body.address || user.address;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        dob: updatedUser.dob,
        phoneNumber: updatedUser.phoneNumber,
        address: updatedUser.address,
        role: updatedUser.role,
        token: generateToken(updatedUser._id, updatedUser.role),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate or register user with Google profile/credential/token
// @route   POST /api/auth/google
// @access  Public
const googleAuth = async (req, res) => {
  try {
    const { idToken, credential, accessToken, email, firstName, lastName, googleId } = req.body;

    let targetEmail = email;
    let targetFirstName = firstName;
    let targetLastName = lastName;
    let targetGoogleId = googleId;

    const tokenToVerify = idToken || credential;

    if (tokenToVerify) {
      try {
        const ticket = await googleClient.verifyIdToken({
          idToken: tokenToVerify,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (payload) {
          targetEmail = payload.email;
          targetGoogleId = payload.sub;
          targetFirstName = payload.given_name || payload.name?.split(' ')[0] || 'Google';
          targetLastName = payload.family_name || payload.name?.split(' ').slice(1).join(' ') || 'User';
          
          const maskedSub = payload.sub ? `${payload.sub.slice(0, 4)}...` : 'N/A';
          const maskedEmail = payload.email ? `${payload.email.slice(0, 3)}***@${payload.email.split('@')[1]}` : 'N/A';
          console.log(`[Google OAuth Verified ID Token] sub: ${maskedSub}, email: ${maskedEmail}`);
        }
      } catch (verifyError) {
        console.warn(`[Google OAuth ID Token Verification Warning] ${verifyError.message}`);
      }
    } else if (accessToken) {
      try {
        const userinfoRes = await googleClient.request({
          url: 'https://www.googleapis.com/oauth2/v3/userinfo',
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        const payload = userinfoRes?.data;
        if (payload && payload.email) {
          targetEmail = payload.email;
          targetGoogleId = payload.sub;
          targetFirstName = payload.given_name || payload.name?.split(' ')[0] || 'Google';
          targetLastName = payload.family_name || payload.name?.split(' ').slice(1).join(' ') || 'User';

          const maskedSub = payload.sub ? `${payload.sub.slice(0, 4)}...` : 'N/A';
          const maskedEmail = payload.email ? `${payload.email.slice(0, 3)}***@${payload.email.split('@')[1]}` : 'N/A';
          console.log(`[Google OAuth Verified Access Token] sub: ${maskedSub}, email: ${maskedEmail}`);
        }
      } catch (tokenErr) {
        console.warn(`[Google Access Token Verification Warning] ${tokenErr.message}`);
      }
    }

    if (!targetEmail) {
      return res.status(400).json({ message: 'Google authentication failed: Email could not be verified' });
    }

    // 1. Primary lookup by Google sub (unique user ID)
    let user = null;
    if (targetGoogleId) {
      user = await User.findOne({ googleId: targetGoogleId });
    }

    // 2. Secondary lookup by verified email
    if (!user) {
      user = await User.findOne({ email: targetEmail });
    }

    if (!user) {
      // Create user with random password since password field exists
      const randomPassword = Math.random().toString(36).slice(-10) + 'A1!';
      user = await User.create({
        firstName: targetFirstName || 'Google',
        lastName: targetLastName || 'User',
        email: targetEmail,
        googleId: targetGoogleId || `google_${Math.random().toString(36).slice(2, 9)}`,
        password: randomPassword,
      });
      console.log(`[Google OAuth Created User] ID: ${user._id}`);
    } else if (targetGoogleId && !user.googleId) {
      // If user exists by email but has no googleId, link it
      user.googleId = targetGoogleId;
      await user.save();
    }

    res.status(200).json({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dob: user.dob,
        phoneNumber: user.phoneNumber,
        address: user.address,
        role: user.role,
      },
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error('[Google OAuth Error]:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  googleAuth,
};
