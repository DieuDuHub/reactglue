import EditScreenInfo from "@/components/EditScreenInfo";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
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
import { Input, InputField } from "@/components/ui/input";
import { ArrowLeftIcon } from "@/components/ui/icon"
import * as SecureStore from 'expo-secure-store';
import React, {useState,useEffect} from "react";
import Policycard from "@/components/Policycard";

const echo = () => {console.log("hello")}

export default function Tab2() {
  echo()
  const [results, setResults] = useState<string | null>(null);
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const asyncFunc = async () => {
     await SecureStore.getItemAsync("accesstoken").then((res) => {
       setResults(res);
      })
    }
    asyncFunc();
  }); 

const url = "http://192.168.1.17/api/anys?date=2020-04-09T09:00:56Z&page=2&limit=10"

  useEffect(() => {
    if (results !== null) { // No oauth , no data
      console.log('results',results)
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        Authorization: `Bearer ${results}`}})
          .then((response) => response.json())
          .then((responseJson) => {
            console.log('responseJson',responseJson)
            setPolicies(responseJson);
          })
          .catch((error) => {
            //console.error(error);
            
          });
        }

  } , [results]);

  

  return (
    <Box>
    <VStack className="w-full justify-between">
      <Text>Policy</Text>
      {
        policies && policies.map((policy) => {
          let pol = {
            id: policy["content"]["_id"]["$oid"],
            name: policy["content"]["policy"]["name"],
            description: policy["content"]["policy"]["description"],
            productname: policy["content"]["policy"]["product"]["name"],
            firstname: policy["content"]["policy"]["firstname"],
            integration: policy["content"]["integrationDate"]["$date"],
            country: policy["content"]["policy"]["country"] || "Unknown" ,
            status : "Active"  
          }
          return (  
            <Policycard  key={policy["content"]["_id"]["$oid"]}  {...pol} description=""/>
          )
        })
      } 
    </VStack>
</Box>
  );
} 

/*
    <Center>
    <Box className="p-5 max-w-96 border border-background-300 rounded-lg">
      <VStack className="pb-4" space="xs">
        <Heading className="leading-[30px]">Set new password</Heading>
        <Text className="text-sm">
         
        </Text>
      </VStack>
      <VStack space="xl" className="py-2">
        <Input>
          <InputField className="py-2" placeholder="New password" />
        </Input>
        <Input>
          <InputField className="py-2" placeholder="Confirm new password" />
        </Input>
      </VStack>
      <VStack space="lg" className="pt-4">
        <Button size="sm" variant="solid" className="w-full">
          <ButtonText>Submit</ButtonText>
        </Button>
        <Box className="flex flex-row">
          <Button variant="link" size="sm" className="p-0"  onPress={echo}>
            <ButtonIcon className="mr-1" size="md" as={ArrowLeftIcon} />
            <ButtonText>Back to login2</ButtonText>
          </Button>
        </Box>
      </VStack>
    </Box>
  </Center> 
*/