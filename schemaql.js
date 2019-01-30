const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const axios = require("axios");

// Ticket type
const TicketType = new GraphQLObjectType({
  name: "Ticket",
  fields: () => ({
    _id: { type: GraphQLString },
    fields: { type: TicketFieldsType }
  })
});

// TicketFields type
const TicketFieldsType = new GraphQLObjectType({
  name: "TicketFieldsType",
  fields: () => ({
    title: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    tickets: {
      type: new GraphQLList(TicketType),
      resolve(parent, args) {
        return axios
          .get("http://localhost:4000/api/tickets")
          .then(res => res.data);
      }
    },
    ticket: {
      type: TicketType,
      args: {
        _id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .get(`http://localhost:4000/api/tickets/${args._id}`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
