import React,{ useState, useEffect, useContext } from "react";
import { Text, View, TextInput } from 'react-native';
import { styles } from "./Profile.style";
import { listPosts } from "../Home";

import ButtonComponent from "../../components/Button";

import {create, onCreate} from "../../services/Posts";

import { GlobalContext } from "../../context/global/global.context";

export default function HomeScreen() {
    const [post, setPost] = useState({title:"", Description:"", FechaPublicacion:""});
    const {listPosts} = useContext(GlobalContext);

    async function createBook(title, Description, FechaPublicacion){
        const postCreated = await create({title, Description, FechaPublicacion})
        return postCreated;
    }

    const addData = () => {
        createBook(post.title, post.Description, post.FechaPublicacion)
    }

    useEffect(() => {
        let subscription;
        (async function suscribe(){
            subscription = await onCreate(listPosts)
        })();
        return () => {
            subscription?.unsubscribe()
        }
    },[])
    return (
        <View style={styles.container}>
            <Text>Title</Text>
            <TextInput
            onChangeText={(text) => 
                setPost((current)=> ({...current, title: text }))
            }
            style={styles.input}
            />
            <Text>Description</Text>
            <TextInput
            onChangeText={(text) => 
                setPost((current)=> ({...current, Description: text }))
            }
            style={styles.input}
            />                    
            <Text>Fecha de Publicacion</Text>
            <TextInput
            onChangeText={(text) => 
                setBook((current)=> ({...current, FechaPublicacion: text }))
            }
            style={styles.input}
            />
            <ButtonComponent title="Hacer Publicación" onPress={addData}/>
        </View>
    );
}