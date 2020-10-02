module.exports = {
    findAll: (limit, cursor, languageName) => `
        {
            search(type: REPOSITORY, query: "stars:>10000 language:${languageName}", first: ${limit}, after: ${cursor}) {
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
                releases {
                    totalCount
                }
                watchers{
                    totalCount
                }
            }
        }
    `
}