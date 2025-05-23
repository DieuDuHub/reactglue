import { Button, ButtonText } from "@/components/ui/button"
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@/components/ui/drawer"

import {
    FormControl,
    FormControlError,
    FormControlErrorText,
    FormControlErrorIcon,
    FormControlLabel,
    FormControlLabelText,
    FormControlHelper,
    FormControlHelperText,
  } from "@/components/ui/form-control"
  import { Input, InputField } from "@/components/ui/input"
  import { VStack } from "@/components/ui/vstack"
  import { AlertCircleIcon } from "@/components/ui/icon"

import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"
import React from "react"

export default function  PolicyFilter(props: { size: string }) {
  const [showDrawer, setShowDrawer] = React.useState(false)
  
  const [isInvalid, setIsInvalid] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("12345")

  const [inputDatefrom, setInputDatefrom] = React.useState("2023-10-01")
  const [inputDateto, setInputDateto] = React.useState("2023-10-31")

  const handleSubmit = () => {
    if (inputValue.length < 6) {
      setIsInvalid(true)
    } else {
      setIsInvalid(false)
    }
  }

  return (
    <>
      <Button
        onPress={() => {
          setShowDrawer(true)
        }}
      >
        <ButtonText>Show Policies filter</ButtonText>
      </Button>
      <Drawer
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false)
        }}
        size="md"
        anchor="top"
      >
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader>
            <Heading size="3xl"></Heading>
          </DrawerHeader>
          <DrawerBody>
             <VStack className="w-full max-w-[300px] rounded-md border border-background-200 p-4">
      <FormControl
        isInvalid={isInvalid}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Search by policy Id</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size={props.size}>
          <InputField
            type="text"
            placeholder="Policy Id"
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
          />
        </Input>
        <FormControlHelper>
          <FormControlHelperText>
            Must be atleast 6 characters.
          </FormControlHelperText>
        </FormControlHelper>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>
            Atleast 6 characters are required.
          </FormControlErrorText>
        </FormControlError>

        <FormControlLabel>
          <FormControlLabelText>Search by date</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size={props.size}>
          <InputField
            type="text"
            placeholder="Policy Id"
            value={inputDatefrom}
            onChangeText={(text) => setInputDatefrom(text)}
          />
        </Input>
        <Input className="my-1" size={props.size}>
          <InputField
            type="text"
            placeholder="Policy Id"
            value={inputDatefrom}
            onChangeText={(text) => setInputDateto(text)}
          />
        </Input>
        <FormControlHelper>
          <FormControlHelperText>
            Must be atleast 6 characters.
          </FormControlHelperText>
        </FormControlHelper>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>
            Atleast 6 characters are required.
          </FormControlErrorText>
        </FormControlError>
      </FormControl>
      <Button className="w-fit self-end mt-4" size="sm" onPress={handleSubmit}>
        <ButtonText>Submit</ButtonText>
      </Button>
    </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button
              onPress={() => {
                setShowDrawer(false)
              }}
              className="flex-1"
            >
              <ButtonText>Button</ButtonText>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}