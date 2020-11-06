import gql from 'graphql-tag';

//Queries
export const FETCH_RECIPES_QUERY = gql`
   query getRecipes($category: String!,$skip:Int!){
    getRecipes(category: $category,skip:$skip) {
        id
        category
        description
        hostPhotoUrl
        hostUid
        hostedBy
        title
        createdAt
    }
  }
`;

export const FETCH_RECIPE_QUERY = gql`
   query getRecipe($recipeId: ID!){
    getRecipe(recipeId: $recipeId) {
        id
        category
        description
        hostPhotoUrl
        hostUid
        hostedBy
        title
        createdAt
    }
  }
`;
export const FETCH_POSTS_QUERY = gql`
   query getPosts($limit: Int!,$skip:Int!){
    getPosts(limit: $limit,skip:$skip) {
        id
		description
		hostPhotoURL
		hostUid
		hostedBy
		title
		photos
		createdAt
		photos
    }
  }
`;

export const FETCH_POST_QUERY = gql`
   query getPost($postId: ID!){
    getPost(postId: $postId) {
        id
		description
		hostPhotoURL
		hostUid
		hostedBy
		title
		photos
		createdAt
		photos
    }
  }
`;


//Mutataions
export const CREATE_RECIPE_MUTATION = gql`
  mutation createRecipe(
    $category: String!
    $description: String!
    $hostPhotoUrl: String!
    $hostUid: String!
    $hostedBy: String!
    $title: String!
  ) {
    createRecipe(
        recipeInput: {
        category: $category
        description: $description
        hostPhotoUrl: $hostPhotoUrl
        hostUid: $hostUid
        hostedBy: $hostedBy
        title: $title
      }
    ) {
      id
      category
      description
      hostPhotoUrl
      hostUid
      hostedBy
      title
      createdAt
    }
  }
`;

export const UPDATE_RECIPE_MUTATION = gql`
  mutation updateRecipe(
    $category: String!
    $description: String!
    $hostPhotoUrl: String!
    $hostUid: String!
    $hostedBy: String!
    $title: String!
    $recipeId: ID!
  ) {
    updateRecipe(
        recipeInput: {
        category: $category
        description: $description
        hostPhotoUrl: $hostPhotoUrl
        hostUid: $hostUid
        hostedBy: $hostedBy
        title: $title
      },
      recipeId:$recipeId
    ) {
      id
      category
      description
      hostPhotoUrl
      hostUid
      hostedBy
      title
      createdAt
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $title: String!
    $description: String!
    $hostPhotoURL: String!
    $hostUid: String!
    $hostedBy: String!
    $photos: [String]!
  ) {
    createPost(
        postInput: {
        title: $title
        description: $description
        hostPhotoURL: $hostPhotoURL
        hostUid: $hostUid
        hostedBy: $hostedBy
        photos: $photos
      }
    ) {
      id
      title
      description
      hostPhotoURL
      hostUid
      hostedBy
      photos
      createdAt
    }
  }
`;

export const UPDATE_POST_MUTATION = gql`
  mutation updatePost(
    $title: String!
    $description: String!
    $hostPhotoURL: String!
    $hostUid: String!
    $hostedBy: String!
    $photos: [String]
    $postId: ID!
  ) {
    updatePost(
        postInput: {
        title: $title
        description: $description
        hostPhotoURL: $hostPhotoURL
        hostUid: $hostUid
        hostedBy: $hostedBy
        photos: $photos
      },
      postId:$postId
    ) {
        id
        title
        description
        hostPhotoURL
        hostUid
        hostedBy
        photos
        createdAt
    }
  }
`;
export const DELETE_POST_MUTATION = gql`
mutation deletePost($postId:ID!, $hostUid:ID!) {
    deletePost(postId:$postId ,hostUid:$hostUid)
}
`
