module.exports = {
    findAll: (limit, cursor) => `
        {
            search(type: REPOSITORY, query: "stars:>10000 language:Java language:Python", first: ${limit}, after: ${cursor}) {
                pageInfo {
                    hasNextPage
                    endCursor
                }
                nodes {
                    ... on Repository {
                        nameWithOwner
                        primaryLanguage {
                            name
                        }
                        stargazers {
                            totalCount
                        }
                    }
                }
            }
        }  
    `,

    findOne: (name, owner) => `
        {
            repository(name: "${name}", owner: "${owner}") {
                nameWithOwner
                createdAt
                forkCount
                primaryLanguage {
                    name
                }
                stargazers {
                    totalCount
                }
                releases(first: 100) {
                    totalCount
                    nodes {
                        publishedAt
                    }
                }
                watchers{
                    totalCount
                }
            }
        }
    `
}