import { API, graphqlOperation } from "aws-amplify";
import { getProfile, listProfiles } from "../graphql/queries";
import { createProfile, updateProfile, deleteProfile } from "../graphql/mutations";
import { onCreateProfile } from "../graphql/subscriptions";

const list = async() => {
    try{
        const Profiles = await API.graphql(graphqlOperation(listProfiles));
        return Profiles.data.listProfiles.items;
    }catch(error){
        console.log({ error });
    }
}

const create = async(Profile)=>{
    try {
        const newProfile = await API.graphql(graphqlOperation(createProfile,{input: Profile}));
        return newProfile;
    } catch (error) {
        console.log({error})
    }
}

const onCreate = async(subscriptionFunction) => {
    const subscription = API.graphql(graphqlOperation(onCreateProfile)).subscribe({
        next:(ProfileData) => {
            subscriptionFunction();
        },
    });
    return subscription;
}



export {list,create,onCreate};