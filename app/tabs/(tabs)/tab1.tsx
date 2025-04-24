import EditScreenInfo from "@/components/EditScreenInfo";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Card } from "@/components/ui/card";
import { Box } from "@/components/ui/box";
import Policycard from "@/app/components/PolicyCard";

let pol = {
  id: "42654643563",
  name: "Deb",
  description: "description",
  productname: "product name",
  productid: "product Id",
  firstname: "firstname",
  integration: "integration",
  country: "country",
  status: "Active"
};

export default function Tab2() {
  return (
    <Center className="flex-1">
      <Heading className="font-bold text-2xl">Expo V3 - Tab 1</Heading>
      <Divider className="my-[30px] w-[80%]" />
      <Text className="p-4">Example below to use gluestack-ui components.</Text>
      <EditScreenInfo path="app/(app)/(tabs)/tab1.tsx" />
     <HStack className="flex-wrap justify-center">
      <Card size="md" variant="elevated" className="m-3">
      <Heading size="md" className="mb-1">
        Quick Start
      </Heading>
      <Text size="sm">Start building your next project in minutes</Text>
    </Card>
    <Card size="md" variant="elevated" className="m-3">
      <Heading size="md" className="mb-1">
        Quick Start
      </Heading>
      <Text size="sm">Start building your next project in minutes</Text>
    </Card>
    </HStack>
    <Box className="w-100 h-100 bg-primary-500 bg-secondary-300 bg-tertiary-600">
      <HStack className="flex-wrap justify-center " >
        <Policycard key={pol.id} {...pol} />
      </HStack>
    </Box>
      <HStack className="w-full justify-between">
      <Box className="w-20 h-20 bg-primary-300" />
      <Box className="w-20 h-20 bg-primary-500 bg-secondary-300 bg-tertiary-600" />
      <Box className="w-20 h-20 bg-primary-500" />
      </HStack>
    </Center>
  );
}
