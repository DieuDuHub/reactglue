import EditScreenInfo from "@/components/EditScreenInfo";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";

import {
  Button,
  ButtonText,
  ButtonSpinner,
  ButtonIcon,
  ButtonGroup,
} from "@/components/ui/button"
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState, useCallback } from "react";

import Policycard from "@/app/components/PolicyCard";
import PolicyFilter from  "@/app/components/PolicyFilter";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from "react-native";

const echo = () => {console.log("hello")}

export default function Tab2() {
  echo()
  const [results, setResults] = useState<string | null>(null);
  const [policies, setPolicies] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPolicies = async () => {
    if (results !== null) {
      console.log('results',results)
      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URI}/api/anys?date=2015-04-09T09:00:56Z&page=1&limit=10`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${results}`
          }
        });
        try {
          const responseJson = await response.json();
          console.log('responseJson',responseJson)
          setPolicies(responseJson);
          setError(null);
        } catch (error) {
          console.log('responseJson',response);
          console.error("Error parsing response", response.status);
          setError("AUTH ERROR : " + response.status);
        }
      } catch (error) {
        console.error("Error fetching policies", error);
      }
    }
  };

  const onRefresh = useCallback(() => {
    asyncFunc();
    setRefreshing(true);
    fetchPolicies().then(() => setRefreshing(false));
  }, [results]);

    const asyncFunc = async () => {
      try {
        setResults(await AsyncStorage.getItem("accesstoken"));
        console.log("Token refreshed");
      }
      catch (error) {
        console.error("Error retrieving data", error);  
      }
    }
  
  useEffect(() => {
    fetchPolicies();
  }, [results]);

  return (

   
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
       <PolicyFilter/>
      <View style={styles.checkerboard}>
     
        <View style={styles.checkerboardBackground}>
          
          {/*Array.from({ length: 8 }).map((_, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {Array.from({ length: 8 }).map((_, colIndex) => (
                <View
                  key={colIndex}
                  style={[
                    styles.square,
                    (rowIndex + colIndex) % 2 === 0
                      ? styles.lightSquare
                      : styles.darkSquare,
                  ]}
                />
              ))}
            </View>
          ))*/}
        </View>
        <VStack className="w-full justify-between">
          <View style={styles.content}>
            {error && <Text>{error}</Text>}
            {policies && policies.map((policy) => {
              let pol = {
                id: policy["content"]["_id"]["$oid"],
                name: policy["content"]["policy"]["name"],
                description: policy["content"]["policy"]["description"],
                productname: policy["content"]["policy"]["product"]["name"],
                productid: policy["content"]["policy"]["product"]["id"],
                firstname: policy["content"]["policy"]["firstname"],
                integration: policy["content"]["integrationDate"]["$date"],
                country: policy["content"]["policy"]["country"] || "Unknown",
                status: "Active"
              };
              return <Policycard key={pol.id} {...pol} />;
            })}
          </View>
        </VStack>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkerboard: {
    flex: 1,
    justifyContent: "center",
  },
  checkerboardBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  row: {
    flexDirection: "row",
  },
  square: {
    flex: 1,
    aspectRatio: 1,
  },
  lightSquare: {
    backgroundColor: "#ffffff",
  },
  darkSquare: {
    backgroundColor: "#e5e5e5",
  },
  content: {
    padding: 20,
  },
  policyText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});