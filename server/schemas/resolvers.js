// use user/ thought from models folder
const { User, Thought } = require('../models');

// authentication error from apollo
const { AuthenticationError } = require('apollo-server-express');

// auth token from auth.js
const { signToken } = require('../utils/auth');

// resolvers query/ mutations/ auth
const resolvers = {
    Query: {
        me: async (parent, args) => {
            const userData = await User.findOne({})
              .select('-__v -password')
              .populate('thoughts')
              .populate('friends');
        
            return userData;
          },
          
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },

        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },

           // get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },

        Mutation: {
            // add user
            addUser: async (parent, args) => {
                const user = await User.create(args);
                const token = signToken(user);
              
                return { token, user };
              },
              login: async (parent, { email, password }) => {
                const user = await User.findOne({ email });
              
                if (!user) {
                  throw new AuthenticationError('Incorrect credentials');
                }
              
                const correctPw = await user.isCorrectPassword(password);
              
                if (!correctPw) {
                  throw new AuthenticationError('Incorrect credentials');
                }
              
                const token = signToken(user);
                return { token, user };
              }
              
        }
    }
};
  
  
  module.exports = resolvers;