import React, { useEffect, useContext } from "react";
import { Text, View } from "react-native";
import { styles } from "./Home.style";
import { list } from "../../services/Posts";

import { GlobalContext } from "../../context/global/global.context";


export default function HomeScreen() {
  const { listPosts, post } = useContext(GlobalContext);

  useEffect(() => {
    listPosts();
  }, []);

  return (
    <View style={styles.container}>
      {post &&
        post.map((post, i) => (
          <View key={i}>
            <Text>Name: {`${post.Name}`}</Text>
            <Text>Description: {`${post.Description} `}</Text>
            <Text style={{ marginBottom: 30 }}>
              Fecha de Publicacion: {`${book.FechaPublicacion}`}
            </Text>
          </View>
        ))}
    </View>
  );
}