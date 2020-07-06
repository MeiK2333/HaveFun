# HaveFun

## GraphQL

```graphql
{
  sites {
    name
    updated_at
  }
  site(name: "知乎") {
    name
    items {
      title
      excerpt
      metrics
      link
    }
    updated_at
  }
}
```
