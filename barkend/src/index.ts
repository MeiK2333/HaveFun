import "reflect-metadata";
import { ZhiHu } from "./zhihu";
import { MeiPin } from "./meipin";
import { V2EX } from "./v2ex";

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const PORT = 4000;

const app = express();

export interface Item {
  title: string
  link: string
  // 热度
  metrics?: string
  // 摘录
  excerpt?: string
  image?: string
  updated_at?: string
};

const typeDefs = gql`
  type Item {
    title: String
    link: String
    metrics: String
    excerpt: String
    image: String
    updated_at: String
  }
  type Site {
    name: String
    items: [Item]
    updated_at: String
  }
  type Query {
    sites: [Site]
    site(name: String): Site
  }
`;

const sites = {
  '知乎': new ZhiHu(),
  '没品': new MeiPin(),
  'V2EX': new V2EX()
};

const resolvers = {
  Query: {
    sites: async (parent, args, context, info) => {
      const fetch = Boolean(info.fieldNodes[0].selectionSet.selections.find(elem => elem.name.value === 'items'));
      const data = [];
      for (const [key, value] of Object.entries(sites)) {
        const items = fetch ? await value.fetch() : [];
        data.push({
          name: key,
          items: items,
          updated_at: Reflect.getMetadata('updated_at', value) || new Date(0).toISOString()
        })
      }
      return data;
    },
    site: async (parent, args, context, info) => {
      const obj = sites[args.name];
      const items = await obj.fetch();
      return {
        name: args.name,
        items: items,
        updated_at: Reflect.getMetadata('updated_at', obj) || new Date(0).toISOString()
      }
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({
  app, cors: {
    credentials: true,
    origin: new RegExp("/*/")
  },
  path: "/",
});

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
