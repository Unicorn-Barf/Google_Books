const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

// Create resolvers for getting data from the database
const resolvers = {
    Query: {
        user: async (parent, { username, _id  }, context) => {
            try {
                return await User.findOne({
                    $or: [{ _id: _id }, { username }],
                });
            } catch (error) {
                throw new Error(error);
            };
        },
        me: async (parent, args, context) => {
            try {
                if (!context.user) throw new Error('Not logged in!');
                const user = User.findById(context.user._id);
                return user;
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    },

    Mutation: {
        // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
        addUser: async (parent, args, context) => {
            const user = await User.create({...args });

            if (!user) {
                throw new Error({ message: 'Something is wrong!' });
            }
            const token = signToken(user);
            return { token, user };
        },
        // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
        // {body} is destructured req.body
        login: async (parent, { username, email, password }, context) => {
            const user = await User.findOne({ $or: [{ username }, { email }] });
            if (!user) {
                throw new AuthenticationError('No profile found!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }
            const token = signToken(user);
            return { token, user };
        },
        // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
        // user comes from `req.user` created in the auth middleware function
        saveBook: async (parent, { book }, context) => {
            
            try {
                if (context.user) {
                    return await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { savedBooks: {...book} } },
                        { new: true, runValidators: true }
                    );
                }
                else throw new Error({ message: 'Not logged in!'});
            } catch (err) {
                console.log(err);
                throw new Error(err);
            };
        },
        // remove a book from `savedBooks`
        removeBook: async (parent, { bookId }, context) => {
            try {
                if (context.user) {
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { savedBooks: { bookId } } },
                        { new: true }
                    );
                    if (!updatedUser) {
                        return { message: "Couldn't find user with this id!" };
                    };
                    return updatedUser;
                }
                else throw new Error({ message: 'Not logged in!'});

            } catch (error) {
                throw new Error(error);
            }
        },
    },
};

module.exports = resolvers;