const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

let books = [
  { name: "Hello hello!", genre: "Fantasy", id: "1" },
  { name: "What is up", genre: "Comedy", id: "2" },
  { name: "All good fellows!", genre: "Sex", id: "3" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return books.find(book => book.id == args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
