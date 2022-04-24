import { API, graphqlOperation } from "aws-amplify";
import { getPost, listPosts} from "../graphql/queries";
import { createPost, updatePost, deletePost } from "../graphql/mutations";
import { onCreatePost } from "../graphql/subscriptions";

const list = async() => {
    try{
        const Post = await API.graphql(graphqlOperation(listPosts));
        return Post.data.listPosts.items;
    }catch(error){
        console.log({ error });
    }
}

const create = async(Post)=>{
    try {
        const newPost = await API.graphql(graphqlOperation(createPost,{input: Post}));
        return newPost;
    } catch (error) {
        console.log({error})
    }
}

const onCreate = async(subscriptionFunction) => {
    const subscription = API.graphql(graphqlOperation(onCreatePost)).subscribe({
        next:(PostData) => {
            subscriptionFunction();
        },
    });
    return subscription;
}



export {list,create,onCreate};