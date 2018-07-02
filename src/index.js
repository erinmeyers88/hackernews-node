const {GraphQLServer} = require('graphql-yoga');

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API for a Hackernews Clone`,
    feed: () => links
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    }
  }
};

//Tells server what API operations are accepted (typeDefs) and how they should be resolved (resolvers)

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log('Server running on http://localhost:4000'));