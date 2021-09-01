const { buildSchema } = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList, GraphQLInputObjectType, GraphQLBoolean, GraphQLInterfaceType } = require('graphql')
const {queryUserRolver} = require('./controller/userController');
const {
    createAccountRolver,
    findAccountsRolver,
    depositeRolver,
    withdrawRolver
} = require('./controller/bankAccountController');

const userType = new GraphQLObjectType({
    name: "User",
    description: 'User details',
    fields: {
        user_id:
            { type: GraphQLString },
        firstname:
            { type: GraphQLString },
        lastname:
            { type: GraphQLString },
        email:
            { type: GraphQLString },
        username:
            { type: GraphQLString },
        phone:
            { type: GraphQLString },
    }
})

const bankAccountType = new GraphQLObjectType({
    name: "BankAccount",
    description: 'Bank Account details',
    fields: {
        account_id:
            { type: GraphQLString },
        accountName:
            { type: GraphQLString },
        lastFourDigits:
            { type: GraphQLString, description: "The last four digits of the account number" },
        // User Id
        owner:
            { type: GraphQLString },
        balance:
            { type: GraphQLInt }
    }
})

const responseType = new GraphQLObjectType({
    name: "response",
    description: 'Indicate response message',
    fields: {
        success:
            { type: GraphQLBoolean },
        message:
            { type: GraphQLString }
    }
})



// define the graphql schemas
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            findUser: {
                type: userType,
                resolve: queryUserRolver
            },
            findMyAccounts: {
                type: new GraphQLList(bankAccountType),
                resolve: findAccountsRolver
            },
        }
    }),

    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            createAccount: {
                type: responseType,
                args: {
                    accountName: {
                        type: new GraphQLNonNull(GraphQLString),
                        description: "The name of the new account"
                    },
                    accountNumber: {
                        type: new GraphQLNonNull(GraphQLString),
                        description: "The Number of the new account"
                    }
                },
                resolve: createAccountRolver
            },
            deposite: {
                type: responseType,
                args: {
                    accountId: {
                        type: new GraphQLNonNull(GraphQLString),
                    },
                    amount: {
                        type: new GraphQLNonNull(GraphQLInt),
                        description: "The amount to be deposited(cents)"
                    },

                },
                resolve: depositeRolver
            },

            withdraw: {
                type: responseType,
                args: {
                    accountId: {
                        type: new GraphQLNonNull(GraphQLString),
                    },
                    amount: {
                        type: new GraphQLNonNull(GraphQLInt),
                        description: "The amount to be withdrawn(cents)"
                    },

                },
                resolve: withdrawRolver
            },
        }
    })

})





module.exports = {
    schema
}