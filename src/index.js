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
    feed: () => links,
    link: (id) => links.map(link => {
      if (link.id === id) {
        return link;
      }
    })
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
    },
    updateLink: (root, args) => {
      let newLink;
      links.forEach((link, index) => {
        if (link.id === args.id) {
          newLink = {
            id: link.id,
            description: args.description ? args.description : link.description,
            url: args.url ? args.url : link.url
          };
          links[index] = newLink;
        }
      });
      return newLink;
    },
    deleteLink: (root, args) => {
      let linkToDelete;
      links.forEach((link, index) => {
        if (link.id === args.id) {
          linkToDelete = link;
          delete links[index];
        }
      });
      return linkToDelete;
    }
  }
};

//Tells server what API operations are accepted (typeDefs) and how they should be resolved (resolvers)

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log('Server running on http://localhost:4000'));